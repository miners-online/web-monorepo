import { getDb } from "../index";
import { eq } from "drizzle-orm";
import {
  usersTable,
  userPasswordsTable,
  NewUser,
  NewUserPassword,
} from "../schema";

export async function createUser(user: NewUser) {
  const db = getDb();
  const [created] = await db.insert(usersTable).values(user).returning();
  return created;
}

export async function getUserById(id: string) {
  const db = getDb();
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));

  return user ?? null;
}

export async function getUserByEmail(email: string) {
  const db = getDb();
  const [row] = await db
    .select({
      user: usersTable,
      password: userPasswordsTable,
    })
    .from(userPasswordsTable)
    .innerJoin(usersTable, eq(userPasswordsTable.userId, usersTable.id))
    .where(eq(userPasswordsTable.email, email));

  return row ?? null;
}

export async function createUserPassword(password: NewUserPassword) {
  const db = getDb();
  const [created] = await db
    .insert(userPasswordsTable)
    .values(password)
    .returning();

  return created;
}
