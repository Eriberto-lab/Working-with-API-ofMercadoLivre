import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/Checkout.css';

export default class Checkout extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')),
    invalidField: false,
    isBought: false,
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  };

  handleChange = (event, id) => {
    const { value } = event.target;

    this.setState({
      [id]: value,
    });
  };

  verifyInputs = () => {
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;

    if (fullname.length === 0 || email.length === 0
      || cpf.length === 0 || phone.length === 0
      || cep.length === 0 || address.length === 0
      || payment.length === 0) {
      return this.setState({ invalidField: true });
    }

    localStorage.clear();
    this.setState({ isBought: true });
  };

  render() {
    const {
      cart, invalidField, isBought,
      fullname, email, cpf,
      phone, cep, address,
    } = this.state;

    return (
      <div>
        {cart.map((item) => (
          <div
            key={ item.id }
            className="verification-container"
          >
            <img
              src={ item.thumbnail }
              alt={ item.title }
            />
            <p data-testid="shopping-cart-product-name">{item.title}</p>
            <p>{`R$ ${item.price}`}</p>
            <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
          </div>
        ))}

        <form className="form-container">
          <label htmlFor="input-fullname">
            Nome
            <input
              data-testid="checkout-fullname"
              className="input-gap"
              id="input-fullname"
              type="text"
              value={ fullname }
              onChange={ (event) => this.handleChange(event, 'fullname') }
            />
          </label>

          <label htmlFor="input-email">
            Email
            <input
              data-testid="checkout-email"
              className="input-gap"
              id="input-email"
              type="email"
              value={ email }
              onChange={ (event) => this.handleChange(event, 'email') }
            />
          </label>

          <label htmlFor="input-cpf">
            CPF
            <input
              data-testid="checkout-cpf"
              className="input-gap"
              id="input-cpf"
              type="text"
              value={ cpf }
              onChange={ (event) => this.handleChange(event, 'cpf') }
            />
          </label>

          <label htmlFor="input-phone">
            Telefone
            <input
              data-testid="checkout-phone"
              className="input-gap"
              id="input-phone"
              type="text"
              value={ phone }
              onChange={ (event) => this.handleChange(event, 'phone') }
            />
          </label>

          <label htmlFor="input-cep">
            CEP
            <input
              data-testid="checkout-cep"
              className="input-gap"
              id="input-cep"
              type="text"
              value={ cep }
              onChange={ (event) => this.handleChange(event, 'cep') }
            />
          </label>

          <label htmlFor="input-address">
            Endereço
            <input
              data-testid="checkout-address"
              className="input-gap"
              id="input-address"
              type="text"
              value={ address }
              onChange={ (event) => this.handleChange(event, 'address') }
            />
          </label>

          <div className="radio-containeticketr">
            <label htmlFor="input-ticket">
              <input
                data-testid="ticket-payment"
                className="input-gap"
                id="input-ticket"
                type="radio"
                name="payment"
                value="ticket"
                onChange={ (event) => this.handleChange(event, 'payment') }
              />
              Boleto
            </label>

            <label htmlFor="input-visa">
              <input
                data-testid="visa-payment"
                className="input-gap"
                id="input-visa"
                type="radio"
                name="payment"
                value="visa"
                onChange={ (event) => this.handleChange(event, 'payment') }
              />
              Visa
            </label>

            <label htmlFor="input-master">
              <input
                data-testid="master-payment"
                className="input-gap"
                id="input-master"
                type="radio"
                name="payment"
                value="master"
                onChange={ (event) => this.handleChange(event, 'payment') }
              />
              MasterCard
            </label>

            <label htmlFor="input-elo">
              <input
                data-testid="elo-payment"
                className="input-gap"
                id="input-elo"
                type="radio"
                name="payment"
                value="elo"
                onChange={ (event) => this.handleChange(event, 'payment') }
              />
              Elo
            </label>
          </div>

          {invalidField && <p data-testid="error-msg">Campos inválidos</p>}

          <button
            data-testid="checkout-btn"
            className="button-buy"
            type="button"
            onClick={ this.verifyInputs }
          >
            Comprar
          </button>
        </form>

        { isBought && <Redirect to="/" /> }
      </div>
    );
  }
}
