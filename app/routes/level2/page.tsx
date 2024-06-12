// pages/levels/level1.tsx
import React from "react";
import Level from "../../components/Level";

interface Level1PageProps {
  level: number; // Define the type of the parameter you want to pass
}

const Level1Page: React.FC<Level1PageProps> = () => {
  const props:Level1PageProps = {
    level: 2,
  };
  return (
    <div>
      <Level {...props}/>
    </div>
  );
};

export default Level1Page;
