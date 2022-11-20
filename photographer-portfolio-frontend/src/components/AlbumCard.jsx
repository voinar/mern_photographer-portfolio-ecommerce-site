import { Link } from '../imports';

const AlbumCard = (props) => {
  // console.log('id is: ' + JSON.stringify(props.image._id));
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

export default AlbumCard;
