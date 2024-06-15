'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Survey {
  survey_id: number;
  survey_name: string;
  opened: boolean;
}

const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const { data: session } : any = useSession();

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    if (session?.user?.user.category == 'student'){
      const response = await fetch(`/api/survey?user=${session?.user?.user.email}`);
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
      }
    }
    else{
      const response = await fetch('/api/survey');
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
      }
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
      {session?.user?.user.category != 'student' && surveys.map(survey => (
        <div key={survey.survey_id} className="flex justify-between items-center border-b-2 py-2">
          <p>
            {survey.survey_name}
            </p>
          <button
            onClick={() => toggleOpened(survey.survey_id, survey.opened)}
            className={`rounded-lg p-2 ${survey.opened ? 'bg-green-500' : 'bg-gray-400'} text-white`}
          >
            {survey.opened ? 'Opened' : 'Closed'}
          </button>
        </div>
      ))}
      {session?.user?.user.category == 'student' && surveys.map(survey => (
        <div key={survey.survey_id} className="flex justify-between items-center border-b-2 py-2">
          <p className="text-green-500 hover:text-green-700 font-bold underline">
            <Link href={{pathname: 'level1', 
              query: {surveyid:survey.survey_id}
            }}>
            {survey.survey_name}
            </Link>
            </p>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;
