import { useContext, useState, useEffect } from 'react';
import { Store } from '../contexts/Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';

const Cart = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const [localState, setLocalState] = useState([]);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  const cartRemoveItem = (id) => {
    contextDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { id: id },
    });
  };

  useEffect(() => {
    const getImagesData = async () => {
      try {
        const response = await axios.get(`/api/data/`);
        setLocalState(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getImagesData();
  }, [state]);

  const getEventName = (id) => {
    const item = localState.filter((item) => item.id === id);
    return item[0]?.event;
  };

  const getPrice = (id) => {
    const item = localState.filter((item) => item.id === id);
    return item[0]?.price;
  };

  const getImageSrc = (id) => {
    const item = localState.filter((item) => item.id === id);
    return item[0]?.url;
  };

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
            <li className="cart__image">
              <img src={''} alt=""/>
              <div className="cart__image__tools cart__image__tools--header">
                <span>Wydarzenie</span>
                <span>Cena</span>
                <span>Opcje</span>
              </div>
            </li>
            {state.cart.cartItems.map((image) => {
              return (
                <li className="cart__image">
                  <img src={getImageSrc(image.id)} alt=""/>
                  <div className="cart__image__tools">
                    <span>{getEventName(image.id)}</span>
                    <span>{getPrice(image.id)}PLN</span>
                    <button onClick={() => cartRemoveItem(image.id)}>
                      Usuń
                    </button>
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
            <br />
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
