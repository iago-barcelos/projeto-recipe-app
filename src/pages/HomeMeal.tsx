import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function HomeMeal() {
  const local = JSON.parse(localStorage.getItem('user') as string);
  console.log(local);
  return (
    <div>
      <Header pageTitle="Meals" showSearchIcon />
      <SearchBar />
    </div>
  );
}

export default HomeMeal;
