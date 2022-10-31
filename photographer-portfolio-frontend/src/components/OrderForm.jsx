import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderForm = () => {
  const [formEmail, setFormEmail] = useState('');
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formPhone, setFormPhone] = useState('');

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

  const dispatchFormDataToContext = (e) => {
    e.preventDefault();
    const formData = { formEmail, formName, formSurname, formPhone };
    console.log(formData);
  };

  return (
    <div className="order-form__container">
      Dane zamawiającego:
      <div className="order-form__content">
        <form>
          <label>
            Email*:
            <input
              value={formEmail}
              onChange={handleFormEmailUpdate}
              type="email"
              name="email"
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
              />
            </label>
            <label>
              Nazwisko*:
              <input
                value={formSurname}
                onChange={handleFormSurnameUpdate}
                type="text"
                name="surname"
              />
            </label>
          </div>
          <label>
            Telefon*:
            <input
              value={formPhone}
              onChange={handleFormPhoneUpdate}
              type="text"
              name="phone"
            />
          </label>

          <div className="order-form__content__checkbox">
            <input
              name="consentNewsletter"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            />
            <label>Zapisz mnie do darmowego newslettera</label>
          </div>

          <div className="order-form__content__checkbox">
            <input
              name="consentTermsConditions"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            />
            <label>
              {' '}
              Oświadczam, że znany mi jest <Link to="/regulamin">regulamin</Link> i akceptuje jego
              postanowienia.*
            </label>
          </div>

          <div className="order-form__content__checkbox">
            <input
              name="consentReceipt"
              type="checkbox"
              // checked={this.state.isGoing}
              // onChange={this.handleInputChange}
            />
            <label>
              {' '}
              Wyrażam zgodę na otrzymanie faktury na adres e-mail podany w
              trakcie rejestracji*
            </label>
          </div>

          <br />
          <br />
          <input
            onClick={dispatchFormDataToContext}
            type="submit"
            value="Zapisz"
          />
          <br />
          <span>*pole wymagane</span>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
