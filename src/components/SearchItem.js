import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../style/SearchItem.css';
import { Link } from 'react-router-dom';

export default class SearchItem extends Component {
  handleAddCart = () => {
    const { title, thumbnail, price, id, availableQuantity, freeShipping } = this.props;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
      id,
      title,
      thumbnail,
      price,
      quantity: 1,
      availableQuantity,
      freeShipping,
    };
    const productExists = cart.find((item) => item.id === id);

    if (productExists) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
    }
  };

  render() {
    const { title, thumbnail, price, id, freeShipping } = this.props;

    return (
      <div
        data-testid="product"
        className="itemContainer"
      >
        <Link
          data-testid="product-detail-link"
          to={ `/product/${id}` }
        >
          {title}
        </Link>

        <div className="descContainer">
          <img
            src={ thumbnail }
            alt={ title }
          />
          {freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
          <h2>
            R$
            {price}
          </h2>

          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ this.handleAddCart }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

SearchItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  availableQuantity: PropTypes.number,
  freeShipping: PropTypes.bool,
}.isRequired;
