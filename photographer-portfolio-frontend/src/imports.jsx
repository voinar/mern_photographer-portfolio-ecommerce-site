//----------------------------------------------------------------
//container for imported modules and assets
//----------------------------------------------------------------

//hooks
import {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useCallback,
} from 'react';

//contexts
import { Store } from './contexts/Store';

//react router
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  Link,
} from 'react-router-dom';

//tools
import { v4 } from 'uuid';
import { Helmet } from 'react-helmet-async';
import jsSHA from 'jssha';
import axios from 'axios';

//pages
import PageNotFound from './pages/PageNotFound'
import SectionWelcome from './pages/SectionWelcome';
import SectionContent from './pages/SectionContent';
import About from './pages/About';
import Shop from './pages/Shop';
import Album from './pages/Album';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import Checkout from './pages/Checkout';
import Purchased from './pages/Purchased';
import Support from './pages/Support';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Experiments from './pages/Experiments';

//components
import Navbar from './components/Navbar';
import ShopCard from './components/ShopCard';
import AlbumImage from './components/AlbumImage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';

//atoms
import Alert from './atoms/Alert';
import CookiesPopup from './atoms/CookiesPopup';
import LoadingSpinner from './atoms/LoadingSpinner';

//assets
import NavLogo from './img/logo-nav.png';
import FooterLogo from './img/logo-full.png';
import IconEmail from './img/icons/icon-email.svg';
import IconMail from './img/icons/icon-mail.svg';
import IconPhone from './img/icons/icon-phone.svg';
import IconFacebook from './img/icons/icon-facebook.svg';
import IconInstagram from './img/icons/icon-instagram.svg';
import IconChevronUp from './img/icons/icon-chevron-up.svg';
import IconCart from './img/icons/icon-cart.svg';
import IconShare from './img/icons/icon-share.svg';
import IconMenu from './img/icons/icon-menu.svg';
import IconClose from './img/icons/icon-close.svg';
import IconLogin from './img/icons/icon-login.svg';
import IconChevron from './img/icons/icon-chevron.svg';
import IconMagnifyingGlass from './img/icons/icon-magnifying-glass.svg';
import IconCartAdd from './img/icons/icon-cart-add.svg';
import IconGridSmall from './img/icons/icon-grid-small.svg';
import IconGridMedium from './img/icons/icon-grid-medium.svg';
import IconGridLarge from './img/icons/icon-grid-large.svg';
import IconError from './img/icons/icon-error.svg';
import IconQuestion from './img/icons/icon-question.svg';
import IconAnswer from './img/icons/icon-answer.svg';
import IconStepsEye from './img/icons/icon-steps-eye.svg';
import IconStepsCart from './img/icons/icon-steps-cart.svg';
import IconStepsPhoto from './img/icons/icon-steps-photo.svg';
import IconSportsGymnast from './img/icons/icon-sports-gymnast.svg';
import IconSportsRunner from './img/icons/icon-sports-runner.svg';
import IconSportsHandball from './img/icons/icon-sports-handball.svg';
import IconSportsLifter from './img/icons/icon-sports-lifter.svg';

//text content for language versions
import textContent from './data/textContent.json';

export {
  //hooks
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
  useCallback,
  //context store
  Store,
  //react router
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  Link,
  //tools
  Helmet,
  v4,
  jsSHA,
  axios,
  //pages
  PageNotFound,
  SectionWelcome,
  SectionContent,
  About,
  Shop,
  Album,
  Cart,
  SignIn,
  Checkout,
  Purchased,
  Support,
  TermsConditions,
  PrivacyPolicy,
  Experiments,
  //components
  Navbar,
  ShopCard,
  AlbumImage,
  ScrollToTop,
  Footer,
  OrderForm,
  //atoms
  Alert,
  CookiesPopup,
  LoadingSpinner,
  //assets
  NavLogo,
  FooterLogo,
  IconEmail,
  IconMail,
  IconPhone,
  IconFacebook,
  IconInstagram,
  IconChevronUp,
  IconCart,
  IconShare,
  IconMenu,
  IconClose,
  IconLogin,
  IconChevron,
  IconMagnifyingGlass,
  IconCartAdd,
  IconGridSmall,
  IconGridMedium,
  IconGridLarge,
  IconError,
  IconQuestion,
  IconAnswer,
  IconStepsEye,
  IconStepsCart,
  IconStepsPhoto,
  IconSportsGymnast,
  IconSportsRunner,
  IconSportsHandball,
  IconSportsLifter,
  //text content for language versions
  textContent,
};
