import { uuid, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  role: varchar({ length: 50 }).notNull().default("user"),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export const applicationsTable = pgTable("applications", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type Application = typeof applicationsTable.$inferSelect;
export type NewApplication = typeof applicationsTable.$inferInsert;

export const applicationSecretsTable = pgTable("application_secrets", {
  id: uuid().primaryKey().defaultRandom(),
  applicationId: uuid().notNull().references(() => applicationsTable.id),
  secret: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type ApplicationSecret = typeof applicationSecretsTable.$inferSelect;
export type NewApplicationSecret = typeof applicationSecretsTable.$inferInsert;

export const applicationRedirectUrisTable = pgTable("application_redirect_uris", {
  id: uuid().primaryKey().defaultRandom(),
  applicationId: uuid().notNull().references(() => applicationsTable.id),
  redirectUri: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type ApplicationRedirectUri = typeof applicationRedirectUrisTable.$inferSelect;
export type NewApplicationRedirectUri = typeof applicationRedirectUrisTable.$inferInsert;
