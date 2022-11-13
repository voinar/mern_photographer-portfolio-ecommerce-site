import {
  Store,
  useEffect,
  useState,
  useRef,
  useContext,
  Link,
  useLocation,
} from '../imports';

import categoryData from '../data/staticData.json';

import {
  NavLogo,
  IconCart,
  IconShare,
  IconMenu,
  IconClose,
  // IconLogin,
  IconChevron,
} from '../imports';

const Navbar = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const location = useLocation();

  //navbar behavior on scroll in desktop view. menu shrinks height and gains a solid background.
  const [scroll, setScroll] = useState(false);
  const navRef = useRef(); //used to apply solid background class on scroll

  const [userMenuVisibility, setUserMenuVisibility] = useState('false');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 100);
    });
  }, [location.pathname]);

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

  const handleSignout = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    console.log('logout');
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
              <img src={IconClose} alt="zamknij menu"></img>
            </button>

            <div className="navbar__logo">
              <Link to="/">
                <img src={NavLogo} alt="logo" />
              </Link>
            </div>

            <ul className="navbar__content">
              {categoryData.categories.map((category) => {
                //map all portfolio categories from database
                if (category === 'sklep') {
                  //apply different styling for 'shop' link
                  return (
                    <li
                      key={category}
                      className="navbar__section-link"
                      style={{ display: 'none' }}
                    >
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
            <img src={IconMenu} alt="rozwiń menu"></img>
          </button>

          <div className="mobile__logo">
            <Link to="/">
              <img src={NavLogo} alt="logo" />
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
            <Link to="/sklep">
              <img src={NavLogo} alt="logo" />
            </Link>
          </div>
          <div className="navbar__shop__icons">
            <div className="navbar__shop__userinfo">
              {state?.userInfo?.email !== undefined ? (
                <>
                  <div className="navbar__shop__userinfo__usermenu">
                    <span>
                      {'Witaj, ' + state?.userInfo?.email?.split('@')[0] + '!'}
                    </span>
                    <button
                      onClick={() => setUserMenuVisibility(!userMenuVisibility)}
                    >
                      <img
                        src={IconChevron}
                        alt="Konto użytkownika"
                        title="Konto użytkownika"
                      />
                    </button>
                    <ul
                      className={
                        userMenuVisibility
                          ? 'navbar__shop__userinfo__usermenu__content hidden'
                          : 'navbar__shop__userinfo__usermenu__content'
                      }
                    >
                      <li>Moje zdjęcia</li>
                      <li>Konto użytkownika</li>
                      <li className="navbar__shop__userinfo__usermenu__content__logout">
                        <button onClick={handleSignout}>Wyloguj</button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* <span>Zaloguj</span>
                  <Link to="/Logowanie">
                    <img
                      src={IconLogin}
                      className="navbar__shop__icon"
                      alt="zobacz koszyk"
                      title="zobacz koszyk"
                    />
                  </Link> */}
                </>
              )}
            </div>
            <Link to="/Koszyk">
              <div className="navbar__shop__icon__cart">
                {state?.cart?.cartItems?.length > 0 && (
                  <div className="navbar__shop__icon__cart__count">
                    {state?.cart?.cartItems?.length}
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
            <div className="navbar__shop__icon__share">
              <img
                src={IconShare}
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
