// import { useEffect } from 'react';
import {
  Store,
  useState,
  useContext,
  IconCartAdd,
} from '../imports';

const AlbumImage = (props) => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  const [isLoaded, setIsLoaded] = useState(false);
  const image = props.image;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const addToCartFromImageThumbnail = (image) => {
    console.log('addimg');
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

  return (
    <>
      <div
        className={`${isLoaded ? null : 'album__card--isloading'} ${
          props.albumCardSize
        }`}
        onClick={props.handleImagePreview}
        src={props.url}
        onLoad={handleLoad}
        // loading="lazy"
      >
        <span style={{ display: 'none' }}>{props.id}</span>
        <img src={props.url} alt="zdjęcie" />
      </div>

      {window.innerWidth <= 768 && isLoaded === true ? (
        <div className="album__card__mobile__add-btn">
          <button onClick={() => addToCartFromImageThumbnail(image)}>
            <img
              src={IconCartAdd}
              alt="dodaj do koszyka"
              title="dodaj do koszyka"
            />
          </button>
        </div>
      ) : null}

    </>
  );
};

export default AlbumImage;
