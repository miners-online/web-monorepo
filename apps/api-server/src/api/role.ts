import { Hono } from "hono";
import { AppEnv } from "../types.js";

export const userRoleRoute = new Hono<AppEnv>();

userRoleRoute.get("/", async (c) => {
    const { userId, isAuthenticated } = await c.get("config").getUser();
    if (!isAuthenticated || !userId) {
        return c.res = new Response("Unauthorized", { status: 401 });
    }

    return c.json({
        role: "user"
    });
});

export default userRoleRoute;
