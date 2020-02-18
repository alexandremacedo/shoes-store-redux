import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import { Container, Cart, Dropdown } from './styles';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  const cartSize = useSelector(state =>
    state.cart.reduce((total, product) => {
      return total + product.amount;
    }, 0)
  );

  const cart = useSelector(state =>
    state.cart.slice(0, 3).map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  );

  const location = useLocation().pathname;

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <Cart to="/cart">
        <strong>Carrinho</strong>

        <div>
          <MdShoppingCart size={36} color="#fff" />
          <span>{cartSize}</span>
        </div>

        {cartSize && location !== '/cart' ? (
          <Dropdown>
            {cart.map(product => (
              <div>
                <img src={product.image} alt={product.title} />
                <div>
                  {product.title}
                  <p>
                    {product.amount} x<span> {product.priceFormatted}</span>
                  </p>
                </div>
              </div>
            ))}
            {cartSize > 3 && <div className="more">...</div>}
            <h2>
              <span>Subtotal</span>
              <span>{total}</span>
            </h2>
          </Dropdown>
        ) : null}
      </Cart>
    </Container>
  );
}
