import { Hono } from "hono"
import {
  getCookie,
} from 'hono/cookie'

import { SignJWT } from "jose"
import type { JWTPayload } from "jose";
import * as users from "../db/repositories/users"
import * as applications from "../db/repositories/applications"
import * as tokens from "../db/repositories/tokens"
import { AppEnv } from "../types";
import { isRedirectAllowed, ISSUER, JWT_SECRET_BYTES } from ".";

export const authorization = new Hono<AppEnv>().basePath("/auth");

// Authorization code validity duration (10 minutes)
const AUTHORIZATION_CODE_EXPIRY_MS = 10 * 60 * 1000;

// Authorization endpoint (authorization code flow)
authorization.get("/authorize", async (c) => {
  const url = new URL(c.req.url);
  const params = url.searchParams;

  const response_type = params.get("response_type");
  const client_id = params.get("client_id");
  const redirect_uri = params.get("redirect_uri");
  const state = params.get("state");
  const scope = params.get("scope");

  const user_id = getCookie(c, "user_id");

  if (response_type !== "code") return c.json({ error: "unsupported_response_type" }, 400);
  if (!client_id) return c.json({ error: "invalid_request", error_description: "missing client_id" }, 400);
  if (!redirect_uri) return c.json({ error: "invalid_request", error_description: "missing redirect_uri" }, 400);

  const app = await applications.getApplicationById(client_id);
  if (!app) return c.json({ error: "invalid_client" }, 400);

  if (!(await isRedirectAllowed(client_id, redirect_uri))) {
    return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, 400);
  }

  const returnTo = encodeURIComponent(c.req.url);

  if (!user_id) {
    return c.redirect(`/auth/login?return_to=${returnTo}`);
  }

  const user = await users.getUserById(user_id);
  if (!user) {
    return c.redirect(`/auth/login?return_to=${returnTo}`);
  }

  // Create a signed JWT as the authorization code containing all necessary claims
  const codeClaims: JWTPayload = { 
    type: "authorization_code",
    redirect_uri, // Include redirect_uri in the code for validation
  };
  if (scope) codeClaims.scope = scope;

  const authCodeJwt = await new SignJWT(codeClaims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(client_id)
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(JWT_SECRET_BYTES);

  // Calculate expiry time for database tracking
  const expiresAt = new Date(Date.now() + AUTHORIZATION_CODE_EXPIRY_MS);

  // Store the code status in the database (we store the JWT as the code)
  await tokens.createAuthorizationCode({
    code: authCodeJwt, // Store the JWT itself for lookup
    expiresAt: expiresAt,
    usedAt: null,
  });

  const dest = new URL(redirect_uri);
  dest.searchParams.set("code", authCodeJwt);
  if (state) dest.searchParams.set("state", state);

  return c.redirect(dest.toString());
});
