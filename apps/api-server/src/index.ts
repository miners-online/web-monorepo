import { Hono } from "hono"
import { serve } from "@hono/node-server"
import auth from "./auth"

const isProd = process.env["NODE_ENV"] === "production"

const app = new Hono();
app.route("/auth", auth);

app.get("/api/hello", (c) => {
    return c.json({ message: "Hello, world!" });
});

export default app

if (!isProd) {
    serve({ ...app, port: 4000 }, info => {
        console.log(`Listening on http://localhost:${info.port}`);
    });
}