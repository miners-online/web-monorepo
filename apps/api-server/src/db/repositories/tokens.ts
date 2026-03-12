import { db } from "../index";
import { eq, and, isNull } from "drizzle-orm";
import {
  authorizationCodesTable,
  accessTokensTable,
  refreshTokensTable,
  NewAuthorizationCode,
  NewAccessToken,
  NewRefreshToken,
  AuthorizationCode,
  AccessToken,
  RefreshToken,
} from "../schema";

// ==================== Authorization Codes ====================

/**
 * Create a new authorization code entry in the database.
 * The code itself contains the payload (as a signed JWT), we just track status.
 */
export async function createAuthorizationCode(
  codeData: NewAuthorizationCode
): Promise<AuthorizationCode> {
  const [created] = await db
    .insert(authorizationCodesTable)
    .values(codeData)
    .returning();
  return created;
}

/**
 * Get an authorization code by its code value.
 * Only returns the code if it hasn't been used yet.
 */
export async function getAuthorizationCodeByCode(
  code: string
): Promise<AuthorizationCode | null> {
  const [result] = await db
    .select()
    .from(authorizationCodesTable)
    .where(
      and(
        eq(authorizationCodesTable.code, code),
        isNull(authorizationCodesTable.usedAt)
      )
    );

  return result ?? null;
}

/**
 * Mark an authorization code as used.
 * This ensures the code can only be used once.
 */
export async function markAuthorizationCodeAsUsed(
  codeId: string
): Promise<AuthorizationCode | null> {
  const [updated] = await db
    .update(authorizationCodesTable)
    .set({ usedAt: new Date() })
    .where(eq(authorizationCodesTable.id, codeId))
    .returning();

  return updated ?? null;
}

/**
 * Check if an authorization code exists and is valid (not used, not expired).
 * Returns the code record if valid, null otherwise.
 */
export async function validateAuthorizationCode(
  code: string
): Promise<AuthorizationCode | null> {
  const authCode = await getAuthorizationCodeByCode(code);

  if (!authCode) return null;

  // Check if code has expired
  if (authCode.expiresAt && new Date(authCode.expiresAt) < new Date()) {
    return null;
  }

  return authCode;
}

// ==================== Access Tokens ====================

/**
 * Create a new access token entry in the database.
 * The actual token data is in the JWT; we just track status.
 */
export async function createAccessToken(
  tokenData: NewAccessToken
): Promise<AccessToken> {
  const [created] = await db
    .insert(accessTokensTable)
    .values(tokenData)
    .returning();
  return created;
}

/**
 * Get an access token by its token value.
 * Only returns the token if it hasn't been revoked and hasn't expired.
 */
export async function getAccessTokenByToken(
  token: string
): Promise<AccessToken | null> {
  const [result] = await db
    .select()
    .from(accessTokensTable)
    .where(
      and(
        eq(accessTokensTable.token, token),
        isNull(accessTokensTable.revokedAt)
      )
    );

  if (!result) return null;

  // Check if token has expired
  if (result.expiresAt && new Date(result.expiresAt) < new Date()) {
    return null;
  }

  return result;
}

/**
 * Revoke an access token by its token value.
 */
export async function revokeAccessTokenByValue(
  token: string
): Promise<AccessToken | null> {
  const [updated] = await db
    .update(accessTokensTable)
    .set({ revokedAt: new Date() })
    .where(eq(accessTokensTable.token, token))
    .returning();

  return updated ?? null;
}

/**
 * Validate an access token (check exists, not revoked, not expired).
 */
export async function validateAccessToken(
  token: string
): Promise<AccessToken | null> {
  return getAccessTokenByToken(token);
}

// ==================== Refresh Tokens ====================

/**
 * Create a new refresh token entry in the database.
 */
export async function createRefreshToken(
  tokenData: NewRefreshToken
): Promise<RefreshToken> {
  const [created] = await db
    .insert(refreshTokensTable)
    .values(tokenData)
    .returning();
  return created;
}

/**
 * Get a refresh token by its token value.
 * Only returns the token if it hasn't been revoked and hasn't expired.
 */
export async function getRefreshTokenByToken(
  token: string
): Promise<RefreshToken | null> {
  const [result] = await db
    .select()
    .from(refreshTokensTable)
    .where(
      and(
        eq(refreshTokensTable.token, token),
        isNull(refreshTokensTable.revokedAt)
      )
    );

  if (!result) return null;

  // Check if token has expired
  if (result.expiresAt && new Date(result.expiresAt) < new Date()) {
    return null;
  }

  return result;
}

/**
 * Revoke a refresh token by its token value.
 */
export async function revokeRefreshTokenByValue(
  token: string
): Promise<RefreshToken | null> {
  const [updated] = await db
    .update(refreshTokensTable)
    .set({ revokedAt: new Date() })
    .where(eq(refreshTokensTable.token, token))
    .returning();

  return updated ?? null;
}

/**
 * Validate a refresh token (check exists, not revoked, not expired).
 */
export async function validateRefreshToken(
  token: string
): Promise<RefreshToken | null> {
  return getRefreshTokenByToken(token);
}
