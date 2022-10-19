import navLogo from '../img/logo-nav.png';
import categoryData from '../data/staticData.json';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { Store } from '../contexts/Store';

import iconCart from '../img/icons/icon-cart.svg';
import iconShare from '../img/icons/icon-share.svg';
import iconMenu from '../img/icons/icon-menu.svg';
import iconClose from '../img/icons/icon-close.svg';
import iconLogin from '../img/icons/icon-login.svg';

const Navbar = () => {
  const { state } = useContext(Store);

  // console.log('path ' + window.location.pathname);

  const location = useLocation();

  //navbar behavior on scroll in desktop view. menu shrinks height and gains a solid background.
  const [scroll, setScroll] = useState(false);
  const navRef = useRef(); //used to apply solid background class on scroll

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 100);
    });
  }, []);

  useEffect(() => {
    location.pathname === '/o%20mnie'
      ? navRef.current.classList.add('navbar--invert')
      : navRef.current.classList.remove('navbar--invert');
  }, [location.pathname]);

  const showNavbar = () => {
    // return window.innerWidth < 1024 ?
    navRef.current.classList.toggle('navbar--show');
    // document.body.style.overflow = 'scroll';
  };

  const renderNavbar = () => {
    if (
      location.pathname === '/' ||
      location.pathname === '/biegi' ||
      location.pathname === '/emocje' ||
      location.pathname === '/portret' ||
      location.pathname === '/krajobraz' ||
      location.pathname === '/wi%C4%99cej' ||
      location.pathname === '/o%20mnie'
    ) {
      return (
        <nav>
          <div
            className={scroll ? 'navbar navbar--solid' : 'navbar'}
            ref={navRef}
          >
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

            <ul className="navbar__content">
              {categoryData.categories.map((category) => {
                //map all portfolio categories from database
                if (category === 'sklep') {
                  //apply different styling for 'shop' link
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
                if (category !== '/sklep') {
                  //apply regular styling for links
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
          </div>

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
        </nav>
      );
    } else {
      return (
        <nav
          className={
            scroll ? 'navbar__shop navbar__shop--shrink' : 'navbar__shop'
          }
          ref={navRef}
        >
          <div className="navbar__shop__logo">
            <Link to="/">
              <img src={navLogo} alt="logo" />
            </Link>
          </div>
          <div className="navbar__shop__icons">
            <div className="navbar__shop__userinfo">
              {state?.userInfo?.name?.length > 0 ? (
                <>
                  <Link to="/Logowanie">
                    <img
                      src={iconLogin}
                      className="navbar__shop__icon"
                      alt="zobacz koszyk"
                      title="zobacz koszyk"
                    />
                  </Link>
                  <span>{'Witaj ' + state?.userInfo?.name + '!'}</span>
                </>
              ) : (
                <>
                  <span>Zaloguj</span>
                  <Link to="/Logowanie">
                    <img
                      src={iconLogin}
                      className="navbar__shop__icon"
                      alt="zobacz koszyk"
                      title="zobacz koszyk"
                    />
                  </Link>
                </>
              )}
            </div>
            <div className="navbar__shop__icon__cart">
              {state.cart.cartItems.length > 0 && (
                <div className="navbar__shop__icon__cart__count">
                  {state.cart.cartItems.length}
                </div>
              )}
              <Link to="/Koszyk">
                <img
                  src={iconCart}
                  className="navbar__shop__icon"
                  alt="zobacz koszyk"
                  title="zobacz koszyk"
                />
              </Link>
            </div>
            <div className="navbar__shop__icon__share">
              <img
                src={iconShare}
                className="navbar__shop__icon"
                alt="udostępnij"
                title="udostępnij"
              />
            </div>
          </div>
        </nav>
      );
    }
  };
  return <>{renderNavbar()}</>;
};

export default Navbar;
