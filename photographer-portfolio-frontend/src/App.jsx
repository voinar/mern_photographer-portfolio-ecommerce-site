import {
  useLocation,
  Helmet,
  useEffect,
  useContext,
  Navbar,
  Alert,
  ScrollToTop,
  Footer,
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
  console.log(location);
  return null;
}

function App() {
  const { state } = useContext(Store);

  //google analytics log page currently displayed
  const location = useLocation();
  useEffect(() => {
    ReactGA.send('pageview');
  }, [location]);

  //run actions on every state update
  useEffect(() => {
    console.log('store updated');
    localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
    localStorage.setItem('uniqueId', JSON.stringify(state.cart.uniqueId));
  }, [state.cart]);

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Kacper Porada Fotografia</title>
      </Helmet>
      <div className="App">
        <FacebookPixel />
        <Alert alertContent={'alert'} />
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
