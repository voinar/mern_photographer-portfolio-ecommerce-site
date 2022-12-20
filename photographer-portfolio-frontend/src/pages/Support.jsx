import {
  React,
  Store,
  useContext,
  useNavigate,
  Link,
  IconChevron,
  IconQuestion,
  IconAnswer,
  IconCartAdd,
  IconCart,
  textContent,
} from '../imports';

function Support() {
  const navigate = useNavigate(); // used to return to previous page
  const goBack = () => navigate(-1);
  const {
    state,
  } = useContext(Store);

  return (
    <div className="support__container">
      <div className="cart__return">
        <button onClick={goBack} className="btn--back" type="button">
          <img src={IconChevron} alt="zobacz" />
        </button>
        <h1>POMOC</h1>
      </div>
      <main className="support__main">
        <div className="support__contact">
          <h2>
            W razie pytań lub problemów z dokonaniem zakupu zapraszam do
            kontaktu:
          </h2>
          <div className="support__contact__methods">
            <div className="support__contact__method">
              <p>Przez email: </p>
              <span>
                <a href={`mailto:${process.env.REACT_APP_MAILING_CONTACT}`}>
                  {process.env.REACT_APP_MAILING_CONTACT}
                </a>
              </span>
            </div>
            <div className="support__contact__method">
              <p>Telefonicznie: </p>
              <span>{process.env.REACT_APP_PHONE_CONTACT}</span>
            </div>
          </div>
        </div>
        <div className="support__faq">
          <h2>FAQ: Najczęściej zadawane pytania</h2>
          <ul>
            <li>
              <div>
                <img src={IconQuestion} alt="pytanie" />
                W jaki sposób otrzymam zakupione zdjęcia?
              </div>
              <div>
                <img src={IconAnswer} alt="pytanie" />
                Zdjęcia zostaną wysłane przez email w postaci linku do strony w
                sklepie KacperPorada.pl. Po wejściu w link będziesz mógł/mogła
                pobrać zdjęcia w pełnej rozdzielczości i najwyższej jakości.
              </div>
            </li>
            <li>
              <div>
                <img src={IconQuestion} alt="pytanie" />
                Jak dokonać zakupu?
              </div>
              <div>
                <img src={IconAnswer} alt="pytanie" />
                <ul className="support__faq__question">
                  <li>
                    1. Na stronie&nbsp;
                    <Link to="/sklep">www.kacperporada.pl/sklep</Link>
                    &nbsp;wybierz album z interesującym Ciebie wydarzeniem.
                  </li>
                  <li>
                    2. Użyj ikony
                    <img src={IconCartAdd} alt="ikona" />
                    aby dodać wybrane zdjęcia do koszyka.
                  </li>
                  <li>
                    3. Przejdź do koszyka
                    <img src={IconCart} alt="ikona" />
                    aby zobaczyć wszystkie dodane zdjęcia
                  </li>
                  <li>4. Kliknij przycisk `&#39;`Przejdź do zamówienia`&#39;`.</li>
                  <li>
                    5. Wypełnij dane w formularzu `&#39;`Dane zamawiającego`&#39;`,
                    zaakceptuj regulamin i kliknij `&#39;`Kupuję i płacę`&#39;`
                  </li>
                  <li>
                    6. Następnie Twoja przeglądarka wyświetli nową kartę
                    zawierającą okno płatności. Jeśli okno płatności nie
                    wyświetliło się, to upewnij się, że Twoja przeglądarka nie
                    blokuje `&#39;`wyskakujących okien`&#39;`. Opcja odblokowania tego typu
                    okien powinna być dostępna na końcu paska adresu.
                  </li>
                  <li>7. Dokonaj płatności.</li>
                  <li>
                    8. Po płatności zostaniesz przekierowany/a automatycznie
                    spowrotem na stronę sklepu. Na tej stronie znajdziesz
                    zakupione zdjęcia oraz możliwość ich pobrania w pełnej
                    rozdzielczości.
                  </li>
                  <li>
                    9. Jednocześnie na Twój adres email wysłana została
                    wiadomość z linkiem do zakupionych zdjęć.
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <img src={IconQuestion} alt="pytanie" />
                Jak długo zdjęcia będą dostępne do pobrania?
              </div>
              <div>
                <img src={IconAnswer} alt="pytanie" />
                Zdjęcia będą dostępne przez minimum 60 dni od daty zakupu. W
                razie jakichkolwiek problemów z pobraniem zdjęć zapraszam do
                kontaktu.
              </div>
            </li>
          </ul>
        </div>
      </main>
      <div className="cart__return">
        <button onClick={goBack} className="btn--back" type="button">
          <img src={IconChevron} alt="zobacz" />
        </button>
        <h1>
          {
            textContent[
              textContent.findIndex(
                (obj) => obj.language === state.languageSelected,
              )
            ].shop.back
          }
        </h1>
      </div>
    </div>
  );
}

export default Support;
