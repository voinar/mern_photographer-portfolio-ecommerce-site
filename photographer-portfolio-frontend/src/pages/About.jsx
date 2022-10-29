import Footer from '../components/Footer';
// import bioPic from '../img/about.jpg';
import iconEmail from '../img/icons/icon-email.svg';
import iconPhone from '../img/icons/icon-phone.svg';
import img0 from '../img/about/about-1.jpg';
import img1 from '../img/about/about-2.jpg';
import img2 from '../img/about/about-3.jpg';
import img3 from '../img/about/about-4.jpg';

import iconFacebook from '../img/icons/icon-facebook.svg';
import iconInstagram from '../img/icons/icon-instagram.svg';

const About = () => {
  return (
    <>
      <div className="section__about">
        <div className="section__about__main">
          <div className="section__about__content--left">
            <div className="section__about__image--main">
              <img src={img0} alt="moje zdjęcie" />
              <div className="section__about__image__caption">
                <span>
                  Zwycięstwo UltraBies 45km, <br /> fot. Mała Gośka
                </span>
              </div>
            </div>

            <div className="section__about__contact">
              <h2>Kontakt</h2>
              <div className="section__about__contact__row">
                <img src={iconEmail} alt="napisz email" />
                <h3>
                  <a href="mailto:kporadafoto@gmail.com">
                    kporadafoto@gmail.com
                  </a>
                </h3>
              </div>
              <div className="section__about__contact__row">
                <img src={iconPhone} alt="zadzwoń" />
                <h3>+48 537 256 492</h3>
              </div>

              <div className="about__icons">
                <h3>Znajdź mnie na: </h3>
                <div className="about__icons__row-container">
                  <div className="about__icons__social">
                    <div className="about__icon__social">
                      <a
                        href="https://www.facebook.com/profile.php?id=100069653350294"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={iconFacebook} alt="facebook" />
                      </a>
                    </div>
                    <div className="about__icon__social">
                      <a
                        href="https://www.instagram.com/kacper_porada_fotografia/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={iconInstagram} alt="instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section__about__content--right">
            <h1>O mnie</h1>
            <p>
              Świetnie odnajduję się tam gdzie są emocje. Specjalizuję się w
              fotografii sportowej. Sam prężnie rozwijam się jako biegacz
              górski, zdobywając wysokie lokaty na zawodach, co pozwala mi
              bardzo dobrze rozumieć temat, poczuć atmosferę wydarzenia i
              utożsamić z jego bohaterami.
            </p>
            <p>
              Moją ulubioną dziedzina fotografii jest reportaż, czyli w miejsca
              gdzie akcja dzieje się cały czas, a ja mogę wykorzystać inne
              patrzenie na świat oraz duże zaangażowanie.
            </p>
            <p>
              Fotografia sprawia mi ogromną satysfakcję, co można poczuć podczas
              współpracy ze mną - cechuję się niezwykłym entuzjazmem oraz
              optymizmem. Uwielbiam kontakt z ludźmi, a towarzyszenie Wam w tych
              ważnych momentach sprawia mi wielką radość.
            </p>
            <p>
              Moje wykształcenie, doświadczenie i profesjonalizm dopełniam
              sprzętem z nawyższej półki. Staramy się jak najmocniej
              usatysfakcjonować każdego klienta, podchodząc do zlecenia bardzo
              indywidualnie. Działam głównie na Podkarpaciu, w okolicach
              Rzeszowa, oraz Południu Polski.
            </p>
          </div>
        </div>
        <div className="section__about__images">
          <div className="section__about__image--main">
            <img
              src={img2}
              className="section__about__image--secondary"
              alt="moje zdjęcie"
            />
            <span className="section__about__image__caption">
              Góry pomagają mi "naładować baterie".
            </span>
          </div>
          <div className="section__about__image--main">
            <img
              src={img1}
              className="section__about__image--secondary"
              alt="moje zdjęcie"
            />
            <span className="section__about__image__caption">
              Mega utożsamiam się z grupą PODIUM! Wiele dobrego zawdzięczam tej
              społeczności.
            </span>
          </div>
          <div className="section__about__image--main">
            <img
              src={img3}
              className="section__about__image--secondary"
              alt="moje zdjęcie"
            />
            <span className="section__about__image__caption">
              Uwielbiam wschody i zachody słońca.
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
