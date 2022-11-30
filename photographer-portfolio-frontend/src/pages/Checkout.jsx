import {
  React,
  Store,
  useContext,
  useState,
  useEffect,
  useNavigate,
  Helmet,
  Link,
  OrderForm,
  textContent,
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
  const [itemPrice, setItemPrice] = useState(null);

  useEffect(() => {
    const getPrice = async () => {
      try {
        const docRef = doc(db, 'settings', `${process.env.REACT_APP_FIREBASE_SETTINGS_PRICE}`);
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
  }, [state.cart]);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <title>
          {
            textContent[
              textContent.findIndex((obj) => {
                return obj.language === state.languageSelected;
              })
            ]?.checkout?.title
          }
        </title>
      </Helmet>

      {state?.cart?.cartItems?.length === 0 ? (
        <main className="checkout__container">
          <div className="cart__return">
            <button onClick={goBack} className="btn--back">
              <img src={iconChevron} alt="zobacz" />
            </button>
            <h1>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.checkout?.title
              }
            </h1>
          </div>
          <div className="cart__images">
            <h3>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.checkout?.empty
              }
            </h3>
            <Link to="/sklep">
              <button className="btn--primary">
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.checkout?.return
                }
              </button>
            </Link>
          </div>
        </main>
      ) : (
        <>
          <main className="checkout__container">
            <div className="cart__return">
              <button onClick={goBack} className="btn--back">
                <img src={iconChevron} alt="zobacz" />
              </button>
              <h1>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.checkout?.title
                }
              </h1>
            </div>

            <div className="checkout__summary">
              <div className="checkout__summary__cart">
                <h1>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.checkout?.greeting
                  }
                </h1>

                <div className="checkout__items">
                  {state?.cart?.cartItems?.map((image) => {
                    return (
                      <li key={image} className="checkout__items__image">
                        <img src={image} alt="" />
                      </li>
                    );
                  })}
                </div>
                <div className="checkout__total">
                  <h2>
                    {
                      textContent[
                        textContent.findIndex((obj) => {
                          return obj.language === state.languageSelected;
                        })
                      ]?.checkout?.price
                    }
                  </h2>
                  <span className="checkout__total__price">
                    {new Intl.NumberFormat('pl-PL', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(state?.cart?.cartItems?.length * itemPrice)}
                    zł{' '}
                    {
                      textContent[
                        textContent.findIndex((obj) => {
                          return obj.language === state.languageSelected;
                        })
                      ]?.checkout?.gross
                    }
                  </span>
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
