
import  openDB  from '../../../utils/database';
import {  NextResponse } from 'next/server';
export async function POST(req: NextResponse) {
    const body = await req.json()
    const { username, password } = body;
    const db = await openDB();
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (user) {
      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json({ message: 'Invalid username or password' });
    }
  
}
