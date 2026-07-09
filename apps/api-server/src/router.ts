import { Hono } from "hono"
import { logger } from 'hono/logger'

import { AppEnv } from "./types.js";
import { statusRoute } from "./api/status.js";
import { createMiddleware } from "hono/factory";
import userRoleRoute from "./api/role.js";

import { clerkMiddleware } from '@hono/clerk-auth'

// const db = drizzle(config.DATABASE_URL);

const router = new Hono<AppEnv>();

const globalVarsMiddleware = createMiddleware<AppEnv>((c, next) => {
    // c.set("config", config);
    return next();
});

router.use("*", logger());
router.use("*", globalVarsMiddleware);
router.use("*", clerkMiddleware());

router.get("/hello", (c) => {
    return c.json({ message: "Hello, world!" });
});

router.route("/status", statusRoute);
router.route("/me/role", userRoleRoute);

export default router;
