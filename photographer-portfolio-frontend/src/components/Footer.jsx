import footerLogo from '../img/logo-full.png';
import iconFacebook from '../img/icons/icon-facebook.svg';
import iconInstagram from '../img/icons/icon-instagram.svg';
import chevronUp from '../img/icons/chevron-up.svg';

const Footer = () => {
  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__column">
          <div className="footer__logo">
            <img src={footerLogo} alt="logo" />
          </div>
          <div className="footer__social">
            <span>Znajdź mnie na</span>
            <div className="footer__icon">
              <img src={iconFacebook} alt="facebook" />
            </div>
            <div className="footer__icon">
              <img src={iconInstagram} alt="instagram" />
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

        <div className="footer__column footer__return" onClick={returnToTop}>
          <img
            src={chevronUp}
            alt="wróć do początku"
          />
        </div>
      </div>
      <div className="footer__slogan">Zobacz emocje</div>
      <div className="footer__copyright">
        <a href="/o%20mnie"><span>copyright Ⓒ 2022 Kacper Porada</span></a>
      </div>
    </footer>
  );
};

export default Footer;
