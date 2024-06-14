// pages/api/history.ts
import openDB  from "../../utils/database";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    
        try {
            const { username, survey_id, test_result } = await req.json();;
            const db = await openDB();
            await db.run(
                "INSERT INTO history (username, survey_id, test_result) VALUES (?, ?, ?)",
                [username, survey_id, test_result]
            );
            return NextResponse.json({ message: "Test result recorded successfully." });
        } catch (error) {
            return NextResponse.json({ error: "Failed to record test result." });
        }
}


export async function GET(req: Request) {
    const url = new URL(req.url)

    const survey_id = url.searchParams.get("survey_id")
  try {
    let history;
    const db = await openDB();

    if (survey_id) {
      history = await db.all('SELECT history.id, history.username, survey.survey_name AS survey_name, history.test_result, history.test_taken FROM history INNER JOIN survey ON history.survey_id = survey.survey_id WHERE history.survey_id = ?', [survey_id]);
  } else {
      history = await db.all('SELECT history.id, history.username, survey.survey_name AS survey_name, history.test_result, history.test_taken FROM history INNER JOIN survey ON history.survey_id = survey.survey_id');
  }
     
    return NextResponse.json({history:history});
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}