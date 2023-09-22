import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function HomeMeal() {
  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar page="Meals" />
      <Footer />
    </div>
  );
}

export default HomeMeal;
