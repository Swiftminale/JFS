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
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImageUploadField from '@/components/admin/ImageUploadField';
import type { ScrollSectionItem } from '@/types/content';

export default function ScrollSectionsManagerPage() {
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
    } catch {
      setSnackbar({ open: true, message: 'Failed to load scroll sections', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleUpdateSection = (sectionKey: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      scrollSections: {
        ...prev.scrollSections,
        [sectionKey]: {
          ...prev.scrollSections[sectionKey],
          [field]: value,
        },
      },
    }));
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
        setSnackbar({ open: true, message: 'Scroll sections updated on live site!', severity: 'success' });
      } else {
        throw new Error('Save error');
      }
    } catch {
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

  const sections = content.scrollSections || {};
  const sectionKeys = [
    { key: 'section1', label: 'Section 1 (01): Landing Page', defaultBadge: '01' },
    { key: 'section2', label: 'Section 2 (02): About Us (Who We Are)', defaultBadge: '02' },
    { key: 'section3', label: 'Section 3 (03): Our Services (What We Do)', defaultBadge: '03' },
    { key: 'section4', label: 'Section 4 (04): Contact Us (Get in Touch)', defaultBadge: '04' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a2b26' }}>
            Full-Page Scroll Sections Manager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize the 4 full-bleed scrollable panels (01 Landing, 02 About Us, 03 Our Services, 04 Contact Us). Upload backdrop pictures and edit headline quotes directly.
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
            onClick={handleSaveAll}
            disabled={saving}
            sx={{ textTransform: 'none', px: 3, bgcolor: '#c94a38', '&:hover': { bgcolor: '#b33e2d' } }}
          >
            {saving ? 'Publishing...' : 'Publish to Live Site'}
          </Button>
        </Box>
      </Box>

      {/* 4 Scroll Sections Editor Cards */}
      <Grid container spacing={4}>
        {sectionKeys.map(({ key, label, defaultBadge }) => {
          const item: ScrollSectionItem = sections[key] || {
            badge: defaultBadge,
            tag: '',
            quote: '',
            subtext: '',
            buttonText: 'EXPLORE NOW',
            buttonLink: '#',
            imageUrl: '',
          };

          return (
            <Grid item xs={12} key={key}>
              <Card sx={{
                borderRadius: 2,
                border: '1px solid #dce2dd',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}>
                <Box sx={{
                  bgcolor: '#14231f',
                  color: '#ffffff',
                  p: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip
                      label={item.badge || defaultBadge}
                      sx={{ bgcolor: '#a3e635', color: '#14231f', fontWeight: 800, fontSize: '0.8rem' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      {label}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#b8c0bc' }}>
                    Anchor Target: #{key === 'section1' ? 'landing' : key === 'section2' ? 'about' : key === 'section3' ? 'services' : 'contact'}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Category Tag (e.g. AFRICAN PROVERB, WHO WE ARE)"
                        value={item.tag || ''}
                        onChange={(e) => handleUpdateSection(key, 'tag', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Editorial Headline Quote"
                        value={item.quote || ''}
                        onChange={(e) => handleUpdateSection(key, 'quote', e.target.value)}
                        helperText="Will render in large uppercase serif quotation typography"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Section Subtext / Motto Description"
                        value={item.subtext || ''}
                        onChange={(e) => handleUpdateSection(key, 'subtext', e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <ImageUploadField
                        label="Full-Screen Backdrop Image (Upload or URL)"
                        value={item.imageUrl || ''}
                        onChange={(url) => handleUpdateSection(key, 'imageUrl', url)}
                        helperText="Drop high-resolution panoramic picture file or paste URL"
                      />
                    </Grid>

                    <Grid item xs={12} md={5}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                          fullWidth
                          label="Button Action Label"
                          value={item.buttonText || ''}
                          onChange={(e) => handleUpdateSection(key, 'buttonText', e.target.value)}
                        />
                        <TextField
                          fullWidth
                          label="Button Scroll Link (e.g. #about, #services, #contact)"
                          value={item.buttonLink || ''}
                          onChange={(e) => handleUpdateSection(key, 'buttonLink', e.target.value)}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

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
