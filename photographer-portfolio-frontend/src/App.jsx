// main imports
import {
  ReactGA,
  ReactPixel,
  Store,
  useLocation,
  useState,
  Helmet,
  useEffect,
  useContext,
  ScrollToTop,
  Navbar,
  Footer,
  Alert,
  CookiesPopup,
} from './imports';

import RoutesContainer from './routes/RoutesContainer'; // react router v6

// // google analytics
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

// // facebook pixel
function FacebookPixel() {
  const location = useLocation();
  const facebookPixelId = process.env.REACT_APP_FACEBOOK_ANALYTICS_TRACKING_ID;
  useEffect(() => {
    ReactPixel.init(facebookPixelId);
    ReactPixel.pageView();
  }, [location, facebookPixelId]);
  return null;
}

function App() {
  const { state } = useContext(Store);
  const [showAlert, setShowAlert] = useState(false);

  // google analytics log page currently displayed
  const location = useLocation();
  useEffect(() => {
    if (
      state.cookiesConsentPopupSet === true
      && state.cookiesConsentAll === true
    ) {
      ReactGA.send('pageview');
    }
  }, [
    location,
    state.cookiesConsentPopupSet,
    state.cookiesConsentAll,
    state.cookiesConsentDecline,
  ]);

  // run actions on every state update
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  }, [state.cart.cartItems]);

  useEffect(() => {
    sessionStorage.setItem('uniqueId', JSON.stringify(state.cart.uniqueId));
  }, [state.cart.uniqueId]);

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }, [state.alertContent, state.cart.cartItems]);

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Kacper Porada Fotografia</title>
      </Helmet>

      <div className="App">
        {state.cookiesConsentAll === true && <FacebookPixel />}
        {showAlert && <Alert />}
        <Navbar />
        <RoutesContainer />
        <Footer />
        <CookiesPopup />
      </div>
    </>
  );
}

export default App;
