import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import {Porvider} from 'react-redux';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/rootReducer'
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react'

const store = createStore(rootReducer);
const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


