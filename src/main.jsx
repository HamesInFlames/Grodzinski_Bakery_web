//src\main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./App.css";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element with id="root" not found. Make sure your index.html contains <div id="root"></div>.');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);