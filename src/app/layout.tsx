"use client";

import "./globals.css";
import Navbar from "../components/navbar";
import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

   
  }, []);

  // if (isAuthenticated === null) return<html lang="en"> <body><div>Loading...</div></body></html>;

  return (
    <html lang="en">
      <body>
         {isAuthenticated && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  );
}
