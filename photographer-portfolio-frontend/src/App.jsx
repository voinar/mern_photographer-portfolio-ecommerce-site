import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useContext } from 'react';
import { Store } from './contexts/Store';

//pages
import SectionWelcome from './pages/SectionWelcome';
import SectionContent from './pages/SectionContent';
import About from './pages/About';
import Shop from './pages/Shop';
import Album from './pages/Album';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cookies from './pages/Cookies';

//components
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import ScrollToTop from './components/ScrollToTop';
import Experiments from './pages/Experiments';
import Footer from './components/Footer';
import TermsConditions from './pages/TermsConditions';
import OrderForm from './components/OrderForm';
import CookiesPopup from './components/CookiesPopup';

//analytics
import ReactGA from 'react-ga4';

// {localStorage.setItem('user', 'name')}
// {sessionStorage.setItem('status', 'unread')}
// {document.cookie='user=new'}
// {document.cookie='myCookie=init; expires=' + new  Date(2022, 7, 28, 11, 52, 30)}

//google analytics
const TRACKING_ID = 'G-5EQQ443LWM'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

//facebook pixel
const facebookPixelId = '5969461459733693';

function FacebookPixel() {
  // let location = useLocation();

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(facebookPixelId);
        ReactPixel.pageView();

        // Routes.events.on('routeChangeComplete', () => {
        // ReactPixel.pageView();
        // });
      });
  });

  // useEffect(() => {
  //   ReactPixel.pageView();
  // }, [location]);

  return null;
}

function App() {
  const { state } = useContext(Store);

  //run actions on every state update
  useEffect(() => {
    console.log('store updated');
    localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  }, [state]);

  //google analytics log page currently displayed
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Kacper Porada Fotografia</title>
      </Helmet>
      <div className="App">
        {/* <FacebookPixel /> */}
        <Alert alertContent={'alert'} />
        <Navbar />
        <Routes>
          <Route path="/" element={<SectionWelcome />} />
          <Route path="/witaj" element={<SectionWelcome />} />
          <Route path="/:category" element={<SectionContent />} />
          <Route path="/o%20mnie" element={<About />} />
          <Route path="/sklep" element={<Shop />} />
          <Route path="/album/:album" element={<Album />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/logowanie" element={<SignIn />} />
          <Route path="/podsumowanie" element={<Checkout />} />
          <Route path="/zamawiam" element={<OrderForm />} />
          <Route path="/twojezakupy" element={<Success />} />
          <Route path="/regulamin" element={<TermsConditions />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
        <Footer />
        <CookiesPopup />
      </div>
    </>
  );
}

export default App;
