'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function AdminOverviewPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to load content', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSnackbar({ open: true, message: 'Content saved successfully! Public site updated.', severity: 'success' });
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving changes', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a2b26' }}>
            Hero & Company Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload picture files directly, edit headlines, and update contact details without coding.
          </Typography>
        </div>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchContent} sx={{ textTransform: 'none' }}>
            Reload
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>

      {/* Main Hero Banner Editor */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            Main Landing Page Hero Banner
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Eyebrow Tag"
                value={content.hero.eyebrow}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Main Headline"
                value={content.hero.headline}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Lead / Subtitle Description"
                value={content.hero.lead}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, lead: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              {/* Flexible Image Upload Component */}
              <ImageUploadField
                label="Hero Poultry Farm / Primix Feed Picture"
                value={content.hero.imageUrl}
                onChange={(url) => setContent({ ...content, hero: { ...content.hero, imageUrl: url } })}
                helperText="Upload any local photo file or link an image URL"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Image Placeholder Badge Label"
                value={content.hero.badgeText}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, badgeText: e.target.value } })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* About Us Editor */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            About Us Section
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Section Title"
                value={content.about.title}
                onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ImageUploadField
                label="About Facility / Team Picture"
                value={content.about.imageUrl}
                onChange={(url) => setContent({ ...content, about: { ...content.about, imageUrl: url } })}
                helperText="Upload team or facility photo from your device"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mission & Narrative (Paragraph 1)"
                value={content.about.paragraphs[0] || ''}
                onChange={(e) => {
                  const paras = [...content.about.paragraphs];
                  paras[0] = e.target.value;
                  setContent({ ...content, about: { ...content.about, paragraphs: paras } });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Quality Assurance Mission (Paragraph 2)"
                value={content.about.paragraphs[1] || ''}
                onChange={(e) => {
                  const paras = [...content.about.paragraphs];
                  paras[1] = e.target.value;
                  setContent({ ...content, about: { ...content.about, paragraphs: paras } });
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact & Company Details */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            Company Contact Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={content.site.phone}
                onChange={(e) => setContent({ ...content, site: { ...content.site, phone: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={content.site.email}
                onChange={(e) => setContent({ ...content, site: { ...content.site, email: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Office Address"
                value={content.site.address}
                onChange={(e) => setContent({ ...content, site: { ...content.site, address: e.target.value } })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Operating Hours"
                value={content.site.hours}
                onChange={(e) => setContent({ ...content, site: { ...content.site, hours: e.target.value } })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
