import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useContext } from 'react';
import { Store } from '../contexts/Store';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../firebase/config';

//assets
import IconChevron from '../img/icons/icon-chevron.svg';
import IconCartAdd from '../img/icons/icon-cart-add.svg';
import IconGridSmall from '../img/icons/icon-grid-small.svg';
import IconGridMedium from '../img/icons/icon-grid-medium.svg';
import IconGridLarge from '../img/icons/icon-grid-large.svg';

//components
import AlbumImage from '../components/AlbumImage';

const Album = () => {
  const { album } = useParams(); //used to fetch current album data from firebase storage
  const { state, dispatch: contextDispatch } = useContext(Store);

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  const token = 'a9586b20-d423-4ef6-807e-2ca64610af45';

  //local component state
  const [albumImagesList, setAlbumImagesList] = useState([]);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);
  //   const [previewImageId, setPreviewImageId] = useState(undefined);

  const [imageThumbnailSize, setImageThumbnailSize] = useState('album__card--small');

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

  //   // preview images in album page
  const handleImagePreview = (image) => {
    // setPreviewImageId(image._id);
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
    // console.log(previewImageUrl)
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

  // const { state, dispatch: contextDispatch } = useContext(Store);

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
              <div className="album__toolbar__thumbnail-controls">
                <button onClick={() => setImageThumbnailSize('album__card--small')}>
                  <img src={IconGridSmall} alt="mały rozmiar podglądów" />
                </button>
                <button onClick={() => setImageThumbnailSize('album__card--medium')}>
                  <img src={IconGridMedium} alt="średni rozmiar podglądów" />
                </button>
                <button onClick={() => setImageThumbnailSize('album__card--large')}>
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

                  {showPreviewImage && ( //image preview overlay
                    <>
                      <div
                        className="album__preview"
                        onClick={handleImagePreview}
                      >
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
                        <button onClick={() => addToCart(image._id)}>
                          <img
                            src={IconCartAdd}
                            alt="dodaj do koszyka"
                            title="dodaj do koszyka"
                            // onClick={addToCart}
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

// import { Store } from '../contexts/Store';
// import { useContext, useState, useReducer, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import axios from 'axios';
// import Footer from '../components/Footer';

// // import { v4 as uuidv4 } from 'uuid';

// //assets
// import IconChevron from '../img/icons/icon-chevron.svg';
// import IconCartAdd from '../img/icons/icon-cart-add.svg';

// //components
// import AlbumImage from '../components/AlbumImage';
// // import LoadingSpinner from '../components/LoadingSpinner';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, currentAlbumData: action.payload };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const Album = () => {
//   const { album } = useParams(); //used to fetch current album data via axios

//   const [
//     {
//       // loading,
//       currentAlbumData,
//       //  error
//     },
//     dispatch,
//   ] = useReducer(reducer, {
//     loading: true,
//     currentAlbumData: [],
//     error: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });
//       try {
//         const result = await axios.get('/api/products');
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }
//     };
//     fetchData();
//   }, []);

//   //local component state
//   const [showPreviewImage, setShowPreviewImage] = useState(false);
//   const [previewImageUrl, setPreviewImageUrl] = useState(undefined);
//   const [previewImageId, setPreviewImageId] = useState(undefined);

//   const navigate = useNavigate(); //used to return to previous page
//   const goBack = () => navigate(-1);

//   //global state imports & operations

//   // preview images in album page
//   const handleImagePreview = (image) => {
//     setPreviewImageId(image._id);
//     setPreviewImageUrl(image.imageMedium);
//     setShowPreviewImage((prevState) => !prevState);
//     // console.log(image._id)
//   };

//   const handleImagePreviewPrev = () => {
//     setPreviewImageUrl(
//       previewImageUrl.toString().slice(0, -5) +
//         (Number(previewImageUrl.toString().slice(-5, -4)) - 1) +
//         previewImageUrl.toString().slice(-4)
//     );
//   };

//   const handleImagePreviewNext = () => {
//     setPreviewImageUrl(
//       previewImageUrl.toString().slice(0, -5) +
//         (Number(previewImageUrl.toString().slice(-5, -4)) + 1) +
//         previewImageUrl.toString().slice(-4)
//     );
//   };

//   const { state, dispatch: contextDispatch } = useContext(Store);

//   const addToCart = () => {
//     try {
//       contextDispatch({
//         type: 'CART_ADD_ITEM',
//         payload: { id: previewImageId },
//       });
//       localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const albumImage = currentAlbumData.map((image) => {
//     if (image.album === album) {
//       return (
//         <li key={image._id}>
//           <AlbumImage
//             id={image._id}
//             url={image.imageMedium}
//             price={image.price}
//             // uuid={uuidv4()}
//             handleImagePreview={() => handleImagePreview(image)}
//           />
//           {showPreviewImage && ( //image preview overlay
//             <>
//               <div className="album__preview" onClick={handleImagePreview}>
//                 <img
//                   className="album__preview-image"
//                   src={previewImageUrl}
//                   alt=""
//                 />
//               </div>
//               <div className="album__preview-image__tools">
//                 <button onClick={handleImagePreviewPrev}>
//                   <img
//                     className="album__preview-image__tools__arrow album__preview-image__tools__arrow--prev"
//                     src={IconChevron}
//                     alt="poprzednie zdjęcie"
//                     title="poprzednie zdjęcie"
//                   />
//                 </button>
//                 <button onClick={() => addToCart(image._id)}>
//                   <img
//                     src={IconCartAdd}
//                     alt="dodaj do koszyka"
//                     title="dodaj do koszyka"
//                     // onClick={addToCart}
//                   />
//                 </button>
//                 <button onClick={handleImagePreviewNext}>
//                   <img
//                     className="album__preview-image__tools__arrow album__preview-image__tools__arrow--next"
//                     src={IconChevron}
//                     alt="następne zdjęcie"
//                     title="następne zdjęcie"
//                   />
//                 </button>
//               </div>
//             </>
//           )}
//         </li>
//       );
//     } else {
//       return null;
//     }
//   });
//   // console.log('state is ' + JSON.stringify(state));

//   return (
//     <>
//       <main>
//         <Helmet>
//           <title>{album}: Kacper Porada Fotografia</title>
//         </Helmet>
//         <div className="album__container">
//           <div className="album__toolbar">
//             <div className="album__title">
//               <button onClick={goBack}>
//                 <img src={IconChevron} alt="zobacz" />
//               </button>
//               <h1>{album}</h1>
//             </div>
//             <h2>
//               {currentAlbumData[0]?.location} {currentAlbumData[0]?.date}
//             </h2>
//             {/* <div className="album__toolbar__elements">
//               <div className="album__toolbar__element">
//                 <span>Nazwa</span>
//                 <img src={IconChevron} alt="zobacz" />
//               </div>
//               <div className="album__toolbar__element">
//                 <span>Miejsce</span>
//                 <img src={IconChevron} alt="zobacz" />
//               </div>
//               <div className="album__toolbar__element">
//                 <span>Data</span>
//                 <img src={IconChevron} alt="zobacz" />
//               </div>
//             </div> */}
//           </div>
//           <div className="album__cards">{albumImage}</div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Album;
