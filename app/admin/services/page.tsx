'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function ServicesManagerPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<{ id?: string; title: string; description: string }>({
    title: '',
    description: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load services', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleOpenAdd = () => {
    setEditingService({ title: '', description: '' });
    setDialogOpen(true);
  };

  const handleOpenEdit = (service: any) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this service card?')) {
      const updated = content.services.filter((s: any) => s.id !== id);
      setContent({ ...content, services: updated });
    }
  };

  const handleSaveModal = () => {
    if (!editingService.title.trim()) {
      alert('Service title is required');
      return;
    }

    let updatedList = [...content.services];
    if (editingService.id) {
      // Edit existing
      updatedList = updatedList.map((s) => (s.id === editingService.id ? editingService : s));
    } else {
      // Add new
      updatedList.push({
        id: `srv-${Date.now()}`,
        title: editingService.title,
        description: editingService.description,
      });
    }

    setContent({ ...content, services: updatedList });
    setDialogOpen(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Services updated on live site!', severity: 'success' });
      } else {
        throw new Error('Save error');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save services', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
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
            Poultry Feed Services Cards
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, edit, or add new poultry feed services shown on the public grid.
          </Typography>
        </div>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ textTransform: 'none' }}>
            Add New Service Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleSaveAll}
            disabled={saving}
            sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
          >
            {saving ? 'Saving...' : 'Publish Changes'}
          </Button>
        </Box>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={2.5}>
        {content.services.map((service: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, border: '1px solid #e2e8e4' }}>
              <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#297a48' }}>
                    SERVICE #{index + 1}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpenEdit(service)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(service.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem', mb: 1, color: '#141716' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingService.id ? 'Edit Service Card' : 'Add New Service Card'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Service Title"
            value={editingService.title}
            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Service Description"
            value={editingService.description}
            onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveModal} sx={{ bgcolor: '#1a2b26' }}>
            Done
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
