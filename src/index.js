import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import {authSettings } from './AuthSettings'
const providerConfig = {
    domain: "dev-c99uyfi9.eu.auth0.com",
    clientId: "RjlrOng4f9mUqWyKLFn3ndQZc8bOVEwr",
    audience: "http://my-api.com",
    redirectUri: "http://localhost:3000/home",
    useRefreshTokens: true,
    cacheLocation: "localstorage"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
      /*  domain="dev-c99uyfi9.eu.auth0.com"
        clientId="RjlrOng4f9mUqWyKLFn3ndQZc8bOVEwr"
        redirectUri="http://localhost:3000/home"*/
      {...providerConfig}>
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
