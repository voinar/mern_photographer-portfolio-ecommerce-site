import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';
import IconCartAdd from '../img/icons/icon-cart-add.svg';

const Album = () => {
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const { album } = useParams();
  const navigate = useNavigate();

  const handleImagePreview = (e) => {
    console.log(e.target.getAttribute('src'));
    setShowPreviewImage((prevState) => !prevState);
    setPreviewImageUrl(e.target.getAttribute('src'));
    console.log('previewImageUrl ' + previewImageUrl);
  };

  const handleImagePreviewPrev = () => {
    let imageIndex = albumsData.albums[0]?.url;
    console.log('previewImageUrl ' + imageIndex);
  };

  const handleImagePreviewNext = () => {};
  // console.log(album);

  const addToCart = () => {
    console.log('added to cart');
  };

  const albumImage = albumsData.albums.map((image) => {
    if (image.album === album) {
      return (
        <>
          <div className="album__card" onClick={handleImagePreview}>
            <img src={image.url} alt="" />
          </div>
        </>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      <main>
        <Helmet>
          <title>{album}: Kacper Porada</title>
        </Helmet>
        <div className="album__container">
          <div className="album__toolbar">
            <div className="album__title">
              <img
                src={IconChevron}
                alt="zobacz"
                onClick={() => navigate(-1)}
              />
              <h1>{album}</h1>
            </div>
            <h2>
              {albumsData.albums[0]?.location}, {albumsData.albums[0]?.date}
            </h2>
            <div className="album__toolbar__elements">
              <div className="album__toolbar__element">
                <span>Nazwa</span>
                <img src={IconChevron} alt="zobacz" />
              </div>
              <div className="album__toolbar__element">
                <span>Miejsce</span>
                <img src={IconChevron} alt="zobacz" />
              </div>
              <div className="album__toolbar__element">
                <span>Data</span>
                <img src={IconChevron} alt="zobacz" />
              </div>
            </div>
          </div>
          <div className="album__cards">
            {albumImage}
            {showPreviewImage && (
              <>
                <div className="album__preview" onClick={handleImagePreview}>
                  <img
                    className="album__preview-image"
                    src={previewImageUrl}
                    alt=""
                  />
                </div>
                <div className="album__preview-image__tools">
                  <img
                    className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
                    src={IconChevron}
                    alt="poprzednie zdjęcie"
                    title="poprzednie zdjęcie"
                    onClick={handleImagePreviewPrev}
                  />
                  <img
                    src={IconCartAdd}
                    alt="dodaj do koszyka"
                    title="dodaj do koszyka"
                    onClick={addToCart}
                  />
                  <img
                    className="album__preview-image__tools__arrow album__preview-image__tools__arrow--next"
                    src={IconChevron}
                    alt="następne zdjęcie"
                    title="następne zdjęcie"
                    onClick={handleImagePreviewNext}
                  />
                  {/* <div className="album__preview-image__tools__cart-add"></div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Album;
