'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const [role,setRole] = useState('')
  const router = useRouter();
  const { data: session } : any = useSession();
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
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
      <div className="flex justify-center space-x-4">
        { role != 'student' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleCreateSurvey('routes/create_survey')}>Create Survey</button>}
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSurveysClick('routes/show_surveys')}>View Surveys</button>
        { role != 'student' && <button className="bg-green-500 text-white px-4 py-2 rounded">Student History</button>}
        {role == 'admin' && <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('routes/register')}>Create User</button>}
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleLogout()}>Logout</button> 
      </div>
    </div>
  );
};

export default Home;
