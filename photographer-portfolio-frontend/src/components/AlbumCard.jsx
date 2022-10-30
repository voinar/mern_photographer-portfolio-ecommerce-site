import { Link } from 'react-router-dom';

const AlbumCard = (props) => {
  // console.log('id is: ' + JSON.stringify(props.image._id));
  const { image } = props;
  console.log('img props', props.collection)

  return (
      <Link key={props.image} to={`/album/${props.collection}`}>
        <div className="shop__card">
          <img src={image} alt="" />
          <div className="shop__card__info">
            {/* <div className="shop__card__title">
                    <span>{image.album}</span>
                  </div> */}
            <div className="shop__card__date">
              {/* <span>{image.date}</span> */}
            </div>
          </div>
        </div>
      </Link>
  );
};

export default AlbumCard;
