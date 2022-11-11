import React, { Component } from 'react';
import '../style/ShoppingCart.css';

export default class ShoppingCart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.handleLocalStorage();
  }

  handleLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  };

  handleDelete = ({ target }) => {
    const { name } = target;
    const getItems = JSON.parse(localStorage.getItem('cart'));
    const filteredItems = getItems.filter((product) => product.title !== name);

    localStorage.setItem('cart', JSON.stringify(filteredItems));
    this.handleLocalStorage();
  };

  handleDecrement = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    cart.filter((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setState({ cart });
  };

  handleIncrement = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    cart.filter((item) => {
      if (item.id === id && item.quantity < item.availableQuantity) {
        item.quantity += 1;
      }
      console.log(item.availableQuantity);
      return item;
    });
    this.setState({ cart });
  };

  render() {
    const { cart } = this.state;

    return (
      <div data-testid="shopping-cart-empty-message">
        {cart
          ? cart.map((item) => (
            <div
              key={ item.id }
              className="product-container"
            >
              <button
                data-testid="remove-product"
                type="button"
                name={ item.title }
                onClick={ this.handleDelete }
              >
                Remover
              </button>
              <img
                src={ item.thumbnail }
                alt={ item.title }
              />
              <p data-testid="shopping-cart-product-name">{item.title}</p>
              <p>{`R$ ${item.price}`}</p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                id={ item.id }
                onClick={ this.handleDecrement }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{item.quantity}</p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                id={ item.id }
                onClick={ this.handleIncrement }
              >
                +
              </button>
            </div>
          ))
          : 'Seu carrinho está vazio'}
      </div>
    );
  }
}
