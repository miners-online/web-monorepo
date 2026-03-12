import { drizzle } from 'drizzle-orm/neon-http';

export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return drizzle(process.env.DATABASE_URL);
};
