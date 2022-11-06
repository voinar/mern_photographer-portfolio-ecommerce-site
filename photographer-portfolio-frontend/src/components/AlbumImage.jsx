const AlbumImage = (props) => {

  // const getImageThumbnailSize = () => {
  //   console.log('imgsize',props.albumCardSize)
  //   // return `album__card '${props.albumCardSize}'`
  //   return String('album__card', ' ' + props.albumCardSize)
  // }

  return (
    // <div className={`album__card '${props.albumCardSize}'`} onClick={props.handleImagePreview} src={props.url}>
    // <div className={`album__card album__card--small`} onClick={props.handleImagePreview} src={props.url}>
    <div className={props.albumCardSize} onClick={props.handleImagePreview} src={props.url}>
      <span style={{display: "none"}}>{props.id}</span>
      <img src={props.url} alt="" />
    </div>
  );
};

export default AlbumImage;
