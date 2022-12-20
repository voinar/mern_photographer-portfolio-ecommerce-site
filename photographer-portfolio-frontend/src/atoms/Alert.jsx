import {
  React, useContext, Store,
} from '../imports';

function Alert() {
  const { state } = useContext(Store);

  return state.alertContent !== null && (
    <div className="alert__container alert__container--green alert__autohide">
      <div className="alert__content">{state.alertContent}</div>
    </div>
  );
}

export default Alert;
