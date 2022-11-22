import {
  Store,
  Helmet,
  useEffect,
  useState,
  useContext,
  useParams,
  useNavigate,
  AlbumImage,
  IconChevron,
  IconCartAdd,
  IconGridSmall,
  IconGridMedium,
  IconGridLarge,
} from '../imports';

import {
  ref,
  listAll,
  // getDownloadURL
} from 'firebase/storage';
import { storage } from '../firebase/config';

const Album = () => {
  const { album } = useParams(); //used to fetch current album data from firebase storage
  const { state, dispatch: contextDispatch } = useContext(Store);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  // const token = 'universalToken';
  const token = 'a9586b20-d423-4ef6-807e-2ca64610af45';
  // const token = 'adf90091-3085-4adf-b27b-9edad8fd9723';

  //local component state
  const [albumImagesList, setAlbumImagesList] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);

  const [imageThumbnailSize, setImageThumbnailSize] =
    useState('album__card--small');

  useEffect(() => {
    const albumRef = ref(storage, `albums/${album.replaceAll(' ', '_')}/male/`);
    listAll(albumRef)
      .then((res) => {
        console.log('result', res);
        res.items.forEach((image) => {
          let currentImage =
            'https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/' +
            image._location.path_.replaceAll('/', '%2F') +
            `?alt=media&token=${token}`;

          setAlbumImagesList((prevAlbumImagesList) => [
            ...prevAlbumImagesList,
            currentImage,
          ]);
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [album]);

  //retract title/toolbar on scroll
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 40 ? setScroll(true) : setScroll(false);
    });
  }, [album]);

  const toggleToolbarClassOnScroll = () => {
    // console.log('scroll test', window.scrollY > 100);
    return scroll === false
      ? 'album__toolbar'
      : 'album__toolbar album__toolbar--compact';
  };

  //lock page scroll when preview overlay is displayed
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = showPreviewImage ? 'hidden' : 'auto';
    }
  }, [showPreviewImage]);

  //pagination
  const [indexStart, setIndexStart] = useState(0);
  const [numberOfImages, setNumberOfImages] = useState(20);
  const [indexEnd, setIndexEnd] = useState(20);

  const handlePaginationRange = (n) => {
    setIndexEnd(n);
    setNumberOfImages(n);
  };

  const handlePaginationNextPage = () => {
    setIndexStart(indexStart + numberOfImages);
    setIndexEnd(indexEnd + numberOfImages);
  };

  const handlePaginationPrevPage = () => {
    setIndexStart(indexStart - numberOfImages);
    setIndexEnd(indexEnd - numberOfImages);
  };

  //preview images in album page
  const handleImagePreview = (image) => {
    setPreviewImageUrl(image);
    console.log('Image Preview url', image);
    // const imageUrlFormatted = image
    //   .replace('https://firebasestorage.googleapis.com/v0/b/', 'gs://')
    //   .replace('/o', '')
    //   .replace('male', 'duze')
    //   .split('?')[0]
    //   .replace('jpg', 'JPG')
    //   .replace(/%2F/gi, '/');
    //   console.log('url:',image)
    //   console.log('large url:',imageUrlFormatted)
    // setPreviewImageUrl(getDownloadURL(ref(storage, image)));

    setShowPreviewImage((prevState) => !prevState);
  };

  const handleImagePreviewPrev = () => {
    console.log(albumImagesList.indexOf(previewImageUrl));
    if (albumImagesList.indexOf(previewImageUrl) === 0) {
      setPreviewImageUrl(albumImagesList[albumImagesList.length - 1]);
    } else {
      setPreviewImageUrl(
        albumImagesList[albumImagesList.indexOf(previewImageUrl) - 1]
      ); //find item in images list and decrement by 1
    }
  };

  const handleImagePreviewNext = () => {
    console.log(albumImagesList.indexOf(previewImageUrl));
    if (
      albumImagesList.indexOf(previewImageUrl) ===
      albumImagesList.length - 1
    ) {
      setPreviewImageUrl(albumImagesList[0]);
    } else {
      setPreviewImageUrl(
        albumImagesList[albumImagesList.indexOf(previewImageUrl) + 1]
      ); //find item in images list and increment by 1
    }
  };

  const addToCart = () => {
    try {
      contextDispatch({
        type: 'CART_ADD_ITEM',
        payload: { id: previewImageUrl },
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    } catch (err) {
      console.log(err);
    }
  };

  const addToCartFromImageThumbnail = (image) => {
    console.log('addimg');
    try {
      contextDispatch({
        type: 'CART_ADD_ITEM',
        payload: { id: image },
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main>
        <Helmet>
          <title>{album}: Kacper Porada Fotografia</title>
        </Helmet>
        <div className="album__container">
          <div className={toggleToolbarClassOnScroll()}>
            <div className="album__title">
              <button onClick={goBack} className="btn--back">
                <img src={IconChevron} alt="zobacz" />
              </button>
              <h1>{album}</h1>
              <div className="album__toolbar__thumbnail-controls">
                <button onClick={handlePaginationPrevPage}>
                  Poprzednia strona
                </button>

                <div class="album__toolbar__thumbnail-controls__dropdown">
                  <button class="album__toolbar__thumbnail-controls__dropbtn">
                    Ilość zdjęć
                  </button>
                  <div class="album__toolbar__thumbnail-controls__dropdown-content">
                    <span onClick={() => handlePaginationRange(20)}>20</span>
                    <span onClick={() => handlePaginationRange(30)}>30</span>
                    <span onClick={() => handlePaginationRange(50)}>50</span>
                    <span onClick={() => handlePaginationRange(75)}>75</span>
                    <span onClick={() => handlePaginationRange(100)}>100</span>
                  </div>
                </div>

                <button onClick={handlePaginationNextPage}>
                  Następna strona
                </button>

                <button
                  onClick={() => setImageThumbnailSize('album__card--small')}
                >
                  <img src={IconGridSmall} alt="mały rozmiar podglądów" />
                </button>
                <button
                  onClick={() => setImageThumbnailSize('album__card--medium')}
                >
                  <img src={IconGridMedium} alt="średni rozmiar podglądów" />
                </button>
                <button
                  onClick={() => setImageThumbnailSize('album__card--large')}
                >
                  <img src={IconGridLarge} alt="duży rozmiar podglądów" />
                </button>
              </div>
            </div>
          </div>
          <div className="album__cards">
            {albumImagesList.slice(indexStart, indexEnd).map((image) => {
              return (
                <li key={image}>
                  <AlbumImage
                    id={image}
                    url={image}
                    albumCardSize={`album__card ${imageThumbnailSize}`}
                    handleImagePreview={() => handleImagePreview(image)}
                  />

                  {imageThumbnailSize === 'album__card--large' ? (
                    <div className="album__card__add-btn">
                      <button
                        onClick={() => addToCartFromImageThumbnail(image)}
                      >
                        <img
                          src={IconCartAdd}
                          alt="dodaj do koszyka"
                          title="dodaj do koszyka"
                        />
                      </button>
                    </div>
                  ) : null}

                  {showPreviewImage && ( //image preview overlay
                    <>
                      <div
                        className="album__preview__background"
                        onClick={() => handleImagePreview(image)}
                      ></div>
                      <div
                        className="album__preview"
                        style={{ top: window.scrollY }}
                      >
                        <div className="album__preview-image__container">
                          <button
                            onClick={handleImagePreview}
                            className="album__preview__btn-close"
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
                            <button onClick={handleImagePreviewPrev}>
                              <img
                                className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
                                src={IconChevron}
                                alt="poprzednie zdjęcie"
                                title="poprzednie zdjęcie"
                              />
                            </button>
                            <button onClick={() => addToCart(image._id)}>
                              <img
                                src={IconCartAdd}
                                alt="dodaj do koszyka"
                                title="dodaj do koszyka"
                              />
                            </button>
                            <button onClick={handleImagePreviewNext}>
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
              );
            })}
          </div>
          <div className="album__page__controls">
            <div className="album__page__controls__prev">
              <button onClick={handlePaginationPrevPage}>-</button>
            </div>
            <div className="album__page__controls__next">
              <button onClick={handlePaginationNextPage}>+</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Album;
