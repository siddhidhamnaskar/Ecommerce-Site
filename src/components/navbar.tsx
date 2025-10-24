"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
 const {isAuthenticated,setAuthenticated,refreshAuth}=useAuth();
 const { items } = useCart();

  const handleLogout = async () => {
    // Call API to clear cookie
    await fetch("/api/auth/logout", { method: "POST",credentials: "include" });
    setAuthenticated(false);
    await refreshAuth();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          MyShop
        </Link>

        <div className="flex space-x-4 items-center">
         

          {isAuthenticated ? (
            <>
              <Link href="/cart" className="relative text-gray-700 hover:text-indigo-600">
                Cart
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link href="/orders" className="text-gray-700 hover:text-indigo-600">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
