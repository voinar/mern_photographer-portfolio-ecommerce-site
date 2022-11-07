import {
  Routes,
  Route,
  SectionWelcome,
  SectionContent,
  About,
  Shop,
  Album,
  Experiments,
  Cart,
  SignIn,
  Checkout,
  OrderForm,
  Success,
  TermsConditions,
  Cookies,
} from '../imports';

const RoutesContainer = () => (
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
);

export default RoutesContainer;
