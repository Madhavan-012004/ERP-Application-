'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../constants/Api';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'INSTITUTION_ADMIN'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT';

export interface AuthUser {
  email: string;
  role: UserRole;
  token: string;
  name?: string;
  initials?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem('campusos_user');
        if (stored) setUser(JSON.parse(stored));
      } catch (_) {}
      setLoading(false);
    };
    restore();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await authApi.login(email, password);
    const userRole = data.role as UserRole;

    // Derive initials and display name from email
    const namePart = email.split('@')[0];
    const initials = namePart.slice(0, 2).toUpperCase();
    const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const authUser: AuthUser = {
      email: data.email,
      role: userRole,
      token: data.token,
      name: displayName,
      initials,
    };

    await AsyncStorage.setItem('campusos_token', data.token);
    await AsyncStorage.setItem('campusos_user', JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('campusos_token');
    await AsyncStorage.removeItem('campusos_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Helper: map role to display label
export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  INSTITUTION_ADMIN: 'Institution Admin',
  TEACHER: 'Teacher',
  STUDENT: 'Student',
  PARENT: 'Parent',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: '#6062d6',
  INSTITUTION_ADMIN: '#1a7ab5',
  TEACHER: '#2d8c45',
  STUDENT: '#5458c4',
  PARENT: '#1a7ab5',
};
