'use client'
import { useState } from 'react';

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

export default function SurveyForm() {
    const initialQuestions = Array(15).fill(0).map((_, index) => ({
      question: '',
      correct: 0,
      level: Math.floor(index / 5) + 1,
      options: { option1: '', option2: '', option3: '', option4: '' },
    }));
  
    const [surveyName, setSurveyName] = useState<string>('');
    const [opened, setOpened] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({survey_name: surveyName, opened: opened ? 'open' : 'hidden', questions})
        const response = await fetch('/api/survey/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ survey_name: surveyName, opened: opened ? 'open' : 'hidden', questions }),
        });
    
        if (response.ok) {
            const data = await response.json();
            alert(`Survey created with ID: ${data.survey_id}`);
            setSurveyName('');
            setOpened(false);
            setQuestions(initialQuestions);
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    };
  
    const handleQuestionChange = (index: number, field: keyof Question, value: string | number) => {
      const newQuestions = [...questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      setQuestions(newQuestions);
    };
  
    const handleOptionChange = (index: number, option: keyof Option, value: string) => {
      const newQuestions = [...questions];
      newQuestions[index].options[option] = value;
      setQuestions(newQuestions);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Survey Name:</label>
          <input
            type="text"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Opened:</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={opened}
              onChange={(e) => setOpened(e.target.checked)}
              className="hidden"
              id="toggle-opened"
            />
            <label
              htmlFor="toggle-opened"
              className={`block w-14 h-8 rounded-full cursor-pointer relative transition-colors ${
                opened ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-md absolute top-1 transition-transform transform ${
                  opened ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </label>
          </div>
        </div>
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Question {index + 1} (Level {q.level}):</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100 mb-2"
            />
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Correct Option (1-4):</label>
            <input
              type="number"
              value={q.correct}
              onChange={(e) => handleQuestionChange(index, 'correct', parseInt(e.target.value))}
              min="1"
              max="4"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100 mb-2"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Option 1:</label>
                <input
                  type="text"
                  value={q.options.option1}
                  onChange={(e) => handleOptionChange(index, 'option1', e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Option 2:</label>
                <input
                  type="text"
                  value={q.options.option2}
                  onChange={(e) => handleOptionChange(index, 'option2', e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Option 3:</label>
                <input
                  type="text"
                  value={q.options.option3}
                  onChange={(e) => handleOptionChange(index, 'option3', e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Option 4:</label>
                <input
                  type="text"
                  value={q.options.option4}
                  onChange={(e) => handleOptionChange(index, 'option4', e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-500">
          Create Survey
        </button>
      </form>
    );
  }