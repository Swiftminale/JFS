'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function SectionsManagerPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<{
    id?: string;
    enabled: boolean;
    type: string;
    title: string;
    content: string;
    buttonText?: string;
    buttonLink?: string;
  }>({
    enabled: true,
    type: 'banner',
    title: '',
    content: '',
    buttonText: '',
    buttonLink: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load sections', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleOpenAdd = () => {
    setEditingSection({
      enabled: true,
      type: 'banner',
      title: '',
      content: '',
      buttonText: 'Learn more',
      buttonLink: '#contact',
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (section: any) => {
    setEditingSection(section);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this custom section?')) {
      const updated = content.customSections.filter((s: any) => s.id !== id);
      setContent({ ...content, customSections: updated });
    }
  };

  const handleToggleEnabled = (id: string, enabled: boolean) => {
    const updated = content.customSections.map((s: any) => (s.id === id ? { ...s, enabled } : s));
    setContent({ ...content, customSections: updated });
  };

  const handleSaveModal = () => {
    if (!editingSection.title.trim()) {
      alert('Section title is required');
      return;
    }

    let updatedList = [...(content.customSections || [])];
    if (editingSection.id) {
      updatedList = updatedList.map((s) => (s.id === editingSection.id ? editingSection : s));
    } else {
      updatedList.push({
        ...editingSection,
        id: `sec-${Date.now()}`,
      });
    }

    setContent({ ...content, customSections: updatedList });
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
        setSnackbar({ open: true, message: 'Custom sections updated live!', severity: 'success' });
      } else {
        throw new Error('Save error');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save sections', severity: 'error' });
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
            Dynamic Section Builder
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add custom announcement banners, promo sections, or story blocks without coding.
          </Typography>
        </div>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ textTransform: 'none' }}>
            Add Custom Section
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleSaveAll}
            disabled={saving}
            sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
          >
            {saving ? 'Saving...' : 'Publish Sections'}
          </Button>
        </Box>
      </Box>

      {/* Sections List */}
      {(!content.customSections || content.customSections.length === 0) && (
        <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#ffffff', borderRadius: 2 }}>
          <Typography color="text.secondary">No custom sections added yet. Click &quot;Add Custom Section&quot; to build one.</Typography>
        </Card>
      )}

      {content.customSections?.map((section: any) => (
        <Card key={section.id} sx={{ mb: 2.5, borderRadius: 2, border: '1px solid #e2e8e4' }}>
          <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ maxWidth: '80%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#141716' }}>
                  {section.title}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={section.enabled}
                      onChange={(e) => handleToggleEnabled(section.id, e.target.checked)}
                      color="success"
                    />
                  }
                  label={section.enabled ? 'Visible on website' : 'Hidden'}
                  sx={{ m: 0 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {section.content}
              </Typography>

              {section.buttonText && (
                <Typography variant="caption" sx={{ bgcolor: '#eee', px: 1, py: 0.5, borderRadius: 1 }}>
                  CTA Button: {section.buttonText} &rarr; {section.buttonLink}
                </Typography>
              )}
            </Box>

            <Box>
              <IconButton onClick={() => handleOpenEdit(section)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(section.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingSection.id ? 'Edit Custom Section' : 'Create Custom Section'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Section Title / Headline"
            value={editingSection.title}
            onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Section Body Content / Announcement"
            value={editingSection.content}
            onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Action Button Text (Optional)"
            value={editingSection.buttonText || ''}
            onChange={(e) => setEditingSection({ ...editingSection, buttonText: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Action Button Link (e.g. #contact, /coffee, or external URL)"
            value={editingSection.buttonLink || ''}
            onChange={(e) => setEditingSection({ ...editingSection, buttonLink: e.target.value })}
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
