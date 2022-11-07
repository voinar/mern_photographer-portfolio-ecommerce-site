import {
  useLocation,
  Link,
  FooterLogo,
  IconFacebook,
  IconInstagram,
  IconChevronUp,
} from '../imports';

const Footer = () => {
  const location = useLocation();

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {location.pathname === '/' ? null : (
        <footer className="footer">
          <div className="footer__content">
            <div className="footer__column">
              <div className="footer__logo">
                <img src={FooterLogo} alt="logo" />
              </div>
              <div className="footer__social">
                <span>Znajdź mnie na</span>
                <div className="footer__icon">
                  <a
                    href="https://www.facebook.com/profile.php?id=100069653350294"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={IconFacebook} alt="facebook" />
                  </a>
                </div>
                <div className="footer__icon">
                  <a
                    href="https://www.instagram.com/kacper_porada_fotografia/"
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
            <div className="footer__column footer__tags">
              <Link to="/regulamin">
                <span>Regulamin</span>
              </Link>
            </div>
            <div className="footer__column footer__tags">
              <span>Pomoc</span>
            </div>
            <div
              className="footer__column footer__return"
              onClick={returnToTop}
            >
              <img src={IconChevronUp} alt="wróć do początku" />
            </div>
          </div>
          <div className="footer__slogan">Zobacz emocje</div>
          <div className="footer__copyright">
            <Link to="o%20mnie">
              <span>copyright Ⓒ 2022 Kacper Porada</span>
            </Link>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
