"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./login/page";
import ProductsPage from "./products/page";
import SignUpPage from "./signup/page";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <ProductsPage /> : null;
}
