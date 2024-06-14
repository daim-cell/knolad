// pages/history.tsx
'use client'
import React, { useState, useEffect } from "react";

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
      console.log(data);
      await setHistory(Array.isArray(data.history) ? data.history : []);
      console.log(history);
    }
  };

  const handleSurveyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const surveyId = parseInt(event.target.value);
    setSelectedSurvey(surveyId);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <div className="mb-4">
        <label htmlFor="survey-select" className="block mb-2">Filter by Survey:</label>
        <select id="survey-select" className="p-2 border rounded" onChange={handleSurveyChange}>
          <option value="">All Surveys</option>
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
            <th className="border p-2">Username</th>
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
};

export default HistoryPage;
