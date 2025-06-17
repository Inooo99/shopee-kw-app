// src/main.tsx - VERSI FINAL DENGAN BASENAME

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Tambahkan prop basename di sini */}
      <HashRouter basename="/shopee-kw-app/">
        <App />
      </HashRouter>
    </AuthProvider>
  </React.StrictMode>
);
