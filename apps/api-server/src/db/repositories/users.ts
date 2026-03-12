import { db } from "../index";
import { eq } from "drizzle-orm";
import {
  usersTable,
  NewUser,
} from "../schema";

export async function createUser(user: NewUser) {
  const [created] = await db.insert(usersTable).values(user).returning();
  return created;
}

export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user ?? null;
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return user ?? null;
}
