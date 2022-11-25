import { useNavigate, IconChevron, Link } from '../imports';

const PageNotFound = () => {
  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <div className="page-not-found__container">
      <div className="cart__return">
        <button onClick={goBack} className="btn--back">
          <img src={IconChevron} alt="zobacz" />
        </button>
        <h1>Ups...</h1>
      </div>
      <h2>Nie jesteśmy w stanie znaleźć strony o podanym adresie.</h2>
      <p>Upewnij się że adres został wpisany poprawnie.</p>
      <p>
        Jeśli problem nadal występuje, to możesz skorzystać ze strony{' '}
        <Link to="/Pomoc">pomocy.</Link>
      </p>
      <span>404</span>
      <br />
    </div>
  );
};

export default PageNotFound;
