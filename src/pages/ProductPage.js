import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({ email: '', review: '', rating: undefined });
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

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

  const handleInputChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const num = 5;

  const ratingDivs = () => {
    const rating = [];
    for (let i = 0; i < num; i += 1) {
      rating.push(
        <label htmlFor={ i } key={ i }>
          <input
            data-testid={ `${i + 1}-rating` }
            type="radio"
            id={ i }
            name="rating"
            value={ i }
            onChange={ handleInputChange }
          />
          {i}
        </label>,
      );
    }
    return rating;
  };

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return (!regEx.test(user.email));
  };

  const handleDisabledButton = () => {
    const { rating } = user;
    if (rating === undefined || emailValidation()) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    handleDisabledButton();
    if (!disabledButton) {
      const { email, review, rating } = user;
      const newReview = {
        email,
        review,
        rating,
      };
      const reviews = JSON.parse(localStorage.getItem(`${id}`)) || [];
      localStorage.setItem(`${id}`, JSON.stringify([...reviews, newReview]));
      setUser({ email: '', review: '', rating: undefined });
    }
  };

  useEffect(() => {
    // handleDisabledButton();
    emailValidation();
  }, [user]);

  const getReviews = () => {
    const reviews = JSON.parse(localStorage.getItem(`${id}`)) || [];
    return reviews;
  };

  useEffect(() => {
    getReviews();
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
      <div>
        <form action="get">
          <input
            value={ user.email }
            name="email"
            type="text"
            data-testid="product-detail-email"
            placeholder="Digite seu email"
            onChange={ handleInputChange }
          />
          {
            ratingDivs()
          }
          <textarea
            name="review"
            value={ user.review }
            data-testid="product-detail-evaluation"
            placeholder="Digite sua avaliação"
            onChange={ handleInputChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ handleAddReview }
          >
            Enviar
          </button>
        </form>
        {
          disabledButton && (<p data-testid="error-msg">Campos inválidos</p>)
        }
      </div>
      <div>
        {
          getReviews().map((review, index) => (
            <div key={ index }>
              <p data-testid="review-card-evaluation">
                {review.review}
              </p>
              <p data-testid="review-card-email">
                {review.email}
              </p>
              <p data-testid="review-card-rating">
                {review.rating}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ProductPage;
