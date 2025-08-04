import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";

import {Provider} from 'react-redux';
import { store } from './redux/store.js';
import { injectStore } from './utils/authorizedAxios.js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

injectStore(store)
let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StrictMode>
        <App />
        <ToastContainer/>
      </StrictMode>

    </PersistGate>

  </Provider>
)