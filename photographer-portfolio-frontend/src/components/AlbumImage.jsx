import PropTypes from 'prop-types';
import {
  Store, useState, useContext, IconCartAdd,
} from '../imports';

function AlbumImage(props) {
  const { state, dispatch: contextDispatch } = useContext(Store);

  const [isLoaded, setIsLoaded] = useState(false);

  const { image } = props;
  const { albumCardSize } = props;
  const { handleImagePreview } = props;

  AlbumImage.propTypes = {
    image: PropTypes.string.isRequired,
    albumCardSize: PropTypes.string.isRequired,
    handleImagePreview: PropTypes.string.isRequired,
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const addToCartFromImageThumbnail = () => {
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
          albumCardSize
        }`}
        onClick={handleImagePreview}
        onKeyDown={handleImagePreview}
        // loading="lazy"
      >
        <span style={{ display: 'none' }}>{image}</span>
        <img
          src={image}
          onLoad={handleLoad}
          alt=""
        />
      </div>

      {window.innerWidth <= 768 && isLoaded === true ? (
        <div className="album__card__mobile__add-btn">
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
    </>
  );
}

export default AlbumImage;
