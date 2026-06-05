"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "Super Admin" | "Institution Admin" | "Teacher" | "Student" | "Parent";

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  avatar: string; // gradient
  tenantId: string;
  tenantName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const ROLE_AVATARS: Record<UserRole, string> = {
  "Super Admin": "linear-gradient(135deg,#9FA1FF,#B5BAFF)",
  "Institution Admin": "linear-gradient(135deg,#AEE2FF,#9FA1FF)",
  "Teacher": "linear-gradient(135deg,#D9F9DF,#AEE2FF)",
  "Student": "linear-gradient(135deg,#B5BAFF,#D9F9DF)",
  "Parent": "linear-gradient(135deg,#AEE2FF,#D9F9DF)",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Restore session from localStorage on mount
    const saved = localStorage.getItem("campusos_user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem("campusos_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campusos_user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export { ROLE_AVATARS };
