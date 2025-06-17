// src/main.tsx - VERSI FINAL DENGAN BASENAME

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Tambahkan prop basename di sini */}
      <BrowserRouter basename="/shopee-kw-app/">
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
