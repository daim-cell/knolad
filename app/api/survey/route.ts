import {  NextResponse } from 'next/server';
import  openDB  from '../../utils/database';
interface Option {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface Question {
  question: string;
  correct: string;
  level: number;
  options: Option;
}

interface Survey {
  survey_name: string;
  opened: string;
  questions: Question[];
}

export async function POST(req: Request) {
    try{
      const body = await req.json()
      const { survey_name, opened, questions }: Survey = body;
  
      // Validate the number of questions and levels
      if (
          questions.length !== 15 ||
          questions.filter(q => q.level === 1).length !== 5 ||
          questions.filter(q => q.level === 2).length !== 5 ||
          questions.filter(q => q.level === 3).length !== 5 ||
          questions.some(q => Object.keys(q.options).length !== 4)
      ) {
          return NextResponse.json({ error: 'Invalid survey structure' });
      }
      console.log(survey_name, opened)
      const db = await openDB();

      const surveyResult = await db.run( 'INSERT INTO survey (survey_name, opened) VALUES (?, ?)', [survey_name, opened]);
      const surveyId = surveyResult.lastID;

      for (const question of questions) {
        const questionResult = await db.run( 'INSERT INTO question (question, correct, level, survey_id) VALUES (?, ?, ?, ?)', [question.question, question.options[`option${question.correct}` as keyof Option], question.level, surveyId]);
        const questionId = questionResult.lastID;
        const { option1, option2, option3, option4 } = question.options;
        await db.run('INSERT INTO options (option1, option2, option3, option4, question_id) VALUES (?, ?, ?, ?, ?)', [option1, option2, option3, option4, questionId]);
      }

      return NextResponse.json({ survey_id: surveyId }, { status: 201 });
    }
    catch (e) {
      return NextResponse.json({ message: 'Internal server error' });
    }
    
  } 
  
  export async function GET(req: Request) {
    const url = new URL(req.url)
  
    const db = await openDB();
    const surveyData:Survey = await db.all('SELECT * FROM survey');
  
    return NextResponse.json(surveyData);
  }
  
  export async function PUT(req: NextResponse) {
    const url = new URL(req.url)
    const surveyId = url.searchParams.get("surveyId")
    const body = await req.json();
    const { opened } = body;
  
    const db = await openDB();
    const result = await db.run('UPDATE survey SET opened = ? WHERE survey_id = ?', [opened, surveyId]);
  
    if (result.changes === 0) {
      return NextResponse.json({ error: 'Failed to update survey' });
    }
  
    return NextResponse.json({ success: true });
  }