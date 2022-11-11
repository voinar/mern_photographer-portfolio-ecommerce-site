import { Store, Link, useState, useContext, useEffect, v4 } from '../imports';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// import { ordersColRef } from '../firebase/config';
import jsSHA from 'jssha';
import axios from 'axios';

const OrderForm = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formInvoiceRequested, setFormInvoiceRequested] = useState(false);
  const [formInvoiceNumber, setFormInvoiceNumber] = useState('');
  const [formTermsConditionsAccept, setFormTermsConditionsAccept] =
    useState(false);
  // const [formNewsletterConsent, setFormNewsletterConsent] = useState(false)
  // const [formInvoiceEmailCopyConsent, setFormInvoiceEmailCopyConsent] =
  //   useState(false);

  const [paymentConfirmation, setPaymentConfirmation] = useState('');
  const [itemPrice, setItemPrice] = useState(null);

  // const [uniqueId, setUniqueId] = useState(state.cart.uniqueId || null);

  //generate unique id used as order id, payment id & save it to context
  useEffect(() => {
    if (state.cart.uniqueId === null) {
      const generateUniqueId = () => {
        try {
          contextDispatch({
            type: 'CACHE_UNIQUE_ID',
            payload: { uniqueId: v4() },
          });
          console.log('generateUniqueId: ' + state.cart.uniqueId);
        } catch (err) {
          console.log(err);
        }
      };
      generateUniqueId();
    }
  }, [contextDispatch, state.cart.uniqueId]);


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

  const handleFormPhoneUpdate = (e) => {
    setFormPhone(e.target.value);
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
      if (regEx.test(formEmail) === true) {
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

    const phoneValidation = () => {
      const regEx = /^[+0-9 ]{9,16}$/g;
      if (formPhone === '' || regEx.test(formPhone) === true) {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage(
          'Proszę wprowadzić poprawny numer telefonu lub pozostawić pole jako puste'
        );
      }
    };
    phoneValidation();

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
      phoneValidation() === true &&
      formInvoiceNumberValidation() === true &&
      termsConditionsAcceptValidation() === true
    ) {
      return true;
    }
  };

  //data submission function
  const dispatchFormDataToContext = (e) => {
    e.preventDefault();

    console.log('generateUniqueId: ' + state.cart.uniqueId);

    if (formValidation() === true) {
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
          phone: formPhone,
          invoiceRequested: formInvoiceRequested,
          invoiceTaxId: formInvoiceNumber,
          termsConditionsAccepted: formTermsConditionsAccept,
          isPaid: false,
          cartItems: state.cart.cartItems,
          dateCreated: new Date(),
          orderId: state.cart.uniqueId,
          amount: calculatedAmount,
        });

        // merchantId: 200527,
        // posId: 200527,
        // sessionId: uniqueId, //id generowane przy tworzeniu zamówienia, np: '6b795d5e-394f-4ae3-b313-bb70ccd99d5c'
        // amount: 5,
        // currency: 'PLN',
        // orderId: uniqueId,
        // description: 'zakup test',
        // email: 'test@test.pl',
        // urlReturn: 'https://kacperporada.pl/twojezakupy', //adres do przekierowania po wykonanej płatności
        // urlStatus: 'https://kacperporada.pl/api', //adres do otrzymania informacji zwrotnej o transakcji z systemu przelewy24
        // country: 'PL',
        // sign: signSha, //wygenerowany wyżej hash

        //initiate payment process: register payment in p24
        paymentRegister();
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
    console.log('signtemp', signTemplate);
    console.log('id type', typeof state.cart.uniqueId);
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
        urlReturn: process.env.REACT_APP_PAYMENT_GATEWAY_URLRETURN, //adres do przekierowania po wykonanej płatności
        urlStatus: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS, //adres do otrzymania informacji zwrotnej o transakcji z systemu przelewy24
        country: 'PL',
        sign: signSha, //wygenerowany wyżej hash
      },
    })
      .then((response) => {
        //blok uruchamiany dla odpowiedzi z kodem 200
        // console.log(response);
        console.log('token', response.data.data.token);
        // setToken(String(response.data.data.token));
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

    // console.log('paymentRegister start');
    // console.log('uniqueId', uniqueId);
    // console.log('sign sha hex', shaObj.getHash('HEX'));
  };

  const paymentVerify = (e) => {
    e.preventDefault();
    console.log('paymentVerify');
    console.log('uniqueId@paymentVerify:', state.cart.uniqueId);

    axios({
      method: 'post',
      url: process.env.REACT_APP_PAYMENT_GATEWAY_URLSTATUS,
      data: { id: state.cart.uniqueId, date: new Date() },
    })
      .then((response) => {
        console.log('response', response.config.data);
        setPaymentConfirmation(JSON.stringify(response.config.data));
      })
      .catch((err) => {
        console.log('err', err);
        setPaymentConfirmation(JSON.stringify(err));
      });
  };

  return (
    <div className="order-form__container">
      <span>
        <h2>Dane zamawiającego:</h2>
      </span>
      <div className="order-form__content">
        <form>
          <label>
            Email*:
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
              Imię*:
              <input
                value={formName}
                onChange={handleFormNameUpdate}
                type="text"
                name="name"
                required
              />
            </label>
            <label>
              Nazwisko*:
              <input
                value={formSurname}
                onChange={handleFormSurnameUpdate}
                type="text"
                name="surname"
                required
              />
            </label>
          </div>
          <label>
            Telefon:
            <input
              value={formPhone}
              onChange={handleFormPhoneUpdate}
              type="text"
              name="phone"
            />
          </label>

          <div className="order-form__content__checkbox">
            <input
              name="consentInvoice"
              type="checkbox"
              onChange={toggleInputInvoice}
            />
            <label>
              Chcę otrzymać fakturę na adres email podany w zamówieniu
            </label>
          </div>

          {formInvoiceRequested ? (
            <>
              <div className="order-form__content__checkbox">
                <label>
                  NIP:{' '}
                  <input
                    value={formInvoiceNumber}
                    onChange={handleFormInvoiceFieldChange}
                    type="text"
                    name="phone"
                  />
                </label>
              </div>
              {/* <div className="order-form__content__checkbox">
                <input
                  name="consentReceipt"
                  type="checkbox"
                  // checked={this.state.isGoing}
                  // onChange={this.handleInputChange}
                />
                <label>
                  Wyrażam zgodę na otrzymanie faktury na adres e-mail podany w
                  zamówieniu*
                </label>
              </div> */}
            </>
          ) : null}

          {/* <div className="order-form__content__checkbox">
            <input
              name="consentNewsletter"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            />
            <label>Zapisz mnie do darmowego newslettera</label>
          </div> */}

          <div className="order-form__content__checkbox">
            <input
              name="consentTermsConditions"
              type="checkbox"
              // checked={this.state.isGoing}
              onChange={handleFormTermsConditionsAccept}
            />
            <label>
              Oświadczam, że znany mi jest{' '}
              <Link to="/regulamin">regulamin</Link> i akceptuję jego
              postanowienia.*
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
            Kupuję i płacę
          </button>
          <button onClick={handleFormSubmission}>
            register transaction POST
          </button>
          {/* <button
            onClick={() => {
              window.open(tokenLink, '_blank', 'noopener,noreferrer');
            }}
          >
            token link {token}
          </button> */}
          <button onClick={paymentVerify}>verify transaction:</button>
          <p>{paymentConfirmation}</p>
          <br />
          <span>*pole wymagane</span>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
