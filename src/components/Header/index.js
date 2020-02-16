import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import { Container, Cart, Dropdown } from './styles';
import logo from '../../assets/images/logo.svg';

function Header({ cartSize, cart, total, location }) {
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

        {cart.length && location.pathname !== '/cart' ? (
          <Dropdown>
            {cart.map(product => (
              <div>
                <img src={product.image} alt={product.title} />
                <div>
                  {product.title}
                  <p>
                    {product.amount} x<span> {formatPrice(product.price)}</span>
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

const mapStateToProps = state => ({
  cartSize: state.cart.reduce((total, product) => {
    return total + product.amount;
  }, 0),
  cart: state.cart.slice(0, 3).map(product => ({
    ...product,
    price: product.price,
  })),

  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

export default connect(mapStateToProps)(withRouter(Header));
