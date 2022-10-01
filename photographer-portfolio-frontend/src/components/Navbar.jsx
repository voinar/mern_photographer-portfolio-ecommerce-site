import navLogo from '../img/logo-nav.png';
import categoryData from '../data/staticData.json';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// import Context from '../contexts/Context';
import { useLocation } from 'react-router-dom';

// import iconSun from "../img/icons/icon-sun.svg";
// import iconMoon from "../img/icons/icon-moon.svg";
import iconCart from '../img/icons/icon-cart.svg';
import iconShare from '../img/icons/icon-share.svg';
import iconMenu from '../img/icons/icon-menu.svg';
import iconClose from '../img/icons/icon-close.svg';

import Alert from './Alert';

const Navbar = () => {
  // console.log('path ' + window.location.pathname);

  const location = useLocation();

  //navbar behavior on scroll in desktop view. menu shrinks height and gains a solid background.
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 100);
    });
  }, []);

  // useEffect(() => {
  //   navRef.current.classList.add('navbar__menu--unhide');
  // }, []);

  const navRef = useRef();

  const showNavbar = () => {
    // return window.innerWidth < 1024 ?
    navRef.current.classList.toggle('navbar--show');
    // document.body.style.overflow = 'scroll';
  };

  return (
    <>
      <Alert alertContent={'alert'} />
      <nav className={scroll ? 'navbar navbar--solid' : 'navbar'} ref={navRef}>
        <button
          className="navbar__menu__button navbar__menu__button--close"
          onClick={showNavbar}
        >
          <img src={iconClose} alt="zamknij menu"></img>
        </button>

        <div className="navbar__logo">
          <Link to="/">
            <img src={navLogo} alt="logo" />
          </Link>
        </div>

        {location.pathname !== '/sklep' ? (
          <ul className="navbar__content">
            {categoryData.categories.map((category) => {
              //map all portfolio categories from database
              if (category === 'sklep') {
                return (
                  <li key={category} className="navbar__section-link">
                    <Link
                      className="navbar__section-link navbar__section-link__shop"
                      to={category}
                      onClick={showNavbar}
                    >
                      {category}
                    </Link>
                  </li>
                );
              }
              if (category !== 'sklep') {
                return (
                  <li
                    key={category}
                    className="navbar__section-link"
                    onClick={showNavbar}
                  >
                    <Link to={category}>{category}</Link>
                  </li>
                );
              } else return null;
            })}
          </ul>
        ) : (
          //if currently in shop then show only cart and share icon (don't render portfolio links)
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

      <button
        className="navbar__menu__button navbar__menu__button--open"
        onClick={showNavbar}
      >
        <img src={iconMenu} alt="rozwiń menu"></img>
      </button>

      <div className="mobile__logo">
          <Link to="/">
            <img src={navLogo} alt="logo" />
          </Link>
        </div>
    </>
  );
};

export default Navbar;
