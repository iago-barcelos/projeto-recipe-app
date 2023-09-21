import React from 'react';
import Header from '../components/Header';

function HomeMeal() {
  const local = JSON.parse(localStorage.getItem('user') as string);
  console.log(local);
  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
    </div>
  );
}

export default HomeMeal;
