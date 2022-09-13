import Footer from '../components/Footer';
// import bioPic from '../img/about.jpg';
import iconEmail from '../img/icons/icon-email.svg';
import iconPhone from '../img/icons/icon-phone.svg';
import img0 from '../img/about/0.jpg';
import img1 from '../img/about/1.jpg';
import img2 from '../img/about/2.jpg';

const About = () => {
  return (
    <>
      <div className="section__about">
        <div className="section__about__main">
          <div>
            <img
              src={img0}
              className="section__about__image--main"
              alt="moje zdjęcie"
            />
            <div className="section__about__contact">
              <h2>Kontakt</h2>
              <div className="section__about__contact__row">
                <img src={iconEmail} alt="napisz email" />
                <h3>kporadafoto@gmail.com</h3>
              </div>
              <div className="section__about__contact__row">
                <img src={iconPhone} alt="zadzwoń" />
                <h3>+48 537 256 492</h3>
              </div>
            </div>
          </div>

          <div className="section__about__content">
            <h1>O mnie</h1>
            <br />
            <p>
              Świetnie odnajduję się tam gdzie są emocje. Specjalizuje się w
              fotografii sportowej, a najbliższe mojemu sercu są takie
              dyscypliny jak: bieganie oraz triathlon. Sam prężnie rozwijam się
              jako biegacz górski, zdobywając wysokie lokaty na zawodach. Dzięki
              czemu świetnie odnajduję się w tym środowisku, rozumiem temat,
              utożsamiam się z sportowcami.
            </p>
            <br />
            <p>
              Moją ulubioną dziedzina fotografii jest REPORTAŻ, czyli w miejsca
              gdzie akcja dzieje się cały czas, a ja mogę wykorzystać inne
              patrzenie na świat oraz duże zaangażowanie.
            </p>
            <br />
            <p>
              Fotografia sprawia mi ogromną satysfakcję, co można poczuć podczas
              współpracy ze mną, cechuję się niezwykłym entuzjazmem oraz
              optymizmem, uwielbiam kontakt z ludźmi i ogromną radość sprawia
              mi, towarzyszenie Wam, w tak ważnych dla Was momentach,
              wydarzeniach, chwilach.
            </p>
            <br />
            <p>
              Ciągle się rozwijam oraz poszerzam swoje umiejętności/kompetencje,
              zbieram doświadczenie, oraz próbuję nowych wyzwań podczas
              wszelkiego rodzaju zleceń. Działam głównie na Podkarpaciu, okolice
              miasta Rzeszów, oraz Południu Polski.
            </p>
          </div>
        </div>
        <div className="section__about__images"></div>
        <img
          src={img2}
          className="section__about__image--secondary"
          alt="moje zdjęcie"
        />
        <img
          src={img1}
          className="section__about__image--secondary"
          alt="moje zdjęcie"
        />
      </div>
      <Footer />
    </>
  );
};

export default About;
