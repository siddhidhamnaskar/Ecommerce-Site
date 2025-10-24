"use client";

import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/navbar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  // Hide navbar if not authenticated
  return (
    <>
      {isAuthenticated && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <LayoutContent>{children}</LayoutContent>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
