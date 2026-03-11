import { Hono } from "hono"
import * as jose from 'jose'
import * as users from "./db/repositories/users"
import * as applications from "./db/repositories/applications"
import * as oauth from "./db/repositories/oauth"

const auth = new Hono();

auth.get("/authorize", (c) => {
    return c.json({ message: "Hello, world!" });
});

auth.get("/token", (c) => {
    return c.json({ message: "Hello, world!" });
});

export default auth
