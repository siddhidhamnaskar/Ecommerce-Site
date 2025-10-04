"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
 const {isAuthenticated,setAuthenticated,refreshAuth}=useAuth();

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
          <Link href="/products" className="text-gray-700 hover:text-indigo-600">
            Products
          </Link>

          {isAuthenticated ? (
            <>
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
