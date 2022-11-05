import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../contexts/Store';

import { query, where, getDocs, addDoc } from 'firebase/firestore';
import { ordersColRef } from '../firebase/config';
import { v4 } from 'uuid';
// import json_encode from 'json_encode';
import jsSHA from 'jssha';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import axios from 'axios';

// import {
//   P24,
//   Order,
//   Currency,
//   Country,
//   Language,
//   NotificationRequest,
//   Verification
// } from "@ingameltd/node-przelewy24";

const OrderForm = () => {
  const { state, dispatch: contextDispatch } = useContext(Store);

  const [formEmail, setFormEmail] = useState('testtest@test.test');
  const [formName, setFormName] = useState('test');
  const [formSurname, setFormSurname] = useState('veve');
  const [formPhone, setFormPhone] = useState('');
  const [formInvoiceRequested, setFormInvoiceRequested] = useState(false);
  const [formInvoiceNumber, setFormInvoiceNumber] = useState('');
  // const [formNewsletterConsent, setFormNewsletterConsent] = useState(false)
  const [formTermsConditionsAccept, setFormTermsConditionsAccept] =
    useState(false);
  // const [formInvoiceEmailCopyConsent, setFormInvoiceEmailCopyConsent] =
  //   useState(false);

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

    if (formValidation() === true) {
      console.log('form valid');
    } else {
      console.log('form invalid');
    }

    // const formData = {
    //   email: formEmail,
    //   name: formName,
    //   surname: formSurname,
    //   phone: formPhone,
    //   invoiceRequested: formInvoiceRequested,
    //   invoiceTaxId: formInvoiceNumber,
    //   termsConditionsAccepted: formTermsConditionsAccept,
    //   isPaid: false,
    //   cartItems: state.cart.cartItems,
    //   dateCreated: new Date(),
    // };
    // console.log(formData);
    // console.log(formData.dateCreated);

    handleFormSubmission();
  };

  const uniqueId = v4();

  const handleFormSubmission = async () => {
    console.log(uniqueId);

    if (formValidation() === true) {
      // e.preventDefault();
      // const formData = {
      //   email: formEmail,
      //   name: formName,
      //   surname: formSurname,
      //   phone: formPhone,
      //   invoiceRequested: formInvoiceRequested,
      //   invoiceTaxId: formInvoiceNumber,
      //   termsConditionsAccepted: formTermsConditionsAccept,
      //   isPaid: false,
      //   cartItems: state.cart.cartItems,
      //   dateCreated: new Date(),
      // };

      try {
        console.log('add');

        //add order to db

        await addDoc(ordersColRef, {
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
          orderId: uniqueId,
        });
        // contextDispatch({
        //   type: 'USER_SIGNIN',
        //   payload: { email, password },
        // });
        // localStorage.setItem('userInfo', JSON.stringify(data));

        // navigate(redirect || '/koszyk');

        // isDuplicateUser(email, password)
      } catch (err) {
        // setErrorMessage(err.message);
        console.log('error: ' + err);
      }
    } else {
      console.log('form data doesnt meet criteria');
    }
  };

  const paymentRegister = (e) => {
    e.preventDefault();
    console.log('uniqueId', uniqueId);

    let basicAuthUsrPwd = '200527:e9c589f13cb5129b684a7b72821b9b73';
    let encoded = base64_encode(basicAuthUsrPwd);
    let decoded = base64_decode(encoded);

    console.log('base64 encoded', encoded);
    console.log('base64 decoded', decoded);

    // const shaObj = new jsSHA('SHA-384', 'TEXT', { encoding: 'UTF8' });
    // shaObj
    //   .update(uniqueId)
    //   .update(200527)
    //   .update(3)
    //   .update('PLN')
    //   .update('fc433f3b7b4dea10');

    const shaObj = new jsSHA('SHA-384', 'TEXT', {
      hmacKey: {
        value: String({
          sessionId: uniqueId,
          merchantId: 200527,
          amount: 2,
          currency: 'PLN',
          crc: 'fc433f3b7b4dea10',
        }),
        format: 'TEXT',
      },
    });
    // shaObj
    //   .update(uniqueId)
    //   .update(200527)
    //   .update(3)
    //   .update('PLN')
    //   .update('fc433f3b7b4dea10');

    const sign = shaObj.getHash('HEX');
    // String({
    //   sessionId: uniqueId,
    //   merchantId: 200527,
    //   amount: 3,
    //   currency: 'PLN',
    //   crc: 'fc433f3b7b4dea10',
    // });

    console.log('sign sha', sign);
    console.log('paymentRegister');

    // axios({
    //   method: 'post',
    //   url: 'https://httpbin.org/post',
    //   auth: {
    //     username: 'wilma',
    //     password: 'flintstone'
    //   },
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });

    axios({
      method: 'post',
      url: 'https://sandbox.przelewy24.pl/api/v1/transaction/register',
      // auth: base64_encode("200527:e9c589f13cb5129b684a7b72821b9b73"),
      auth: base64_encode('200527:e9c589f13cb5129b684a7b72821b9b73')
      //   data: {
      //       merchantId: 200527,
      //       posId: 200527,
      //       sessionId: uniqueId,
      //       amount: 2,
      //       currency: 'PLN',
      // //       description: 'zakup zdjęć',
      // //       email: formEmail,
      //   },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('err', err);
        console.log('err', err.response.data.error);
      });

    //   axios
    //     // .post('https://sandbox.przelewy24.pl/api/v1', {
    //     .post('https://sandbox.przelewy24.pl/api/v1/transaction/register', {
    //       merchantId: 200527,
    //       posId: 200527,
    //       sessionId: uniqueId,
    //       amount: 2,
    //       currency: 'PLN',
    //       description: 'zakup zdjęć',
    //       email: formEmail,
    //       // client: formName+'_'+formSurname,
    //       // address: 'string',
    //       // zip: 'string',
    //       // city: 'string',
    //       country: 'PL',
    //       // phone: formPhone,
    //       language: 'pl',
    //       // method: 0,
    //       urlReturn: 'localhost:3000/zakupione',
    //       urlStatus: 'string', //!!!!!!!
    //       timeLimit: 0,
    //       channel: 1,
    //       waitForResult: true,
    //       // regulationAccept: false,
    //       // shipping: 0,
    //       // transferLabel: 'string',
    //       // mobileLib: 1,
    //       // sdkVersion: 'string',
    //       // sign: 'string',
    //       sign: sign,
    //       // encoding: 'string',
    //       // methodRefId: 'string',
    //       // cart: [
    //       //   {
    //       //     sellerId: 'string',
    //       //     sellerCategory: 'string',
    //       //     name: 'string',
    //       //     description: 'string',
    //       //     quantity: 0,
    //       //     price: 0,
    //       //     number: 'string',
    //       //   },
    //       // ],
    //       // additional: {
    //       //   shipping: {
    //       //     type: 0,
    //       //     address: 'string',
    //       //     zip: 'string',
    //       //     city: 'string',
    //       //     country: 'string',
    //       //   },
    //       // },
    //     })
    //     .then(function (response) {
    //       console.log('res:', response);
    //     })
    //     .catch(function (error) {
    //       console.log('err', error.message);
    //     });
  };

  const paymentVerify = (e) => {
    e.preventDefault();

    console.log('paymentVerify');
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
              // checked={this.state.isGoing}
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
            Przejdź do płatności
          </button>
          <button onClick={paymentRegister}>register transaction POST</button>
          <button onClick={paymentVerify}>verify transaction PUT</button>
          <br />
          <span>*pole wymagane</span>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
