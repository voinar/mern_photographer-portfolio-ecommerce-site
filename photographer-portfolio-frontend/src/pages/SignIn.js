import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Store } from '../contexts/Store';
import Footer from '../components/Footer';

// import User from './models/userModel.js';
// import bcrypt from 'bcryptjs';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/podsumowanie';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signinForm, setSigninForm] = useState(true);

  const { state, dispatch: contextDispatch } = useContext(Store);

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      contextDispatch({ type: 'USER_SIGNIN', payload: data });
      console.log('data received: ' + JSON.stringify(data));
      console.log('state: ' + state.toString());

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/koszyk');
    } catch (err) {
      setErrorMessage('Niepoprawny adres email lub hasło');
      // setErrorMessage(err.message);
      console.log('error: ' + err);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const { newUser } = await axios.post('/api/users/createuser', {
        email,
        password,
      });
      console.log('newUser:' + newUser);
    } catch (err) {
      setErrorMessage(
        'Konto z podanym adresem email już istnieje. Przypomnienie hasła.'
      );
      // setErrorMessage(err.message);
      console.log('error while creating new user: ' + err.message);
    }
    console.log('createAccount');
  };

  const toggleForm = () => {
    setSigninForm((prevState) => !prevState);
    console.log('toggle form');
  };

  const goBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <title>Logowanie</title>
      </Helmet>

      {signinForm ? (
        //log into an existing account
        <div className="signin__container signin__container--signin">
          <div className="album__toolbar">
            <div className="album__title">
              <button onClick={goBack}>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <h1>Logowanie</h1>
            </div>
          </div>
          <form className="signin__form" onSubmit={handleSignin}>
            <div className="signin__form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Wpisz swój adres email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signin__form__group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Wpisz hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Zaloguj</button>
            <span>{errorMessage}</span>
          </form>
          <div className="signin__form__create-account">
            <span>Nie posiadasz jeszcze konta?</span>
            <button onClick={toggleForm}>Stwórz nowe konto</button>
          </div>
        </div>
      ) : (
        //create a new account with data specified in the form
        <div className="signin__container signin__container--create-account">
          <div className="album__toolbar">
            <div className="album__title">
              <button onClick={goBack}>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <h1>Nowe konto</h1>
            </div>
          </div>
          <form className="signin__form" onSubmit={handleCreateAccount}>
            <div className="signin__form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Wpisz swój adres email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signin__form__group">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Wpisz hasło"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Zaloguj</button>
            <span>{errorMessage}</span>
          </form>
          <div className="signin__form__create-account">
            <span>Posiadasz już konto?</span>
            <button onClick={toggleForm}>Logowanie</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SignIn;