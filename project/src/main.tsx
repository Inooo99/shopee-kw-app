import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- Impor BrowserRouter
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {" "}
        {/* <-- Bungkus App dengan BrowserRouter */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
