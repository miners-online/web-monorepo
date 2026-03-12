import { Hono } from "hono"
import {
  setCookie,
} from 'hono/cookie'

import * as users from "../db/repositories/users"
import { AppEnv } from "../types";

export const login = new Hono<AppEnv>().basePath("/auth");

// Simple login endpoint
login.get("/login", (c) => {
  const url = new URL(c.req.url);
  const params = url.searchParams;
  const return_to = params.get("return_to") || "/";

  const loginForm = renderLoginForm(return_to);

  return c.html(loginForm);
});

login.post("/login", async (c) => {
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
  if (!user || user.passwordHash !== password) {
    const loginForm = renderLoginForm(return_to, "Invalid email or password");
    return c.html(loginForm, 400);
  }

  setCookie(c, "user_id", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return c.redirect(return_to);
});

export default login

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
