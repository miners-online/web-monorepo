import { db } from "../index";
import { eq } from "drizzle-orm";
import {
  applicationsTable,
  applicationSecretsTable,
  applicationRedirectUrisTable,
  NewApplication,
  NewApplicationSecret,
  NewApplicationRedirectUri,
} from "../schema";

export async function createApplication(app: NewApplication) {
  const [created] = await db.insert(applicationsTable).values(app).returning();
  return created;
}

export async function getApplicationById(id: string) {
  const [app] = await db
    .select()
    .from(applicationsTable)
    .where(eq(applicationsTable.id, id));

  return app ?? null;
}

export async function createApplicationSecret(secret: NewApplicationSecret) {
  const [created] = await db
    .insert(applicationSecretsTable)
    .values(secret)
    .returning();

  return created;
}

export async function addRedirectUri(uri: NewApplicationRedirectUri) {
  const [created] = await db
    .insert(applicationRedirectUrisTable)
    .values(uri)
    .returning();

  return created;
}

export async function getRedirectUris(applicationId: string) {
  return db
    .select()
    .from(applicationRedirectUrisTable)
    .where(eq(applicationRedirectUrisTable.applicationId, applicationId));
}
