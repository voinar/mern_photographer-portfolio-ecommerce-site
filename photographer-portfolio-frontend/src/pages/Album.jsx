import { useState } from 'react';
import { useParams } from 'react-router-dom';
import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';

const Album = () => {
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const { album } = useParams();

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
  console.log(album);
  return (
    <>
      <main>
        <div className="album__container">
          <div className="album__toolbar">
            <h1>{album}</h1>
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
            {albumsData.albums.map((image) => {
              return (
                <>
                  <div className="album__card" onClick={handleImagePreview}>
                    <img src={image.url} alt="" />
                  </div>
                </>
              );
            })}
          </div>
          {showPreviewImage && (
            <>
              <img
                className="album__preview-image__arrow album__preview-image__arrow--prev"
                src={IconChevron}
                alt="poprzednie zdjęcie"
                title="poprzednie zdjęcie"
                onClick={handleImagePreviewPrev}
              />
              <div
                className="album__preview-image"
                onClick={handleImagePreview}
              >
                <img src={previewImageUrl} alt="" />
              </div>
              <img
                className="album__preview-image__arrow album__preview-image__arrow--next"
                src={IconChevron}
                alt="następne zdjęcie"
                title="następne zdjęcie"
                onClick={handleImagePreviewNext}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Album;
