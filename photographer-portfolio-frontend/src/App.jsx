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

import IconAppleTouch from './img/icons/logo192.png'

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
  const [showAlert, setShowAlert] = useState(false);

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

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }, [state.alertContent, state.cart.cartItems]);

  return (
    <>
      <ScrollToTop />
      {/* <Helmet>
        <title>Kacper Porada Fotografia</title>
      </Helmet> */}
      <Helmet
                title="Kacper Porada Fotografia"
                titleTemplate="Kacper Porada Fotografia"
                base={{"target": "_blank", "href": "https://kacperporada.pl/"}}
                meta={[
                    {"name": "description", "content": "Strona główna"},
                    {"property": "og:type", "content": "article"}
                ]}
                link={[
                    {"rel": "icon", "href": "%PUBLIC_URL%/favicon.ico"},
                    {"rel": "canonical", "href": "https://kacperporada.pl/"},
                    {"rel": "apple-touch-icon", "href": {IconAppleTouch}},
                    {"rel": "apple-touch-icon", "sizes": "192x192", "href": {IconAppleTouch}}
                ]}
                onChangeClientState={(newState) => console.log(newState)}
            />
      <div className="App">
        <FacebookPixel />
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
