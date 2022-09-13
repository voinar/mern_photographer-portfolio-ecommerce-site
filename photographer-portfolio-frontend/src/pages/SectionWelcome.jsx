import photographyData from '../data/data.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';

import iconFacebook from '../img/icons/icon-facebook.svg';
// import iconInstagram from '../img/icons/icon-instagram.svg';

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
        >
          {photographyData.images.map((images) => {
            return (
              <div key={uuidv4()}>
                <img
                  className="cover__image"
                  style={{ width: '100vw' }}
                  src={images.url}
                  alt="moje zdjęcia"
                />
                {/* <p className="legend">Legend 1</p> */}
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="cover__icons">
        <div className="cover__icons__row-container">
          <div className="cover__icons__social">
            <a
              href="https://www.facebook.com/profile.php?id=100069653350294"
              target="_blank"
              rel="noreferrer"
            >
              <img src={iconFacebook} alt="facebook" />
            </a>
          </div>
          {/* <div className="cover__icons__social">
            <img src={iconInstagram} alt="instagram" />
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default SectionWelcome;
