// pages/api/questions.ts
import { NextResponse } from 'next/server';
import openDB from '../../../utils/database';

export async function GET(req: Request) {
    const url = new URL(req.url)

    const survey_id = url.searchParams.get("survey_id")
    const level_no = url.searchParams.get("level_no")
  try {
      const db = await openDB();
      const questions = await db.all(`SELECT q.question_id, q.question, 
          o.option1, o.option2, o.option3, o.option4
          FROM question q
          JOIN options o ON q.question_id = o.question_id
          WHERE q.survey_id = ? AND q.level = ?;
  `, [survey_id, level_no]);
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
