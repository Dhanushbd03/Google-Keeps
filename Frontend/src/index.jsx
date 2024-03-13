import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import "/public/styles.css";



var root = createRoot(document.getElementById("root"));
const client_id = import.meta.env.VITE_CLIENT_ID;


root.render(
  <StrictMode>
    
      <App />
    
  </StrictMode>
);
