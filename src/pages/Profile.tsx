import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);
  return (
    <div>
      <Header pageTitle="Profile" />
      <div>
        <p data-testid="profile-email">email@mail.com</p>

        <button data-testid="profile-done-btn">Done Recipes</button>

        <button data-testid="profile-favorite-btn">Favorite Recipes</button>

        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
