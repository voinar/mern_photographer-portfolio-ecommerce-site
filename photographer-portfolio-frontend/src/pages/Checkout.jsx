import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { Store } from '../contexts/Store';

const Checkout = () => {

  const { state } = useContext(Store);


    return (
        <>
        {console.log(state)}
      <Helmet>
        <title>Logowanie</title>
      </Helmet>
      <main className="checkout__container">
        <h1>Witaj, {state.userInfo.name}!</h1>
        <h2> Zobacz podsumowanie:</h2>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
