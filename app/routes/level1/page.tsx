// pages/levels/level1.tsx
'use client'
import React from "react";
import Level from "../../components/Level";
import { useSearchParams } from 'next/navigation'
interface Level1PageProps {
  level: number;
  survey: number // Define the type of the parameter you want to pass
}

const Level1Page: React.FC<Level1PageProps> = () => {

  const searchParams = useSearchParams()
  const survey = searchParams.get('surveyid') as any
  const props:Level1PageProps = {
    level: 1,
    survey: survey
  };
  return (
    <div>
      <Level {...props}/>
    </div>
  );
};

export default Level1Page;
