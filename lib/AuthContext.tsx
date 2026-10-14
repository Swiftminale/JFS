'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface AuthContextType {
  user: any;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; user: any }>;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  signIn: async () => ({ success: false, user: null }),
  signOut: async () => {},
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser || null);
    } catch (err) {
      console.warn('Supabase auth.getUser failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    checkAuth();

    let subscription: any = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user || null);
          setLoading(false);
        }
      });
      subscription = data?.subscription;
    }

    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [checkAuth]);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please check your credentials in .env.local.');
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (!data?.user) {
        throw new Error('No user returned from Supabase Auth.');
      }

      setUser(data.user);
      return { success: true, user: data.user };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Supabase signOut error:', e);
      }
    }

    // Clean up any lingering cookies or local state
    if (typeof document !== 'undefined') {
      document.cookie = 'jfs_admin_auth=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }

    setUser(null);
    setLoading(false);
    window.location.href = '/admin/login';
  };

  const refreshAuth = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
