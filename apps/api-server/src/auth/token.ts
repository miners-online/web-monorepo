import { Hono } from "hono"
import type { Context } from "hono"

import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "jose";
import { AppEnv } from "../types";
import { ISSUER, JWT_SECRET_BYTES } from ".";
import * as tokens from "../db/repositories/tokens";

export const token = new Hono<AppEnv>().basePath("/auth");

// Token validity durations
const ACCESS_TOKEN_EXPIRY_MS = 60 * 60 * 1000;       // 1 hour
const REFRESH_TOKEN_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// Token endpoint - handles both authorization_code and refresh_token grants
token.post("/token", async (c: Context<AppEnv>) => {
  const bodyText = await c.req.text();
  const params = new URLSearchParams(bodyText);

  const grant_type = params.get("grant_type");

  if (grant_type === "authorization_code") {
    return handleAuthorizationCodeGrant(c, params);
  }
  
  if (grant_type === "refresh_token") {
    return handleRefreshTokenGrant(c, params);
  }

  return c.json({ error: "unsupported_grant_type" }, 400);
});

// Handle authorization_code grant type
async function handleAuthorizationCodeGrant(c: Context<AppEnv>, params: URLSearchParams) {
  const code = params.get("code");
  const redirect_uri = params.get("redirect_uri");
  const client_id = params.get("client_id");

  if (!code) return c.json({ error: "invalid_request", error_description: "missing code" }, 400);
  if (!client_id) return c.json({ error: "invalid_request", error_description: "missing client_id" }, 400);
  if (!redirect_uri) return c.json({ error: "invalid_request", error_description: "missing redirect_uri" }, 400);

  // Verify the JWT authorization code
  let verified;
  try {
    verified = await jwtVerify(code, JWT_SECRET_BYTES, {
      issuer: ISSUER,
      audience: client_id,
    });
  } catch {
    return c.json({ error: "invalid_grant", error_description: "invalid or expired authorization code" }, 400);
  }

  const payload = verified.payload;
  
  // Check if it's the right type of token
  if (payload.type !== "authorization_code") {
    return c.json({ error: "invalid_grant", error_description: "invalid code type" }, 400);
  }

  // Validate the authorization code from the database (check not used, not expired)
  const authCode = await tokens.validateAuthorizationCode(code);
  
  if (!authCode) {
    return c.json({ error: "invalid_grant", error_description: "invalid or expired authorization code" }, 400);
  }

  // Verify the redirect_uri matches what was in the code
  const codeRedirectUri = payload.redirect_uri as string;
  if (codeRedirectUri !== redirect_uri) {
    return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, 400);
  }

  const userId = payload.sub;
  const applicationId = client_id;
  const grantedScope = payload.scope as string | undefined;

  if (!userId) {
    return c.json({ error: "invalid_grant", error_description: "invalid code claims" }, 400);
  }

  // Mark the authorization code as used (one-time use)
  await tokens.markAuthorizationCodeAsUsed(authCode.id);

  // Generate access token
  const accessToken = await generateAccessToken(userId, applicationId, grantedScope);
  
  // Generate refresh token
  const refreshToken = await generateRefreshToken(userId, applicationId, grantedScope);

  const response: Record<string, unknown> = {
    access_token: accessToken.token,
    token_type: "Bearer",
    expires_in: 3600,
  };

  if (grantedScope) {
    response.scope = grantedScope;
  }

  // Include refresh token in response
  response.refresh_token = refreshToken.token;

  return c.json(response);
}

// Handle refresh_token grant type
async function handleRefreshTokenGrant(c: Context<AppEnv>, params: URLSearchParams) {
  const refresh_token = params.get("refresh_token");
  const client_id = params.get("client_id");

  if (!refresh_token) return c.json({ error: "invalid_request", error_description: "missing refresh_token" }, 400);
  if (!client_id) return c.json({ error: "invalid_request", error_description: "missing client_id" }, 400);

  // Verify the refresh token JWT
  let verified;
  try {
    verified = await jwtVerify(refresh_token, JWT_SECRET_BYTES, {
      issuer: ISSUER,
      audience: client_id,
    });
  } catch {
    return c.json({ error: "invalid_grant", error_description: "invalid or expired refresh token" }, 400);
  }

  const payload = verified.payload;
  
  // Check if it's a refresh token
  if (payload.type !== "refresh_token") {
    return c.json({ error: "invalid_grant", error_description: "invalid token type" }, 400);
  }

  const userId = payload.sub;
  const applicationId = client_id;
  const grantedScope = payload.scope as string | undefined;

  if (!userId) {
    return c.json({ error: "invalid_grant", error_description: "invalid token claims" }, 400);
  }

  // Validate the refresh token in database (check not revoked, not expired)
  const storedRefreshToken = await tokens.validateRefreshToken(refresh_token);
  
  if (!storedRefreshToken) {
    return c.json({ error: "invalid_grant", error_description: "invalid or expired refresh token" }, 400);
  }

  // Revoke the old refresh token (one-time use)
  await tokens.revokeRefreshTokenByValue(refresh_token);

  // Generate new access token
  const accessToken = await generateAccessToken(userId, applicationId, grantedScope);
  
  // Generate new refresh token
  const refreshToken = await generateRefreshToken(userId, applicationId, grantedScope);

  const response: Record<string, unknown> = {
    access_token: accessToken.token,
    token_type: "Bearer",
    expires_in: 3600,
  };

  if (grantedScope) {
    response.scope = grantedScope;
  }

  // Include new refresh token
  response.refresh_token = refreshToken.token;

  return c.json(response);
}

// Helper function to generate an access token
async function generateAccessToken(
  userId: string, 
  applicationId: string, 
  scope?: string
): Promise<{ token: string; expiresAt: Date }> {
  const tokenIdentifier = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRY_MS);

  // Store token status in database
  await tokens.createAccessToken({
    token: tokenIdentifier,
    expiresAt: expiresAt,
    revokedAt: null,
  });

  // Create JWT for the client
  const jwtPayload: JWTPayload = {};
  if (scope) jwtPayload.scope = scope;

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(applicationId)
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET_BYTES);

  return { token: jwt, expiresAt };
}

// Helper function to generate a refresh token
async function generateRefreshToken(
  userId: string, 
  applicationId: string, 
  scope?: string
): Promise<{ token: string; expiresAt: Date }> {
  const tokenIdentifier = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);

  // Store token status in database
  await tokens.createRefreshToken({
    token: tokenIdentifier,
    expiresAt: expiresAt,
    revokedAt: null,
  });

  // Create JWT for the client
  const jwtPayload: JWTPayload = { type: "refresh_token" };
  if (scope) jwtPayload.scope = scope;

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(applicationId)
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET_BYTES);

  return { token: jwt, expiresAt };
}
