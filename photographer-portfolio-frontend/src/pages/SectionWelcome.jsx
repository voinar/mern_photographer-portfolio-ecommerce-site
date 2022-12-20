import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {
  v4, IconFacebook, IconInstagram, IconMail,
} from '../imports';
import photographyData from '../data/staticData.json';

function SectionWelcome() {
  return (
    <main>
      <div className="section__welcome">
        <Carousel
          autoPlay
          interval={3000}
          ariaLabel="moje zdjęcia"
          showThumbs={false}
          animationHandler={window.innerWidth >= 1024 ? 'fade' : null}
          infiniteLoop
          showStatus={false}
          // showArrows={true}
          swipeable
        >
          { window.innerWidth > 768
            ? photographyData.imagesWelcome.map(
              (image) => (
                <div key={v4()}>
                  <img
                    className="cover__image"
                    style={{ width: '100vw' }}
                    src={image.url}
                    alt="moje zdjęcia"
                  />
                </div>
              ),
            )
            : photographyData.imagesWelcomeMobile.map(
              (image) => (
                <div key={v4()}>
                  <img
                    className="cover__image"
                    style={{ width: '100vw' }}
                    src={image.url}
                    alt="moje zdjęcia"
                  />
                </div>
              ),
            )}
        </Carousel>
      </div>
      <div className="cover__icons">
        <div className="cover__icons__row-container">
          <div className="cover__icons__social">
            <a
              href={`${process.env.REACT_APP_SOCIAL_FACEBOOK}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={IconFacebook} alt="facebook" />
            </a>
            <a
              href={`${process.env.REACT_APP_SOCIAL_INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={IconInstagram} alt="instagram" />
            </a>
            <a href="/portfolio/o%20mnie">
              <img src={IconMail} alt="kontakt" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SectionWelcome;
