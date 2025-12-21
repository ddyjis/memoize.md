"use client";

import type {User} from "@supabase/supabase-js";
import {createContext, useContext, useEffect, useMemo, useState} from "react";

import {createClient} from "@/lib/supabase/client";

type AuthContextType = {user: User | null};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // Subscribe to auth state changes for real-time updates
    // This handles: login/logout, OAuth redirects, session expiration, token refreshes
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const value = useMemo(() => ({user}), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
