import { Hono } from "hono"
import { serve } from '@hono/node-server'

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' })

import { createRouter } from "./router.js";

const config = {
    getUser: async () => {
        return {
            isAuthenticated: false,
            userId: null,
        };
    }
};

const router = createRouter(config);

const app = new Hono();
app.route("/", router);

export default app;

if (process.env.USE_NODE_SERVER === 'true') {
    console.log('Starting server...');
    const server = serve(app);
    const address = server.address();

    if (typeof address === 'string') {
        console.log('Server running on', address);
    } else if (address?.address && address?.port) {
        console.log('Server running on', address.address + ':' + address.port);
    }
}
