import { Hono } from "hono"

import { SignJWT, jwtVerify } from "jose"
import type { JWTPayload } from "jose";
import { AppEnv } from "../types";
import { isRedirectAllowed, ISSUER, JWT_SECRET_BYTES } from ".";

export const token = new Hono<AppEnv>().basePath("/auth");

// Token endpoint (exchange code for access token)
token.post("/token", async (c) => {
  const bodyText = await c.req.text();
  const params = new URLSearchParams(bodyText);

  const grant_type = params.get("grant_type");
  if (grant_type !== "authorization_code") {
    return c.json({ error: "unsupported_grant_type" }, 400);
  }

  const code = params.get("code");
  const redirect_uri = params.get("redirect_uri");
  const client_id = params.get("client_id");

  if (!code) return c.json({ error: "invalid_request", error_description: "missing code" }, 400);
  if (!client_id) return c.json({ error: "invalid_request", error_description: "missing client_id" }, 400);
  if (!redirect_uri) return c.json({ error: "invalid_request", error_description: "missing redirect_uri" }, 400);

  const verified = await jwtVerify(code!, JWT_SECRET_BYTES, {
    issuer: ISSUER,
    audience: client_id!,
  });

  const payload = verified.payload;

  const userId = payload.sub;
  const aud = payload.aud;
  const applicationId = Array.isArray(aud) ? aud[0] as string : (typeof aud === 'string' ? aud : undefined);
  const grantedScope = payload.scope;

  if (!userId || !applicationId) {
    return c.json({ error: "invalid_grant", error_description: "invalid code claims" }, 400);
  }

  if (!(await isRedirectAllowed(client_id, redirect_uri))) {
    return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, 400);
  }

  // Create a signed JWT access token using `jose` (HS256). We do not persist this token;
  // the token is self-contained and can be verified by the server when presented.
  // Include scope in the token only if the authorization code carried one.
  const jwtPayload: JWTPayload = {};
  if (grantedScope) jwtPayload.scope = grantedScope;

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(applicationId)
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET_BYTES);

  if (grantedScope) {
    return c.json({ access_token: jwt, token_type: "Bearer", expires_in: 3600, scope: grantedScope });
  }

  return c.json({ access_token: jwt, token_type: "Bearer", expires_in: 3600 });
});
