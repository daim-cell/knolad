import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import  openDB  from '../../../utils/database'
import {  NextResponse } from 'next/server';

const JWT_SECRET = "konald"

export async function POST(req: Request) {
  console.log("here")
    const body = await req.json()
    const { username, password } = body;
    const db = await openDB();
    console.log(db)
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    console.log(user)
    if (user) {
      // res.status(200).json({ message: 'Login successful' });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET , {
        expiresIn: '1m',
      })
      console.log(token)
      return NextResponse.json({ token })
    } else {
      return NextResponse.json({ status: 400 ,message: 'Invalid username or password' });
    }
  
}
