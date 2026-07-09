import { Hono } from "hono"
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { createMiddleware } from "hono/factory";
import { clerkMiddleware } from '@clerk/hono'


import { AppEnv } from "./types.js";
import { statusRoute } from "./api/status.js";
import profileRoute from "./api/profile.js";

// const db = drizzle(config.DATABASE_URL);

const router = new Hono<AppEnv>();

const globalVarsMiddleware = createMiddleware<AppEnv>((c, next) => {
  // c.set("config", config);
  return next();
});

router.use("*", logger());
router.use("*", globalVarsMiddleware);
router.use("*", clerkMiddleware());

router.use('*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.req.header('Origin') || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
  return corsMiddlewareHandler(c, next)
})

router.get("/hello", (c) => {
  return c.json({ message: "Hello, world!" });
});

router.route("/status", statusRoute);
router.route("/profile", profileRoute);

export default router;
