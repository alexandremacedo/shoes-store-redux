import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdRemoveShoppingCart,
  MdDelete,
} from 'react-icons/md';

import { Link } from 'react-router-dom';
import { formatPrice } from '../../util/format';
import {
  Container,
  CartContainer,
  ProductTable,
  Total,
  EmptyCart,
} from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }
  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  if (!cart.length) {
    return (
      <Container>
        <CartContainer>
          <EmptyCart>
            <MdRemoveShoppingCart size={140} />
            <h2>O CARRINHO ESTÁ VAZIO</h2>
            <p>Não há produtos em seu carrinho de compras</p>
            <Link to="/">
              <button type="button">Continue comprando</button>
            </Link>
          </EmptyCart>
        </CartContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CartContainer>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <Link to={`/products/${encodeURIComponent(product.id)}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                </td>
                <td>
                  <Link to={`/products/${encodeURIComponent(product.id)}`}>
                    <strong>{product.title}</strong>
                  </Link>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#ff9f26" />
                    </button>
                    <input type="text" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#ff9f26" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }
                  >
                    <MdDelete size={20} color="#ff9f26" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
        <footer>
          <button type="button">Finalizar pedido</button>

          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </CartContainer>
    </Container>
  );
}
