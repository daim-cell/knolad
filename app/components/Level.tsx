// components/Level1.tsx
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface Question {
  question_id: number;
  question: string;
  options: string[];
  correct: number;
}
interface Props {
    level: number;
  }
const Level: React.FC<Props> = ({level}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`/api/quiz/level?level_no=${level}&survey_id=1`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        
        const ques = data.sort(() => 0.5 - Math.random());
        setQuestions(ques.map((question: any) => ({
          ...question,
          options: [question.option1, question.option2, question.option3, question.option4].sort(() => 0.5 - Math.random()),
        })));
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    }
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return;

    try {
        const response = await fetch("/api/quiz/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: questions[currentQuestionIndex].question_id,
                answer: selectedAnswer,
            }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        let updatedScore = score;
        if (result.correctAns) {
            updatedScore = score + 1;
            await setScore(updatedScore);
        }

        setSelectedAnswer(null);

        if (level == 1) {
            if (currentQuestionIndex >= 2 && updatedScore >= 3) {
                // Continue to the next question
                router.push('/routes/level2');
            } else {
                if (currentQuestionIndex + 1 < questions.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    alert("You have minimal knowledge.");
                }
            }
        } else if (level == 2) {
            if (currentQuestionIndex >= 3 && updatedScore >= 4) {
                // Continue to the next question
                router.push('/routes/level3');
            } else {
                if (currentQuestionIndex + 1 < questions.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    alert("You have average knowledge.");
                }
            }
        } else {
            if (updatedScore == 5) {
                // Continue to the next question
                alert("You win the test!");
            } else {
                if (currentQuestionIndex + 1 < questions.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    alert("You have lost at last level.");
                }
            }
        }
    } catch (error) {
        console.error("Failed to validate answer:", error);
    }
};


  return (
    <div>
      <h1>Level {level}</h1>
      <p>Score: {score}</p>
      <p>Current Question: {currentQuestionIndex + 1}</p>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          {questions[currentQuestionIndex].options.map((option, idx) => (
            <div key={idx}>
              <button onClick={() => handleAnswerSelect(option)}>
                {option}
              </button>
            </div>
          ))}
          <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
            Submit Answer
          </button>
        </div>
      ) : (
        <div>
          <h2>Loading questions...</h2>
        </div>
      )}
    </div>
  );
};

export default Level;
