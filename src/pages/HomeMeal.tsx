import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function HomeMeal() {
  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar page="meals" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default HomeMeal;
