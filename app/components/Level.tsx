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
    survey: number
  }
const Level: React.FC<Props> = ({level, survey}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(`/api/quiz/level?level_no=${level}&survey_id=${survey}`);
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
<div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center text-black">
        <h1 className="text-2xl font-bold text-black">Level {level}</h1>
        <p className="text-xl text-black">Score: {score}</p>
        <p className="text-xl mb-4 text-black">Current Question: {currentQuestionIndex + 1}</p>
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div className="question-container">
            <h2 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <div key={idx} className="mb-2">
                <button
                  className={`w-full py-2 px-4 rounded-md border ${selectedAnswer === option ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              </div>
            ))}
            <button
              className={`w-full py-2 px-4 mt-4 rounded-md ${selectedAnswer === null ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg">Loading questions...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level;
