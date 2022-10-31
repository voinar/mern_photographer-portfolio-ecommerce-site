import { Helmet } from 'react-helmet-async';
import { useContext, useState } from 'react';
import { Store } from '../contexts/Store';
import { Link } from 'react-router-dom';

import OrderForm from '../components/OrderForm';

const Checkout = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [showOrderForm, setShowOrderForm] = useState(true);

  const toggleOrderForm = () => {
    setShowOrderForm(prevState => !prevState);
  };

  return (
    <>
      {console.log(state)}
      <Helmet>
        <title>Podsumowanie</title>
      </Helmet>
      <main className="checkout__container">
        <h1>Witaj, {state.userInfo.name}!</h1>
        <h2>Twoje zdjęcia:</h2>

        <div className="checkout__items">
          {state.cart.cartItems.map((image) => {
            return (
              <li className="checkout__items__image">
                <img src={image} alt="" />
              </li>
            );
          })}
        </div>
        <div className="checkout__summary">
          <div>
            <h2>Cena brutto:</h2>
            <span>int</span>
          </div>
          <br />
          <button onClick={toggleOrderForm} className="btn--primary">
            Kupuję
          </button>
          <button className="btn--secondary">Wracam do sklepu</button>
        </div>
        {showOrderForm ? (<OrderForm />) : (null)}
      </main>

    </>
  );
};

export default Checkout;
