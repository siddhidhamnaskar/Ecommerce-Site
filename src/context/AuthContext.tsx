"use client";

import { createContext, useContext, useEffect, useState } from "react";
import LoginPage from "../app/login/page";
import SignupPage from "../app/signup/page";

interface AuthContextType {
  isAuthenticated: boolean | null;
  refreshAuth: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  refreshAuth: async () => {},
  setAuthenticated: () => {},
  authMode: "login",
  setAuthMode: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const refreshAuth = async () => {
    try {
      const res = await fetch("/api/auth/check", { cache: "no-store", credentials: "include" });
      const data = await res.json();
      console.log("Authenticated", data.authenticated);
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshAuth();

    const onFocus = () => refreshAuth();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Render login or signup if not authenticated
  const AuthPage = authMode === "login" ? LoginPage : SignupPage;

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth, setAuthenticated: setIsAuthenticated, authMode, setAuthMode }}>
      {isAuthenticated ? children : <AuthPage />}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}