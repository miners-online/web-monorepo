import { Hono } from "hono"
import type { Context } from "hono";
import * as tokens from "../db/repositories/tokens"
import { AppEnv } from "../types";

export const revoke = new Hono<AppEnv>().basePath("/auth");

// Endpoint to revoke an access token (RFC 7009)
revoke.post("/revoke", async (c: Context<AppEnv>) => {
  const bodyText = await c.req.text();
  const params = new URLSearchParams(bodyText);

  const tokenValue = params.get("token");
  const tokenTypeHint = params.get("token_type_hint");

  if (!tokenValue) {
    return c.json({ error: "invalid_request", error_description: "missing token" }, 400);
  }

  // Try to revoke based on token_type_hint
  let revoked = false;

  if (tokenTypeHint === "access_token" || !tokenTypeHint) {
    const result = await tokens.revokeAccessTokenByValue(tokenValue);
    if (result) revoked = true;
  }

  if (tokenTypeHint === "refresh_token" || (!tokenTypeHint && !revoked)) {
    const result = await tokens.revokeRefreshTokenByValue(tokenValue);
    if (result) revoked = true;
  }

  // Per OAuth 2.0 spec, we always return 200 for successful revocation
  return c.json({});
});
