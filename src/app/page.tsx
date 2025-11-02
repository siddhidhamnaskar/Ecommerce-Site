"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./login/page";
import ProductsPage from "./products/page";
import SignUpPage from "./signup/page";
import { Button } from "@/components/ui/button";
import { ProductListSkeleton } from "@/components/ui/loading-skeleton";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <ProductListSkeleton />;
  }

  return isAuthenticated ? <ProductsPage />: null;
}
