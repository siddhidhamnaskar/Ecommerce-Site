"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
 const {isAuthenticated,setAuthenticated,refreshAuth, user}=useAuth();
 const { items } = useCart();
 const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    // Call API to clear cookie
    await fetch("/api/auth/logout", { method: "POST",credentials: "include" });
    setAuthenticated(false);
    await refreshAuth();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            MyShop
          </Link>

          {/* Hamburger menu button for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700">Welcome, {user?.name}</span>
                </div>
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

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700">Welcome, {user?.name}</span>
                  </div>
                  <Link href="/cart" className="relative text-gray-700 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
                    Cart
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </Link>
                  <Link href="/orders" className="text-gray-700 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-fit"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
