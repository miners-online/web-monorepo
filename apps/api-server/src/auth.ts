import { Hono } from "hono"
import { randomBytes } from "crypto"
import * as users from "./db/repositories/users"
import * as applications from "./db/repositories/applications"
import * as oauth from "./db/repositories/oauth"
import { AppEnv } from "./types";

const auth = new Hono<AppEnv>();

function generateRandomString(len = 32) {
  return randomBytes(len).toString("hex");
}

async function isRedirectAllowed(applicationId: string, redirectUri?: string | null) {
  if (!redirectUri) return false;
  const uris = await applications.getRedirectUris(applicationId);
  return uris.some((r: any) => r.redirectUri === redirectUri);
}

// Authorization endpoint (authorization code flow)
auth.get("/authorize", async (c) => {
  const url = new URL(c.req.url);
  const params = url.searchParams;

  const response_type = params.get("response_type");
  const client_id = params.get("client_id");
  const redirect_uri = params.get("redirect_uri");
  const state = params.get("state");

  const user_id = c.get("user_id");

  if (response_type !== "code") {
    return c.json({ error: "unsupported_response_type" }, 400);
  }

  if (!client_id) {
    return c.json({ error: "invalid_request", error_description: "missing client_id" }, 400);
  }

  const app = await applications.getApplicationById(client_id);
  if (!app) {
    return c.json({ error: "invalid_client" }, 400);
  }

  if (!(await isRedirectAllowed(client_id, redirect_uri))) {
    return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, 400);
  }

  if (!user_id) {
    const returnTo = encodeURIComponent(c.req.url);
    return c.redirect(`/auth/login?return_to=${returnTo}`);
  }

  const user = await users.getUserById(user_id);
  if (!user) {
    return c.json({ error: "access_denied", error_description: "user not found" }, 400);
  }

  const code = generateRandomString(32);
  await oauth.createAuthorizationCode({ code, userId: user.id, applicationId: client_id });

  const dest = new URL(redirect_uri!);
  dest.searchParams.set("code", code);
  if (state) dest.searchParams.set("state", state);

  return c.redirect(dest.toString());
});

// Token endpoint (exchange code for access token)
auth.post("/token", async (c) => {
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

  const authCode = await oauth.getAuthorizationCode(code);
  if (!authCode) return c.json({ error: "invalid_grant", error_description: "code not found" }, 400);

  if (authCode.applicationId !== client_id) return c.json({ error: "invalid_client" }, 400);

  if (!(await isRedirectAllowed(client_id, redirect_uri))) {
    return c.json({ error: "invalid_request", error_description: "redirect_uri mismatch" }, 400);
  }

  const token = generateRandomString(32);
  await oauth.createAccessToken({ token, userId: authCode.userId, applicationId: authCode.applicationId });

  return c.json({ access_token: token, token_type: "Bearer", expires_in: 3600 });
});

// Simple login endpoint
auth.get("/login", (c) => {
  const url = new URL(c.req.url);
  const params = url.searchParams;
  const return_to = params.get("return_to") || "/";

  const loginForm = renderLoginForm(return_to);

  return c.html(loginForm);
});

auth.post("/login", async (c) => {
  const body = await c.req.parseBody();
  const email = body.email;
  const password = body.password;

  const url = new URL(c.req.url);
  const params = url.searchParams;
  const return_to = params.get("return_to") || "/";

  if (email instanceof File || password instanceof File) {
    const loginForm = renderLoginForm(undefined, "Invalid input");
    return c.html(loginForm, 400);
  }

  if (!email || !password) {
    const loginForm = renderLoginForm(return_to, "Email and password are required");
    return c.html(loginForm, 400);
  }

  const user = await users.getUserByEmail(email);
  if (!user || user.password.passwordHash !== password) {
    const loginForm = renderLoginForm(return_to, "Invalid email or password");
    return c.html(loginForm, 400);
  }

  c.set("user_id", user.user.id);

  return c.redirect(return_to);
});

export default auth

function renderLoginForm(return_to?: string, errors?: string) {
  return `
    <html>
      <body>
        <h1>Login</h1>
        <form method="POST" action="/auth/login?${return_to ? `return_to=${encodeURIComponent(return_to)}` : ''}">
          <label>Email: <input type="email" name="email"/></label><br/>
          <label>Password: <input type="password" name="password"/></label><br/>
          <button type="submit">Login</button>
          ${errors ? `<p style="color: red;">${errors}</p>` : ''}
        </form>
      </body>
    </html>
  `;
}