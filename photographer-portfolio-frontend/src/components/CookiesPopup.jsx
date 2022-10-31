import { useState } from 'react';
import { Link } from 'react-router-dom';

const CookiesPopup = () => {
  const [cookiePopupVisibility, setCookiePopupVisibility] = useState(true);

  const toggleCookiePopup = () => {
    setCookiePopupVisibility(false);
  };

  return (
    <>
      {cookiePopupVisibility ? (
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
      ) : null}
    </>
  );
};

export default CookiesPopup;
