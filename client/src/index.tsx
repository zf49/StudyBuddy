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
    domain="dev-7wmg2yatswbx560y.us.auth0.com"
    clientId="zPUg4hsChKmduSdWFCZF6SbwVMEExlYV"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://studybuddy"
    }}
  >
     <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);


