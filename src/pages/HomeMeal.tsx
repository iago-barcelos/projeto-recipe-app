import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function HomeMeal() {
  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar page="Meals" />
    </div>
  );
}

export default HomeMeal;
