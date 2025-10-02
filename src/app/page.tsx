"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import ProductsPage from "./products/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    }
    checkAuth();
  }, []);

  // if (isAuthenticated === null) return <div>Loading...</div>;

  return <>{isAuthenticated ? <ProductsPage /> : <LoginPage />}</>;
}
