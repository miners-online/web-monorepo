import { Hono } from "hono"
import { logger } from 'hono/logger'

import { AppEnv, AppConfig } from "./types";
import { statusRoute } from "./api/status";
import { createMiddleware } from "hono/factory";
import userRoleRoute from "./api/role";

function createApp(config: AppConfig) {
    // const db = drizzle(config.DATABASE_URL);

    const app = new Hono<AppEnv>();

    const globalVarsMiddleware = createMiddleware<AppEnv>((c, next) => {
        c.set("config", config);
        return next();
    });

    app.use("*", logger());
    app.use("*", globalVarsMiddleware);

    // Oauth routes set their own base path, so we route them at "/"
    // app.route("/", auth);

    app.get("/api/hello", (c) => {
        return c.json({ message: "Hello, world!" });
    });

    app.route("/api/status", statusRoute);
    app.route("/api/me/role", userRoleRoute);

    return app;
}

export { createApp };
