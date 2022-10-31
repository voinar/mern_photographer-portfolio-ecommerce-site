import { Routes, Route } from 'react-router-dom';
// import { useContext } from 'react';
// import Context from './contexts/Context';
import { Helmet } from 'react-helmet-async';
// import { Store } from './contexts/Store';
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

// {localStorage.setItem('user', 'name')}
// {sessionStorage.setItem('status', 'unread')}
// {document.cookie='user=new'}
// {document.cookie='myCookie=init; expires=' + new  Date(2022, 7, 28, 11, 52, 30)}

//google analytics
import ReactGA from 'react-ga4';
const TRACKING_ID = 'G-5EQQ443LWM'; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  // const { state } = useContext(Store);
  // const { cart } = state;
  // console.log('cart ' + JSON.stringify(cart));
  // console.log(ReactGA);

  //google analytics log page currently displayed
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  const { state, dispatch: contextDispatch } = useContext(Store);

  //action on every state update
  useEffect(() => {
    console.log('store updated');
    localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems));
  }, [state]);

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <title>Kacper Porada Fotografia</title>
      </Helmet>
      <div className="App">
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
