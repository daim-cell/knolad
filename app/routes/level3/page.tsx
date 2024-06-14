'use client'
// pages/levels/level1.tsx
import React from "react";
import Level from "../../components/Level";
import { useSearchParams } from "next/navigation";

interface Level3PageProps {
  level: number; 
  survey: number// Define the type of the parameter you want to pass
}

const Level1Page: React.FC<Level3PageProps> = () => {
  const searchParams = useSearchParams()
  const survey = searchParams.get('surveyid') as any
  const props:Level3PageProps = {
    level: 3,
    survey: survey
  };
  return (
    <div>
      <Level {...props}/>
    </div>
  );
};

export default Level1Page;
