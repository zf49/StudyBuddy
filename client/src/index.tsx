import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Auth0Provider
    domain="dev-6-070568.us.auth0.com"
    clientId="c5yHIO5uqKX3SkUfWnTMkSyx5dwiD69W"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-6-070568.us.auth0.com/api/v2/"

    }}
  >
     <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);


