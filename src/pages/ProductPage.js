import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const {
    title,
    thumbnail,
    price,
    attributes,
    available_quantity: availableQuantity,
    shipping: { free_shipping: freeShipping },
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

  useEffect(() => {
    const fetchProduct = async () => {
      getProductById(id).then((response) => setData(response));
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <div>
        <Link
          data-testid="shopping-cart-button"
          to="/shoppingCart"
        >
          Carrinho
        </Link>
      </div>

      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        {freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
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
