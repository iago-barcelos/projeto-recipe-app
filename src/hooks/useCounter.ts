import { useState } from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const handleNextCount = () => {
    setCounter((count) => (count < 4 ? count + 2 : count - 4));
  };

  const handlePreviousCount = () => {
    setCounter((count) => (count > 0 ? count - 2 : count + 4));
  };

  return {
    counter,
    handleNextCount,
    handlePreviousCount,
  };
};

export default useCounter;
