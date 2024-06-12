// pages/api/auth/register.ts
import {  NextResponse } from 'next/server';
import openDB from '../../../utils/database';
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE

    const db = await openDB();
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    const response = await db.run(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [email, hashedPassword]
    );
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}

// export async function POST(req: Request) {
//     const body = await req.json()
//     const { username, password, category } = body;
//     try {
//       const db = await openDB();
//       console.log(db)
//       await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, category TEXT)');
//       await db.run('INSERT INTO users (username, password, category) VALUES (?, ?, ?)', [username, password, category]);
//       return NextResponse.json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Database error:', error);
//       return NextResponse.json({ message: 'Internal server error' });
//     }
  
// }
