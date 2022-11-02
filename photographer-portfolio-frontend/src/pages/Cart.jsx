import { useContext, useState, useEffect } from 'react';
import { Store } from '../contexts/Store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';

const Cart = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  // const [localState, setLocalState] = useState([]);
  const [itemPrice, setItemPrice] = useState(null);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  const cartRemoveItem = (id) => {
    contextDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { id: id },
    });
    localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  };

  useEffect(() => {
    // const getImagesData = async () => {
    //   try {
    //     const response = await axios.get(`/api/products/`);
    //     setLocalState(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getImagesData();

    const getPrice = async () => {
      try {
        const docRef = doc(db, 'settings', '5cJniz1wK9Sri7EmlSzD');
        const docSnap = await getDoc(docRef);
        setItemPrice(
          Number(
            docSnap._document.data.value.mapValue.fields.imagePrice.integerValue
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    getPrice();
  }, [state]);

  console.log('cart contents: ' + state.cart.cartItems);
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
          {state.cart.cartItems.length === 0 ? (
            <div className="cart__images">
              <h3>Koszyk jest pusty.</h3>
              <span onClick={goBack}>Wracam do sklepu.</span>
            </div>
          ) : (
            <ul className="cart__images">
              <li className="cart__image">
                <img src={''} alt="" />
                <div className="cart__image__tools cart__image__tools--header">
                  <span>Cena</span>
                  <span>Opcje</span>
                </div>
              </li>
              {state.cart.cartItems.map((image) => {
                return (
                  <li className="cart__image">
                    <img src={image} alt="" />
                    <div className="cart__image__tools">
                      <span>{itemPrice} PLN</span>
                      <button onClick={() => cartRemoveItem(image)}>
                        Usuń
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="cart__summary">
            <div>
              <h2>Podsumowanie:</h2>
              <span>{state.cart.cartItems.length * itemPrice} PLN brutto</span>
            </div>
            <br />
            <Link to="/podsumowanie">
              <button className="btn--primary">Przejdź do zamówienia</button>
            </Link>
            <button className="btn--secondary">Wracam do sklepu</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
