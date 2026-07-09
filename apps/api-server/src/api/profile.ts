import { Hono } from "hono";
import { AppEnv } from "../types.js";
import { getAuth } from '@clerk/hono'

export const profileRoute = new Hono<AppEnv>();

profileRoute.get("/", async (c) => {
    const { userId, isAuthenticated } = getAuth(c);
    if (!isAuthenticated || !userId) {
        return c.res = new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(c.req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    return c.json({
        userId,
        attributes: {
            role: `${baseUrl}/profile/role`
        }
    });
});

profileRoute.get("/role", async (c) => {
    const { userId, isAuthenticated } = getAuth(c);
    if (!isAuthenticated || !userId) {
        return c.res = new Response("Unauthorized", { status: 401 });
    }

    return c.json({
        role: "user"
    });
});

export default profileRoute;
