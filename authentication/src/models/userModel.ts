import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";

export interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  reset_token: string | null;
  reset_token_expiry: Date | null;
  created_at: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export async function createUser(user: CreateUserInput): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [user.name, user.email, user.password]
  );

  return result.insertId;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await db.execute<User[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] ?? null;
}

export async function findUserById(id: number): Promise<User | null> {
  const [rows] = await db.execute<User[]>(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  return rows[0] ?? null;
}

export async function saveResetToken(
  userId: number,
  token: string,
  expiresAt: Date
): Promise<void> {
  await db.execute(
    "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?",
    [token, expiresAt, userId]
  );
}

export async function findUserByResetToken(token: string): Promise<User | null> {
  const [rows] = await db.execute<User[]>(
    "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW() LIMIT 1",
    [token]
  );

  return rows[0] ?? null;
}

export async function updatePasswordAndClearResetToken(
  userId: number,
  hashedPassword: string
): Promise<void> {
  await db.execute(
    `UPDATE users
     SET password = ?, reset_token = NULL, reset_token_expiry = NULL
     WHERE id = ?`,
    [hashedPassword, userId]
  );
}
