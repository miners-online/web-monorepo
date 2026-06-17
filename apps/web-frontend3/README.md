# Hono HTML registry server

A small Hono app in TypeScript that:

- runs locally with Node
- deploys on Vercel
- serves HTML files from a route registry
- serves static assets from `/assets/*`
- logs requests and file resolution

## Run locally

```bash
npm install
npm run dev
```

Open:

- http://localhost:3000/
- http://localhost:3000/about
- http://localhost:3000/docs
- http://localhost:3000/routes

## Deploy on Vercel

Push the repo to Vercel. The app is exported from `api/index.ts`, and `vercel.json` rewrites every request to that function so the registry and asset handler work the same way in production.

## Add a page

1. Create an HTML file in `src/content/pages`
2. Register it in `src/registry.ts`

Example:

```ts
registerPage('/contact', 'contact.html')
```
