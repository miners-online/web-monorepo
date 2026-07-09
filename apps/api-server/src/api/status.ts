import { Hono } from "hono";
import { AppEnv } from "../types.js";

export const statusRoute = new Hono<AppEnv>();

statusRoute.get("/", async (c) => {
    const res = await fetch("https://api.mcsrvstat.us/3/play.minersonline.uk");
    const data = await res.json();

    const response = data.online ? {
        online: true,
        players: {
            current: data.players.online,
            max: data.players.max
        }
    } : {
        online: false
    };

    c.header("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");

    return c.json({
        servers: {
            "play.minersonline.uk": response
        }
    });
});

export default statusRoute;
