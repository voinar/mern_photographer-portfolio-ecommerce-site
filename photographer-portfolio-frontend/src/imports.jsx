import { useEffect, useState, useContext, useReducer, useRef } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  Link,
} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
import TermsConditions from './pages/TermsConditions';
import Experiments from './pages/Experiments';

//components
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import AlbumCard from './components/AlbumCard';
import AlbumImage from './components/AlbumImage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import OrderForm from './components/OrderForm';
import CookiesPopup from './components/CookiesPopup';

//assets
import NavLogo from './img/logo-nav.png';
import FooterLogo from './img/logo-full.png';
import IconEmail from './img/icons/icon-email.svg';
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

export {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  useReducer,
  useRef,
  Link,
  Helmet,
  useState,
  useEffect,
  useContext,
  SectionWelcome,
  SectionContent,
  About,
  Shop,
  Album,
  Cart,
  SignIn,
  Checkout,
  Success,
  Cookies,
  TermsConditions,
  Experiments,
  Navbar,
  Alert,
  AlbumCard,
  AlbumImage,
  ScrollToTop,
  Footer,
  OrderForm,
  CookiesPopup,

  //assets
  NavLogo,
  FooterLogo,
  IconEmail,
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
};
