import type { APIRoute } from 'astro';
import { createApp } from 'api-server';

const app = createApp({});

export const ALL: APIRoute = (context) => app.fetch(context.request);

export const prerender = false;
