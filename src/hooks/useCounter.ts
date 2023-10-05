import { useState } from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);
  const [mainCounter, setMainCounter] = useState(4);

  const handleNextCount = () => {
    setCounter((count) => (count < 4 ? count + 2 : count - 4));
  };

  const handlePreviousCount = () => {
    setCounter((count) => (count > 0 ? count - 2 : count + 4));
  };

  const handleNextRecipes = () => {
    setMainCounter((mainCount) => (mainCount < 12 ? mainCount + 4 : mainCount - 8));
  };

  const handlePreviousRecipes = () => {
    setMainCounter((mainCount) => (mainCount > 4 ? mainCount - 4 : 12));
  };
  return {
    counter,
    mainCounter,
    handleNextCount,
    handlePreviousCount,
    handleNextRecipes,
    handlePreviousRecipes,
  };
};

export default useCounter;
