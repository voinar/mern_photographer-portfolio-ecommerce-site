import { useContext } from 'react';
import { Store } from '../contexts/Store';
import { useNavigate } from 'react-router-dom';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';
// import IconCartRemove from '../img/icons/icon-cart-remove.svg';

import Footer from '../components/Footer';

const Cart = () => {
  const { state } = useContext(Store);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <>
      <div className="cart__container">
        <div className="cart__return">
          <button onClick={goBack}>
            <img src={IconChevron} alt="zobacz" />
          </button>
          <h1>Koszyk</h1>
        </div>
        <div className="cart__sections">
          <ul className="cart__images">
            {/* {JSON.stringify(state.cart.cartItems[0])} */}
            {state.cart.cartItems.map((image) => {
              return (
                <li className="cart__image">
                  <img src={image.item} alt=''></img>
                  {/* <span>{image.item}</span> */}
                  <div className="cart__image__tools">
                    <div>$Album</div>
                    <div>Price
                    {image.price}</div>
                    <div>Remove</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart__summary">
            <div>
            <h2>Podsumowanie:</h2>
            <span>int</span>
            </div>
            <br/>
            <button className="btn--primary">Kupuję</button>
            <button className="btn--secondary">Wracam do sklepu</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
