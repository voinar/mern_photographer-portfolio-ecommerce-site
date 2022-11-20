import { useNavigate, IconChevron } from '../imports';

const TermsConditions = () => {
  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <div className="terms__container">
      <div className="cart__return">
        <button onClick={goBack} className="btn--back">
          <img src={IconChevron} alt="zobacz" />
        </button>
        <h1> REGULAMIN SKLEPU INTERNETOWEGO KACPERPORADA.PL/SKLEP</h1>
      </div>
      <p>
        <br />
        <h2>Spis treści:</h2>
        <ul>
          <li>§ 1 Definicje</li>
          <li>§ 2 Postanowienia ogólne</li>
          <li>§ 3 Zamówienia</li>
          <li>§ 4 Płatność i cena</li>
          <li>§ 5 Realizacja zamówienia</li>
          <li>§ 6 Licencja i prawa zależne</li>
          <li>§ 6 Odstąpienie od umowy</li>
          <li>§ 7 Rękojmia za wady</li>
          <li>§ 8 Ochrona Danych Osobowych</li>
          <li>§ 9 Świadczenie usług drogą elektroniczną</li>
          <li>§ 10 Postanowienia końcowe</li>
        </ul>
      </p>
      <br />

      <h3>§ 1 Definicje</h3>
      <ul>
        <p>Użyte w Regulaminie pojęcia oznaczają odpowiednio:</p>
        <li>
          1) Sklep / Sklep Internetowy – sklep internetowy prowadzony przez
          Sprzedawcę dostępny pod adresem https://kacperporada.pl/sklep;
        </li>
        <li>
          2) Sprzedawca – Kacper Porada prowadzący działalność gospodarczą pod
          firmą Fotografia Kacper Porada, Łukawiec 156, 36-004 Łąka, NIP:
          5170427220, REGON: 522677939, adres poczty elektronicznej:
          kporadafoto@gmail.com;
        </li>
        <li>
          3) Klient – osoba fizyczna, osoba prawna oraz jednostka organizacyjna
          nie posiadająca osobowości prawnej, której ustawa przyznaje zdolność
          prawną, nabywająca produkty za pośrednictwem Sklepu internetowego,
        </li>
        <li>
          4) Konsument – osoba fizyczna nabywająca produkty w Sklepie
          internetowym w celu niezwiązanym bezpośrednio z jej działalnością
          gospodarczą lub zawodową,
        </li>
        <li>
          5) Przedsiębiorca – osoba fizyczna, osoba prawna lub jednostka
          nieposiadająca osobowości prawnej, nabywająca Produkty w Sklepie
          internetowym w ramach działalności gospodarczej lub zawodowej; w
          przypadku osoby fizycznej za Przedsiębiorcę uważa się osobę fizyczną
          nabywającą Produkty w Sklepie internetowym celu związanym bezpośrednio
          z jej działalnością gospodarczą, gdy z treści tej umowy wynika, że
          posiada ona dla niej charakter zawodowy, wynikający w szczególności z
          przedmiotu wykonywanej przez nią działalności gospodarczej,
          udostępnionego na podstawie przepisów o Centralnej Ewidencji i
          Informacji o Działalności gospodarczej.
        </li>
        <li>
          6) Przedsiębiorca na prawach konsumenta - osoba fizyczna nabywająca
          Produkty w Sklepie internetowym w celu związanym bezpośrednio z jej
          działalnością gospodarczą, gdy z treści tej umowy wynika, że nie
          posiada ona dla niej charakteru zawodowego, wynikającego w
          szczególności z przedmiotu wykonywanej przez nią działalności
          gospodarczej, udostępnionego na podstawie przepisów o Centralnej
          Ewidencji i Informacji o Działalności gospodarczej.
        </li>
        <li>
          7) Dni robocze – dni tygodnia od poniedziałku do piątku, poza dniami
          ustawowo wolnymi od pracy zgodnie z ustawą z dnia 18 stycznia 1951
          roku o dniach ustawowo wolnych od pracy.
        </li>
        <li>
          8) Regulamin – niniejszy dokument, określający prawa i obowiązki
          Sprzedawcy i Klienta oraz warunki składania zamówień i dokonywania
          zakupów w Sklepie internetowym.
        </li>
        <li>
          9) Koszyk - usługa udostępniana przez Sprzedawcę w Sklepie
          internetowym, w ramach, której widoczne są Produkty dodane przez
          Klienta do Zamówienia, umożliwiająca złożenie i zmianę Zamówienia, a
          także wyświetlenie aktualnej wartości Zamówienia;
        </li>
        <li>
          10) Zamówienie – oświadczenie woli Klienta, stanowiące ofertę zawarcia
          Umowy sprzedaży złożoną Sprzedawcy przez Klienta, składane z
          wykorzystaniem funkcjonalności Sklepu internetowego, zawierające
          informacje niezbędne do zawarcia i wykonania Umowy sprzedaży.
        </li>
        <li>
          11) Produkt – treści cyfrowe w postaci fotografii dostępne w Sklepie,
          dostarczane przez Sprzedawcę na rzecz Klienta na podstawie Umowy,
          zawartej z wykorzystaniem funkcjonalności Sklepu.
        </li>
        <li>
          12) Umowa - umowa o dostarczanie treści cyfrowych przez Sprzedawcę na
          rzecz Klienta, dotycząca Produktów objętych Zamówieniem, której
          warunki określa Regulamin;
        </li>
        <li>
          13) RODO - Rozporządzenia Parlamentu Europejskiego i Rady (UE)
          2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych
          w związku z przetwarzaniem danych osobowych i w sprawie swobodnego
          przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne
          rozporządzenie o ochronie danych osobowych);
        </li>
        <li>
          14) Operator płatności – rozumie się przez to podmiot świadczący
          usługi płatnicze w ramach Sklepu na rzecz jego Klientów. Operatorem
          płatności jest dostawca usługi płatności online Przelewy24 - PayPro
          S.A., ul. Kanclerska 15, 60-327 Poznań;
        </li>
        <li>
          15) Licencja – to należy przez to rozumieć licencję niewyłączną na
          korzystanie z Produktu udzieloną Kupującemu przez Kacpra Poradę
          prowadzącego działalność gospodarczą pod firmą Fotografia Kacper
          Porada na zasadach określonych w Umowie.
        </li>
      </ul>
      <br />

      <h3>§ 2 Postanowienia ogólne</h3>
      <ul>
        <li>
          1. Sklep internetowy dostępny pod adresem
          https://kacperporada.pl/sklep prowadzony jest przez Kacpra Porada
          prowadzący działalność gospodarczą pod firmą Fotografia Kacper Porada,
          Łukawiec 156, 36-004 Łąka, NIP: 5170427220, REGON: 522677939, adres
          poczty elektronicznej: kporadafoto@gmail.com.
        </li>
        <li>
          2. Regulamin określa prawa i obowiązki Klientów oraz Sprzedawcy.
        </li>
        <li>
          3. Regulamin sporządzony jest w języku polskim i stanowi wzorzec
          umowny w rozumieniu przepisów ustawy z dnia 23 kwietnia 1964 r. -
          Kodeks cywilny.
        </li>
        <li>
          4. W celu zawarcia Umowy ze Sprzedawcą Klient może przed złożeniem
          Zamówienia skorzystać z prawa do negocjacji warunków Umowy. W
          przypadku rezygnacji przez Klienta z możliwości negocjacji, niniejszy
          Regulamin stanowi treść zawartej pomiędzy stronami umowy.
        </li>
        <li>
          5. Dostęp do Regulaminu Klient może uzyskać w każdym momencie pod
          adresem: https://kacperporada.pl/regulamin, a także poprzez zapisanie
          go w dowolnym formacie na wybranym przez siebie nośniku.
        </li>
        <li>
          6. Jeżeli nie zostało to wyraźnie wskazane w informacji handlowej,
          Produkty oferowane w Sklepie internetowym są wolne od wad fizycznych i
          prawnych oraz zostały legalnie wprowadzone na rynek polski. Informacja
          ta jest równoznaczna z zobowiązaniem Sprzedawcy do dostarczenia
          Klientowi produktów bez wad.
        </li>
        <li>
          7. Komunikacja ze Sprzedawcą dokonywana przez Klienta powoduje
          ponoszenie przez Klienta kosztów, jakie wynikają z umów zawartych
          przez Klienta z podmiotami trzecimi, za możliwość korzystania z
          określonych form komunikacji na odległość. Sprzedawca nie pobiera
          żadnych dodatkowych opłat ani świadczeń za możliwość komunikowania się
          z nim.
        </li>
        <li>
          8. Konsument w sytuacji sporu ze Sprzedawcą ma możliwość polubownego
          załatwienia sprawy poprzez: a) zwrócenie się do stałego polubownego
          sądu konsumenckiego, b) mediację, c) zwrócenie się do Wojewódzkiego
          Inspektora Inspekcji Handlowej, d) zwrócenie się do Federacji
          Konsumentów, e) skorzystanie z platformy internetowego systemu
          rozstrzygania sporów pomiędzy konsumentami i przedsiębiorcami na
          szczeblu unijnym dostępnej pod adresem
          http://ec.europa.eu/consumers/odr (Platforma ODR).
        </li>
      </ul>
      <br />

      <h3>§ 3 Zamówienia</h3>
      <ul>
        <li>
          1. Jeżeli nic innego nie wynika z opisu Produktu Produkty zamieszczone
          w Sklepie są przeznaczone do nabycia przez osoby, których wizerunek
          jest przedstawiony lub ujęty w Produkcie. Jeżeli nic innego nie wynika
          z opisu Produktu osoby inne niż osoby przedstawione lub ujęte w
          Produkcie mogą nabywać Produkty wyłącznie za zgodą osoby, której
          wizerunek jest zawarty lub wyrażony w Produkcie lub w celu przekazania
          tych treści na rzecz takiej osoby.
        </li>
        <li>
          2. Informacje o Produktach prezentowane w Sklepie internetowym nie
          stanowią oferty w rozumieniu przepisów Kodeksu cywilnego, stanowią
          zaproszenie do zawarcia Umowy.
        </li>
        <li>
          3. Złożenie Zamówienia stanowi ofertę w rozumieniu przepisów Kodeksu
          cywilnego, złożoną Sprzedawcy przez Klienta.
        </li>
        <li>
          4. W celu złożenia Zamówienia Klient powinien dodać do „Koszyka”
          Produkt, który zamierza kupić. Dodanie produktu do „Koszyka” nie jest
          równoznaczne ze złożeniem Zamówienia. Produkty mogą być dowolnie
          dodawane lub usuwane z „Koszyka”.
        </li>
        <li>
          5. Klient, po ostatecznym dodaniu produktów do „Koszyka” zostaje
          przekierowany do formularza służącego do składania Zamówień, celem
          podania danych płatnika oraz metody płatności. Następnie Klient
          zostaje przekierowany do podsumowania Zamówienia. Złożenie Zamówienia
          zostaje dokonane poprzez wybranie przycisku „Kupuję i płacę”.
        </li>
        <li>
          6. Warunkiem złożenia Zamówienia jest zapoznanie się i zaakceptowanie
          niniejszego Regulaminu, co Klient potwierdza przed złożeniem
          Zamówienia poprzez zaznaczenie odpowiedniego pola w formularzu
          zamówienia.
        </li>
        <li>
          7. Naciśnięcie na przycisk „Kupuję i płacę” oznacza złożenie przez
          Klienta zamówienia z obowiązkiem zapłaty.
        </li>
        <li>
          8. Informacja o całkowitej wartości Zamówienia jest każdorazowo
          podawana na stronie Sklepu internetowego w trakcie składania
          zamówienia, w tym przed bezpośrednim zatwierdzeniem i złożeniem przez
          Klienta zamówienia. Są to całkowite koszty, które Klient zobowiązany
          jest zapłacić wraz z należnymi podatkami.
        </li>
        <li>
          9. Po złożeniu Zamówienia Klient otrzyma na adres poczty
          elektronicznej (e-mail) podany przy składaniu Zamówienia wiadomość
          zatytułowaną „Potwierdzenie zamówienia”. E-mail ten stanowi przyjęcie
          oferty Klienta. W momencie poinformowania Klienta o przyjęciu złożonej
          przez niego oferty, następuje zawarcie Umowy między Sprzedawcą a
          Klientem.
        </li>
      </ul>
      <br />

      <h3>§ 4 Płatność i cena</h3>
      <ul>
        <li>
          1. Klient ma możliwość dokonania zapłaty za Produkt tytułem złożonego
          zamówienia w następujący sposób: a) przelewem na rachunek bankowy
          Sprzedawcy, b) płatność online, BLIK lub kartą płatniczą za
          pośrednictwem Operatora płatności
        </li>
        <li>
          2. Obsługą płatności elektronicznych zajmuje się Operator płatności.
          Dokonanie płatności za pośrednictwem Operatora płatności wymaga
          nawiązania odrębnego stosunku prawnego z Operatorem płatności i
          zaakceptowania jego regulaminu.
        </li>
        <li>
          3. Ceny podane na stronie Sklepu internetowego są cenami brutto i
          wyrażone są w złotych polskich.
        </li>
      </ul>
      <br />

      <h3>§ 5 Realizacja Zamówienia</h3>
      <ul>
        <li>
          1. Czas realizacji Zamówienia jest liczony od momentu uzyskania
          pozytywnej autoryzacji płatności.
        </li>
        <li>
          2. Sprzedawca nie później niż w ciągu 2 Dni roboczych od dnia zawarcia
          Umowy prześle na adres elektroniczny Klienta wskazany w Zamówieniu
          Produkt będący przedmiotem Zamówienia lub udostępni Klientowi link do
          jego pobrania. Link jest ważny przez okres 2 miesięcy.
        </li>
        <li>
          3. Po otrzymaniu przez Klienta wiadomości e-mail z Produktem lub
          linkiem do niego zaleca się zapisanie przez Klienta Produktu na
          nośniku pamięci. Sklep nie świadczy usługi przechowywania Produktów
          zakupionych w Sklepie, zatem Klient ponosi ryzyko niezapisania
          Produktu na nośniku pamięci. Klient ma prawo korzystać z Produktu
          wyłącznie na własny użytek, zgodnie z powszechnie obowiązującymi
          przepisami prawa. Klient nie jest uprawniony w szczególności do
          rozpowszechniania Produktu, jak i jego zwielokrotniania, w innym celu
          niż dla potrzeb własnego użytku lub zgodnego z prawem korzystania z
          Produktu, chyba że przepis prawa wyraźnie zezwala na takie działanie.
          Niedozwolone jest udostępnianie Produktu osobom trzecim.
        </li>
      </ul>
      <br />

      <h3>§ 6 Licencja i prawa zależne</h3>
      <ul>
        <p>
          1. W ramach zrealizowanego zamówienia Klientowi udzielana jest
          licencja bez ograniczeń terytorialnych i czasowych na Produkt:
        </p>
        <li>
          a) jeśli z informacji o Produkcie nie wynika nic innego licencja
          dotyczy możliwości wykorzystywania w pełnym zakresie pól eksploatacji
          wskazanych w ust. 2 wyłącznie przez osobę, której wizerunek jest
          przedstawiony lub zawarty w Produkcie,
        </li>
        <li>
          b) jeśli z informacji o Produkcie wynika taka informacja licencja
          dotyczy możliwości wykorzystywania w pełnym zakresie pól eksploatacji
          wskazanych w ust. 5 przez dowolne osoby.
        </li>
      </ul>

      <ul>
        <p>
          2. Jeśli nic innego nie wynika z opisu produktu Licencja uprawnia do
          wykorzystywania Produktów na następujących polach eksploatacji:
        </p>
        <li>
          a) w zakresie utrwalania i zwielokrotniania utworu - wytwarzanie
          określoną techniką egzemplarzy utworu, w tym techniką drukarską,
          reprograficzną, zapisu magnetycznego oraz techniką cyfrową;
        </li>
        <li>
          b) w zakresie obrotu oryginałem albo egzemplarzami, na których utwór
          utrwalono - wprowadzanie do obrotu, użyczenie lub najem oryginału albo
          egzemplarzy;
        </li>
        <li>
          c) w zakresie rozpowszechniania utworu w sposób inny niż określony w
          pkt 2 - publiczne wykonanie, wystawienie, wyświetlenie, odtworzenie
          oraz nadawanie i reemitowanie, a także publiczne udostępnianie utworu
          w taki sposób, aby każdy mógł mieć do niego dostęp w miejscu i w
          czasie przez siebie wybranym.
        </li>
      </ul>

      <ul>
        <p>
          3. W ramach zakresu licencji Klient nie uprawniony do wykonywania praw
          zależnych do Produktu z wyjątkiem niewielkich zmian związanych z
          dokonywaniem drobnej korekty kolorystycznej, drobnych retuszy i
          nieznacznego kadrowania pod warunkiem, że zmiany te nie naruszają
          autorskich praw osobistych twórcy.
        </p>
      </ul>

      <ul>
        <p>
          4. Klient nie jest uprawniony do udzielania odpłatnie sublicencji na
          Produkty, co nie ogranicza go w zakresie wykorzystywania Produktów w
          ramach usług lub innych odpłatnych działań realizowanych na rzecz osób
          trzecich.
        </p>
      </ul>
      <br />

      <h3>§ 7 Odstąpienie od umowy</h3>

      <ul></ul>
      <li>
        1. Klient będący Konsumentem, jak również Przedsiębiorcą na prawach
        konsumenta, który za pośrednictwem Sklepu internetowego zawarł umowę na
        odległość, może w terminie 14 dni odstąpić od niej bez podawania
        przyczyny, z zastrzeżeniem ust. 2.
      </li>
      <li>
        2. Prawo do odstąpienia od umowy nie przysługuje Klientowi, jeżeli
        spełnianie świadczenia w postaci dostarczania treści cyfrowych
        rozpoczęło się za wyraźną zgodą Klienta przed upływem terminu do
        odstąpienia od umowy, zgodnie z art. 38 pkt 13) ustawy z dnia 30 maja
        2014 r. o prawach konsumenta.
      </li>
      <li>
        3. Bieg terminu do odstąpienia od umowy rozpoczyna się od dnia zawarcia
        Umowy. Do zachowania terminu do odstąpienia od umowy wystarczy wysłanie
        oświadczenia o odstąpieniu od umowy przed upływem terminu do odstąpienia
        od umowy.
      </li>
      <li>
        4. Klient, uprawnienie do odstąpienia od Umowy może zrealizować poprzez
        wysłanie oświadczenia o odstąpieniu drogą mailową lub pisemnie na adres
        Sprzedawcy.
      </li>
      <li>
        5. Wykonując prawo do odstąpienia od Umowy Klient może skorzystać z
        formularza oświadczenia o odstąpieniu od umowy zamieszczonego na stronie
        Sklepu internetowego, jednak nie jest to obowiązkowe.
      </li>
      <li>
        6. W przypadku odstąpienia od Umowy, Umowę uważa się za niezawartą.
      </li>
      <li>
        7. Sprzedawca niezwłocznie, nie później niż w terminie 14 dni od
        otrzymania oświadczenia Klienta o odstąpieniu od umowy, zwróci Klientowi
        wszystkie dokonane przez niego płatności.
      </li>
      <li>
        8. Sprzedawca dokonuje zwrotu płatności przy użyciu takiego samego
        sposobu zapłaty, jakiego użył Klient, chyba że Klient w oświadczeniu o
        odstąpieniu od umowy wskazał inny sposób zwrotu, który nie wiąże się dla
        niego z żadnymi kosztami.
      </li>
      <br />

      <h3>§ 8 Rękojmia za wady</h3>

      <ul>
        <li>
          1. Klientowi będącemu Przedsiębiorcą, jak również Przedsiębiorcom na
          prawach konsumenta nie przysługują uprawnienia z tytułu rękojmi za
          wady rzeczy sprzedanej.
        </li>
        <li>
          2. Wobec Klienta będącego Konsumentem Sprzedawca ponosi
          odpowiedzialność za wady fizyczne lub prawne rzeczy sprzedanej, na
          zasadach określonych w art. 556 i kolejnych Kodeksu cywilnego.
        </li>
        <li>
          3. Reklamacja może zostać złożona przez Klienta drogą mailową lub
          pisemnie na adres Sprzedawcy.
        </li>
        <li>
          4. Składając reklamację Klient może skorzystać ze wzoru formularza
          reklamacji zamieszczonego na stronie Sklepu internetowego, jednak nie
          jest to obowiązkowe.
        </li>
        <li>
          5. W przypadku składania reklamacji bez wykorzystania wzoru formularza
          reklamacji zaleca się podanie w zgłoszeniu reklamacyjnym co najmniej:
          1) imię, nazwisko, firma, NIP, adres do korespondencji i dane
          kontaktowe; 2) informacje dotyczące daty zawarcia umowy wraz z
          potwierdzeniem jej zawarcia; 3) informacje i okoliczności dotyczące
          przedmiotu reklamacji, w szczególności rodzaju i daty wystąpienia
          wady; 4) żądanie dotyczące sposobu rozpoznania reklamacji.
        </li>
        <li>
          6. Sprzedawca ustosunkuje się do reklamacji Klienta niezwłocznie, nie
          później niż w terminie 14 dni od dnia jej złożenia. Brak
          ustosunkowania się Sprzedawcy w powyższym terminie oznacza, że
          Sprzedawca uznał reklamację za uzasadnioną .
        </li>
        <li>
          7. W przypadku nieuwzględnienia reklamacji Klient zostanie ponadto
          powiadomiony o tym czy Sprzedawca wyraża, czy też nie, zgodę na
          pozasądowe rozwiązanie sporu. W przypadku wyrażenia zgody, Sprzedawca
          wskaże Klientowi podmiot właściwy do pozasądowego rozwiązania sporu.
        </li>
      </ul>
      <br />

      <h3>§ 9 Ochrona Danych Osobowych</h3>
      <p>
        Szczegółowe informacje dotyczące przetwarzania danych osobowych Klientów
        określone zostały w „Polityce prywatności”, dostępnej pod adresem:
        https://kacperporada.pl/poliytka-prywatności, stanowiącej integralną
        część niniejszego Regulaminu.
      </p>
      <br />

      <h3>§ 10 Świadczenie usług drogą elektroniczną</h3>

      <ul>
        <li>
          1. Sprzedawca świadczy za pośrednictwem Sklepu internetowego
          następujące Usługi elektroniczne: 1) umożliwienie złożenia Zamówienia
          i zawarcia Umowy; 2) umożliwienie korzystania z Koszyka; 3)
          umożliwienie przesłania wiadomości poprzez formularz kontaktowy; 4)
          udostępnianie danych i materiałów, znajdujących się w Sklepie
          internetowym, w tym przede wszystkim informacji o Produktach;
        </li>
        <li>
          2. Wymagania techniczne niezbędne do współpracy z systemem
          teleinformatycznym, za pośrednictwem, którego Sprzedawca świadczy
          Usługi elektroniczne: 1) komputer klasy PC, Mac lub inne urządzenie
          umożliwiające korzystanie ze Sklepu; 2) dostęp do sieci Internet; 3)
          dostęp do poczty elektronicznej; 4) odpowiednie oprogramowanie w
          postaci przeglądarki internetowej.
        </li>
        <li>
          3. Zakazuje się Klientowi dostarczania treści o charakterze
          bezprawnym.
        </li>
        <li>
          4. Umowa o świadczenie usług drogą elektroniczną zostaje zawartą z
          chwilą rozpoczęcia korzystania z danej funkcjonalności Sklepu
          internetowego umożliwiającej skorzystanie z określonej usługi
          elektronicznej.
        </li>
        <li>
          5. W zakresie usług elektronicznych świadczonych za pośrednictwem
          Sklepu internetowego umowa o świadczenie tychże usług zostaje zawarta
          na czas nieoznaczony i ulega rozwiązaniu z chwilą i poprzez
          zaprzestanie korzystania przez Klienta z danej usługi elektronicznej i
          bez konieczności składania dodatkowych oświadczeń.
        </li>
        <li>
          6. Klient może w każdym czasie i bez wskazywania przyczyny rozwiązać
          umowę, o której mowa w ust. 4 i 5 poprzez przesłanie stosownego
          oświadczenia drogą mailową lub pisemnie na adres Sprzedawcy. Klient
          będący Konsumentem, jak również Przedsiębiorcą na prawach konsumenta,
          może również od umowy, o której mowa w ust. 4 i 5, odstąpić w terminie
          14 bez podawania przyczyny, na zasadach określonych w § 6.
        </li>
        <li>
          7. Klient może złożyć reklamację dotyczącą usług świadczonych drogą
          elektroniczną przez Sprzedawcę drogą mailową lub pisemnie na adres
          Sprzedawcy.
        </li>
        <li>
          8. Sprzedawca rozpatrzy reklamację dotyczącą usług świadczonych drogą
          elektroniczną w terminie nie dłuższym niż 30 dni od dnia jej
          otrzymania, informując Klient niezwłocznie o jej wynikach.
        </li>
      </ul>
      <br />

      <h3>§ 11 Postanowienia końcowe</h3>
      <ul>
        <li>
          1. Klienci mogą uzyskać dostęp do niniejszego Regulaminu w każdym
          czasie za pośrednictwem linku zamieszczonego na stronie Sklepu
          internetowego. Regulamin może zostać utrwalony, pozyskany i odtworzony
          poprzez jego wydrukowanie lub zapisanie go na odpowiednim nośniku
          danych.
        </li>
        <li>
          2. Postanowienia niniejszego Regulaminu nie mają na celu wyłączenia
          lub ograniczenia jakichkolwiek praw Konsumentów, jak również
          Przedsiębiorców na prawach konsumenta, przyznanych im na mocy
          bezwzględnie obowiązujących przepisów prawa, w tym w szczególności
          ustawy z dnia 30 maja 2014 r. o prawach konsumenta oraz ustawy z dnia
          23 kwietnia 1964 r. Kodeks cywilny. W przypadku ewentualnej,
          niezamierzonej niezgodności Regulaminu z powyższymi przepisami,
          pierwszeństwo mają te przepisy i są one stosowane przez Sprzedawcę.
        </li>
        <li>
          3. Jeśli którekolwiek z postanowień niniejszego Regulaminu zostanie
          uznane za niezgodne z prawem, nieważne lub w inny sposób niewykonalne
          w zakresie przewidzianym przepisami prawa, to w tym zakresie zostaje
          ono wyłączone. W pozostałym zakresie Regulamin pozostaje w mocy.
        </li>
        <li>
          4. Sprzedawca może dokonać zmiany postanowień Regulaminu po uprzednim
          poinformowaniu Klientów poprzez publikację jednolitego tekstu
          Regulaminu na stronie Sklepu internetowego. Zmiany Regulaminu lub nowa
          treść Regulaminu wchodzi w życie po upływie 14 dni od daty
          umieszczenia nowej treści Regulaminu na stronie Sklepu Internetowego.
        </li>
        <li>
          5. Zamówienia złożone w trakcie obowiązywania poprzedniej wersji
          Regulaminu będą realizowane zgodnie z jego postanowieniami.
        </li>
        <li>
          6. Wszelkie elementy graficzne Sklepu internetowego, zastosowane w nim
          rozwiązania techniczne, elementy kontentu, jak i sposób w jaki
          elementy graficzne i kontent są przedstawione (układ), jak również
          oprogramowanie, bazy danych i inne materiały umieszczone w ramach
          Sklepu internetowego stanowią przedmiot prawa autorskiego Sprzedawcy i
          podlegają ochronie zgodnie z przepisami ustawy z dnia 4 lutego 1994 r.
          o prawie autorskim i prawach pokrewnych.
        </li>
        <li>
          7. W celu korzystania ze Sklepu internetowego Sprzedawca udziela
          Klientom niewyłącznej, niezbywalnej, nieprzenoszalnej, udzielonej na
          czas korzystania ze Sklepu internetowego, Licencji na korzystanie ze
          Sklepu internetowego. W ramach udzielonej Licencji Klient uprawniony
          jest wyłącznie do tymczasowego zwielokrotniania Sklepu internetowego
          poprzez jego wyświetlanie w przeglądarce internetowej, a także
          zapisanie plików tymczasowych, w celu korzystania z dostępnych
          funkcjonalności w sposób zgodny z niniejszym Regulaminem.
        </li>
        <li>
          8. Niniejszy Regulamin podlega prawu polskiemu oraz zostaje poddany
          jurysdykcji sądów polskich. Wybór prawa polskiego nie pozbawia
          Konsumenta ochrony przyznanej mu na podstawie przepisów, których nie
          można wyłączyć w drodze umowy, na mocy prawa jakie byłoby właściwe w
          razie braku wyboru prawa.
        </li>
        <li>
          9. Ewentualne spory powstałe pomiędzy Sprzedawcą a Klientem, który
          jest Konsumentem, jak również Przedsiębiorcą na prawach konsumenta,
          rozstrzygane będą przez sąd powszechny właściwy zgodnie z przepisami
          Kodeksu postępowania cywilnego.
        </li>
        <li>
          10. Ewentualne spory powstałe pomiędzy Sprzedawcą a Klientem, który
          jest Przedsiębiorcą, rozstrzygane będą przez sąd powszechny właściwy
          ze względu na siedzibę Sprzedawcy.
        </li>
        <li>
          11. Wobec Klientów będących Przedsiębiorcami Sprzedawca nie ponosi
          odpowiedzialności z tytułu powstania jakichkolwiek szkód, wynikających
          lub będących w związku z korzystaniem ze Sklepu internetowego lub
          zakupem Produktów, z wyjątkiem szkody wyrządzonej przez Sprzedawcę z
          winy umyślnej.
        </li>
      </ul>
    </div>
  );
};

export default TermsConditions;
