import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Store } from '../contexts/Store';
import Footer from '../components/Footer';

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/podsumowanie';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: contextDispatch } = useContext(Store);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      contextDispatch({ type: 'USER_SIGNIN', payload: data });
        console.log('data received: ' + JSON.stringify(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/koszyk')
    } catch (err) {
      console.log('error: ' + err);
    }
  };

  const handleLogin = () => {
    console.log('login');
  };

  return (
    <>
      <Helmet>
        <title>Logowanie</title>
      </Helmet>
      <div className="signin__container">
        <h1>Logowanie</h1>
        <form className="signin__form" onSubmit={handleSubmit}>
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
          <span>wrong email or pwd</span>
          <button type="submit" onClick={() => handleLogin}>
            Zaloguj
          </button>
        </form>
        <div className="signin__form__create-account">
          <span>Nie posiadasz jeszcze konta?</span>
          <button>Stwórz nowe konto</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
