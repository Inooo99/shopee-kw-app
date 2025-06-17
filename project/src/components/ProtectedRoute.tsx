// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Jika tidak ada pengguna yang login, arahkan ke halaman utama
    // Anda bisa juga menambahkan alert di sini jika mau
    // alert("You must be logged in to view this page.");
    return <Navigate to="/" replace />;
  }

  // Jika sudah login, tampilkan konten halaman (children)
  return <>{children}</>;
};

export default ProtectedRoute;
