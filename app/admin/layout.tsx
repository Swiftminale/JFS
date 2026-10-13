'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewListIcon from '@mui/icons-material/ViewList';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupIcon from '@mui/icons-material/Group';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import AuthGuard from '@/components/admin/AuthGuard';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a2b26',
    },
    secondary: {
      main: '#c94a38',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
});

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut, isConfigured } = useAuth();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Cinematic Slides', icon: <ViewCarouselIcon />, path: '/admin/slides' },
    { label: 'Overview & Hero', icon: <DashboardIcon />, path: '/admin' },
    { label: 'Poultry Services', icon: <ViewListIcon />, path: '/admin/services' },
    { label: 'Add / Edit Sections', icon: <AddBoxIcon />, path: '/admin/sections' },
    { label: 'Coffee Export Page', icon: <CoffeeIcon />, path: '/admin/coffee' },
    { label: 'User Management', icon: <GroupIcon />, path: '/admin/users' },
  ];

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#14231f' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Logo and Brand */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                bgcolor: '#ffffff',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <img src="/logo.png" alt="JFS Logo" style={{ height: 26, width: 'auto' }} />
              </Box>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                Admin CRM
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {user?.email && (
                <Typography variant="caption" sx={{ color: '#b8c0bc', mr: 1 }}>
                  {user.email}
                </Typography>
              )}
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<OpenInNewIcon />}
                onClick={() => window.open('/', '_blank')}
                sx={{ borderColor: 'rgba(255,255,255,0.4)', textTransform: 'none' }}
              >
                View Website
              </Button>
              <Button
                variant="text"
                color="inherit"
                size="small"
                startIcon={<LogoutIcon />}
                onClick={signOut}
                sx={{ color: '#d8cec8', textTransform: 'none' }}
              >
                Sign out
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', py: 2 }}>
            <List>
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton
                      selected={isActive}
                      onClick={() => router.push(item.path)}
                      sx={{
                        '&.Mui-selected': {
                          bgcolor: 'rgba(26, 43, 38, 0.08)',
                          borderRight: '3px solid #1a2b26',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: isActive ? '#1a2b26' : '#555c58' }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500 }} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ px: 2 }}>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 0.5 }}>
                Auth: {isConfigured ? '🟢 Supabase Cloud' : '🟡 Local Mode'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Live CMS synchronization active.
              </Typography>
            </Box>
          </Box>
        </Drawer>

        {/* Content Body */}
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f6f8', minHeight: '100vh' }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AuthProvider>
    </ThemeProvider>
  );
}
