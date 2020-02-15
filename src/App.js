import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './config/reactotron';

import { Provider } from 'react-redux';
import Routes from './routes';
import GlobalStyle from './styles/global';
import Header from './components/Header';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={2000} />
      </Router>
    </Provider>
  );
}

export default App;
