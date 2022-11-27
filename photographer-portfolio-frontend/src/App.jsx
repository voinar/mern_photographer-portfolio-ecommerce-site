import {
  React,
  useLocation,
  useState,
  Helmet,
  useEffect,
  useContext,
  Navbar,
  Footer,
  Alert,
  ScrollToTop,
  CookiesPopup,
} from './imports';

import RoutesContainer from './routes/RoutesContainer'; //react router v6

import { Store } from './contexts/Store'; //context api

//analytics
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';

//google analytics
const TRACKING_ID = 'G-5EQQ443LWM'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

//facebook pixel
function FacebookPixel() {
  const location = useLocation();
  const facebookPixelId = '5969461459733693';
  useEffect(() => {
    ReactPixel.init(facebookPixelId);
    ReactPixel.pageView();
  }, [location]);
  // console.log(location);
  return null;
}

function App() {
  const { state } = useContext(Store);
  const [showAlert, setShowAlert] = useState(false);

  //google analytics log page currently displayed
  const location = useLocation();
  useEffect(() => {
    if (
      state.cookiesConsentPopupSet === true &&
      state.cookiesConsentAll === true
    ) {
      ReactGA.send('pageview');
      // console.log('ga action');
    }
    // console.log('cookiesConsentPopupSet', state.cookiesConsentPopupSet);
    // console.log('cookiesConsentAll', state.cookiesConsentAll);
    // console.log('cookiesConsentDecline', state.cookiesConsentDecline);
  }, [
    location,
    state.cookiesConsentPopupSet,
    state.cookiesConsentAll,
    state.cookiesConsentDecline,
  ]);

  //run actions on every state update
  useEffect(() => {
    // console.log('store updated');
    sessionStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  }, [state.cart.cartItems]);

  useEffect(() => {
    // console.log('store updated');
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

// {localStorage.setItem('user', 'name')}
// {sessionStorage.setItem('status', 'unread')}
// {document.cookie='user=new'}
// {document.cookie='myCookie=init; expires=' + new  Date(2022, 7, 28, 11, 52, 30)}
