import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!);

const isProd = process.env["NODE_ENV"] === "production"

const app = new Hono();

app.get("/api/hello", (c) => {
    return c.json({ message: "Hello, world!" });
});

export default app

if (!isProd) {
    serve({ ...app, port: 4000 }, info => {
        console.log(`Listening on http://localhost:${info.port}`);
    });
}