//src\main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./App.jsx";
import "./App.css";
import "./menu-redesign.css";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error('Root element with id="root" not found. Make sure your index.html contains <div id="root"></div>.');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>
);
