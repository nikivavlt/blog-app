/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthContextProvider } from 'context/AuthContext';
import Interceptors from 'features/Interceptors';
import { Provider } from 'react-redux';
import store from 'store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Interceptors>
        <Provider store={store}>
          <App />
        </Provider>
      </Interceptors>
    </AuthContextProvider>
  </React.StrictMode>
);
