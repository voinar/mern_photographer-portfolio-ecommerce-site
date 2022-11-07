import {
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
import { Store } from '../contexts/Store';

import { ref, listAll } from 'firebase/storage';
import { storage } from '../firebase/config';

const Album = () => {
  const { album } = useParams(); //used to fetch current album data from firebase storage
  const { state, dispatch: contextDispatch } = useContext(Store);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  const token = 'a9586b20-d423-4ef6-807e-2ca64610af45';

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
      window.scrollY > 110 ? setScroll(true) : setScroll(false);
    });
  }, [album]);

  const toggleToolbarClassOnScroll = () => {
    console.log('scroll test', window.scrollY > 100);
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

  //preview images in album page
  const handleImagePreview = (image) => {
    setPreviewImageUrl(image);
    setShowPreviewImage((prevState) => !prevState);
    console.log(image);
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
              <button onClick={goBack}>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <h1>{album}</h1>
              <div className="album__toolbar__thumbnail-controls">
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
            {albumImagesList.map((image) => {
              return (
                <li key={image}>
                  <AlbumImage
                    id={image}
                    url={image}
                    albumCardSize={`album__card ${imageThumbnailSize}`}
                    // price={image.price}
                    // uuid={uuidv4()}
                    handleImagePreview={() => handleImagePreview(image)}
                  />

                  {imageThumbnailSize === 'album__card--large' ? (
                    <div className="album__card__add-btn">
                      <button
                        onClick={() => addToCartFromImageThumbnail(image)}
                      >
                        {/* <button onClick={() => console.log(image)}> */}
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
                        className="album__preview"
                        style={{ top: window.scrollY }}
                        onClick={handleImagePreview}
                      >
                        <img
                          className="album__preview-image"
                          src={previewImageUrl}
                          alt=""
                        />
                      </div>
                      <div
                        className="album__preview-image__tools"
                        style={{ top: (window.scrollY + window.innerHeight - window.innerHeight/4) }}
                      >
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
                    </>
                  )}
                </li>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Album;