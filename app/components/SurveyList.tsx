'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';


interface Survey {
  survey_id: number;
  survey_name: string;
  opened: boolean;
}

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    const response = await fetch('/api/survey');
    if (response.ok) {
      const data = await response.json();
      setSurveys(data);
    }
  };

  const toggleOpened = async (surveyId: number, opened: boolean) => {
    await fetch(`/api/survey?surveyId=${surveyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ opened: !opened }),
    });

    // Update the opened status locally
    const updatedSurveys = surveys.map(survey =>
      survey.survey_id === surveyId ? { ...survey, opened: !opened } : survey
    );
    setSurveys(updatedSurveys);
  };

  return (
    <div>
      {surveys.map(survey => (
        <div key={survey.survey_id} className="flex justify-between items-center border-b-2 py-2">
          <p>
            <Link href={{pathname: 'level1', 
              query: {surveyid:survey.survey_id}
            }}>
            {survey.survey_name}
            </Link>
            </p>
          <button
            onClick={() => toggleOpened(survey.survey_id, survey.opened)}
            className={`rounded-lg p-2 ${survey.opened ? 'bg-green-500' : 'bg-gray-400'} text-white`}
          >
            {survey.opened ? 'Opened' : 'Closed'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
