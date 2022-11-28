import { Store, useContext, Link, textContent } from '../imports';

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
      {state.cookiesConsentPopupSet ? null : (
        <div className="cookies__container">
          <span>
            {
              textContent[
                textContent.findIndex((obj) => {
                  return obj.language === state.languageSelected;
                })
              ]?.cookiesPopup?.header
            }
          </span>
          <div className="cookies__content">
            <button
              className="cookies__button--all btn--primary"
              onClick={cookiesAcceptAll}
            >
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.cookiesPopup?.accept
              }
            </button>
            <button
              className="cookies__button--decline btn--secondary"
              onClick={cookiesDeclineAll}
            >
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.cookiesPopup?.decline
              }
            </button>
            <Link to="/polityka-prywatnosci">
              <button className="cookies__button--more btn--tertiary">
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.cookiesPopup?.more
                }
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
