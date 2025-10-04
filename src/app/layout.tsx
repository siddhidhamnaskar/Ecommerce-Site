"use client";

import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
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
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
