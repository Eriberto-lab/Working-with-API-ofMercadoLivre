import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const {
    title,
    thumbnail,
    price,
    attributes,
    available_quantity: availableQuantity,
  } = data;

  const handleAddCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
      id,
      title,
      thumbnail,
      price,
      quantity: 1,
      availableQuantity,
      isFreeShipping,
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

  useEffect(() => {
    const fetchProduct = async () => {
      getProductById(id).then((response) => {
        setData(response);
        setIsFreeShipping(response.shipping.free_shipping);
      });
    };
    fetchProduct();
  }, []);

  const sumProduct = () => {
    const getItems = JSON.parse(localStorage.getItem('cart')) || [];
    const sum = getItems.reduce((acc, item) => acc + item.quantity, 0);
    return sum;
  };

  return (
    <div>
      <div>
        <Link
          data-testid="shopping-cart-button"
          to="/shoppingCart"
        >
          Carrinho
        </Link>
        <p data-testid="shopping-cart-size">
          {sumProduct()}
        </p>
      </div>

      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        {isFreeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null}
        <h2 data-testid="product-detail-price">
          R$
          {price}
        </h2>
        <ul>
          {attributes
            && attributes.map((attribute) => (
              <li key={ attribute.id }>
                {`${attribute.name} : ${attribute.value_name}`}
              </li>
            ))}
        </ul>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ handleAddCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
