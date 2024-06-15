'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const [role,setRole] = useState('')
  const router = useRouter();
  const { data: session, status } : any = useSession();
  useEffect(() => {
    if (session) {
      const category = session?.user?.user?.category
      console.log("session in home",category)
      setRole(category)
    }
  }, [session])

  const handleButtonClick = (route: string) => {
    router.push(route);
  };
  const handleSurveysClick = (route: string) => {
    router.push(route);
  };
  const handleCreateSurvey = (route: string) => {
    router.push(route);
  };
  const handleLogout = () =>{
    signOut()
  }

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
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <div className="flex justify-center space-x-4">
        { role != 'student' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleCreateSurvey('routes/create_survey')}>Create Survey</button>}
        { role != 'student'  && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSurveysClick('routes/show_surveys')}>View Surveys</button>}
        { role == 'student'  && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSurveysClick('routes/take_surveys')}>Take Surveys</button>}
        { role != 'student' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSurveysClick('routes/history')}>Student History</button>}
        {role == 'admin' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('routes/register')}>Create User</button>}
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleLogout()}>Logout</button> 
      </div>
    </div>
  );
};

export default Home;
