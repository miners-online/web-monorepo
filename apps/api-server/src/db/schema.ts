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

// Authorization codes table - stores codes for one-time use
// We store minimal data: the code identifier and status tracking
export const authorizationCodesTable = pgTable("authorization_codes", {
  id: uuid().primaryKey().defaultRandom(),
  code: varchar({ length: 64 }).notNull().unique(), // The code value (random UUID, not JWT)
  expiresAt: timestamp().notNull(),
  usedAt: timestamp(), // Timestamp when code was used (null if not used yet)
  createdAt: timestamp().notNull().defaultNow(),
});

export type AuthorizationCode = typeof authorizationCodesTable.$inferSelect;
export type NewAuthorizationCode = typeof authorizationCodesTable.$inferInsert;

// Access tokens table - stores minimal data for validation and revocation
// The actual token data (user, scope, etc.) is in the JWT itself
export const accessTokensTable = pgTable("access_tokens", {
  id: uuid().primaryKey().defaultRandom(),
  token: varchar({ length: 64 }).notNull().unique(), // Token identifier for quick lookup
  expiresAt: timestamp().notNull(),
  revokedAt: timestamp(), // Timestamp when token was revoked (null if not revoked)
  createdAt: timestamp().notNull().defaultNow(),
});

export type AccessToken = typeof accessTokensTable.$inferSelect;
export type NewAccessToken = typeof accessTokensTable.$inferInsert;

// Refresh tokens table - stores minimal data for token renewal
export const refreshTokensTable = pgTable("refresh_tokens", {
  id: uuid().primaryKey().defaultRandom(),
  token: varchar({ length: 64 }).notNull().unique(), // Token identifier for quick lookup
  expiresAt: timestamp().notNull(),
  revokedAt: timestamp(), // Timestamp when token was revoked (null if not revoked)
  createdAt: timestamp().notNull().defaultNow(),
});

export type RefreshToken = typeof refreshTokensTable.$inferSelect;
export type NewRefreshToken = typeof refreshTokensTable.$inferInsert;
