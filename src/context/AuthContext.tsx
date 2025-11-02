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
  user: { id: string; name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  refreshAuth: async () => {},
  setAuthenticated: () => {},
  authMode: "login",
  setAuthMode: () => {},
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const refreshAuth = async () => {
    try {
      const res = await fetch("/api/auth/check", { cache: "no-store", credentials: "include" });
      const data = await res.json();
      console.log("Authenticated", data.authenticated);
      setIsAuthenticated(data.authenticated);
      setUser(data.user || null);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
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
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth, setAuthenticated: setIsAuthenticated, authMode, setAuthMode, user }}>
      {isAuthenticated ? children : <AuthPage />}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}