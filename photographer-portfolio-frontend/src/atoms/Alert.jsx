import { useContext, Store } from '../imports';

const Alert = () => {
  const {
    state,
    // , dispatch: contextDispatch
  } = useContext(Store);

  return (
    <>
      {state.alertContent !== null && (
        <div className="alert__container alert__container--green alert__autohide">
          <div className="alert__content">{state.alertContent}</div>
        </div>
      )}
    </>
  );
};

export default Alert;
