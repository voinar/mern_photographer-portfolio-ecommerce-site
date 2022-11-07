import {
  Store,
  useContext,
  useState,
  useEffect,
  useNavigate,
  Helmet,
  Link,
  OrderForm,
} from '../imports';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import iconChevron from '../img/icons/icon-chevron.svg';

const Checkout = () => {
  const {
    state,
    // dispatch: contextDispatch
  } = useContext(Store);

  //local component state
  // const [showOrderForm, setShowOrderForm] = useState(true);
  const [itemPrice, setItemPrice] = useState(null);

  // const toggleOrderForm = () => {
  //   setShowOrderForm((prevState) => !prevState);
  // };

  useEffect(() => {
    const getPrice = async () => {
      try {
        const docRef = doc(db, 'settings', '5cJniz1wK9Sri7EmlSzD');
        const docSnap = await getDoc(docRef);
        setItemPrice(
          Number(
            docSnap._document.data.value.mapValue.fields.imagePrice
              .integerValue / 100
          )
        );
      } catch (err) {
        console.error(err);
      }
    };
    getPrice();
  }, [state]);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <title>Podsumowanie</title>
      </Helmet>

      {state.cart.cartItems.length === 0 ? (
        <main className="checkout__container">
          <div className="cart__return">
            <button onClick={goBack}>
              <img src={iconChevron} alt="zobacz" />
            </button>
            <h1>Podsumowanie</h1>
          </div>
          <div className="cart__images">
            <h3>Twój koszyk jest pusty :)</h3>
            <Link to="/sklep">
              <button className="btn--primary">Wracam do sklepu.</button>
            </Link>
          </div>
        </main>
      ) : (
        <>
          <main className="checkout__container">
            <div className="cart__return">
              <button onClick={goBack}>
                <img src={iconChevron} alt="zobacz" />
              </button>
              <h1>Podsumowanie</h1>
            </div>

            <div className="checkout__summary">
              <div className="checkout__summary__cart">
                {state.userInfo !== null ? (
                  <>
                    <h2>
                      {/* Hej {state?.userInfo?.email.split('@')[0]}, oto Twój
                    koszyk: */}
                    </h2>
                    <h1>Hej, oto Twój koszyk:</h1>
                  </>
                ) : (
                  <h1>Hej, oto Twój koszyk:</h1>
                )}

                <div className="checkout__items">
                  {state.cart.cartItems.map((image) => {
                    return (
                      <li key={image} className="checkout__items__image">
                        <img src={image} alt="" />
                      </li>
                    );
                  })}
                </div>
                <div className="checkout__total">
                  <h2>Cena:</h2>
                  <span>
                    {new Intl.NumberFormat('pl-PL', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(state.cart.cartItems.length * itemPrice)}
                    zł brutto
                  </span>
                  {/* //*/}

                  {/* <div>
              <button
              // onClick={toggleOrderForm}
              className="btn--primary">
                Kupuję
              </button>
              <button onClick={goBack} className="btn--secondary">
                Wracam do koszyka
              </button>
            </div> */}
                </div>
              </div>
            </div>
            <OrderForm />
          </main>
        </>
      )}
    </>
  );
};

export default Checkout;
