import { Store } from '../contexts/Store';
import { useContext, useState, useReducer, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';
import IconCartAdd from '../img/icons/icon-cart-add.svg';

//components
import AlbumImage from '../components/AlbumImage';
// import LoadingSpinner from '../components/LoadingSpinner';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, currentAlbumData: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Album = () => {
  const { album } = useParams(); //used to fetch current album data via axios

  const [
    {
      // loading,
      currentAlbumData,
      //  error
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    currentAlbumData: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/data');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  //local component state
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  // const [currentPreviewId, setCurrentPreviewId] = useState('');

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  //global state imports & operations

  // preview images in album page
  const handleImagePreview = (e) => {
    setShowPreviewImage((prevState) => !prevState);
    setPreviewImageUrl(e.target.getAttribute('src'));
    console.log('src: ' + e.currentTarget.getAttribute('src'));
    // setCurrentPreviewId(e.target.previousSibling.innerHTML);
    // console.log("currentPreviewId" + e.target.previousSibling.innerHTML)
  };

  const handleImagePreviewPrev = () => {
    setPreviewImageUrl(
      previewImageUrl.toString().slice(0, -5) +
        (Number(previewImageUrl.toString().slice(-5, -4)) - 1) +
        previewImageUrl.toString().slice(-4)
    );
  };

  const handleImagePreviewNext = () => {
    setPreviewImageUrl(
      previewImageUrl.toString().slice(0, -5) +
        (Number(previewImageUrl.toString().slice(-5, -4)) + 1) +
        previewImageUrl.toString().slice(-4)
    );
  };

  const { state, dispatch: contextDispatch } = useContext(Store);

  const addToCart = () => {
    // console.log('add to cart');
    contextDispatch({
      type: 'CART_ADD_ITEM',
      payload: { id: previewImageUrl, item: previewImageUrl },
    });
    console.log('local state: ' + JSON.stringify(state));
    // console.log('added to cart' + JSON.stringify(e));
  };

  const albumImage = currentAlbumData.map((image) => {
    if (image.album === album) {
      return (
        <>
          <AlbumImage
            url={image.url}
            id={image.id}
            // uuid={uuidv4()}
            handleImagePreview={handleImagePreview}
          />
        </>
      );
    } else {
      return null;
    }
  });
  // console.log('state is ' + JSON.stringify(state));

  return (
    <>
      <main>
        <Helmet>
          <title>{album}: Kacper Porada Fotografia</title>
        </Helmet>
        <div className="album__container">
          <div className="album__toolbar">
            <div className="album__title">
              <button onClick={goBack}>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <h1>{album}</h1>
            </div>
            <h2>
              {currentAlbumData[0]?.location}, {currentAlbumData[0]?.date}
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
                  <button onClick={handleImagePreviewPrev}>
                    <img
                      className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
                      src={IconChevron}
                      alt="poprzednie zdjęcie"
                      title="poprzednie zdjęcie"
                    />
                  </button>
                  <button onClick={addToCart}>
                    <img
                      src={IconCartAdd}
                      alt="dodaj do koszyka"
                      title="dodaj do koszyka"
                      onClick={addToCart}
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Album;
