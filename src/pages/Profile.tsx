import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header pageTitle="Profile" />
      <div>
        <h1>Profile</h1>

        <p data-testid="profile-email">example@email.com</p>

        <button data-testid="profile-done-btn">Done Recipes</button>

        <button data-testid="profile-favorite-btn">Favorite Recipes</button>

        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
