// /* eslint-disable no-shadow */
import {
  React,
  Store,
  Helmet,
  useEffect,
  useState,
  useContext,
  useParams,
  useNavigate,
  LoadingSpinner,
  AlbumImage,
  IconChevron,
  IconCartAdd,
  IconGridSmall,
  IconGridMedium,
  IconGridLarge,
  textContent,
  storage,
  ref,
  listAll,
} from '../imports';

function Album() {
  const { album } = useParams(); // used to fetch current album data from firebase storage
  const { state, dispatch: contextDispatch } = useContext(Store);

  const navigate = useNavigate(); // used to return to previous page
  const goBack = () => navigate(-1);

  // local component state
  const [albumImagesList, setAlbumImagesList] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);
  const [imageThumbnailSize, setImageThumbnailSize] = useState(
    window.innerWidth <= 768 ? 'album__card--small' : 'album__card--medium',
    // 'album__card--small',
  );

  useEffect(() => {
    const token = process.env.REACT_APP_FIREBASE_IMAGE_TOKEN;

    const albumRef = ref(storage, `albums/${album.replaceAll(' ', '_')}/male/`);
    listAll(albumRef)
      .then((res) => {
        res.items.forEach((image) => {
          if (image._location.path_.includes('cover.jpg') === false) {
            const currentImage = `https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/${image._location.path_.replaceAll('/', '%2F')}?alt=media&token=${token}`;
            // let currentImage =
            // 'https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/'
            // + image._location.path_.replaceAll('/', '%2F') +
            // `?alt=media&token=${token}`;

            setAlbumImagesList((prevAlbumImagesList) => [
              ...prevAlbumImagesList,
              currentImage,
            ]);
          }
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [album]);

  // retract title/toolbar on scroll
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        setScroll(true);
      } else setScroll(false);
    });
  }, [album]);

  const toggleToolbarClassOnScroll = () => {
    if (scroll === false) {
      return 'album__toolbar';
    } return 'album__toolbar album__toolbar--compact';
  };

  // lock page scroll when preview overlay is displayed
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = showPreviewImage ? 'hidden' : 'auto';
    }
  }, [showPreviewImage]);

  // pagination
  const [indexStart, setIndexStart] = useState(0);
  const [numberOfImages, setNumberOfImages] = useState(
    window.innerWidth <= 768 ? 100 : 50,
  );
  const [indexEnd, setIndexEnd] = useState(window.innerWidth <= 768 ? 100 : 50);
  const [albumControlsPrevInactive, setAlbumControlPrevInactive] = useState(true);
  const [albumControlsNextInactive, setAlbumControlsNextInactive] = useState(false);

  const handlePaginationRange = (n) => {
    setIndexStart(0);
    setIndexEnd(n);
    setNumberOfImages(n);
  };

  const handlePaginationNextPage = () => {
    if (showPreviewImage === false) {
      if (indexStart + numberOfImages < albumImagesList.length) {
        setIndexStart(indexStart + numberOfImages);
        setIndexEnd(indexEnd + numberOfImages);
        setAlbumControlPrevInactive(false);
        window.scrollTo(0, 0);
      } else {
        setAlbumControlsNextInactive(true);
      }
    }
  };

  const handlePaginationPrevPage = () => {
    if (showPreviewImage === false) {
      if (indexStart - numberOfImages < 0) {
        setAlbumControlPrevInactive(true);
      } else {
        setIndexStart(indexStart - numberOfImages);
        setIndexEnd(indexEnd - numberOfImages);
        setAlbumControlsNextInactive(false);
        window.scrollTo(0, 0);
      }
    }
  };

  const getIndexEnd = () => {
    if (indexEnd >= albumImagesList.length) {
      return albumImagesList.length;
    } return indexEnd;
  };

  // preview images in album page
  const handleImagePreview = (image) => {
    setPreviewImageUrl(image);
    setShowPreviewImage((prevState) => !prevState);
  };

  const handleImagePreviewPrev = () => {
    if (albumImagesList.indexOf(previewImageUrl) === 0) {
      setPreviewImageUrl(albumImagesList[albumImagesList.length - 1]);
    } else {
      setPreviewImageUrl(
        albumImagesList[albumImagesList.indexOf(previewImageUrl) - 1],
      ); // find item in images list and decrement by 1
    }
  };

  const handleImagePreviewNext = () => {
    if (
      albumImagesList.indexOf(previewImageUrl) === albumImagesList.length - 1
    ) {
      setPreviewImageUrl(albumImagesList[0]);
    } else {
      setPreviewImageUrl(
        albumImagesList[albumImagesList.indexOf(previewImageUrl) + 1],
      ); // find item in images list and increment by 1
    }
  };

  const addToCart = () => {
    try {
      contextDispatch({
        type: 'CART_ADD_ITEM',
        payload: { id: previewImageUrl },
      });
      sessionStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    } catch (err) {
      console.log(err);
    }
  };

  const addToCartFromImageThumbnail = (image) => {
    try {
      contextDispatch({
        type: 'CART_ADD_ITEM',
        payload: { id: image },
      });
      sessionStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    } catch (err) {
      console.log(err);
    }
  };

  // listen for key presses
  useEffect(() => {
    // const handlePaginationNextPage = () => {
    //   if (indexStart + numberOfImages < albumImagesList.length) {
    //     setIndexStart(indexStart + numberOfImages);
    //     setIndexEnd(indexEnd + numberOfImages);
    //     setAlbumControlPrevInactive(false);
    //     window.scrollTo(0, 0);
    //   } else {
    //     setAlbumControlsNextInactive(true);
    //   }
    // };

    // const handlePaginationPrevPage = () => {
    //   if (indexStart - numberOfImages < 0) {
    //     setAlbumControlPrevInactive(true);
    //   } else {
    //     setIndexStart(indexStart - numberOfImages);
    //     setIndexEnd(indexEnd - numberOfImages);
    //     setAlbumControlsNextInactive(false);
    //     window.scrollTo(0, 0);
    //   }
    // };

    // const handleImagePreviewPrev = () => {
    //   if (albumImagesList.indexOf(previewImageUrl) === 0) {
    //     setPreviewImageUrl(albumImagesList[albumImagesList.length - 1]);
    //   } else {
    //     setPreviewImageUrl(
    //       albumImagesList[albumImagesList.indexOf(previewImageUrl) - 1],
    //     ); // find item in images list and decrement by 1
    //   }
    // };

    // const handleImagePreviewNext = () => {
    //   if (
    //     albumImagesList.indexOf(previewImageUrl)
    //     === albumImagesList.length - 1
    //   ) {
    //     setPreviewImageUrl(albumImagesList[0]);
    //   } else {
    //     setPreviewImageUrl(
    //       albumImagesList[albumImagesList.indexOf(previewImageUrl) + 1],
    //     ); // find item in images list and increment by 1
    //   }
    // };

    const detectKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          if (showPreviewImage === true) {
            handleImagePreviewPrev();
          } handlePaginationPrevPage();
          break;
        case 'ArrowRight':
          if (showPreviewImage === true) {
            handleImagePreviewNext();
          } handlePaginationNextPage();
          break;
        default:
          return null;
      } return null;
    };
    window.addEventListener('keydown', detectKeyDown, false);

    return () => window.removeEventListener('keydown', detectKeyDown, false);
  });

  return (
    <>
      <Helmet>
        <title>
          {album}
          : Kacper Porada Fotografia
        </title>
      </Helmet>
      <main className="album__container">
        <div className={toggleToolbarClassOnScroll()}>
          <div className="album__title">
            <button onClick={goBack} className="btn--back" type="button">
              <img src={IconChevron} alt="zobacz" />
            </button>
            <h1>{album}</h1>
            <div className="album__toolbar__thumbnail-controls">
              <button
                style={
                  albumControlsPrevInactive
                    ? { opacity: '.6' }
                    : { opacity: '1' }
                }
                onClick={handlePaginationPrevPage}
                type="button"
              >
                {
                  textContent[
                    textContent.findIndex(
                      (obj) => obj.language === state.languageSelected,
                    )
                  ].button.previous
                }
              </button>

              <div className="album__toolbar__thumbnail-controls__dropdown">
                <button className="album__toolbar__thumbnail-controls__dropbtn" type="button">
                  <span>
                    {
                      textContent[
                        textContent.findIndex(
                          (obj) => obj.language === state.languageSelected,
                        )
                      ].album.numberOfImages
                  }
                  </span>
                  <img src={IconChevron} alt="rozwiń" />
                </button>
                <div className="album__toolbar__thumbnail-controls__dropdown-content">
                  <span
                    onClick={() => handlePaginationRange(25)}
                    onKeyDown={() => handlePaginationRange(25)}
                  >
                    25
                  </span>
                  <span
                    onClick={() => handlePaginationRange(50)}
                    onKeyDown={() => handlePaginationRange(50)}
                  >
                    50
                  </span>
                  <span
                    onClick={() => handlePaginationRange(75)}
                    onKeyDown={() => handlePaginationRange(75)}
                  >
                    75
                  </span>
                  <span
                    onClick={() => handlePaginationRange(100)}
                    onKeyDown={() => handlePaginationRange(100)}
                  >
                    100
                  </span>
                </div>
              </div>

              <button
                style={
                  albumControlsNextInactive
                    ? { opacity: '.6' }
                    : { opacity: '1' }
                }
                onClick={handlePaginationNextPage}
                type="button"
              >
                {
                  textContent[
                    textContent.findIndex(
                      (obj) => obj.language === state.languageSelected,
                    )
                  ].button.next
                }
              </button>

              <button
                onClick={() => setImageThumbnailSize('album__card--small')}
                type="button"
              >
                <img src={IconGridSmall} alt="mały rozmiar podglądów" />
              </button>
              <button
                onClick={() => setImageThumbnailSize('album__card--medium')}
                type="button"
              >
                <img src={IconGridMedium} alt="średni rozmiar podglądów" />
              </button>
              <button
                onClick={() => setImageThumbnailSize('album__card--large')}
                type="button"
              >
                <img src={IconGridLarge} alt="duży rozmiar podglądów" />
              </button>
            </div>
          </div>
        </div>
        <div className="album__cards">
          {albumImagesList.length === 0 ? <LoadingSpinner /> : null}
          {albumImagesList.slice(indexStart, indexEnd).map(
            (image) => (
              <li key={image}>
                <AlbumImage
                  image={image}
                  albumCardSize={`album__card ${imageThumbnailSize}`}
                  handleImagePreview={
                    window.innerWidth >= 768
                      ? () => handleImagePreview(image)
                      : null
                  }
                />

                {imageThumbnailSize === 'album__card--large' ? (
                  <div className="album__card__add-btn">
                    <button
                      onClick={() => addToCartFromImageThumbnail(image)}
                      type="button"
                    >
                      <img
                        src={IconCartAdd}
                        alt="dodaj do koszyka"
                        title="dodaj do koszyka"
                      />
                    </button>
                  </div>
                ) : null}

                {showPreviewImage && ( // image preview overlay
                  <>
                    <div
                      className="album__preview__background"
                      onClick={() => handleImagePreview(image)}
                      onKeyDown={() => handleImagePreview(image)}
                    />
                    <div
                      className="album__preview"
                      style={{ top: window.scrollY }}
                    >
                      <div className="album__preview-image__container">
                        <button
                          onClick={handleImagePreview}
                          className="album__preview__btn-close"
                          type="button"
                        >
                          X
                        </button>
                        <div className="album__preview-image">
                          <img
                            className="album__preview-image__picture"
                            src={previewImageUrl}
                            alt=""
                          />
                        </div>

                        <div className="album__preview-image__tools">
                          <button onClick={handleImagePreviewPrev} type="button">
                            <img
                              className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
                              src={IconChevron}
                              alt="poprzednie zdjęcie"
                              title="poprzednie zdjęcie"
                            />
                          </button>
                          <button onClick={() => addToCart(image._id)} type="button">
                            <img
                              src={IconCartAdd}
                              alt="dodaj do koszyka"
                              title="dodaj do koszyka"
                            />
                          </button>
                          <button onClick={handleImagePreviewNext} type="button">
                            <img
                              className="album__preview-image__tools__arrow album__preview-image__tools__arrow--next"
                              src={IconChevron}
                              alt="następne zdjęcie"
                              title="następne zdjęcie"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </li>
            ),
          )}
        </div>
        <div className="album__page__controls">
          <div
            className={
              albumControlsPrevInactive
                ? 'album__page__controls__prev album__page__controls__prev--inactive'
                : 'album__page__controls__prev'
            }
          >
            <button onClick={handlePaginationPrevPage} type="button">
              <img src={IconChevron} alt="poprzednie" />
            </button>
          </div>
          <div
            className={
              albumControlsNextInactive
                ? 'album__page__controls__next album__page__controls__next--inactive'
                : 'album__page__controls__next'
            }
          >
            <button onClick={handlePaginationNextPage} type="button">
              <img src={IconChevron} alt="następne" />
            </button>
          </div>
        </div>
        <div className="album__page-count">
          {albumImagesList.length === 0 ? null : (
            <span>
              {state.languageSelected === 'PL'
                ? `Oglądasz ${indexStart}-${getIndexEnd()} z ${
                  albumImagesList.length
                } zdjęć`
                : `You are viewing ${indexStart}-${getIndexEnd()} of ${
                  albumImagesList.length
                }`}
            </span>
          )}
        </div>
      </main>
    </>
  );
}

export default Album;
