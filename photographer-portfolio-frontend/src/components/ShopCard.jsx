import { Link } from '../imports';

const ShopCard = (props) => {
  const { image } = props;

  return (
    <Link key={props.image} to={`/album/${props.collection}`}>
      <div className="shop__card">
        <img src={image} alt={props.albumName} />
        <h2 className="shop__card__title">
          {props.albumName}
        </h2>
      </div>
    </Link>
  );
};

export default ShopCard;
