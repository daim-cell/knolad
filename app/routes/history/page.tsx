// pages/history.tsx
'use client'
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HomeButton from '../../components/Home';

interface HistoryRecord {
  id: number;
  username: string;
  survey_name: number;
  test_result: string;
  test_taken: string;
}

interface Survey {
  survey_id: number;
  survey_name: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);

  useEffect(() => {
    fetchSurveys();
    fetchHistory();
  }, []);

  useEffect(() => {
    if (selectedSurvey !== null) {
      fetchHistory(selectedSurvey);
    } else {
      fetchHistory();
    }
  }, [selectedSurvey]);

  const fetchSurveys = async () => {
    const response = await fetch('/api/survey');
    if (response.ok) {
      const data = await response.json();
      setSurveys(data);
    }
  };

  const fetchHistory = async (surveyId?: number) => {
    let url = '/api/history';
    if (surveyId) {
      url += `?survey_id=${surveyId}`;
    }
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      await setHistory(Array.isArray(data.history) ? data.history : []);
    }
  };

  const handleSurveyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const surveyId = parseInt(event.target.value);
    setSelectedSurvey(surveyId);
  };

  const router = useRouter();
  const { data: session, status } : any = useSession();


  if (status === 'loading') {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-600 dark:text-gray-300 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
            ></path>
          </svg>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Loading, please wait...
          </p>
        </div>
      </section>
    );
  }

  if (session?.user?.user?.category !== "student") {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <div className="flex justify-between items-center mb-4">
        <HomeButton />
      </div>
      <div className="mt-4 mb-6">
        <label htmlFor="survey-select" className="block mb-2">Filter by Survey:</label>
        <select id="survey-select" className="bg-gray-100 text-black border rounded mt-2" onChange={handleSurveyChange}>
          {surveys.map(survey => (
            <option key={survey.survey_id} value={survey.survey_id}>
              {survey.survey_name}
            </option>
          ))}
        </select>
      </div> 
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Survey Name</th>
            <th className="border p-2">Test Result</th>
            <th className="border p-2">Test Taken</th>
          </tr>
        </thead>
        <tbody>
          {history.map(record => (
            <tr key={record.id}>
              <td className="border p-2">{record.username}</td>
              <td className="border p-2">{record.survey_name}</td>
              <td className="border p-2">{record.test_result}</td>
              <td className="border p-2">{record.test_taken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

router.push('/');
return null;
};

export default HistoryPage;
