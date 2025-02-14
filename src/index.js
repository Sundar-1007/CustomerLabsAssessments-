import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/loader.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);