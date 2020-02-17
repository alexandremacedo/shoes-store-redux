import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  MdAddShoppingCart,
  MdCheck,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from 'react-icons/md';

import Loader from 'react-loader-spinner';
import Modal from '../../components/Modal';
import {
  Container,
  Product,
  Loading,
  ColorsName,
  ColorsImage,
  Sizes,
  Description,
  SimilarList,
  Similar,
  SwipeContainer,
  Slider,
} from './styles';

import { formatPrice } from '../../util/format';
import fraction from '../../util/fraction';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    product: {},
    loading: true,
    url: '',
    show: false,
    hideModal: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const productId = decodeURIComponent(match.params.productId);

    const response = await api.get('products');

    const product = response.data.find(
      product => String(product.id) === productId
    );

    setTimeout(() => {
      this.setState({
        product: {
          ...product,
          priceFormatted: formatPrice(product.price),
          fraction: formatPrice(fraction(product.price, product.installments)),
        },
        loading: false,
        url: product.image,
      });
    }, 1000);
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };

  handleImage = url => {
    this.setState({ url });
  };

  showModal = e => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { product, loading, url, show } = this.state;
    const { amount } = this.props;
    if (loading) {
      return (
        <Loading>
          <Loader type="MutatingDots" color="#ff9f26" />
        </Loading>
      );
    }
    return (
      <Container>
        <Modal onClose={this.showModal} show={show}>
          {url}
        </Modal>
        <Product>
          <div>
            <SwipeContainer>
              {product.previews.length ? (
                <button type="button">
                  <MdKeyboardArrowUp size={20} color="#fff" />
                </button>
              ) : null}
              <Slider>
                {product.previews.map(preview => (
                  <li>
                    <img src={preview.image} alt={preview.id} />
                  </li>
                ))}
              </Slider>
              {product.previews.length ? (
                <button type="button">
                  <MdKeyboardArrowDown size={20} color="#fff" />
                </button>
              ) : null}
            </SwipeContainer>
            <button
              type="button"
              onClick={e => {
                this.showModal(e);
              }}
            >
              <img src={url} alt={product.title} />
            </button>
          </div>
          <div>
            <strong>{product.title}</strong>

            <span>{product.priceFormatted}</span>
            <span>
              Até 5 x <strong>{product.fraction}</strong> sem juros
            </span>

            <div>
              <strong>CORES DISPONÍVEIS</strong>
              <ColorsName>
                {product.colors.map((color, index) => {
                  if (index !== product.colors.length - 1) {
                    return (
                      <>
                        <li key={color.name}>
                          <span>{color.name}</span>
                        </li>
                        <span style={{ marginRight: 10 }}>/</span>
                      </>
                    );
                  }
                  return (
                    <li key={color.name}>
                      <span>{color.name}</span>
                    </li>
                  );
                })}
              </ColorsName>
              <ColorsImage>
                {product.colors.map(color => (
                  <li key={color.name}>
                    <button
                      type="button"
                      onClick={() => this.handleImage(color.image)}
                    >
                      {color.image === url ? (
                        <>
                          <div>
                            <MdCheck size={16} color="#fff" />
                          </div>
                          <img src={color.image} alt={color.name} />
                        </>
                      ) : (
                          <img src={color.image} alt={color.name} />
                        )}
                    </button>
                  </li>
                ))}
              </ColorsImage>
            </div>
            <div>
              <strong>GUIA DE MEDIDAS</strong>
              <Sizes>
                {product.sizes.map(size => (
                  <li key={size}>
                    <button type="button">{size}</button>
                  </li>
                ))}
              </Sizes>
            </div>

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
          </div>
        </Product>
        <Description>
          <strong>DESCRIÇÃO</strong>
          <div>
            <div>
              <strong>{product.title}</strong>
              <span>
                The essential everyday shoe. This vulc-inspired trainer is
                reinvented with a modern cut and fresh materials. A casual
                canvas upper flashes 3-Stripes on the side and heel for a sporty
                look from all sides.
              </span>
            </div>
            <img src={url} alt={product.id} />
          </div>
        </Description>

        <Similar>
          <strong>TALVEZ VOCÊ TAMBÉM GOSTE</strong>
          <SimilarList>
            <li key={product.id}>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <strong>{product.title}</strong>
              </Link>
              <span>{product.priceFormatted}</span>
            </li>
            <li key={product.id}>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <strong>{product.title}</strong>
              </Link>
              <span>{product.priceFormatted}</span>
            </li>
            <li key={product.id}>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <strong>{product.title}</strong>
              </Link>
              <span>{product.priceFormatted}</span>
            </li>
            <li key={product.id}>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <img src={product.image} alt={product.title} />
              </Link>
              <Link to={`/products/${encodeURIComponent(product.id)}`}>
                <strong>{product.title}</strong>
              </Link>
              <span>{product.priceFormatted}</span>
            </li>
          </SimilarList>
        </Similar>
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
