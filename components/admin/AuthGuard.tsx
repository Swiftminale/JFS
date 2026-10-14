'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth check finished and no authenticated Supabase user exists:
    if (!loading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // Show loading screen while verifying Supabase session
  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#14231f',
        color: '#ffffff',
        gap: 2
      }}>
        <CircularProgress sx={{ color: '#297a48' }} />
        <Typography variant="body2" sx={{ color: '#b8c0bc' }}>
          Verifying Supabase authentication...
        </Typography>
      </Box>
    );
  }

  // If no user, block rendering completely to prevent content flash
  if (!user && pathname !== '/admin/login') {
    return null;
  }

  return <>{children}</>;
}
