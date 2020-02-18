import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';

import Loader from 'react-loader-spinner';
import { ProductList, Container, Loading } from './styles';

import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  if (loading) {
    return (
      <Loading>
        <Loader type="MutatingDots" color="#ff9f26" />
      </Loading>
    );
  }
  return (
    <Container>
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${encodeURIComponent(product.id)}`}>
              <img src={product.image} alt={product.title} />
            </Link>
            <Link to={`/products/${encodeURIComponent(product.id)}`}>
              <strong>{product.title}</strong>
            </Link>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </Container>
  );
}
