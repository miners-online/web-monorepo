import type { APIRoute } from 'astro';
import { createApp } from 'api-server';

export const ALL: APIRoute = (context) => {
    const auth = context.locals.auth();

    const app = createApp({
        getUser: async () => {
            const userId = auth.userId;
            const isAuthenticated = auth.isAuthenticated;
            return { userId, isAuthenticated }
        }
    });
    return app.fetch(context.request);
};

export const prerender = false;
