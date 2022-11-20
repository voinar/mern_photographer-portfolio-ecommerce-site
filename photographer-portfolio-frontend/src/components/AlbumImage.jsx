const AlbumImage = (props) => {
  return (
    <div
      className={props.albumCardSize}
      onClick={props.handleImagePreview}
      src={props.url}
    >
      <span style={{ display: 'none' }}>{props.id}</span>
      <img src={props.url} alt="zdjęcie" loading="lazy" />
    </div>
  );
};

export default AlbumImage;
