import { useContext, useState, useEffect } from 'react';
import { Store } from '../contexts/Store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';

const Cart = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  //local component state
  const [itemPrice, setItemPrice] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);

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
    const getPrice = async () => {
      try {
        const docRef = doc(db, 'settings', '5cJniz1wK9Sri7EmlSzD');
        const docSnap = await getDoc(docRef);
        setItemPrice(
          Number(
            docSnap._document.data.value.mapValue.fields.imagePrice.integerValue / 100
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    getPrice();
  }, [state]);

  //   // preview images in album page
  const handleImagePreview = (image) => {
    console.log(image);
    setPreviewImageUrl(image);
    setShowPreviewImage((prevState) => !prevState);
    console.log(image);
  };

  const handleImagePreviewPrev = () => {
    if (state.cart.cartItems.indexOf(previewImageUrl) === 0) {
      setPreviewImageUrl(state.cart.cartItems[state.cart.cartItems.length - 1]);
    } else {
      setPreviewImageUrl(
        state.cart.cartItems[state.cart.cartItems.indexOf(previewImageUrl) - 1]
      ); //find item in images list and decrement by 1
    }
  };

  const handleImagePreviewNext = () => {
    if (
      state.cart.cartItems.indexOf(previewImageUrl) ===
      state.cart.cartItems.length - 1
    ) {
      setPreviewImageUrl(state.cart.cartItems[0]);
    } else {
      setPreviewImageUrl(
        state.cart.cartItems[state.cart.cartItems.indexOf(previewImageUrl) + 1]
      ); //find item in images list and increment by 1
    }
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
          {state.cart.cartItems.length === 0 ? (
            <div className="cart__images">
              <h3>Twój koszyk jest pusty.</h3>
              <Link to="/sklep">
                <button className="btn--primary">Wracam do sklepu.</button>
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart__images">
                <div className="cart__image__labels">
                  <span className="cart__image__labels--photo">Zdjęcie</span>
                  <span className="cart__image__labels--price">Cena</span>
                  <span className="cart__image__labels--options">Opcje</span>
                </div>
                {state.cart.cartItems.map((image) => {
                  return (
                    <li
                      key={image}
                      className="cart__image"
                      onClick={() => handleImagePreview(image)}
                    >
                      <img
                        className="cart__image__tools--image"
                        src={image}
                        alt=""
                      />
                      <div className="cart__image__tools">
                        <span className="cart__image__tools--price">
                          {itemPrice}zł
                        </span>
                        <div className="cart__image__tools--button">
                          <button onClick={() => cartRemoveItem(image)}>
                            Usuń
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {showPreviewImage && ( //image preview overlay
                <>
                  <div className="album__preview" onClick={handleImagePreview}>
                    <img
                      className="album__preview-image"
                      src={previewImageUrl}
                      alt=""
                    />
                  </div>
                  {state.cart.cartItems.length > 1 ? (
                    <div className="album__preview-image__tools">
                      <button onClick={handleImagePreviewPrev}>
                        <img
                          className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
                          src={IconChevron}
                          alt="poprzednie zdjęcie"
                          title="poprzednie zdjęcie"
                        />
                      </button>

                      <button onClick={handleImagePreviewNext}>
                        <img
                          className="album__preview-image__tools__arrow album__preview-image__tools__arrow--next"
                          src={IconChevron}
                          alt="następne zdjęcie"
                          title="następne zdjęcie"
                        />
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
          {state.cart.cartItems.length !== 0 ? (
            <div className="cart__summary">
              <div>
                <h2>Podsumowanie:</h2>
                <span className="cart__summary__price">
                {new Intl.NumberFormat('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(state.cart.cartItems.length * itemPrice)}
                  zł brutto
                </span>
              </div>
              <br />
              <Link to="/podsumowanie">
                <button className="btn--primary cart__summary__button">
                  Przejdź do zamówienia
                </button>
              </Link>
              <button
                onClick={goBack}
                className="btn--secondary cart__summary__button"
              >
                Wracam do sklepu
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Cart;
