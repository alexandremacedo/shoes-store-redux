import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';

import Loader from 'react-loader-spinner';
import { ProductList, Container, Loading } from './styles';

import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    products: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    setTimeout(() => {
      this.setState({ products: data, loading: false });
    }, 1000);
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  render() {
    const { products, loading } = this.state;
    const { amount } = this.props;
    if (loading) {
      return (
        <Loading>
          <Loader type="MutatingDots" color="#7159c1" />
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

              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
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
}
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
