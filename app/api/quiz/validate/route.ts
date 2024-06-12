// pages/api/validate-answer.ts
import { NextResponse } from 'next/server';
import openDB from '../../../utils/database';

export async function POST(req: Request) {
  const { id, answer } = await req.json();

  try {
    const db = await openDB();
    const question = await db.get('SELECT * FROM question WHERE question_id = ?', [id]);

    if (!question) {
      return NextResponse.json({ message: 'Question not found' });
    }
    
    const isCorrect = question.correct == answer;
    return NextResponse.json({ correctAns: isCorrect });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
