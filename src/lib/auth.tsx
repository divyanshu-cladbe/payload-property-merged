"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasAuthSession } from "@/lib/auth-utils";
export interface User {
  id: string;
  phoneNumber: string;
  email: string | null;
  name?: string;
  city?: string;
  address?: string;
  state?: string;
  interestedIn?: string[] | string;
  budgetRange?: string;
  isVerified?: boolean;
  lastLoginAt?: string;
  timeJoined?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    email?: string;
    city?: string;
    address?: string;
    state?: string;
    interestedIn?: string[];
    budgetRange?: string;
  }) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Use Payload's built-in /me endpoint to check logged-in user
        const payloadUrl = (process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000/api");
        const res = await fetch(`${payloadUrl}/users/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const result = await res.json() as any;
        if (result?.user) {
          const u = result.user;
          const normalizedUser: User = {
            id: String(u.id),
            phoneNumber: u.phoneNumber || "",
            email: u.email || null,
            name: u.name,
            city: u.city,
            address: u.address,
            state: u.state,
            interestedIn: u.interestedIn
              ? (Array.isArray(u.interestedIn)
                  ? u.interestedIn
                  : u.interestedIn.split(",").map((s: string) => s.trim()).filter(Boolean))
              : undefined,
            isVerified: u.isVerified,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
          };
          setUser(normalizedUser);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // setTimeout(() => {
    //   router.push("/profile");
    // }, 0);
  };

  const logout = async () => {
    try {
      const payloadUrl = (process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000/api");
      await fetch(`${payloadUrl}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (data: {
    name?: string;
    email?: string;
    city?: string;
    address?: string;
    state?: string;
    interestedIn?: string[];
    budgetRange?: string;
  }) => {
    try {
      const payloadUrl = (process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://localhost:3000/api");
      // Get current user id from state
      if (!user) throw new Error("Not authenticated");
      const res = await fetch(`${payloadUrl}/users/${user.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          interestedIn: Array.isArray(data.interestedIn)
            ? data.interestedIn.join(", ")
            : data.interestedIn,
        }),
      });
      if (!res.ok) throw new Error("Profile update failed");
      const result = await res.json() as any;
      const u = result.doc || result;
      const normalizedUser: User = {
        ...user,
        name: u.name ?? user.name,
        email: u.email ?? user.email,
        city: u.city ?? user.city,
        address: u.address ?? user.address,
        state: u.state ?? user.state,
        interestedIn: u.interestedIn
          ? (Array.isArray(u.interestedIn)
            ? u.interestedIn
            : u.interestedIn.split(",").map((s: string) => s.trim()).filter(Boolean))
          : user.interestedIn,
      };
      setUser(normalizedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfile, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
