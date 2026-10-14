'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface AuthContextType {
  user: any;
  loading: boolean;
  isConfigured: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isConfigured: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      // 1. If Supabase is configured and client exists, check Supabase session
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (mounted) {
            if (session?.user) {
              setUser(session.user);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('Supabase getSession failed, checking local auth:', err);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) {
            if (session?.user) {
              setUser(session.user);
              setLoading(false);
            }
          }
        });

        // If no active Supabase session yet, also check if local cookie is present
        const hasLocalCookie = typeof document !== 'undefined' && document.cookie.includes('jfs_admin_auth=authenticated');
        if (mounted) {
          if (hasLocalCookie) {
            setUser({ email: 'admin@jfs-tradinget.com', role: 'admin' });
          } else {
            setUser(null);
          }
          setLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } else {
        // 2. Local fallback mode
        const hasCookie = typeof document !== 'undefined' && document.cookie.includes('jfs_admin_auth=authenticated');
        if (mounted) {
          if (hasCookie) {
            setUser({ email: 'admin@jfs-tradinget.com', role: 'admin' });
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error('Supabase signOut error:', e);
      }
    }
    // Remove all auth cookies
    document.cookie = 'jfs_admin_auth=; Max-Age=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured: isSupabaseConfigured, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
