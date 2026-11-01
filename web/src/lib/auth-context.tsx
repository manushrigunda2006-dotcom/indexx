"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "./types";

const AUTH_STORAGE_KEY = "indexx_auth_user_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getInitials = (name?: string): string => {
  if (!name || !name.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, Math.min(2, parts[0].length)).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore authenticated session on mount from client-side storage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as User;
          if (parsed && parsed.email && parsed.name) {
            setUser(parsed);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to retrieve authentication session from storage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    password?: string,
    name?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return { success: false, error: "Please provide a valid email address." };
      }

      // Infer or format display name if not provided
      const resolvedName =
        name?.trim() ||
        cleanEmail
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

      const authenticatedUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 10)}`,
        name: resolvedName,
        email: cleanEmail,
        role: "Engineer",
        createdAt: new Date().toISOString(),
        settings: {
          theme: "light",
          emailNotifications: true,
          defaultEngineMode: "offline",
          resultsPerPage: 10,
          enableTelemetry: true,
        },
      };

      setUser(authenticatedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: "Authentication failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanName) {
        return { success: false, error: "Full name is required." };
      }
      if (!cleanEmail || !cleanEmail.includes("@")) {
        return { success: false, error: "A valid email address is required." };
      }

      const newUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 10)}`,
        name: cleanName,
        email: cleanEmail,
        role: "Member",
        createdAt: new Date().toISOString(),
        settings: {
          theme: "light",
          emailNotifications: true,
          defaultEngineMode: "offline",
          resultsPerPage: 10,
          enableTelemetry: true,
        },
      };

      setUser(newUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: "Registration failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const updateProfile = async (
    updates: Partial<User>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: "No authenticated user to update." };
    }

    try {
      const updatedUser: User = {
        ...user,
        ...updates,
        settings: {
          ...user.settings,
          ...updates.settings,
        },
      };

      setUser(updatedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to update profile." };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
