import PropTypes from 'prop-types';
import { Link } from '../imports';

function ShopCard(props) {
  const { image } = props;
  const { collection } = props;
  const { albumName } = props;

  ShopCard.propTypes = {
    image: PropTypes.string.isRequired,
    collection: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
  };

  return (
    <Link key={image} to={`/album/${collection}`}>
      <div className="shop__card">
        <img src={image} alt={albumName} />
        <h2 className="shop__card__title">
          {albumName}
        </h2>
      </div>
    </Link>
  );
}

export default ShopCard;
