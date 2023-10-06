import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as S from '../styles/profile';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [editImage, setEditImage] = useState(false);
  const [btnText, setBtnText] = useState('Image Url');
  const [inputValue, setInputValue] = useState('');
  const [imageURL, setImageURL] = useState('../src/images/profileIcon.svg');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem('user') as string).email;
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    if (editImage) {
      setBtnText('Upload!');
    } else {
      setImageURL(inputValue);
      setBtnText('Image Url');
    }
  }, [editImage]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

  const handleEditImage = () => {
    setEditImage((edit) => !edit);
    if (!editImage && inputValue !== '') {
      setInputValue('');
    }
  };
  console.log(inputValue);
  return (
    <S.ProfileMain>
      <Header pageTitle="Profile" />
      <div>
        <S.ProfileInfo>
          <div id="imgContainer">
            <img
              src={ imageURL === '' ? '../src/images/profileIcon.svg' : imageURL }
              alt="Profile"
            />
          </div>
          <div>
            {editImage && (
              <input
                placeholder="Image URL"
                type="text"
                value={ inputValue }
                onChange={ handleChange }
              />
            )}
            <S.Button
              id="editImg"
              onClick={ handleEditImage }
              style={
                editImage
                  ? { backgroundColor: 'blue' }
                  : { backgroundColor: 'green' }
              }
            >
              {btnText}
            </S.Button>
          </div>
          <p data-testid="profile-email">{`E-mail: ${userEmail}`}</p>
        </S.ProfileInfo>
        <S.BtnContainer>
          <S.Button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
            style={ { width: '110px' } }
          >
            Done Recipes
          </S.Button>
          <S.Button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
          >
            Favorites
          </S.Button>
          <S.Button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
            style={ { backgroundColor: 'red' } }
          >
            Logout
          </S.Button>
        </S.BtnContainer>
      </div>
      <Footer />
    </S.ProfileMain>
  );
}

export default Profile;
