import { useState } from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const handleNextCount = (itensToShow: number) => {
    setCounter((count) => (count < itensToShow * 2 ? count + itensToShow
      : count - itensToShow * 2));
  };

  const handlePreviousCount = (itensToShow: number) => {
    setCounter((count) => (count > 0 ? count - itensToShow : count + itensToShow * 2));
  };

  return {
    counter,
    handleNextCount,
    handlePreviousCount,
  };
};

export default useCounter;
