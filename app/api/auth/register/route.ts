
import {  NextResponse } from 'next/server';
import openDB from '../../../utils/database';
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password, category } = await request.json();

    const db = await openDB();
    console.log({ email, password, category});

    const hashedPassword = await hash(password, 10);

    await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, category TEXT)');

    const response = await db.run(
      `INSERT INTO users (username, password, category) VALUES (?, ?, ?)`,
      [email, hashedPassword, category]
    );
  } catch (e) {
    console.error('Database error:', e);
    return NextResponse.json({ message: 'Internal server error' });
  }

  return NextResponse.json({ message: "success" });
}

