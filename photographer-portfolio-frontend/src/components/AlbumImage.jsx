const AlbumImage = (props) => {
  return (
    <div className="album__card" onClick={props.handleImagePreview} src={props.url}>
      {/* <span id="currentPreviewId" style={{display: "none"}}>{props.uuid}</span> */}
      <span id="currentPreviewId" style={{display: "none"}}>{props.id}</span>
      <img src={props.url} alt="" />
    </div>
  );
};

export default AlbumImage;
