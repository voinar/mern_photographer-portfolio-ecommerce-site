import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import reactImageSize from 'react-image-size';

// Import the functions you need from the SDKs you need
import 'firebase/storage';
import 'firebase/firestore';

import {
  React,
  Helmet,
  Store,
  useState,
  useContext,
  useEffect,
  useParams,
  Link,
  axios,
  jsSHA,
  LoadingSpinner,
  IconError,
  IconQuestion,
} from '../imports';

const Purchased = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { uniqueId } = useParams();
  console.log('useParams uniqueId', uniqueId);

  const [purchasedImages, setPurchasedImages] = useState([]);
  const [largeImages, setLargeImages] = useState([]);
  const [largeImageMetadata, setLargeImageMetadata] = useState([]);
  const [largeImageDimensions, setLargeImageDimensions] = useState([]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  // const [emailSent, setEmailSent] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);
  const [invoiceRequestEmailSent, setInvoiceRequestEmailSent] = useState(false);

  //1.use uniqueId from url params to find order in db.
  //found? proceed to 2. no? show error message

  //2.if order is in db then check if order is paid
  //yes? show images to customer. no? go to 3.

  //3. see if payment is present in payment gateway's api endpoint
  //yes? show images to customer & send back payment confirmation to api & confirm order as paid in db
  //no? show error message

  //get purchased images list from db
  useEffect(() => {
    //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then show images to customer
    (async () => {
      const docRef = doc(db, 'orders', uniqueId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().isPaid === true) {
        setPurchasedImages(docSnap.data().cartItems);
        setUserEmail(docSnap.data().email);
        setUserName(docSnap.data().name);
        // setEmailSent(docSnap.data().emailSent);
        setPaymentConfirmed(true);
        setIsLoading(false);
        // console.log('docSnap.exists() && docSnap.data().isPaid === true emailSent', docSnap.data().emailSent)
      }

      if (docSnap.exists() && docSnap.data().isPaid === false) {
        console.log(
          'order found in db. status: unpaid. veryfying order status.'
        );
        setUserEmail(docSnap.data().email);
        setUserName(docSnap.data().name);
        // setEmailSent(docSnap.data().emailSent);

        evaluateOrderStatus(); //find payment confirmation in api endpoint; if none found then display error message
        async function evaluateOrderStatus() {
          console.log('getPaymentConfirmation start');
          try {
            await axios({
              method: 'get',
              url: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS,
            }).then(function (response) {
              if (
                response.data.find((element) => element.sessionId === uniqueId)
              ) {
                console.log('payment found in api endpoint');
                setIsLoading(false);

                //send payment verification data to context
                contextDispatch({
                  type: 'PAYMENT_VERIFICATION',
                  payload: response.data.find(
                    (element) => element.sessionId === uniqueId
                  ),
                });

                // 2. clear cart
                contextDispatch({
                  type: 'CLEAR_CART',
                });
                setPaymentConfirmed(true);
                setPurchasedImages(docSnap.data().cartItems);
              } else {
                console.log('payment not found in api endpoint');
                setIsLoading(false);
              }
            });
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        console.log('error: order not found in api endpoint.');
        setIsLoading(false);
      }
    })();
  }, [uniqueId, contextDispatch]);

  //payment verification
  //1. find payment confirmation with sessionId === uniqueId in api data array
  // useEffect(() => {
  //   console.log('start payment confirmation');
  //   getPaymentConfirmation();

  //   async function getPaymentConfirmation() {
  //     console.log('getPaymentConfirmation start');
  //     try {
  //       await axios({
  //         method: 'get',
  //         url: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS,
  //         // responseType: 'stream'
  //       }).then(function (response) {
  //         console.log('getPaymentConfirmation', response);
  //         contextDispatch({
  //           type: 'PAYMENT_VERIFICATION',
  //           payload: response.data.find(
  //             (element) => element.sessionId === state.cart.uniqueId
  //           ),
  //         });
  //         // paymentVerification(); //send back payment verification data
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [contextDispatch, state.cart.uniqueId]);

  useEffect(() => {
    //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then show images to user
    (async () => {
      console.log('initiate payment verification');
      const docRef = doc(db, 'orders', uniqueId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data().isPaid);
        if (docSnap.data().isPaid === false) {
          console.log('run payment verification');
          paymentVerification(); //send back the payment confirmation to payment gateway api
        } else {
          console.log('payment confirmation: order unpaid');
          // setPaymentConfirmed(true);
        }
      } else {
        console.log('error: order not found in db');
      }
    })();

    const paymentVerification = () => {
      if (state.paymentVerification !== null) {
        console.log('state.paymentVerification', state.paymentVerification);
        //funkcja dla pierwszego etapu transkacji /v1/transaction/register
        const crcValue = process.env.REACT_APP_PAYMENT_GATEWAY_CRC_VALUE; //CRC pobrane z danych konta
        const username = process.env.REACT_APP_PAYMENT_GATEWAY_USERNAME;
        const password = process.env.REACT_APP_PAYMENT_GATEWAY_PASSWORD;

        // templatka sign: {"sessionId":"str","merchantId":int,"amount":int,"currency":"str","crc":"str"}
        const signTemplate = `{"sessionId":"${uniqueId}","orderId":${state.paymentVerification.orderId},"amount":${state.paymentVerification.amount},"currency":"PLN","crc":"${crcValue}"}`;
        const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' }); //nowy obiekt sha-384 generowany przez jsSHA
        shaObj.update(signTemplate); //wprowadzenie ciągu signCryptoInput do hashowania przez shaObj
        const signSha = shaObj.getHash('HEX'); //konwersja shaObj do hex

        axios({
          method: 'put',
          url: process.env.REACT_APP_PAYMENT_GATEWAY_URLVERIFY,
          auth: {
            username: username,
            password: password,
          }, //dane z konta sandbox
          data: {
            merchantId: state.paymentVerification.merchantId,
            posId: state.paymentVerification.posId,
            sessionId: uniqueId,
            amount: state.paymentVerification.amount,
            currency: 'PLN',
            orderId: state.paymentVerification.orderId,
            sign: signSha,
          },
        })
          .then((response) => {
            //blok uruchamiany dla odpowiedzi z kodem 200. potwierdzenie zamówienia dla klienta.
            console.log(
              'payment confirmation sent. verification response: ',
              response
            );
            (async () => {
              console.log('update order status as paid');
              const docRef = doc(db, 'orders', uniqueId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                console.log('is order paid?', docSnap.data().isPaid);
                if (docSnap.data().isPaid === false) {
                  console.log('run payment verification');

                  // paymentVerification(); //send back the payment confirmation to payment gateway api
                  setDoc(docRef, { isPaid: true }, { merge: true }); //set order as paid in db
                  setPaymentConfirmed(true);

                  //email confirmation. get dynamic variables for email body contents
                  const emailHTMLContent = () => {
                    return `<html>
                      <head></head>
                      <body>
                      <p>Hej <span style="text-transform: capitalize">${userName},</span></p>
                      <p>Dziękuję za zakup. Mam nadzieję, że te zdjęcia sprawią Ci wiele radości i będą wspaniałą pamiątką na przyszłość.</p>
                      <p>Linki do zakupionych zdjęć oraz ich podgląd znajdziesz na tej stronie:</p>
                        <a href="https://www.kacperporada.pl/zakupione/${uniqueId}">
                          <button
                          style="
                          padding: 10px 26px;
                          background-color: rgba(0, 230, 0, .5);
                          color: black;
                          cursor: pointer;
                          border: 1px solid rgba(0,0,0,0.2);
                          border-radius: 4px">
                            Zobacz zdjęcia</button>
                        </a>
                      <p>Zdjęcia pozostaną dostępne do pobrania przez 60 dni od daty zakupu. W razie jakichkolwiek problemów z pobraniem zdjęć skontaktuj się ze mną przez <a href="http://www.kacperporada.pl/pomoc">stronę pomocy</a>, lub po prostu odpowiedz na tę wiadomość.</p>
                      <br></br>
                      <p>Do zobaczenia w przyszłych wydarzeniach! :)</p>
                      <p>Kacper Porada Fotografia</p>
                      <br></br>
                      <p>Jeśli nie jesteś adresatem tej wiadomości, to prawdopodobnie podczas zakupu podany został błędny adres email. Możesz zignorować zarówno tę wiadomość jak i wszelkie pozostałe emaile informujące o dokonaniu płatności. </p>
                      </body>
                      </html>`;
                  };

                  //send order email to user
                  const sendEmailConfirmation = async () => {
                    // console.log('sending email confirmation');
                    //update order status in db to emailSent: true

                    const docRef = doc(db, 'orders', uniqueId);
                    const docSnap = await getDoc(docRef);

                    console.log('confirming email as sent in db');

                    axios({
                      method: 'post',
                      url: 'https://api.sendinblue.com/v3/smtp/email',
                      headers: {
                        accept: 'application/json',
                        'api-key':
                          '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',
                        'content-type': 'application/json',
                      },
                      data: {
                        sender: {
                          name: 'Kacper Porada Fotografia',
                          email: 'sklep.kacperporada@gmail.com',
                        },
                        to: [
                          {
                            email: userEmail,
                            name: userName,
                          },
                        ],
                        subject: 'Twoje zdjęcia. Sklep KacperPorada.pl',
                        htmlContent: emailHTMLContent(),
                      },
                    });

                    setDoc(docRef, { emailSent: true }, { merge: true });
                    setEmailConfirmationSent(true);

                    console.log(
                      // 'email sending completed. emailSent in state:',
                      // emailSent,
                      'emailSent in db:',
                      docSnap.data().emailSent
                    );
                  };

                  //send email invoice request to shop admin
                  const sendEmailInvoiceRequest = async () => {
                    // console.log('sending email invoice request');
                    //update order status in db to emailSent: true

                    const docRef = doc(db, 'orders', uniqueId);
                    const docSnap = await getDoc(docRef);

                    axios({
                      method: 'post',
                      url: 'https://api.sendinblue.com/v3/smtp/email',
                      headers: {
                        accept: 'application/json',
                        'api-key':
                          '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',
                        'content-type': 'application/json',
                      },
                      data: {
                        sender: {
                          name: 'Kacper Porada Fotografia',
                          email: 'sklep.kacperporada@gmail.com',
                        },
                        to: [
                          {
                            name: 'Kacper Porada Fotografia',
                            email: 'sklep.kacperporada@gmail.com',
                          },
                        ],
                        subject: 'Klient prosi o wystawienie faktury',
                        htmlContent: `<html>
                            <head></head>
                            <body>
                            <p>Hej <span style="text-transform: capitalize">${
                              process.env.REACT_APP_USER_NAME
                            },</span></p>
                            <p>Podczas składania zamówienia klient ${
                              docSnap.data().name
                            } ${
                          docSnap.data().surname
                        } poprosił o wystawienie faktury. Dane klienta:</p>
                            <p>Email: ${docSnap.data().email}</p>
                            <p>Imię: ${docSnap.data().name}</p>
                            <p>Nazwisko: ${docSnap.data().surname}</p>
                            <p>NIP: ${docSnap.data().invoiceTaxId}</p>
                            <p>Identyfikator zamówienia: ${uniqueId}</p>
                            <p>Podgląd zamówienia:</p>
                              <a href="https://www.kacperporada.pl/zakupione/${uniqueId}">
                                <button
                                style="
                                padding: 10px 26px;
                                background-color: rgba(0, 230, 0, .5);
                                color: black;
                                cursor: pointer;
                                border: 1px solid rgba(0,0,0,0.2);
                                border-radius: 4px">
                                  Zobacz zdjęcia</button>
                              </a>

                            <p>Kacper Porada Fotografia</p>
                            </body>
                            </html>`,
                      },
                    });

                    setInvoiceRequestEmailSent(true);
                  };

                  const sendEmailConfirmations = () => {
                    if (
                      docSnap.data().emailSent === false &&
                      emailConfirmationSent === false &&
                      docSnap.data().invoiceRequested === true &&
                      invoiceRequestEmailSent === false
                    ) {
                      console.log('sending email invoice request');
                      sendEmailInvoiceRequest();
                      setInvoiceRequestEmailSent(true);

                      console.log('sending email confirmation');
                      sendEmailConfirmation();
                      setEmailConfirmationSent(true);
                    } else if (
                      docSnap.data().emailSent === false &&
                      emailConfirmationSent === false
                    ) {
                      console.log('sending email confirmation only');
                      sendEmailConfirmation();
                      setEmailConfirmationSent(true);
                    }
                  };
                  sendEmailConfirmations();
                } else {
                  console.log('payment confirmation: order already paid');
                  setPaymentConfirmed(true);
                }
              } else {
                console.log('error: order not found in db');
              }
            })();
          })
          .catch((err) => {
            //blok dla odpowiedzi z błędem 400/401
            console.log('err', err);
          });
      } else {
        console.log('state.paymentVerification is', state.paymentVerification);
      }
    };
    paymentVerification(); //send back the payment confirmation to payment gateway api
  }, [
    state.paymentVerification,
    uniqueId,
    userName,
    userEmail,
    emailConfirmationSent,
    invoiceRequestEmailSent,
  ]);

  //get full versions of images after confirming order status as paid
  useEffect(() => {
    // console.log('url:',image)
    // console.log('large url:',imageUrlFormatted)

    console.log('purchasedImages available', purchasedImages);
    purchasedImages.map((image) => {
      const storage = getStorage();
      const imageUrlFormatted = image
        .replace('https://firebasestorage.googleapis.com/v0/b/', 'gs://')
        .replace('/o', '')
        .replace('male', 'duze')
        // .replace(' ','%20')
        .split('?')[0]
        // .replace(/(jpg)|(JPG)/, 'jpg')
        // .replace('jpg', 'JPG'
        .replace(/%2F/gi, '/');

      // console.log('pre', image);
      // console.log('post', imageUrlFormatted);

      // const regex = /([JPG])/g
      // console.log('test', imageUrlFormatted.test(regex));

      getDownloadURL(ref(storage, imageUrlFormatted))
        .then((url) => {
          console.log('downloadURL', url);
          setLargeImages((prevState) => [...prevState, url]);
          reactImageSize(url)
            .then(({ width, height }) =>
              setLargeImageDimensions((prevState) => [
                ...prevState,
                {
                  url: url,
                  width: width,
                  height: height,
                },
              ])
            )
            .catch((errorMessage) =>
              console.log('reactImageSize error', errorMessage)
            );

          // Get metadata properties
          getMetadata(ref(storage, imageUrlFormatted)).then((metadata) => {
            // Metadata now contains the metadata for 'images/forest.jpg'
            const formatBytes = (a, b = 2) => {
              if (!+a) return '0 Bytes';
              const c = 0 > b ? 0 : b,
                d = Math.floor(Math.log(a) / Math.log(1024));
              return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))}${
                ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
              }`;
            };
            setLargeImageMetadata((prevState) => [
              ...prevState,
              { url: url, size: formatBytes(metadata.size) },
            ]);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      return null;
    });
  }, [purchasedImages, paymentConfirmed, isLoading]);

  //download widget
  const toDataURL = async (image) => {
    return fetch(image)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  const downloadImage = async (url) => {
    const imageName = url.split(/%2F(.*?)%2F/)[1];
    const imageNumber = url.split(/(\d+)[^\d]+JPG/)[1];
    const imageType = 'jpg';

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = await toDataURL(url);
    a.download = imageName + '_' + imageNumber + '.' + imageType;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Helmet>
        <title>Twoje zdjęcia: Kacper Porada Fotografia</title>
      </Helmet>
      <div className="purchased__container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {paymentConfirmed ? (
              <>
                {/* <button onClick={sendEmailConfirmation}>send email</button> */}
                <h1>Twoje zdjęcia</h1>

                <div className="purchased__images">
                  <ul>
                    {largeImages.map((image) => (
                      <li key={image} className="purchased__image__card">
                        <img
                          src={image}
                          alt="zdjęcie"
                          className="purchased__image__card__img"
                        />
                        <div className="purchased__image__card__tools">
                          <button
                            onClick={() => downloadImage(image)}
                            className="btn--primary"
                          >
                            Pobierz zdjęcie
                          </button>
                          <a
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="btn--primary">
                              Zobacz w nowej karcie
                            </button>
                          </a>
                          <h3>
                            Wymiary obrazu:{' '}
                            {largeImageDimensions[
                              largeImageDimensions.findIndex(
                                (item) => item.url === image
                              )
                            ] === undefined ? (
                              <>
                                <LoadingSpinner />
                              </>
                            ) : (
                              <>
                                {
                                  largeImageDimensions[
                                    largeImageDimensions.findIndex(
                                      (item) => item.url === image
                                    )
                                  ].width
                                }
                                x
                                {
                                  largeImageDimensions[
                                    largeImageDimensions.findIndex(
                                      (item) => item.url === image
                                    )
                                  ].height
                                }
                                px
                              </>
                            )}
                          </h3>
                          <h3>
                            Rozmiar pliku:{' '}
                            {largeImageMetadata[
                              largeImageMetadata.findIndex(
                                (item) => item.url === image
                              )
                            ] === undefined ? (
                              <>
                                <LoadingSpinner />
                              </>
                            ) : (
                              largeImageMetadata[
                                largeImageMetadata.findIndex(
                                  (item) => item.url === image
                                )
                              ].size
                            )}
                          </h3>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="purchased__error__container">
                  <div className="purchased__error__header">
                    <img
                      src={IconError}
                      alt="błąd"
                      className="purchased__icon purchased__icon--error"
                    />
                    <h1>Ups...</h1>
                  </div>

                  <h2>
                    Nie jesteśmy w stanie znaleźć zdjęć powiązanych z tym
                    zamówieniem. Co dalej?
                    <br />
                  </h2>
                  <ul>
                    <li>
                      <p>
                        <img
                          src={IconQuestion}
                          alt="pytanie"
                          className="purchased__icon purchased__icon--question"
                        />
                        Czy adres został wpisany poprawnie? <br />
                        Jeśli otrzymałeś/aś link do albumu od znajomego, to
                        upewnij się, że adres został wpisany w całości
                        poprawnie. Adres do albumu można również znaleźć we
                        wiadomości email otrzymanej po zakupie zdjęć.
                      </p>
                    </li>
                    <br />
                    <li>
                      <p>
                        <img
                          src={IconQuestion}
                          alt="pytanie"
                          className="purchased__icon purchased__icon--question"
                        />
                        Czy płatność została sfinalizowana? <br />
                        Jeśli <i>tak</i>, to sprawdź swoją skrzynkę email. Po
                        sfinalizowaniu płatności wysłaliśmy do Ciebie wiadomość,
                        która zawiera link do zdjęć.
                      </p>
                    </li>
                    <li>
                      <p>
                        Jeśli <i>nie</i> i pieniądze nie zostały pobrane, to nic
                        się nie stało - możesz stworzyć{' '}
                        <Link to="/koszyk">
                          <i>nowe zamówienie</i>
                        </Link>
                        . Po wykonaniu płatności otrzymasz automatycznie linki
                        do zdjęć na adres email podany w zamówieniu.
                      </p>
                    </li>
                    <br />
                    <li>
                      <p>
                        <img
                          src={IconQuestion}
                          alt="pytanie"
                          className="purchased__icon purchased__icon--question"
                        />
                        Nadal nie jesteś w stanie otrzymać zdjęć? <br />
                        Zapraszamy do kontaktu, wspólnie rozwiążemy wszelkie
                        problemy:{' '}
                      </p>
                    </li>
                    <br />
                    <li>
                      <Link to="/kontakt">
                        <button>Pomoc</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Purchased;

// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
// import reactImageSize from 'react-image-size';

// // Import the functions you need from the SDKs you need
// import 'firebase/storage';
// import 'firebase/firestore';

// import {
//   React,
//   Helmet,
//   Store,
//   useState,
//   useContext,
//   useEffect,
//   useParams,
//   Link,
//   axios,
//   jsSHA,
//   LoadingSpinner,
//   IconError,
//   IconQuestion,
// } from '../imports';

// const Purchased = () => {
//   const { state, dispatch: contextDispatch } = useContext(Store);
//   const { uniqueId } = useParams();
//   console.log('useParams uniqueId', uniqueId);

//   const [purchasedImages, setPurchasedImages] = useState([]);
//   const [largeImages, setLargeImages] = useState([]);
//   const [largeImageMetadata, setLargeImageMetadata] = useState([]);
//   const [largeImageDimensions, setLargeImageDimensions] = useState([]);
//   const [paymentConfirmed, setPaymentConfirmed] = useState(false);
//   // const [emailSent, setEmailSent] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   //1.use uniqueId from url params to find order in db.
//   //found? proceed to 2. no? show error message

//   //2.if order is in db then check if order is paid
//   //yes? show images to customer. no? go to 3.

//   //3. see if payment is present in payment gateway's api endpoint
//   //yes? show images to customer & send back payment confirmation to api & confirm order as paid in db
//   //no? show error message

//   //get purchased images list from db
//   useEffect(() => {
//     //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then show images to customer
//     (async () => {
//       const docRef = doc(db, 'orders', uniqueId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists() && docSnap.data().isPaid === true) {
//         setPurchasedImages(docSnap.data().cartItems);
//         setUserEmail(docSnap.data().email);
//         setUserName(docSnap.data().name);
//         // setEmailSent(docSnap.data().emailSent);
//         setPaymentConfirmed(true);
//         setIsLoading(false);
//         // console.log('docSnap.exists() && docSnap.data().isPaid === true emailSent', docSnap.data().emailSent)
//       }

//       if (docSnap.exists() && docSnap.data().isPaid === false) {
//         console.log(
//           'order found in db. status: unpaid. veryfying order status.'
//         );
//         setUserEmail(docSnap.data().email);
//         setUserName(docSnap.data().name);
//         // setEmailSent(docSnap.data().emailSent);

//         evaluateOrderStatus(); //find payment confirmation in api endpoint; if none found then display error message
//         async function evaluateOrderStatus() {
//           console.log('getPaymentConfirmation start');
//           try {
//             await axios({
//               method: 'get',
//               url: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS,
//             }).then(function (response) {
//               if (
//                 response.data.find((element) => element.sessionId === uniqueId)
//               ) {
//                 console.log('payment found in api endpoint');
//                 setIsLoading(false);

//                 //send payment verification data to context
//                 contextDispatch({
//                   type: 'PAYMENT_VERIFICATION',
//                   payload: response.data.find(
//                     (element) => element.sessionId === uniqueId
//                   ),
//                 });

//                 // 2. clear cart
//                 contextDispatch({
//                   type: 'CLEAR_CART',
//                 });
//                 setPaymentConfirmed(true);
//                 setPurchasedImages(docSnap.data().cartItems);
//               } else {
//                 console.log('payment not found in api endpoint');
//                 setIsLoading(false);
//               }
//             });
//           } catch (error) {
//             console.error(error);
//           }
//         }
//       } else {
//         console.log('error: order not found in api endpoint.');
//         setIsLoading(false);
//       }
//     })();
//   }, [uniqueId, contextDispatch]);

//   useEffect(() => {
//     //1. find payment id db, 2. if isPaid: false, then confirm via payment gateway api query & set status as paid in db; if isPaid: true, then show images to user
//     (async () => {
//       console.log('initiate payment verification');
//       const docRef = doc(db, 'orders', uniqueId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log('Document data:', docSnap.data().isPaid);
//         if (docSnap.data().isPaid === false) {
//           console.log('run payment verification');
//           paymentVerification(); //send back the payment confirmation to payment gateway api
//         } else {
//           console.log('payment confirmation: order unpaid');
//           // setPaymentConfirmed(true);
//         }
//       } else {
//         console.log('error: order not found in db');
//       }
//     })();

//     const paymentVerification = () => {
//       if (state.paymentVerification !== null) {
//         console.log('state.paymentVerification', state.paymentVerification);
//         //funkcja dla pierwszego etapu transkacji /v1/transaction/register
//         const crcValue = process.env.REACT_APP_PAYMENT_GATEWAY_CRC_VALUE; //CRC pobrane z danych konta
//         const username = process.env.REACT_APP_PAYMENT_GATEWAY_USERNAME;
//         const password = process.env.REACT_APP_PAYMENT_GATEWAY_PASSWORD;

//         // templatka sign: {"sessionId":"str","merchantId":int,"amount":int,"currency":"str","crc":"str"}
//         const signTemplate = `{"sessionId":"${uniqueId}","orderId":${state.paymentVerification.orderId},"amount":${state.paymentVerification.amount},"currency":"PLN","crc":"${crcValue}"}`;
//         const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' }); //nowy obiekt sha-384 generowany przez jsSHA
//         shaObj.update(signTemplate); //wprowadzenie ciągu signCryptoInput do hashowania przez shaObj
//         const signSha = shaObj.getHash('HEX'); //konwersja shaObj do hex

//         axios({
//           method: 'put',
//           url: process.env.REACT_APP_PAYMENT_GATEWAY_URLVERIFY,
//           auth: {
//             username: username,
//             password: password,
//           }, //dane z konta sandbox
//           data: {
//             merchantId: state.paymentVerification.merchantId,
//             posId: state.paymentVerification.posId,
//             sessionId: uniqueId,
//             amount: state.paymentVerification.amount,
//             currency: 'PLN',
//             orderId: state.paymentVerification.orderId,
//             sign: signSha,
//           },
//         })
//           .then((response) => {
//             //blok uruchamiany dla odpowiedzi z kodem 200
//             console.log(
//               'payment confirmation sent. verification res',
//               response
//             );
//             (async () => {
//               console.log('update order status as paid');
//               const docRef = doc(db, 'orders', uniqueId);
//               const docSnap = await getDoc(docRef);

//               if (docSnap.exists()) {
//                 console.log('is order paid?', docSnap.data().isPaid);
//                 if (docSnap.data().isPaid === false) {
//                   console.log('run payment verification');

//                   // paymentVerification(); //send back the payment confirmation to payment gateway api
//                   setDoc(docRef, { isPaid: true }, { merge: true }); //set order as paid in db
//                   setPaymentConfirmed(true);

//                   //email confirmation. get dynamic variables for email body contents
//                   const emailHTMLContent = () => {
//                     return `<html>
//                       <head></head>
//                       <body>
//                       <p>Hej <span style="text-transform: capitalize">${userName},</span></p>
//                       <p>Dziękuję za zakup. Mam nadzieję, że te zdjęcia sprawią Ci wiele radości i będą wspaniałą pamiątką na przyszłość.</p>
//                       <p>Linki do zakupionych zdjęć oraz ich podgląd znajdziesz na tej stronie:</p>
//                         <a href="https://www.kacperporada.pl/zakupione/${uniqueId}">
//                           <button
//                           style="
//                           padding: 10px 26px;
//                           background-color: rgba(0, 230, 0, .5);
//                           color: black;
//                           cursor: pointer;
//                           border: 1px solid rgba(0,0,0,0.2);
//                           border-radius: 4px">
//                             Zobacz zdjęcia</button>
//                         </a>
//                       <p>Zdjęcia pozostaną dostępne do pobrania przez 60 dni od daty zakupu. W razie jakichkolwiek problemów z pobraniem zdjęć skontaktuj się ze mną przez <a href="http://www.kacperporada.pl/pomoc">stronę pomocy</a>, lub po prostu odpowiedz na tę wiadomość.</p>
//                       <br></br>
//                       <p>Do zobaczenia w przyszłych wydarzeniach! :)</p>
//                       <p>Kacper Porada Fotografia</p>
//                       <br></br>
//                       <p>Jeśli nie jesteś adresatem tej wiadomości, to prawdopodobnie podczas zakupu podany został błędny adres email. Możesz zignorować zarówno tę wiadomość jak i wszelkie pozostałe emaile informujące o dokonaniu płatności. </p>
//                       </body>
//                       </html>`;
//                   };

//                   //send order email to user
//                   const sendEmailConfirmation = () => {
//                     console.log('sending email confirmation');
//                     //update order status in db to emailSent: true
//                     (async () => {
//                       console.log(
//                         'email sent successfully. updating order status in db...'
//                       );
//                       const docRef = doc(db, 'orders', uniqueId);
//                       const docSnap = await getDoc(docRef);

//                       if (
//                         docSnap.data().emailSent === false &&
//                         state.emailConfirmationSent === false
//                       ) {
//                         console.log('confirming email as sent in db');

//                         axios({
//                           method: 'post',
//                           url: 'https://api.sendinblue.com/v3/smtp/email',
//                           headers: {
//                             accept: 'application/json',
//                             'api-key':
//                               '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',
//                             'content-type': 'application/json',
//                           },
//                           data: {
//                             sender: {
//                               name: 'Kacper Porada Fotografia',
//                               email: 'sklep.kacperporada@gmail.com',
//                             },
//                             to: [
//                               {
//                                 email: userEmail,
//                                 name: userName,
//                               },
//                             ],
//                             subject: 'Twoje zdjęcia. Sklep KacperPorada.pl',
//                             htmlContent: emailHTMLContent(),
//                           },
//                         });

//                         setDoc(docRef, { emailSent: true }, { merge: true });

//                         //set confirmation email as sent
//                         contextDispatch({
//                           type: 'EMAIL_CONFIRMATION_SENT',
//                           payload: true,
//                         });

//                         console.log(
//                           // 'email sending completed. emailSent in state:',
//                           // emailSent,
//                           'emailSent in db:',
//                           docSnap.data().emailSent
//                         );
//                         // }
//                         // catch (error) {
//                         //   console.log(
//                         //     'error while sending confirmation email:',
//                         //     error
//                         //   );
//                         // }
//                       } else {
//                         console.log(
//                           'unable to confirm email status as sent upon accessing db. current emailSent status:',
//                           docSnap.data().emailSent
//                         );
//                       }
//                     })();
//                   };
//                   sendEmailConfirmation();

//                   //send email invoice request to shop admin
//                   const sendEmailInvoiceRequest = () => {
//                     console.log('sending email invoice request');
//                     //update order status in db to emailSent: true
//                     (async () => {
//                       // console.log(
//                       //   'email invoice request sent successfully. updating order status in db...'
//                       // );
//                       const docRef = doc(db, 'orders', uniqueId);
//                       const docSnap = await getDoc(docRef);

//                       if (
//                         docSnap.data().invoiceRequested === true &&
//                         state.invoiceRequestEmailSent(false)
//                       ) {
//                         console.log('confirming email as sent in db');

//                         axios({
//                           method: 'post',
//                           url: 'https://api.sendinblue.com/v3/smtp/email',
//                           headers: {
//                             accept: 'application/json',
//                             'api-key':
//                               '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',
//                             'content-type': 'application/json',
//                           },
//                           data: {
//                             sender: {
//                               name: 'Kacper Porada Fotografia',
//                               email: 'sklep.kacperporada@gmail.com',
//                             },
//                             to: [
//                               {
//                                 name: 'Kacper Porada Fotografia',
//                                 email: 'sklep.kacperporada@gmail.com',
//                               },
//                             ],
//                             subject: 'Klient prosi o wystawienie faktury',
//                             htmlContent: `<html>
//                             <head></head>
//                             <body>
//                             <p>Hej <span style="text-transform: capitalize">${
//                               process.env.REACT_APP_USER_NAME
//                             },</span></p>
//                             <p>Podczas składania zamówienia klient ${
//                               docSnap.data().name
//                             } ${
//                               docSnap.data().surname
//                             } poprosił o wystawienie faktury. Dane klienta:</p>
//                             <p>Email: ${docSnap.data().email}</p>
//                             <p>Imię: ${docSnap.data().name}</p>
//                             <p>Nazwisko: ${docSnap.data().surname}</p>
//                             <p>NIP: ${docSnap.data().invoiceTaxId}</p>
//                             <p>Identyfikator zamówienia: ${uniqueId}</p>
//                             <p>Podgląd zamówienia:</p>
//                               <a href="https://www.kacperporada.pl/zakupione/${uniqueId}">
//                                 <button
//                                 style="
//                                 padding: 10px 26px;
//                                 background-color: rgba(0, 230, 0, .5);
//                                 color: black;
//                                 cursor: pointer;
//                                 border: 1px solid rgba(0,0,0,0.2);
//                                 border-radius: 4px">
//                                   Zobacz zdjęcia</button>
//                               </a>

//                             <p>Kacper Porada Fotografia</p>
//                             </body>
//                             </html>`,
//                           },
//                         });

//                         // setInvoiceRequestEmailSent(true);
//                         //set invoice request email as sent
//                         contextDispatch({
//                           type: 'EMAIL_INVOICE_REQUEST_SENT',
//                           payload: true,
//                         });

//                         console.log(
//                           // 'email sending completed. emailSent in state:',
//                           // emailSent,
//                           'email invooice request sent in db:',
//                           docSnap.data().invoiceRequested
//                         );
//                       } else {
//                         console.log(
//                           'unable to confirm email status as sent upon accessing db. current emailSent status:',
//                           docSnap.data().emailSent
//                         );
//                       }
//                     })();
//                   };
//                   sendEmailInvoiceRequest();
//                 } else {
//                   console.log('payment confirmation: order paid');
//                   setPaymentConfirmed(true);
//                 }
//               } else {
//                 console.log('error: order not found in db');
//               }
//             })();
//           })
//           .catch((err) => {
//             //blok dla odpowiedzi z błędem 400/401
//             console.log('err', err);
//           });
//       } else {
//         console.log('state.paymentVerification is', state.paymentVerification);
//       }
//     };
//     paymentVerification(); //send back the payment confirmation to payment gateway api
//   }, [
//     contextDispatch,
//     state,
//     state.paymentVerification,
//     uniqueId,
//     userName,
//     userEmail,
//     state.emailConfirmationSent,
//     state.invoiceRequestEmailSent,
//   ]);

//   //get full versions of images after confirming order status as paid
//   useEffect(() => {
//     // console.log('url:',image)
//     // console.log('large url:',imageUrlFormatted)

//     console.log('purchasedImages available', purchasedImages);
//     purchasedImages.map((image) => {
//       const storage = getStorage();
//       const imageUrlFormatted = image
//         .replace('https://firebasestorage.googleapis.com/v0/b/', 'gs://')
//         .replace('/o', '')
//         .replace('male', 'duze')
//         // .replace(' ','%20')
//         .split('?')[0]
//         // .replace(/(jpg)|(JPG)/, 'jpg')
//         // .replace('jpg', 'JPG'
//         .replace(/%2F/gi, '/');

//       // console.log('pre', image);
//       // console.log('post', imageUrlFormatted);

//       // const regex = /([JPG])/g
//       // console.log('test', imageUrlFormatted.test(regex));

//       getDownloadURL(ref(storage, imageUrlFormatted))
//         .then((url) => {
//           console.log('downloadURL', url);
//           setLargeImages((prevState) => [...prevState, url]);
//           reactImageSize(url)
//             .then(({ width, height }) =>
//               setLargeImageDimensions((prevState) => [
//                 ...prevState,
//                 {
//                   url: url,
//                   width: width,
//                   height: height,
//                 },
//               ])
//             )
//             .catch((errorMessage) =>
//               console.log('reactImageSize error', errorMessage)
//             );

//           // Get metadata properties
//           getMetadata(ref(storage, imageUrlFormatted)).then((metadata) => {
//             // Metadata now contains the metadata for 'images/forest.jpg'
//             const formatBytes = (a, b = 2) => {
//               if (!+a) return '0 Bytes';
//               const c = 0 > b ? 0 : b,
//                 d = Math.floor(Math.log(a) / Math.log(1024));
//               return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))}${
//                 ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
//               }`;
//             };
//             setLargeImageMetadata((prevState) => [
//               ...prevState,
//               { url: url, size: formatBytes(metadata.size) },
//             ]);
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//       return null;
//     });
//   }, [purchasedImages, paymentConfirmed, isLoading]);

//   //download widget
//   const toDataURL = async (image) => {
//     return fetch(image)
//       .then((response) => {
//         return response.blob();
//       })
//       .then((blob) => {
//         return URL.createObjectURL(blob);
//       });
//   };

//   const downloadImage = async (url) => {
//     const imageName = url.split(/%2F(.*?)%2F/)[1];
//     const imageNumber = url.split(/(\d+)[^\d]+JPG/)[1];
//     const imageType = 'jpg';

//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = await toDataURL(url);
//     a.download = imageName + '_' + imageNumber + '.' + imageType;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Twoje zdjęcia: Kacper Porada Fotografia</title>
//       </Helmet>
//       <div className="purchased__container">
//         {isLoading ? (
//           <LoadingSpinner />
//         ) : (
//           <>
//             {paymentConfirmed ? (
//               <>
//                 {/* <button onClick={sendEmailConfirmation}>send email</button> */}
//                 <h1>Twoje zdjęcia</h1>

//                 <div className="purchased__images">
//                   <ul>
//                     {largeImages.map((image) => (
//                       <li key={image} className="purchased__image__card">
//                         <img
//                           src={image}
//                           alt="zdjęcie"
//                           className="purchased__image__card__img"
//                         />
//                         <div className="purchased__image__card__tools">
//                           <button
//                             onClick={() => downloadImage(image)}
//                             className="btn--primary"
//                           >
//                             Pobierz zdjęcie
//                           </button>
//                           <a
//                             href={image}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             <button className="btn--primary">
//                               Zobacz w nowej karcie
//                             </button>
//                           </a>
//                           <h3>
//                             Wymiary obrazu:{' '}
//                             {largeImageDimensions[
//                               largeImageDimensions.findIndex(
//                                 (item) => item.url === image
//                               )
//                             ] === undefined ? (
//                               <>
//                                 <LoadingSpinner />
//                               </>
//                             ) : (
//                               <>
//                                 {
//                                   largeImageDimensions[
//                                     largeImageDimensions.findIndex(
//                                       (item) => item.url === image
//                                     )
//                                   ].width
//                                 }
//                                 x
//                                 {
//                                   largeImageDimensions[
//                                     largeImageDimensions.findIndex(
//                                       (item) => item.url === image
//                                     )
//                                   ].height
//                                 }
//                                 px
//                               </>
//                             )}
//                           </h3>
//                           <h3>
//                             Rozmiar pliku:{' '}
//                             {largeImageMetadata[
//                               largeImageMetadata.findIndex(
//                                 (item) => item.url === image
//                               )
//                             ] === undefined ? (
//                               <>
//                                 <LoadingSpinner />
//                               </>
//                             ) : (
//                               largeImageMetadata[
//                                 largeImageMetadata.findIndex(
//                                   (item) => item.url === image
//                                 )
//                               ].size
//                             )}
//                           </h3>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="purchased__error__container">
//                   <div className="purchased__error__header">
//                     <img
//                       src={IconError}
//                       alt="błąd"
//                       className="purchased__icon purchased__icon--error"
//                     />
//                     <h1>Ups...</h1>
//                   </div>

//                   <h2>
//                     Nie jesteśmy w stanie znaleźć zdjęć powiązanych z tym
//                     zamówieniem. Co dalej?
//                     <br />
//                   </h2>
//                   <ul>
//                     <li>
//                       <p>
//                         <img
//                           src={IconQuestion}
//                           alt="pytanie"
//                           className="purchased__icon purchased__icon--question"
//                         />
//                         Czy adres został wpisany poprawnie? <br />
//                         Jeśli otrzymałeś/aś link do albumu od znajomego, to
//                         upewnij się, że adres został wpisany w całości
//                         poprawnie. Adres do albumu można również znaleźć we
//                         wiadomości email otrzymanej po zakupie zdjęć.
//                       </p>
//                     </li>
//                     <br />
//                     <li>
//                       <p>
//                         <img
//                           src={IconQuestion}
//                           alt="pytanie"
//                           className="purchased__icon purchased__icon--question"
//                         />
//                         Czy płatność została sfinalizowana? <br />
//                         Jeśli <i>tak</i>, to sprawdź swoją skrzynkę email. Po
//                         sfinalizowaniu płatności wysłaliśmy do Ciebie wiadomość,
//                         która zawiera link do zdjęć.
//                       </p>
//                     </li>
//                     <li>
//                       <p>
//                         Jeśli <i>nie</i> i pieniądze nie zostały pobrane, to nic
//                         się nie stało - możesz stworzyć{' '}
//                         <Link to="/koszyk">
//                           <i>nowe zamówienie</i>
//                         </Link>
//                         . Po wykonaniu płatności otrzymasz automatycznie linki
//                         do zdjęć na adres email podany w zamówieniu.
//                       </p>
//                     </li>
//                     <br />
//                     <li>
//                       <p>
//                         <img
//                           src={IconQuestion}
//                           alt="pytanie"
//                           className="purchased__icon purchased__icon--question"
//                         />
//                         Nadal nie jesteś w stanie otrzymać zdjęć? <br />
//                         Zapraszamy do kontaktu, wspólnie rozwiążemy wszelkie
//                         problemy:{' '}
//                       </p>
//                     </li>
//                     <br />
//                     <li>
//                       <Link to="/kontakt">
//                         <button>Pomoc</button>
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Purchased;
