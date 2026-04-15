// src/types/auth.ts

import type { User as FirebaseUser } from "firebase/auth";

// Define a fallback User type in case Firebase types are not available
type FallbackUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

// Use Firebase User type if available, otherwise use the fallback
// export type User = FirebaseUser | FallbackUser;

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};





export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}