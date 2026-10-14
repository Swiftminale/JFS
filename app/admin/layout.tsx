'use client';

import React, { useState } from 'react';
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
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewListIcon from '@mui/icons-material/ViewList';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupIcon from '@mui/icons-material/Group';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Cinematic Slides', icon: <ViewCarouselIcon />, path: '/admin/slides' },
    { label: 'Overview & Hero', icon: <DashboardIcon />, path: '/admin' },
    { label: 'Poultry Services', icon: <ViewListIcon />, path: '/admin/services' },
    { label: 'Add / Edit Sections', icon: <AddBoxIcon />, path: '/admin/sections' },
    { label: 'Coffee Export Page', icon: <CoffeeIcon />, path: '/admin/coffee' },
    { label: 'Coffee Gallery', icon: <CollectionsIcon />, path: '/admin/coffee#gallery' },
    { label: 'User Management', icon: <GroupIcon />, path: '/admin/users' },
  ];

  const drawerContent = (
    <Box sx={{ overflow: 'auto', py: 2 }}>
      <Toolbar sx={{ display: { md: 'none' }, minHeight: '48px !important' }} />
      <List>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  router.push(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
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
          Auth: 🟢 Supabase Cloud
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Live CMS synchronization active.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#14231f' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 3 } }}>
            {/* Logo and Brand with Mobile Hamburger */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 0.5, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img src="/logo.png" alt="JFS Logo" style={{ height: 26, width: 'auto' }} />
                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>
                  Admin CRM
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: { xs: 0.75, sm: 1.5 }, alignItems: 'center' }}>
              {user?.email && (
                <Typography variant="caption" sx={{ color: '#b8c0bc', mr: 1, display: { xs: 'none', sm: 'inline-block' } }}>
                  {user.email}
                </Typography>
              )}
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<OpenInNewIcon sx={{ fontSize: '1rem !important' }} />}
                onClick={() => window.open('/', '_blank')}
                sx={{ borderColor: 'rgba(255,255,255,0.4)', textTransform: 'none', fontSize: { xs: '0.75rem', sm: '0.8125rem' }, px: { xs: 1, sm: 1.5 } }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>View </Box>Website
              </Button>
              <Button
                variant="text"
                color="inherit"
                size="small"
                startIcon={<LogoutIcon sx={{ fontSize: '1rem !important' }} />}
                onClick={signOut}
                sx={{ color: '#d8cec8', textTransform: 'none', fontSize: { xs: '0.75rem', sm: '0.8125rem' }, px: { xs: 0.75, sm: 1 } }}
              >
                Sign out
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer: Temporary for Mobile/Tablet, Permanent for Desktop */}
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          {/* Mobile / Tablet Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile opening performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawerContent}
          </Drawer>

          {/* Desktop Permanent Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Toolbar />
            {drawerContent}
          </Drawer>
        </Box>

        {/* Content Body */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 2.5, md: 4 },
            bgcolor: '#f5f6f8',
            minHeight: '100vh',
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
            maxWidth: '100vw',
            overflowX: 'hidden',
          }}
        >
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
