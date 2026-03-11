import { getDb } from "../index";
import { eq } from "drizzle-orm";
import {
  authorizationCodesTable,
  accessTokensTable,
  NewAuthorizationCode,
  NewAccessToken,
} from "../schema";

export async function createAuthorizationCode(code: NewAuthorizationCode) {
  const db = getDb();
  const [created] = await db
    .insert(authorizationCodesTable)
    .values(code)
    .returning();

  return created;
}

export async function getAuthorizationCode(code: string) {
  const db = getDb();
  const [result] = await db
    .select()
    .from(authorizationCodesTable)
    .where(eq(authorizationCodesTable.code, code));

  return result ?? null;
}

export async function createAccessToken(token: NewAccessToken) {
  const db = getDb();
  const [created] = await db
    .insert(accessTokensTable)
    .values(token)
    .returning();

  return created;
}

export async function getAccessToken(token: string) {
  const db = getDb();
  const [result] = await db
    .select()
    .from(accessTokensTable)
    .where(eq(accessTokensTable.token, token));

  return result ?? null;
}
