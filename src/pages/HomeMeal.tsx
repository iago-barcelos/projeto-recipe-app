import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function HomeMeal() {
  const local = JSON.parse(localStorage.getItem('user') as string);
  console.log(local);
  return (
    <div>
      <Header pageTitle="Meals" />
      <SearchBar />
      <Footer />
    </div>
  );
}

export default HomeMeal;
