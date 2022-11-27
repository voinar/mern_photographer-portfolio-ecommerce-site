import { Store, useContext, Link } from '../imports';

const CookiesPopup = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  // const [cookiePopupVisibility, setCookiePopupVisibility] = useState(true);

  const cookiesAcceptAll = () => {
    contextDispatch({
      type: 'ACCEPT_COOKIES',
      payload: { cookiesConsentPopupSet: true, cookiesConsentAll: true },
    });
  };

  const cookiesDeclineAll = () => {
    contextDispatch({
      type: 'DECLINE_COOKIES',
      payload: { cookiesConsentPopupSet: true, cookiesConsentDecline: true },
    });
  };

  return (
    <>
      {state.cookiesConsentPopupSet ? (
        null
      ) : (
        <div className="cookies__container">
          <span>
            Strona korzysta z plików cookie w celu dostarczenia najlepszej
            jakości usług &#127850;
          </span>
          <div className="cookies__content">
            <button
              className="cookies__button--all btn--primary"
              onClick={cookiesAcceptAll}
            >
              Akceptuj wszystkie
            </button>
            <button
              className="cookies__button--decline btn--secondary"
              onClick={cookiesDeclineAll}
            >
              Odrzuć wszystkie
            </button>
            <Link to="/polityka-prywatnosci">
              <button className="cookies__button--more btn--tertiary">
                Dowiedz się więcej.
              </button>
            </Link>
          </div>
          {/*
          <div className="cookies-popup__close" onClick={toggleCookiePopup}>
            x
          </div> */}
        </div>
      )}
    </>
  );
};

export default CookiesPopup;
