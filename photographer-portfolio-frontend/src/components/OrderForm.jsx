import {
  React,
  Store,
  Link,
  useState,
  useContext,
  useEffect,
  v4,
  jsSHA,
  axios,
  textContent,
} from '../imports';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const OrderForm = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formInvoiceRequested, setFormInvoiceRequested] = useState(false);
  const [formInvoiceNumber, setFormInvoiceNumber] = useState('');
  const [formTermsConditionsAccept, setFormTermsConditionsAccept] =
    useState(false);
  const [itemPrice, setItemPrice] = useState(null);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  //generate unique id used as order id, payment id & save it to context
  useEffect(() => {
    const generateUniqueId = () => {
      try {
        contextDispatch({
          type: 'CACHE_UNIQUE_ID',
          payload: { uniqueId: v4() },
        });
      } catch (err) {
        console.log(err);
      }
    };
    generateUniqueId();
  }, [contextDispatch]);
  console.log('generateUniqueId: ' + state.cart.uniqueId);

  const getPrice = async () => {
    try {
      const docRef = doc(db, 'settings', '5cJniz1wK9Sri7EmlSzD');
      const docSnap = await getDoc(docRef);
      setItemPrice(
        Number(
          docSnap?._document?.data?.value?.mapValue?.fields?.imagePrice
            ?.integerValue
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  getPrice();

  const [errorMessage, setErrorMessage] = useState('');

  const handleFormEmailUpdate = (e) => {
    setFormEmail(e.target.value);
  };

  const handleFormNameUpdate = (e) => {
    setFormName(e.target.value);
  };

  const handleFormSurnameUpdate = (e) => {
    setFormSurname(e.target.value);
  };

  const toggleInputInvoice = () => {
    setFormInvoiceRequested((prevState) => !prevState);
    setFormInvoiceNumber('');
    setErrorMessage('');
  };

  const handleFormInvoiceFieldChange = (e) => {
    setFormInvoiceNumber(e.target.value);
  };

  const handleFormTermsConditionsAccept = () => {
    setFormTermsConditionsAccept((prevState) => !prevState);
  };

  //validation methods
  const formValidation = () => {
    const emailValidation = () => {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (regEx.test(formEmail.toLowerCase()) === true) {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Proszę wprowadzić poprawny adres email');
      }
    };
    emailValidation();

    const nameValidation = () => {
      if (formName.length > 1 && formName.length < 20) {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Proszę wprowadzić poprawne imię');
      }
    };
    nameValidation();

    const surnameValidation = () => {
      if (formSurname.length > 2 && formSurname.length < 30) {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Proszę wprowadzić poprawne nazwisko');
      }
    };
    surnameValidation();

    const formInvoiceNumberValidation = () => {
      if (formInvoiceRequested === true) {
        if (formInvoiceNumber.length > 7 && formInvoiceNumber.length < 11) {
          setErrorMessage('');
          return true;
        } else {
          setErrorMessage('Proszę wprowadzić poprawny numer NIP');
        }
      } else return true;
    };
    formInvoiceNumberValidation();

    const termsConditionsAcceptValidation = () => {
      if (formTermsConditionsAccept === true) {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Aby kontynuować zaakceptuj warunki regulaminu');
      }
    };
    termsConditionsAcceptValidation();

    if (
      emailValidation() === true &&
      nameValidation() === true &&
      surnameValidation() === true &&
      formInvoiceNumberValidation() === true &&
      termsConditionsAcceptValidation() === true
    ) {
      return true;
    }
  };

  //data submission function
  const dispatchFormDataToContext = (e) => {
    e.preventDefault();

    console.log('generated UniqueId: ' + state.cart.uniqueId);

    if (formValidation() === true) {
      setPaymentInitiated(true); //toggle order form and tell the user to continue to the payment
    } else {
      console.log('form invalid');
    }
    handleFormSubmission();
  };

  const calculatedAmount = state?.cart?.cartItems?.length * itemPrice;

  const handleFormSubmission = async () => {
    if (formValidation() === true) {
      try {
        //add order to db
        console.log('add order to database');

        const orderRef = doc(db, 'orders', state.cart.uniqueId);

        await setDoc(orderRef, {
          email: formEmail,
          name: formName,
          surname: formSurname,
          invoiceRequested: formInvoiceRequested,
          invoiceTaxId: formInvoiceNumber,
          termsConditionsAccepted: formTermsConditionsAccept,
          isPaid: false,
          emailSent: false,
          cartItems: state.cart.cartItems,
          dateCreated: new Date(),
          orderId: state.cart.uniqueId,
          amount: calculatedAmount,
        });

        //initiate payment process: register payment in p24
        paymentRegister();
        setPaymentInitiated(true);
      } catch (err) {
        // setErrorMessage(err.message);
        console.log('error: ' + err);
      }
    } else {
      console.log('form data doesnt meet criteria');
    }
  };

  const paymentRegister = () => {
    //funkcja dla pierwszego etapu transkacji /v1/transaction/register
    // e.preventDefault();
    const crcValue = process.env.REACT_APP_PAYMENT_GATEWAY_CRC_VALUE; //CRC pobrane z danych konta
    const username = process.env.REACT_APP_PAYMENT_GATEWAY_USERNAME;
    const password = process.env.REACT_APP_PAYMENT_GATEWAY_PASSWORD;

    // templatka sign: {"sessionId":"str","merchantId":int,"amount":int,"currency":"str","crc":"str"}
    const signTemplate = `{"sessionId":"${state.cart.uniqueId}","merchantId":${username},"amount":${calculatedAmount},"currency":"PLN","crc":"${crcValue}"}`;
    // console.log('signtemp', signTemplate);
    // const signTemplate = `{"sessionId":${uniqueId},"merchantId":200527,"amount":2,"currency":"PLN","crc":${crcValue}}`; //template string do obliczenia sumy kontrolnej
    const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' }); //nowy obiekt sha-384 generowany przez jsSHA
    shaObj.update(signTemplate); //wprowadzenie ciągu signCryptoInput do hashowania przez shaObj
    const signSha = shaObj.getHash('HEX'); //konwersja shaObj do hex

    axios({
      //zapytanie http przez axios
      method: 'post', //metoda
      url: process.env.REACT_APP_PAYMENT_GATEWAY_URLREGISTER, //sandbox url
      auth: {
        username: username,
        password: password,
      }, //dane z konta sandbox
      data: {
        merchantId: username,
        posId: username,
        sessionId: state.cart.uniqueId, //id generowane przy tworzeniu zamówienia, np: '6b795d5e-394f-4ae3-b313-bb70ccd99d5c'
        amount: calculatedAmount,
        currency: 'PLN',
        orderId: state.cart.uniqueId,
        description: 'Zakup zdjec',
        transferLabel: 'Zakup zdjec',
        email: formEmail,
        urlReturn: `https://kacperporada.pl/zakupione/${state.cart.uniqueId}`, //adres do przekierowania po wykonanej płatności
        urlStatus: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS, //adres do otrzymania informacji zwrotnej o transakcji z systemu przelewy24
        country: 'PL',
        sign: signSha, //wygenerowany wyżej hash
      },
    })
      .then((response) => {
        //blok uruchamiany dla odpowiedzi z kodem 200
        console.log('token', response.data.data.token);
        const tokenLink = `https://sandbox.przelewy24.pl/trnRequest/${String(
          response.data.data.token
        )}`;
        window.open(tokenLink, '_blank', 'noopener,noreferrer'); //open payment window in sepaarte tab
      })
      .catch((err) => {
        //blok dla odpowiedzi z błędem 400/401
        console.log('err', err);
        console.log('err', err.response.data.error);
      });
  };

  return (
    <>
      {paymentInitiated === false ? (
        <div className="order-form__container">
          <span>
            <h2>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.orderForm?.return
              }
            </h2>
          </span>
          <div className="order-form__content">
            <form>
              <label>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.orderForm?.email
                }
                *:
                <input
                  value={formEmail}
                  onChange={handleFormEmailUpdate}
                  type="email"
                  name="email"
                  required
                />
              </label>
              <div className="order-form__content__group">
                <label>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.orderForm?.name
                  }
                  *:
                  <input
                    value={formName}
                    onChange={handleFormNameUpdate}
                    type="text"
                    name="name"
                    required
                  />
                </label>
                <label>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.orderForm?.surname
                  }
                  *:
                  <input
                    value={formSurname}
                    onChange={handleFormSurnameUpdate}
                    type="text"
                    name="surname"
                    required
                  />
                </label>
              </div>
              <div className="order-form__content__checkbox">
                <input
                  name="consentInvoice"
                  type="checkbox"
                  onChange={toggleInputInvoice}
                />
                <label>
                  {
                    textContent[
                      textContent.findIndex((obj) => {
                        return obj.language === state.languageSelected;
                      })
                    ]?.orderForm?.receiptRequested
                  }
                </label>
              </div>

              {formInvoiceRequested ? (
                <>
                  <div className="order-form__content__checkbox">
                    <label>
                      {
                        textContent[
                          textContent.findIndex((obj) => {
                            return obj.language === state.languageSelected;
                          })
                        ]?.orderForm?.taxId
                      }{' '}
                      <input
                        value={formInvoiceNumber}
                        onChange={handleFormInvoiceFieldChange}
                        type="text"
                        name="phone"
                      />
                    </label>
                  </div>
                </>
              ) : null}

              <div className="order-form__content__checkbox">
                <input
                  name="consentTermsConditions"
                  type="checkbox"
                  onChange={handleFormTermsConditionsAccept}
                />
                <label>
                  {state.languageSelected === 'PL' ? (
                    <>
                      Oświadczam, że znany mi jest
                      <Link to="/regulamin"> Regulamin</Link> oraz
                      <Link to="/polityka-prywatnosci">
                        {' '}
                        Polityka prywatności
                      </Link>{' '}
                      i akceptuję ich postanowienia.*
                    </>
                  ) : (
                    <>
                      I confirm that I have read and accept the
                      <Link to="/regulamin"> Terms and Conditions</Link> as well
                      as the
                      <Link to="/polityka-prywatnosci"> Privacy Policy</Link>
                      .*
                    </>
                  )}
                </label>
              </div>

              <br />
              <div className="form__error-message">
                <span>{errorMessage}</span>
              </div>
              <br />
              <button
                onClick={dispatchFormDataToContext}
                type="submit"
                value="Zapisz"
                className="btn--primary"
              >
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.orderForm?.payment
                }
              </button>
              <br />
              <span>
                *{' '}
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.orderForm?.necessary
                }
              </span>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="order-form__container">
            <h2>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.orderForm?.nextStepsHeader
              }
            </h2>
            <br />
            <p>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.orderForm?.nextStepsPara1
              }
            </p>
            <ul>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.orderForm?.nextStepsUl
              }
              <li>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.orderForm?.nextStepsLi1
                }
              </li>
              <li>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.orderForm?.nextStepsLi2
                }
              </li>
            </ul>
            <p>
              {
                textContent[
                  textContent.findIndex((obj) => {
                    return obj.language === state.languageSelected;
                  })
                ]?.orderForm?.nextStepsLi3
              }
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderForm;
