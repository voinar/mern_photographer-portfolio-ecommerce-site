import photographyData from '../data/staticData.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { v4, IconFacebook, IconInstagram, IconMail } from '../imports';

const SectionWelcome = () => {
  return (
    <main>
      <div className="section__welcome">
        <Carousel
          autoPlay={true}
          interval={3000}
          ariaLabel={'moje zdjęcia'}
          showThumbs={false}
          animationHandler={'fade'}
          infiniteLoop={true}
          showStatus={false}
          // showArrows={true}
          swipeable={false}
        >
          {window.innerWidth > 768
            ? photographyData.imagesWelcome.map((image) => {
                return (
                  <div key={v4()}>
                    <img
                      className="cover__image"
                      style={{ width: '100vw' }}
                      src={image.url}
                      alt="moje zdjęcia"
                    />
                  </div>
                );
              })
            : photographyData.imagesWelcomeMobile.map((image) => {
                return (
                  <div key={v4()}>
                    <img
                      className="cover__image"
                      style={{ width: '100vw' }}
                      src={image.url}
                      alt="moje zdjęcia"
                    />
                  </div>
                );
              })}
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
            <a href="/o%20mnie">
              <img src={IconMail} alt="kontakt" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SectionWelcome;
