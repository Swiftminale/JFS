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
  Collapse,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { isSupabaseConfigured } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, signIn, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If user is already authenticated in Supabase, redirect directly to /admin
  React.useEffect(() => {
    if (user) {
      window.location.href = '/admin';
    }
  }, [user]);

  // Supabase Configuration Form State
  const [showConfig, setShowConfig] = useState(false);
  const [supabaseUrlInput, setSupabaseUrlInput] = useState('');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');
  const [configSaving, setConfigSaving] = useState(false);
  const [configMessage, setConfigMessage] = useState<{ text: string; severity: 'success' | 'error' } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      // Clean full-page navigation to /admin to ensure SSR and middleware synchronization
      window.location.href = '/admin';
    } catch (err: any) {
      console.error('Supabase login error:', err);
      const msg = err?.message || '';
      if (msg.includes('Email not confirmed') || err?.code === 'email_not_confirmed') {
        setError(
          'Supabase Email Not Confirmed: Please verify your email via the confirmation link or confirm this user in your Supabase Dashboard (Authentication -> Users -> Confirm User).'
        );
      } else if (msg.includes('Invalid login credentials') || err?.code === 'invalid_credentials') {
        setError('Invalid Supabase admin email or password. Please verify your credentials.');
      } else {
        setError(msg || 'Supabase authentication failed. Please check your credentials.');
      }
      setLoading(false);
    }
  };

  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaving(true);
    setConfigMessage(null);

    try {
      const res = await fetch('/api/admin/setup-supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supabaseUrl: supabaseUrlInput,
          supabaseAnonKey: supabaseKeyInput,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setConfigMessage({ text: 'Supabase credentials saved to .env.local! Reloading page...', severity: 'success' });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setConfigMessage({ text: data.error || 'Failed to save configuration', severity: 'error' });
      }
    } catch (err: any) {
      setConfigMessage({ text: err.message || 'Error communicating with server', severity: 'error' });
    } finally {
      setConfigSaving(false);
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
      <Card sx={{ maxWidth: 460, width: '100%', borderRadius: 2, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo Brand Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <img src="/logo.png" alt="JFS Trading Logo" style={{ height: 46, width: 'auto' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#141716' }}>
              Admin CRM Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 0.5 }}>
              Sign in to manage JFS Trading products, content & coffee exports
            </Typography>
          </Box>

          {/* Connection Status Indicator */}
          {isSupabaseConfigured ? (
            <Alert
              icon={<CloudDoneIcon fontSize="inherit" />}
              severity="success"
              sx={{ mb: 2.5, fontSize: '0.8rem', alignItems: 'center' }}
            >
              <strong>Supabase Connected:</strong> Ready for invited admin accounts.
            </Alert>
          ) : (
            <Alert
              icon={<WarningAmberIcon fontSize="inherit" />}
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setShowConfig(!showConfig)}
                  startIcon={<SettingsIcon sx={{ fontSize: 16 }} />}
                  sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
                >
                  Configure
                </Button>
              }
              sx={{ mb: 2.5, fontSize: '0.8rem' }}
            >
              <div>
                <strong>Supabase Not Connected:</strong> Placeholders detected in <code>.env.local</code>.
              </div>
            </Alert>
          )}

          {/* Collapsible Supabase Setup Box */}
          <Collapse in={showConfig}>
            <Box sx={{
              p: 2.5,
              mb: 3,
              bgcolor: '#f8faf9',
              borderRadius: 2,
              border: '1px solid #c9d5cf'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a2b26', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon sx={{ fontSize: 18, color: '#c94a38' }} />
                Connect Supabase Project
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                Paste your Project URL & Anon/Public Key from your Supabase dashboard (Settings &rarr; API).
              </Typography>

              {configMessage && (
                <Alert severity={configMessage.severity} sx={{ mb: 2, fontSize: '0.8rem' }}>
                  {configMessage.text}
                </Alert>
              )}

              <form onSubmit={handleSaveSupabaseConfig}>
                <TextField
                  fullWidth
                  size="small"
                  label="Supabase Project URL"
                  placeholder="https://xyzcompany.supabase.co"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  required
                  sx={{ mb: 1.5 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Supabase Anon Key"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  fullWidth
                  disabled={configSaving}
                  sx={{
                    bgcolor: '#1a2b26',
                    '&:hover': { bgcolor: '#0f1a17' },
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none'
                  }}
                >
                  {configSaving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Save & Connect Supabase'}
                </Button>
              </form>
            </Box>
          </Collapse>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, fontSize: '0.85rem' }}>
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
                isSupabaseConfigured ? 'Sign In with Supabase' : 'Sign In'
              )}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={() => router.push('/')}
              sx={{ textTransform: 'none', color: '#555c58' }}
            >
              &larr; Return to Website
            </Button>

            {!isSupabaseConfigured && (
              <Button
                variant="text"
                size="small"
                onClick={() => setShowConfig(!showConfig)}
                sx={{ textTransform: 'none', color: '#c97223', fontWeight: 700 }}
              >
                {showConfig ? 'Hide Config' : 'Setup Supabase'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

