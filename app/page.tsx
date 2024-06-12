'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {

  const router = useRouter();
  const handleButtonClick = (route: string) => {
    router.push(route);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create Survey</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Surveys</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">History</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleButtonClick('routes/register')}>Register</button>
        
      </div>
    </div>
  );
};

export default Home;
