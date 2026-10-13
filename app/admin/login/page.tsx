'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSupabaseConfigured && supabase) {
        // Authenticate via Supabase Auth
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        // Set session cookie for SSR/middleware compatibility
        document.cookie = `jfs_admin_auth=authenticated; path=/; max-age=86400`;
        router.push('/admin');
      } else {
        // Fallback local authentication
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (data.success) {
          document.cookie = 'jfs_admin_auth=authenticated; path=/; max-age=86400';
          router.push('/admin');
        } else {
          setError(data.message || 'Invalid admin credentials');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#14231f',
      p: 2,
    }}>
      <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 2, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo Brand Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{
              bgcolor: '#ffffff',
              px: 2,
              py: 1,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              mb: 2
            }}>
              <img src="/logo.png" alt="JFS Trading Logo" style={{ height: 42, width: 'auto' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#141716' }}>
              Admin CRM Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 0.5 }}>
              Sign in with your Supabase Admin account
            </Typography>
          </Box>

          {isSupabaseConfigured ? (
            <Alert severity="success" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
              <strong>Supabase Connected:</strong> Access restricted to invited administrators.
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mb: 2.5, fontSize: '0.8rem' }}>
              <strong>Local Mode:</strong> Default password <code>admin123</code>.
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Admin Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jfs-tradinget.com"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: '#c94a38',
                '&:hover': { bgcolor: '#b33e2d' },
                py: 1.25,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#fff' }} />
              ) : (
                'Sign In to Admin CRM'
              )}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={() => router.push('/')}
              sx={{ textTransform: 'none', color: '#555c58' }}
            >
              &larr; Return to Public Website
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
