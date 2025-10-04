"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean | null;
  refreshAuth: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  refreshAuth: async () => {},
  setAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const refreshAuth = async () => {
    try {
      const res = await fetch("/api/auth/check", { cache: "no-store",credentials: "include" });
      const data = await res.json();
      console.log("Authenticated",data.authenticated);
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
  refreshAuth(); // initial check

  // recheck when tab becomes active again
  const onFocus = () => refreshAuth();
  window.addEventListener("focus", onFocus);

  return () => {
    window.removeEventListener("focus", onFocus);
  };
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth, setAuthenticated: setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
