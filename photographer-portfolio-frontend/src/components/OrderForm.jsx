import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderForm = () => {
  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formPhone, setFormPhone] = useState('+48');
  const [formInvoiceField, setFormInvoiceField] = useState(false);
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
    setFormInvoiceField((prevState) => !prevState);
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
      if (regEx.test(formPhone) === true) {
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
      if (formInvoiceField === true) {
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
        return true
      } else {
        setErrorMessage('Aby kontynuować zaakceptuj warunki regulaminu');
      }
    }
    termsConditionsAcceptValidation()

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

    const formData = {
      formEmail,
      formName,
      formSurname,
      formPhone,
      formInvoiceNumber,
      formTermsConditionsAccept,
    };
    console.log(formData);
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

          {formInvoiceField ? (
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
          <br />
          <span>*pole wymagane</span>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
