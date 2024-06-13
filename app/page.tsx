'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  // const [role,setRole] = useState('')
  const router = useRouter();
  // const { data: session } = useSession();
  // useEffect(() => {
  //   if (session) {
  //     console.log("session in home",se)
  //   }
  // }, [session])

  const handleButtonClick = (route: string) => {
    router.push(route);
  };
  const handleSurveysClick = (route: string) => {
    router.push(route);
  };
  const handleCreateSurvey = (route: string) => {
    router.push(route);
  };
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleCreateSurvey('routes/create_survey')}>Create Survey</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSurveysClick('routes/show_surveys')}>Surveys</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">History</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('routes/register')}>Register</button> 
      </div>
    </div>
  );
};

export default Home;
