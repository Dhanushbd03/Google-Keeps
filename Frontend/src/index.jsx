import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import "/public/styles.css";
import { Auth0Provider } from "@auth0/auth0-react";

var root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Auth0Provider
      domain="dev-3bdh3i7gdy8rgqpy.us.auth0.com"
      clientId="jxo9zaTCiMazl3PQDzCLJtBlnN09SliT"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
