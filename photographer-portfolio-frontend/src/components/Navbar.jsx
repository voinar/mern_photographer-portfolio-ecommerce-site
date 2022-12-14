import {
  Store,
  useEffect,
  useState,
  useRef,
  useContext,
  Link,
  useLocation,
  IconChevron,
  NavLogo,
  IconCart,
  IconMenu,
  IconClose,
  textContent,
} from '../imports';

import categoryData from '../data/staticData.json';

function Navbar() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const location = useLocation();

  // navbar behavior on scroll in desktop view. menu shrinks height and gains a solid background.
  const [scroll, setScroll] = useState(false);
  const navRef = useRef(); // used to apply solid background class on scroll

  const [languageDropdownVisibility, setLanguageDropdownVisibility] = useState('false');
  // const [languageSelected, setLanguageSelected] = useState('PL');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/portfolio/o%20mnie') {
      navRef.current.classList.add('navbar--invert');
    } else if (location.pathname !== '/portfolio/o%20mnie') {
      navRef.current.classList.remove('navbar--invert');
    }
  }, [location.pathname, scroll]);

  const showNavbar = () => {
    navRef.current.classList.toggle('navbar--show');
  };

  const setUILanguage = (language) => {
    switch (language) {
      case 'PL':
        contextDispatch({
          type: 'SET_UI_LANGUAGE',
          payload: 'PL',
        });
        break;
      case 'EN':
        contextDispatch({
          type: 'SET_UI_LANGUAGE',
          payload: 'EN',
        });
        break;
      default:
        return null;
    } return null;
  };

  useEffect(() => {
    localStorage.setItem(
      'languageSelected',
      JSON.stringify(state.languageSelected),
    );
  }, [state.languageSelected]);

  const getCategory = (category) => (
    textContent[
      textContent.findIndex(
        (obj) => obj.language === state.languageSelected,
      )
    ].categories[category]);

  const navbarPortfolio = () => (
    <nav>
      <div
        className={scroll ? 'navbar navbar--solid' : 'navbar'}
        ref={navRef}
      >
        <button
          className="navbar__menu__button navbar__menu__button--close"
          onClick={showNavbar}
          type="button"
        >
          <img src={IconClose} alt="zamknij menu" />
        </button>

        <div className="navbar__logo">
          <Link to="/">
            <img src={NavLogo} alt="logo" />
          </Link>
        </div>

        <ul className="navbar__content">
          {categoryData.categories.map((category) => {
            // map all portfolio categories from database
            if (category === 'sklep') {
              // apply different styling for 'shop' link
              return (
                <li
                  key={category}
                  className="navbar__section-link"
                >
                  <Link
                    className="navbar__section-link navbar__section-link__shop"
                    to={category}
                    onClick={showNavbar}
                  >
                    {getCategory(category)}
                  </Link>
                </li>
              );
            }
            if (category !== '/sklep') {
              // apply regular styling for links
              return (
                <li>
                  <button
                    key={category}
                    className="navbar__section-link"
                    onClick={showNavbar}
                    onKeyDown={showNavbar}
                    type="button"
                  >
                    <Link to={`portfolio/${category}`}>
                      {getCategory(category)}
                    </Link>
                  </button>
                </li>
              );
            } return null;
          })}
        </ul>

        <div className="navbar__shop__userinfo navbar__shop__userinfo--main-page">
          <div className="navbar__shop__language">
            <span>{state.languageSelected}</span>
            <button
              onClick={() => setLanguageDropdownVisibility(!languageDropdownVisibility)}
              type="button"
            >
              <img
                src={IconChevron}
                alt="Konto u??ytkownika"
                title="Konto u??ytkownika"
              />
            </button>
            <ul className="navbar__shop__language__content">
              <li>
                <button
                  onClick={(e) => setUILanguage(e.target.textContent)}
                  onKeyDown={(e) => setUILanguage(e.target.textContent)}
                  type="button"
                >
                  EN
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => setUILanguage(e.target.textContent)}
                  onKeyDown={(e) => setUILanguage(e.target.textContent)}
                  type="button"
                >
                  PL
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        className="navbar__menu__button navbar__menu__button--open"
        onClick={showNavbar}
        type="button"
      >
        <img src={IconMenu} alt="rozwi?? menu" />
      </button>

      <div className="mobile__logo">
        <Link to="/">
          <img src={NavLogo} alt="logo" />
        </Link>
      </div>
    </nav>
  );

  const navbarShop = () => (
    <nav
      className={
        scroll ? 'navbar__shop navbar__shop--shrink' : 'navbar__shop'
      }
      ref={navRef}
    >
      <div className="navbar__shop__logo">
        <Link to="/sklep">
          <img src={NavLogo} alt="logo" />
        </Link>
      </div>
      <Link to="/sklep" className="navbar__shop__header">
        <span>
          {
            textContent[
              textContent.findIndex(
                (obj) => obj.language === state.languageSelected,
              )
            ].navbar.title
          }
        </span>
      </Link>
      <div className="navbar__shop__icons">
        <div className="navbar__shop__userinfo">
          <div className="navbar__shop__language">
            <span>{state.languageSelected}</span>
            <button
              onClick={() => setLanguageDropdownVisibility(!languageDropdownVisibility)}
              type="button"
            >
              <img
                src={IconChevron}
                alt="Konto u??ytkownika"
                title="Konto u??ytkownika"
              />
            </button>
            <ul className="navbar__shop__language__content">
              <li>
                <button
                  onClick={(e) => setUILanguage(e.target.textContent)}
                  onKeyDown={(e) => setUILanguage(e.target.textContent)}
                  type="button"
                >
                  EN
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => setUILanguage(e.target.textContent)}
                  onKeyDown={(e) => setUILanguage(e.target.textContent)}
                  type="button"
                >
                  PL
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/Koszyk">
          <div className="navbar__shop__icon__cart">
            {state.cart.cartItems.length > 0 && (
              <div className="navbar__shop__icon__cart__count">
                {state.cart.cartItems.length}
              </div>
            )}
            <img
              src={IconCart}
              className="navbar__shop__icon"
              alt="zobacz koszyk"
              title="zobacz koszyk"
            />
          </div>
        </Link>
      </div>
    </nav>
  );

  const renderNavbar = () => {
    if (
      location.pathname === '/'
      || location.pathname === '/portfolio/biegi'
      || location.pathname === '/portfolio/emocje'
      || location.pathname === '/portfolio/portret'
      || location.pathname === '/portfolio/krajobraz'
      || location.pathname === '/portfolio/wi%C4%99cej'
      || location.pathname === '/portfolio/o%20mnie'
    ) {
      return navbarPortfolio();
    }
    return navbarShop();
  };
  return <>{renderNavbar()}</>;
}

export default Navbar;
