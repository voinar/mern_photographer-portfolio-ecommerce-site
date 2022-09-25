import { Link } from 'react-router-dom';

const AlbumCard = (props) => {
  const { image } = props;

  return (
    <Link to={`/album/${image.album}`}>
      <div className="shop__card">
        <img src={image.url} alt="" />
        <div className="shop__card__info">
          {/* <div className="shop__card__title">
                    <span>{image.album}</span>
                  </div> */}
          <div className="shop__card__date">
            <span>{image.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
