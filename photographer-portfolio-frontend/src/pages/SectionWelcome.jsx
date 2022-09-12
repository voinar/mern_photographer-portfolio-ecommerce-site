import photographyData from "../data/data.json";
// import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel, onChange, onClickItem, onClickThumb } from 'react-responsive-carousel';
import { Carousel } from "react-responsive-carousel";

import iconFacebook from "../img/icons/icon-facebook.svg";
import iconInstagram from "../img/icons/icon-instagram.svg";
// import chevronUp from "../img/icons/chevron-up.svg";

// import BrowseCoverImages from "../utils/BrowseCoverImages";

const SectionWelcome = () => {
  // const { coverImageIndex, prevImage, nextImage } = BrowseCoverImages();

  // autoScroll();

  return (
    <main>
      <div className="section__welcome">
        {/* <img
          className="cover__image"
          src={`${photographyData.images[coverImageIndex].url}`}
          alt={`${photographyData.images[coverImageIndex].description}`}
        /> */}
        {/* {photographyData.images.map((images) => {
          return (<img
          className="cover__image"
          src={`${images.url}`}
          alt={`${images.description}`}
        />)
        })} */}
        <Carousel
          autoPlay={true}
          interval={3000}
          ariaLabel={"moje zdjęcia"}
          showThumbs={false}
          animationHandler={"fade"}
          infiniteLoop={true}
          showStatus={false}
          // showArrows={true}
          // onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
        >
          {photographyData.images.map((images) => {
            return (
              <div key={uuidv4()}>
                <img
                  className="cover__image"
                  style={{ width: "100vw" }}
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
            <img src={iconFacebook} alt="facebook" />
          </div>
          <div className="cover__icons__social">
            <img src={iconInstagram} alt="instagram" />
          </div>
        </div>
        {/* <div className="cover__icons__row-container">
          <div className="cover__icons__nav--left" onClick={prevImage}>
            <img
              className="icon__chevron-left"
              src={chevronUp}
              alt="poprzednie zdjęcie"
            />
          </div>
          <div className="cover__icons__nav--right" onClick={nextImage}>
            <img
              className="icon__chevron-right"
              src={chevronUp}
              alt="następne zdjęcie"
            />
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default SectionWelcome;
