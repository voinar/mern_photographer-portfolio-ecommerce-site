import {
  React,
  useState,
  useEffect,
  useParams,
  Helmet,
  IconChevronUp,
} from '../imports';

import photographyData from '../data/staticData.json';

const SectionContent = () => {
  let { category } = useParams();

  const [scrollToContentBtn, setScrollToContentBtn] = useState(true);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 100
        ? setScrollToContentBtn(false)
        : setScrollToContentBtn(true);
    });
  }, []);

  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const handleImagePreview = (e) => {
    setShowPreviewImage((prevState) => !prevState);
    setPreviewImageUrl(e.target.getAttribute('src'));
  };

  return (
    <>
      <Helmet>
        <title>{category.toUpperCase() + ' Kacper Porada Fotografia'}</title>
      </Helmet>
      <main>
        <ul className="section__photos">
          {console.log(window.innerWidth < 768)}
          {window.innerWidth < 768
            ? photographyData.images.map((image) => {
                if (image.isMobile !== undefined) {
                  if (image.category === category) {
                    return (
                      <li className="section">
                        <div className="section__photos__images__image--mobile">
                          <img src={image.url} alt={image.description} />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })
            : null}

          {photographyData.images.map((image) => {
            if (image.category === category && image.isMobile === undefined) {
              return (
                <li className="section__photos__images" key={`${image.url}`}>
                  <div
                    className="section__photos__images__image"
                    src={image.url}
                    onClick={handleImagePreview}
                  >
                    <img
                      className={
                        image.isVertical
                          ? 'section__photos__images__image--vertical'
                          : null
                      }
                      src={`${image.url}`}
                      alt={`${image.description}`}
                    />
                    {image.description.length > 0 ? (
                      <span className="section__photos__description">
                        {image.description}
                      </span>
                    ) : (
                      <span
                        className="section__photos__description"
                        style={{ display: 'none' }}
                      >
                        {image.description}
                      </span>
                    )}
                  </div>
                </li>
              );
            } else return null;
          })}
        </ul>
        <div
          className={
            scrollToContentBtn
              ? 'section__photos__see-more'
              : 'section__photos__see-more section__photos__see-more--hidden'
          }
        >
          <div className="section__photos__see-more__container">
            <div
              className="section__photos__see-more__icon"
              onClick={scrollToContent}
            >
              <img src={IconChevronUp} alt="facebook" />
            </div>
          </div>
        </div>
        {showPreviewImage && window.innerWidth < 768 ? ( //image preview modal, show only in mobile mode
          <>
            <div
              className="section__photos__preview"
              onClick={handleImagePreview}
            >
              <img
                className="section__photos__preview__image"
                src={previewImageUrl}
                alt=""
              />
            </div>
          </>
        ) : null}
      </main>
    </>
  );
};

export default SectionContent;

// {this.state.productCategories.categories.map((category) => {
//   return (
//     <Route
//       key={`${category.name}`}
//       path={`${category.name}`}
//       element={
//         <ProductListing
//           category={`${category.name}`}
//         />
//       }
//     />
//   );
// })}
