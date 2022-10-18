import { Helmet } from 'react-helmet-async';

import Footer from '../components/Footer';

const SignIn = () => {
  const handleSubmit = () => {
    console.log('submit');
  };

  const handleLogin = () => {
    console.log('login');
  };

  return (
    <>
      <div className="signin__container">
        <Helmet>
          <title>Logowanie</title>
        </Helmet>
        <h1>Logowanie</h1>
        <form className="signin__form" onSubmit={handleSubmit}>
          <div className="signin__form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Wpisz swój adres email"
            />
          </div>
          <div className="signin__form__group">
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Wpisz hasło"
            />
          </div>
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
