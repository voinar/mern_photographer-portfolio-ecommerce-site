import {
  React,
  useLocation,
  Link,
  FooterLogo,
  IconFacebook,
  IconInstagram,
  IconChevronUp,
} from '../imports';

function Footer() {
  const location = useLocation();

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderFooter = () => {
    if (location.pathname === '/') {
      return null;
    }
    return (
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__column">
            <div className="footer__logo">
              <Link to="/">
                <img src={FooterLogo} alt="logo" />
              </Link>
            </div>
            <div className="footer__social">
              <span>Znajdź mnie na</span>
              <div className="footer__icon">
                <a
                  href={`${process.env.REACT_APP_SOCIAL_FACEBOOK}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={IconFacebook} alt="facebook" />
                </a>
              </div>
              <div className="footer__icon">
                <a
                  href={`${process.env.REACT_APP_SOCIAL_INSTAGRAM}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={IconInstagram} alt="instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer__column footer__tags">
            <span>Fotografia</span>
            <span>Fotograf Rzeszów</span>
            <span>Fotografia sportowa</span>
            <span>Zdjęcia imprez sportowych</span>
            <span>Rzeszów fotografia</span>
          </div>
          <div className="footer__column">
            <div className="footer__column footer__links">
              <Link to="/regulamin">
                <span>Regulamin</span>
              </Link>

              <Link to="/polityka-prywatnosci">
                <span>Polityka prywatności</span>
              </Link>

              <Link to="/Pomoc">
                <span>Kontakt</span>
              </Link>
            </div>
            <div className="footer__column footer__links">
              <Link to="/Pomoc">
                <span>Pomoc</span>
              </Link>
            </div>
          </div>
          <div
            className="footer__column footer__return"
            onClick={returnToTop}
            onKeyDown={returnToTop}
          >
            <img src={IconChevronUp} alt="wróć do początku" />
          </div>
        </div>
        <div className="footer__slogan">Zobacz emocje</div>
        <div className="footer__copyright">
          <span>
            copyright Ⓒ
            {new Date().getFullYear()}
            Kacper Porada.&nbsp;
          </span>
          <span>
            made by
            {' '}
            <a
              rel="noopener noreferrer"
              href="http://indragon.eu"
              target="_blank"
            >
              indragon.eu
            </a>
          </span>
        </div>
      </footer>
    );
  };

  return renderFooter();
}

export default Footer;
