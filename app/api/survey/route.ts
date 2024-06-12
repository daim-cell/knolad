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
  correct: number;
  level: number;
  options: Option;
}

interface Survey {
  survey_name: string;
  opened: string;
  questions: Question[];
}

interface RunResult {
    lastID: number;
  }

export async function POST(req: NextResponse) {
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
    db.run('INSERT INTO survey (survey_name, opened) VALUES (?, ?)', [survey_name, opened], function(this: RunResult, err:any) {
      if (err) {
        return NextResponse.json({ error: err.message });
      }

      const surveyId = this.lastID;

      questions.forEach(question => {
        console.log(question.question, question.correct, question.level, surveyId)
        db.run('INSERT INTO question (question, correct, level, survey_id) VALUES (?, ?, ?, ?)', [question.question, question.correct, question.level, surveyId], function(this: RunResult,err:any) {
          if (err) {
            return NextResponse.json({ error: err.message });
          }

          const questionId = this.lastID;
          const { option1, option2, option3, option4 } = question.options;
        console.log(option1, option2, option3, option4, questionId)
          db.run('INSERT INTO options (option1, option2, option3, option4, question_id) VALUES (?, ?, ?, ?, ?)', [option1, option2, option3, option4, questionId], function(err:any) {
            if (err) {
              return NextResponse.json({ error: err.message });
            }
          });
        });
      });

      NextResponse.json({ survey_id: surveyId });
    });
  } 
  
  export async function GET(req: NextResponse) {
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