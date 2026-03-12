import 'dotenv/config';
import { Hono } from "hono"
import { logger } from 'hono/logger'
import { serve } from "@hono/node-server"

import { auth } from "./auth"
import { AppEnv } from "./types";

const isProd = process.env["NODE_ENV"] === "production"

const app = new Hono<AppEnv>();

app.use("*", logger());

// Oauth routes set their own base path, so we route them at "/"
app.route("/", auth);

app.get("/api/hello", (c) => {
    return c.json({ message: "Hello, world!" });
});

export default app

if (!isProd) {
    serve({ ...app, port: 4000 }, info => {
        console.log(`Listening on http://localhost:${info.port}`);
    });
}