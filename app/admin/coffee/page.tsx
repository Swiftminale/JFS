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
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function CoffeeManagerPage() {
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
      setSnackbar({ open: true, message: 'Failed to load coffee content', severity: 'error' });
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
        setSnackbar({ open: true, message: 'Coffee export page updated live!', severity: 'success' });
      } else {
        throw new Error('Save error');
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save changes', severity: 'error' });
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

  const coffee = content.coffeePage;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a2b26' }}>
            Ethiopian Coffee Export Page
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload coffee pictures directly, edit headlines, and update sourcing pillars.
          </Typography>
        </div>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
          sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
        >
          {saving ? 'Saving...' : 'Save Coffee Page'}
        </Button>
      </Box>

      {/* Hero Banner */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            Coffee Hero Section
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Eyebrow Tag"
                value={coffee.hero.eyebrow}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, hero: { ...coffee.hero, eyebrow: e.target.value } } })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Headline"
                value={coffee.hero.headline}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, hero: { ...coffee.hero, headline: e.target.value } } })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Subtitle Lead"
                value={coffee.hero.lead}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, hero: { ...coffee.hero, lead: e.target.value } } })}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <ImageUploadField
                label="Coffee Beans / Harvest Picture"
                value={coffee.hero.imageUrl}
                onChange={(url) => setContent({ ...content, coffeePage: { ...coffee, hero: { ...coffee.hero, imageUrl: url } } })}
                helperText="Upload Ethiopian coffee picture from local drive"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Photo Badge Placeholder"
                value={coffee.hero.badgeText}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, hero: { ...coffee.hero, badgeText: e.target.value } } })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Heritage Narrative */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            Heritage Narrative Story
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Story Headline"
                value={coffee.heritage.title}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, heritage: { ...coffee.heritage, title: e.target.value } } })}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Story Narrative Text"
                value={coffee.heritage.text}
                onChange={(e) => setContent({ ...content, coffeePage: { ...coffee, heritage: { ...coffee.heritage, text: e.target.value } } })}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 3 Pillars */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            3 Sourcing Pillars (Traceable, Sustainable, Carefully selected)
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {coffee.pillars.map((pillar: any, index: number) => (
              <Grid item xs={12} md={4} key={pillar.id}>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c94a38' }}>
                    PILLAR #{index + 1}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    label="Pillar Title"
                    value={pillar.title}
                    onChange={(e) => {
                      const updated = [...coffee.pillars];
                      updated[index].title = e.target.value;
                      setContent({ ...content, coffeePage: { ...coffee, pillars: updated } });
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    label="Pillar Description"
                    value={pillar.description}
                    onChange={(e) => {
                      const updated = [...coffee.pillars];
                      updated[index].description = e.target.value;
                      setContent({ ...content, coffeePage: { ...coffee, pillars: updated } });
                    }}
                  />
                </Box>
              </Grid>
            ))}
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
