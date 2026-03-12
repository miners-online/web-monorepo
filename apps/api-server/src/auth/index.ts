import { Hono } from "hono/quick";
import * as applications from "../db/repositories/applications"
import { AppEnv } from "../types";
import { token } from "./token";
import { login } from "./login";
import { authorization } from "./authorize";

// Shared JWT secret bytes (HS256). Override with `JWT_SECRET` in production.
export const JWT_SECRET_BYTES = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-this");
export const ISSUER = process.env.ISSUER || "https://api.example.com";

export async function isRedirectAllowed(applicationId: string, redirectUri?: string | null) {
  if (!redirectUri) return false;
  const uris = await applications.getRedirectUris(applicationId);
  // Support exact matches and stored patterns with `*` anywhere.
  // Convert stored pattern (shell-style `*`) to a safe RegExp and test the redirect.
  return uris.some((r) => {
    const stored: string = r.redirectUri;
    if (stored.includes("*")) {
      // Escape regexp special chars, then replace '*' with '.*'
      const escaped = stored.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
      const pattern = `^${escaped.replace(/\*/g, ".*")}$`;
      try {
        const re = new RegExp(pattern);
        return re.test(redirectUri);
      } catch (err) {
        return false;
      }
    }
    return stored === redirectUri;
  });
}

// Oauth routes set their own base path, so we route them at "/"
export const auth = new Hono<AppEnv>();
auth.route("/", authorization);
auth.route("/", login);
auth.route("/", token);
