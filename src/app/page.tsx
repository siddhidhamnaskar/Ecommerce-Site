"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import ProductsPage from "./products/page";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { cache: "no-store" });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth(); // run once on mount

    // ✅ recheck every 30 seconds
    const interval = setInterval(checkAuth, 3_000);
    return () => clearInterval(interval);
  }, []);

  // if (isAuthenticated === null) return <div>Loading...</div>;

  return <>{isAuthenticated ? <ProductsPage /> : <LoginPage />}</>;
}
