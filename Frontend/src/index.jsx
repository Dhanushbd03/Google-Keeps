import React, { StrictMode } from "react";
import { createRoot, onRedirectCallback } from "react-dom/client";
import App from "./Components/App.jsx";
import "/public/styles.css";
import { Auth0Provider } from "@auth0/auth0-react";

var root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
    ,
  </StrictMode>
);
