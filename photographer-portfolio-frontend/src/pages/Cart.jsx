import {
  React,
  Store,
  Helmet,
  useContext,
  useState,
  useEffect,
  useNavigate,
  Link,
  IconChevron,
  IconMagnifyingGlass,
  textContent,
  doc,
  getDoc,
  db,
} from '../imports';

function Cart() {
  const { state, dispatch: contextDispatch } = useContext(Store);

  // local component state
  const [itemPrice, setItemPrice] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);

  const navigate = useNavigate(); // used to return to previous page
  const goBack = () => navigate(-1);

  const cartRemoveItem = (id) => {
    contextDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { id },
    });
  };

  useEffect(() => {
    const getPrice = async () => {
      try {
        const docRef = doc(db, 'settings', `${process.env.REACT_APP_FIREBASE_SETTINGS_PRICE}`);
        const docSnap = await getDoc(docRef);
        setItemPrice(
          Number(
            docSnap._document.data.value.mapValue.fields.imagePrice
              .integerValue / 100,
          ),
        );
      } catch (err) {
        console.error(err);
      }
    };
    getPrice();
  }, [state.cart.cartItems]);

  //   // preview images in album page
  const handleImagePreview = (image) => {
    setPreviewImageUrl(image);
    setShowPreviewImage((prevState) => !prevState);
  };

  // lock page scroll when preview overlay is displayed
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = showPreviewImage ? 'hidden' : 'auto';
    }
  }, [showPreviewImage]);

  return (
    <>
      <Helmet>
        <title>
          {
            textContent[
              textContent.findIndex(
                (obj) => obj.language === state.languageSelected,
              )
            ].cart.title
          }
        </title>
      </Helmet>
      <div className="cart__container">
        <div className="cart__return">
          <button onClick={goBack} className="btn--back" type="button">
            <img src={IconChevron} alt="zobacz" />
          </button>
          <h1>
            {
              textContent[
                textContent.findIndex(
                  (obj) => obj.language === state.languageSelected,
                )
              ].cart.title
            }
          </h1>
        </div>
        <div className="cart__sections">
          {state.cart.cartItems.length === 0 ? (
            <div className="cart__images">
              <h3>Twój koszyk jest pusty.</h3>
              <Link to="/sklep">
                <button className="btn--primary" type="button">Wracam do sklepu.</button>
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart__images">
                <div className="cart__image__labels">
                  <span className="cart__image__labels--photo">
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].cart.picture
                    }
                  </span>
                  <span className="cart__image__labels--preview">
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].cart.preview
                    }
                  </span>
                  <span className="cart__image__labels--price">
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].cart.price
                    }
                  </span>
                  <span className="cart__image__labels--price">
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].cart.info
                    }
                  </span>
                  <span className="cart__image__labels--options">
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].cart.options
                    }
                  </span>
                </div>
                {state.cart.cartItems.map((image) => (
                  <li key={image} className="cart__image">
                    <img
                      className="cart__image__tools--image"
                      src={image}
                      alt=""
                    />
                    <div className="cart__image__tools">
                      <button
                        className="cart__image__tools--preview cart__image__tools--preview__button"
                        onClick={() => handleImagePreview(image)}
                        type="button"
                      >
                        <img src={IconMagnifyingGlass} alt="zobacz podgląd" />
                      </button>
                      <span className="cart__image__tools--price">
                        {itemPrice}
                        zł
                      </span>
                      <div className="cart__image__tools--button">
                        <div className="tooltip">
                          {
                            textContent[
                              textContent.findIndex(
                                (obj) => obj.language === state.languageSelected,
                              )
                            ].cart.about
                          }
                          <span className="tooltiptext">
                            {
                              textContent[
                                textContent.findIndex(
                                  (obj) => obj.language === state.languageSelected,
                                )
                              ].cart.infoTooltip
                            }
                          </span>
                        </div>
                      </div>
                      <div className="cart__image__tools--button">
                        <button
                          onClick={() => cartRemoveItem(image)}
                          className="btn--tertiary"
                          type="button"
                        >
                          {
                            textContent[
                              textContent.findIndex(
                                (obj) => obj.language === state.languageSelected,
                              )
                            ].cart.remove
                          }
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {showPreviewImage && ( // image preview overlay
                <>
                  <div
                    className="album__preview__background"
                    onClick={() => handleImagePreview()}
                    onKeyDown={() => handleImagePreview()}
                  />
                  <div
                    className="album__preview"
                    style={{ top: window.scrollY }}
                    onClick={handleImagePreview}
                    onKeyDown={handleImagePreview}
                  >
                    <img
                      className="album__preview-image album__preview-image__picture"
                      src={previewImageUrl}
                      alt=""
                    />
                  </div>
                </>
              )}
            </>
          )}
          {state.cart.cartItems.length !== 0 ? (
            <div className="cart__summary">
              <div>
                <h2>
                  {
                    textContent[
                      textContent.findIndex(
                        (obj) => obj.language === state.languageSelected,
                      )
                    ].cart.summary
                  }
                </h2>
                <span className="cart__summary__price">
                  {new Intl.NumberFormat('pl-PL', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(state.cart.cartItems.length * itemPrice)}
                  zł
                  {' '}
                  {
                    textContent[
                      textContent.findIndex(
                        (obj) => obj.language === state.languageSelected,
                      )
                    ].cart.gross
                  }
                </span>
              </div>
              <br />
              <Link to="/podsumowanie">
                <button className="btn--primary cart__summary__button" type="button">
                  {
                    textContent[
                      textContent.findIndex(
                        (obj) => obj.language === state.languageSelected,
                      )
                    ].cart.summary
                  }
                  {' '}
                </button>
              </Link>
              <Link to="/sklep">
                <button
                  // onClick={goBack}
                  className="btn--secondary cart__summary__button"
                  type="button"
                >
                  {
                    textContent[
                      textContent.findIndex(
                        (obj) => obj.language === state.languageSelected,
                      )
                    ].cart.return
                  }
                  {' '}
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Cart;
