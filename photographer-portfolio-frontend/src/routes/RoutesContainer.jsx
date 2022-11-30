import {
  React,
  Routes,
  Route,
  Navigate,
  PageNotFound,
  SectionWelcome,
  SectionContent,
  About,
  Shop,
  Album,
  Cart,
  SignIn,
  Checkout,
  OrderForm,
  Purchased,
  Support,
  TermsConditions,
  PrivacyPolicy,
} from '../imports';

const RoutesContainer = () => (
  <Routes>
    <Route path="/" element={<SectionWelcome />} />
    <Route path="/witaj" element={<SectionWelcome />} />
    <Route path="/portfolio/:category" element={<SectionContent />} />
    <Route path="/portfolio/o%20mnie" element={<About />} />
    <Route path="/sklep" element={<Shop />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/store" element={<Shop />} />
    <Route path="/album/:album" element={<Album />} />
    <Route path="/koszyk" element={<Cart />} />
    <Route path="/logowanie" element={<SignIn />} />
    <Route path="/podsumowanie" element={<Checkout />} />
    <Route path="/zamawiam" element={<OrderForm />} />
    <Route path="/zakupione/:uniqueId" element={<Purchased />} />
    <Route path="/pomoc" element={<Support />} />
    <Route path="/regulamin" element={<TermsConditions />} />
    <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
    <Route path="/404" element={<PageNotFound />} />
    <Route path="/*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default RoutesContainer;
