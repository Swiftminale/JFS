'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Avatar,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Editor';
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<{
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: 'Super Admin' | 'Admin' | 'Editor';
    status?: 'Active' | 'Inactive';
  }>({
    name: '',
    email: '',
    password: '',
    role: 'Editor',
    status: 'Active',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to load users', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditingUser({ name: '', email: '', password: '', role: 'Admin', status: 'Active' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser({ ...user, password: '' });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this administrator?')) {
      try {
        const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          setSnackbar({ open: true, message: 'Administrator account deleted', severity: 'success' });
          fetchUsers();
        }
      } catch {
        setSnackbar({ open: true, message: 'Error deleting user', severity: 'error' });
      }
    }
  };

  const handleSaveModal = async () => {
    if (!editingUser.name || !editingUser.email) {
      alert('Name and email are required');
      return;
    }

    if (!editingUser.id && !editingUser.password && isSupabaseConfigured) {
      alert('Temporary password is required to create a new Supabase admin user');
      return;
    }

    setCreating(true);
    try {
      // 1. If Supabase is configured and creating a new user, register in Supabase Auth
      if (!editingUser.id && isSupabaseConfigured && supabase && editingUser.password) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: editingUser.email,
          password: editingUser.password,
          options: {
            data: {
              full_name: editingUser.name,
              role: editingUser.role,
            },
          },
        });

        if (signUpError) {
          throw new Error(`Supabase Auth: ${signUpError.message}`);
        }
      }

      // 2. Persist to User Management Store
      const method = editingUser.id ? 'PUT' : 'POST';
      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });

      if (res.ok) {
        setSnackbar({
          open: true,
          message: editingUser.id
            ? 'User permissions updated'
            : 'New admin account created and synced to Supabase!',
          severity: 'success',
        });
        setDialogOpen(false);
        fetchUsers();
      } else {
        throw new Error('Save error');
      }
    } catch (err: any) {
      setSnackbar({ open: true, message: err.message || 'Failed to save user', severity: 'error' });
    } finally {
      setCreating(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'error';
      case 'Admin':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a2b26' }}>
            User Management & Access Controls
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage authorized administrators and content editors for the JFS Trading CRM.
          </Typography>
        </div>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchUsers} sx={{ textTransform: 'none' }}>
            Refresh
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddIcon />}
            onClick={handleOpenAdd}
            sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
          >
            Create New Admin User
          </Button>
        </Box>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f1f3f1' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date Added</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#1a2b26', fontSize: '0.85rem' }}>
                      {u.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {u.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Chip label={u.role} color={getRoleColor(u.role) as any} size="small" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={u.status}
                    color={u.status === 'Active' ? 'success' : 'default'}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{u.createdAt}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleOpenEdit(u)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(u.id)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add / Edit User Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingUser.id ? 'Edit User Permissions' : 'Create New Admin Account'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Full Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />

          {!editingUser.id && (
            <TextField
              fullWidth
              label="Temporary Password"
              type="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
              helperText="Set an initial password for this admin user (min 6 chars)"
              sx={{ mb: 2 }}
            />
          )}

          <TextField
            select
            fullWidth
            label="Access Role"
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Super Admin">Super Admin (Full Access + User Management)</MenuItem>
            <MenuItem value="Admin">Admin (Content Editing & Media Uploads)</MenuItem>
            <MenuItem value="Editor">Editor (Text & Service Updates)</MenuItem>
          </TextField>

          {editingUser.id && (
            <TextField
              select
              fullWidth
              label="Account Status"
              value={editingUser.status || 'Active'}
              onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveModal}
            disabled={creating}
            sx={{ bgcolor: '#1a2b26' }}
          >
            {creating ? 'Creating in Supabase...' : editingUser.id ? 'Update User' : 'Create Admin'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
