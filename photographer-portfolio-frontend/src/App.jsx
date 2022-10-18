import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
// import Context from './contexts/Context';
import { Helmet } from 'react-helmet-async';
import { Store } from './contexts/Store';

//pages
import SectionWelcome from './pages/SectionWelcome';
import SectionContent from './pages/SectionContent';
import About from './pages/About';
import Shop from './pages/Shop';
import Album from './pages/Album';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';

//components
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import ScrollToTop from './components/ScrollToTop';
import Experiments from './pages/Experiments';

// {localStorage.setItem('user', 'name')}
// {sessionStorage.setItem('status', 'unread')}
// {document.cookie='user=new'}
// {document.cookie='myCookie=init; expires=' + new  Date(2022, 7, 28, 11, 52, 30)}

function App() {
  // const { state } = useContext(Store);
  // const { cart } = state;
  // console.log('cart ' + JSON.stringify(cart));

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
        </Routes>
      </div>
    </>
  );
}

export default App;
