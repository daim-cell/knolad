// pages/api/auth/register.ts
import {  NextResponse } from 'next/server';
import openDB from '../../../utils/database';

export async function POST(req: Request) {
    const body = await req.json()
    const { username, password, category } = body;
    try {
      const db = await openDB();
      console.log(db)
      await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, category TEXT)');
      await db.run('INSERT INTO users (username, password, category) VALUES (?, ?, ?)', [username, password, category]);
      return NextResponse.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ message: 'Internal server error' });
    }
  
}
