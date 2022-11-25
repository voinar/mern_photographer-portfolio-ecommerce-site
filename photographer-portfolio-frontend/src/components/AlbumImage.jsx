// import { useState, LoadingSpinner } from '../imports';

const AlbumImage = (props) => {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (    <div
    className={props.albumCardSize}
    onClick={props.handleImagePreview}
    src={props.url}
  >
    <span style={{ display: 'none' }}>{props.id}</span>
    <img
      src={props.url}
      alt="zdjęcie"
      loading="lazy"
      // onLoad={() => setIsLoaded(true)}
    />
  </div>)

  // isLoaded ? (
  //   <div
  //     className={props.albumCardSize}
  //     onClick={props.handleImagePreview}
  //     src={props.url}
  //   >
  //     <span style={{ display: 'none' }}>{props.id}</span>
  //     <img
  //       src={props.url}
  //       alt="zdjęcie"
  //       loading="lazy"
  //       onLoad={() => setIsLoaded(true)}
  //     />
  //   </div>
  // ) : (
  //   <LoadingSpinner />
  // );
};

export default AlbumImage;
