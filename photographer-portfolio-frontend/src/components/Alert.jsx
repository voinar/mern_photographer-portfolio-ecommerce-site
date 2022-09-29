const Alert = (props) => {
  return (
    <div className="alert__container alert__container--green alert__autohide">
      <div className="alert__content">{props.alertContent} Dodano do koszyka</div>
    </div>
  );
};

export default Alert;
