import { drizzle } from 'drizzle-orm/neon-http';

export * from "./schema";

export const db = drizzle(process.env.DATABASE_URL!);
