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
  textContent,
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
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailConfirmationsSent, setEmailConfirmationsSent] = useState(false);

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
                console.log(
                  'is order paid? status in db: ',
                  docSnap.data().isPaid
                );
                if (docSnap.data().isPaid === false) {
                  console.log('run payment verification');

                  // paymentVerification(); //send back the payment confirmation to payment gateway api
                  setDoc(docRef, { isPaid: true }, { merge: true }); //set order as paid in db
                  setPaymentConfirmed(true);
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
    emailConfirmationsSent,
  ]);

  //send confirmation emails
  useEffect(() => {
    if (paymentConfirmed === true) {
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

        axios({
          method: 'post',
          url: 'https://api.sendinblue.com/v3/smtp/email',
          headers: {
            accept: 'application/json',
            'api-key': process.env.REACT_APP_SIB_API_KEY,
            'content-type': 'application/json',
          },
          data: {
            sender: {
              name: process.env.REACT_APP_MAILING_SENDER_NAME,
              email: process.env.REACT_APP_MAILING_SENDER_EMAIL,
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

        console.log('confirming email status as sent in db');
        setDoc(docRef, { emailSent: true }, { merge: true });

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
            'api-key': process.env.REACT_APP_SIB_API_KEY,
            'content-type': 'application/json',
          },
          data: {
            sender: {
              name: process.env.REACT_APP_MAILING_SENDER_NAME,
              email: process.env.REACT_APP_MAILING_SENDER_EMAIL,
            },
            to: [
              {
                name: process.env.REACT_APP_MAILING_SENDER_NAME,
                email: process.env.REACT_APP_MAILING_SENDER_EMAIL,
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
      };

      const sendEmailConfirmations = async () => {
        const docRef = doc(db, 'orders', uniqueId);
        const docSnap = await getDoc(docRef);
        if (
          docSnap.data().emailSent === false &&
          docSnap.data().invoiceRequested === true &&
          emailConfirmationsSent === false
        ) {
          console.log('sending invoice request email');
          sendEmailInvoiceRequest();

          console.log('sending email confirmation');
          sendEmailConfirmation();

          setEmailConfirmationsSent(true);
        } else if (
          docSnap.data().emailSent === false &&
          emailConfirmationsSent === false
        ) {
          console.log('sending email confirmation only');
          sendEmailConfirmation();
          setEmailConfirmationsSent(true);
        }
      };
      sendEmailConfirmations();
    }
  }, [paymentConfirmed, emailConfirmationsSent, uniqueId, userName, userEmail]);

  //get full versions of images after confirming order status as paid
  useEffect(() => {
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
    const imageNumber = url.match(/([0-9]{4})(?=.jpg)/g);
    const imageType = 'jpg';
    console.log('downloading image', imageNumber);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = await toDataURL(url);
    a.download = `${imageName}_${imageNumber}_full.${imageType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Helmet>
        <title>
          {
            textContent[
              textContent.findIndex((obj) => {
                return obj.language === state.languageSelected;
              })
            ]?.purchased?.helmet
          }
        </title>
      </Helmet>
      <div className="purchased__container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {paymentConfirmed ? (
              <>
                <p>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.purchased?.titleSmall
                  }
                </p>
                <br />
                <h1>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.purchased?.title
                  }
                </h1>

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
                            {
                              textContent[
                                textContent.findIndex((obj) => {
                                  return (
                                    obj.language === state.languageSelected
                                  );
                                })
                              ]?.purchased?.download
                            }
                          </button>
                          <a
                            href={image}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="btn--secondary">
                              {
                                textContent[
                                  textContent.findIndex((obj) => {
                                    return (
                                      obj.language === state.languageSelected
                                    );
                                  })
                                ]?.purchased?.newTab
                              }
                            </button>
                          </a>
                          <h3>
                            {
                              textContent[
                                textContent.findIndex((obj) => {
                                  return (
                                    obj.language === state.languageSelected
                                  );
                                })
                              ]?.purchased?.resolution
                            }{' '}
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
                            {
                              textContent[
                                textContent.findIndex((obj) => {
                                  return (
                                    obj.language === state.languageSelected
                                  );
                                })
                              ]?.purchased?.fileSize
                            }{' '}
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

                  <div className="purchased__error__container">
                    <div className="purchased__error__header">
                      <img
                        src={IconError}
                        alt="błąd"
                        className="purchased__icon purchased__icon--error"
                      />
                      <h2>
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.info
                        }
                      </h2>
                    </div>

                    <h3>
                      {
                        textContent[
                          textContent.findIndex((obj) => {
                            return obj.language === state.languageSelected;
                          })
                        ]?.purchased?.infoContent
                      }
                      <br />
                    </h3>
                  </div>
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
                    <h1>
                      {
                        textContent[
                          textContent.findIndex((obj) => {
                            return obj.language === state.languageSelected;
                          })
                        ]?.purchased?.errorTitle
                      }
                    </h1>
                  </div>

                  <h2>
                    {
                      textContent[
                        textContent.findIndex((obj) => {
                          return obj.language === state.languageSelected;
                        })
                      ]?.purchased?.errorHeader
                    }
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
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorAddressQ
                        }
                        <br />
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorAddressA
                        }
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
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorPaymentQ
                        }
                        <br />
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorPaymentY
                        }
                      </p>
                      <p>
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorPaymentN
                        }
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
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorSupport1
                        }
                        <br />
                        {
                          textContent[
                            textContent.findIndex((obj) => {
                              return obj.language === state.languageSelected;
                            })
                          ]?.purchased?.errorSupport2
                        }
                      </p>
                    </li>
                    <br />
                    <li>
                      <Link to="/Pomoc">
                        <button>
                          {
                            textContent[
                              textContent.findIndex((obj) => {
                                return obj.language === state.languageSelected;
                              })
                            ]?.purchased?.errorHelp
                          }
                        </button>
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
