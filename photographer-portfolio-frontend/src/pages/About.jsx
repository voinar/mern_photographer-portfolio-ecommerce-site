import Footer from "../components/Footer";
import bioPic from '../img/about.jpg'
import iconEmail from '../img/icons/icon-email.svg'
import iconPhone from '../img/icons/icon-phone.svg'

const About = () => {
  return (
    <>
      <div className="section__about">
      <div className="section__about__main">
      <img src={bioPic} alt="moje zdjęcie" />
      <div>
      <h1>O mnie</h1>
      <br/>
      <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.
        <br/>
        <br/>
        Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        <br/>
        <br/>
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?" 1914 translation by H. Rackham
        </p>
        </div>
      </div>
        <div className="section__about__contact">
            <h2 >Kontakt</h2>
            <div className="section__about__contact__row"><img src={iconEmail} alt="napisz email" /><h3>kacper@kpkpkp.com</h3></div>
            <div className="section__about__contact__row"><img src={iconPhone} alt="zadzwoń" /><h3>517 715 705</h3></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
