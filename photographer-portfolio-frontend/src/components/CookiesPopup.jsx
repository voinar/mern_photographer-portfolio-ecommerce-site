import { Store, useContext, Link } from '../imports'

const CookiesPopup = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  // const [cookiePopupVisibility, setCookiePopupVisibility] = useState(true);

  const toggleCookiePopup = () => {
    contextDispatch({
      type: 'ACCEPT_COOKIES',
      payload: { cookiesConsentPopupAccepted: true },
    });
  };

  return (
    <>
      {state.cookiesConsentPopupAccepted ? null : (
        <div className="cookies-popup__container">
          <div className="cookies-popup__text">
            <span>
              Korzystamy z plików cookie w celu dostarczenia najlepszej jakości
              usług.
            </span>
            <Link to="/cookies">
              <span> Dowiedz się więcej.</span>
            </Link>
          </div>

          <div className="cookies-popup__close" onClick={toggleCookiePopup}>
            x
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesPopup;
