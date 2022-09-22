import navLogo from '../img/logo.png';
import categoryData from '../data/data.json';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../contexts/Context';
import { useLocation } from 'react-router-dom';

// import iconSun from "../img/icons/icon-sun.svg";
// import iconMoon from "../img/icons/icon-moon.svg";
import iconCart from '../img/icons/icon-cart.svg';
import iconShare from '../img/icons/icon-share.svg';

const Navbar = () => {
  // const { darkMode, setDarkMode } = useContext(Context);
  const { darkMode } = useContext(Context);

  console.log('darkMode ' + darkMode);
  console.log('path ' + window.location.pathname);

  const location = useLocation();

  return (
    <nav className={darkMode ? `${'navbar navbar--dark'}` : `${'navbar'}`}>
      {/* <nav className={darkMode ? `${'navbar navbar--dark'}` : `${'navbar'}`}> */}
      <div className="navbar__logo">
        <Link to="/witaj">
          <img src={navLogo} alt="logo" />
        </Link>
      </div>

      {location.pathname !== '/sklep' ? (
        <ul className="navbar__content">
          {categoryData.categories.map((category) => { //map all portfolio categories from database
            if (category === 'sklep') {
              return (
                <li key={category} className="navbar__section-link">
                  <Link
                    className="navbar__section-link navbar__section-link__shop"
                    to={category}
                  >
                    {category}
                  </Link>
                </li>
              );
            }
            if (category !== 'sklep') {
              return (
                <li key={category} className="navbar__section-link">
                  <Link to={category}>{category}</Link>
                </li>
              );
            } else return null;
          })}
        </ul>
      ) : ( //if currently in shop then show only cart and share icon (don't render portfolio links)
        <div className="navbar__shop-icons">
          <img
            src={iconCart}
            className="navbar__icon-cart"
            alt="zobacz koszyk"
            title="zobacz koszyk"
          />
          <img
            src={iconShare}
            className="navbar__icon-share"
            alt="udostępnij"
            title="udostępnij"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
