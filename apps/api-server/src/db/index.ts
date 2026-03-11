import { drizzle } from 'drizzle-orm/neon-http';

export const getDb = () => drizzle(process.env.DATABASE_URL!);
