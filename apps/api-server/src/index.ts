import { Hono } from "hono"
import { logger } from 'hono/logger'

import { AppEnv } from "./types";
import { statusRoute } from "./api/status";

interface AppConfig {
    // DATABASE_URL: string;
}

function createApp(config: AppConfig) {
    // const db = drizzle(config.DATABASE_URL);

    const app = new Hono<AppEnv>();

    app.use("*", logger());

    // Oauth routes set their own base path, so we route them at "/"
    // app.route("/", auth);

    app.get("/api/hello", (c) => {
        return c.json({ message: "Hello, world!" });
    });

    app.route("/api/status", statusRoute);

    return app;
}

export { createApp };
