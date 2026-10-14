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
  Chip,
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

  // Safe fallback accessors to prevent any TypeError: Cannot read properties of undefined
  const hero = content.hero || {
    eyebrow: content.scrollSections?.section1?.tag || 'JOIN THE GREEN REVOLUTION',
    headline: content.scrollSections?.section1?.quote || '"Feed that works for Ethiopia’s small farmers."',
    lead: content.scrollSections?.section1?.subtext || '',
    imageUrl: content.scrollSections?.section1?.imageUrl || '',
    badgeText: '',
  };

  const section1 = content.scrollSections?.section1 || {};

  const about = content.about || {
    title: 'About us',
    paragraphs: ['', ''],
    imageUrl: '',
    badgeText: '',
  };

  const site = content.site || {
    name: 'JFS TRADING',
    tagline: 'JOIN THE GREEN REVOLUTION',
    phone: '',
    email: '',
    address: '',
    hours: '',
  };

  const dualCards = content.dualCards || {
    import: { tag: 'IMPORT', title: '', description: '', linkText: '', linkUrl: '' },
    export: { tag: 'EXPORT', title: '', description: '', linkText: '', linkUrl: '' },
  };

  const handleUpdateHero = (field: string, value: string) => {
    setContent((prev: any) => {
      const currentHero = prev.hero || { ...hero };
      const updatedHero = { ...currentHero, [field]: value };

      // Keep scrollSections.section1 synchronized so homepage slide 1 updates simultaneously
      const currentSection1 = prev.scrollSections?.section1 || {};
      const updatedSection1 = {
        ...currentSection1,
        ...(field === 'eyebrow' ? { tag: value } : {}),
        ...(field === 'headline' ? { quote: value } : {}),
        ...(field === 'lead' ? { subtext: value } : {}),
        ...(field === 'imageUrl' ? { imageUrl: value } : {}),
      };

      return {
        ...prev,
        hero: updatedHero,
        scrollSections: {
          ...(prev.scrollSections || {}),
          section1: updatedSection1,
        },
      };
    });
  };

  const handleUpdateSection1Button = (field: 'buttonText' | 'buttonLink', value: string) => {
    setContent((prev: any) => ({
      ...prev,
      scrollSections: {
        ...(prev.scrollSections || {}),
        section1: {
          ...(prev.scrollSections?.section1 || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleUpdateAbout = (field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      about: {
        ...(prev.about || about),
        [field]: value,
      },
    }));
  };

  const handleUpdateAboutParagraph = (index: number, value: string) => {
    setContent((prev: any) => {
      const paragraphs = [...(prev.about?.paragraphs || about.paragraphs)];
      paragraphs[index] = value;
      return {
        ...prev,
        about: {
          ...(prev.about || about),
          paragraphs,
        },
      };
    });
  };

  const handleUpdateSite = (field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      site: {
        ...(prev.site || site),
        [field]: value,
      },
    }));
  };

  const handleUpdateDualCard = (cardType: 'import' | 'export', field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      dualCards: {
        ...(prev.dualCards || dualCards),
        [cardType]: {
          ...((prev.dualCards || dualCards)[cardType] || {}),
          [field]: value,
        },
      },
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a2b26' }}>
            Hero & Company Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload pictures directly, edit headlines, manage hero highlight cards, and update contact details.
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip label="Section 01" size="small" sx={{ bgcolor: '#a3e635', color: '#14231f', fontWeight: 800 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a2b26' }}>
                Main Landing Page Hero Banner
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Synced with Slide 01 on Homepage
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Eyebrow Tag / Category Pill"
                value={hero.eyebrow || ''}
                onChange={(e) => handleUpdateHero('eyebrow', e.target.value)}
                placeholder="e.g. JOIN THE GREEN REVOLUTION"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Main Headline Quote"
                value={hero.headline || ''}
                onChange={(e) => handleUpdateHero('headline', e.target.value)}
                placeholder='e.g. "Feed that works for Ethiopia’s small farmers."'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Lead / Subtitle Description"
                value={hero.lead || ''}
                onChange={(e) => handleUpdateHero('lead', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <ImageUploadField
                label="Hero Poultry Farm / Primix Feed Picture"
                value={hero.imageUrl || ''}
                onChange={(url) => handleUpdateHero('imageUrl', url)}
                helperText="Upload any local photo file or link an image URL"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Button Action Label"
                  value={section1.buttonText || ''}
                  onChange={(e) => handleUpdateSection1Button('buttonText', e.target.value)}
                  placeholder="e.g. EXPLORE NOW"
                />
                <TextField
                  fullWidth
                  label="Button Scroll Link"
                  value={section1.buttonLink || ''}
                  onChange={(e) => handleUpdateSection1Button('buttonLink', e.target.value)}
                  placeholder="e.g. #about or #services"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dual Highlight Cards (Import Primix / Export Coffee) */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a2b26' }}>
            Hero Overlay Highlight Cards (Dual Cards)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            These two glass cards float directly inside the landing page hero section.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={4}>
            {/* Import Card */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, border: '1px solid #c8e6c9', borderRadius: 2, bgcolor: '#f4fbf5' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', mb: 2 }}>
                  Card 1: Poultry Feed (Import)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Card Tag"
                      value={dualCards.import?.tag || ''}
                      onChange={(e) => handleUpdateDualCard('import', 'tag', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Card Title"
                      value={dualCards.import?.title || ''}
                      onChange={(e) => handleUpdateDualCard('import', 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Description"
                      value={dualCards.import?.description || ''}
                      onChange={(e) => handleUpdateDualCard('import', 'description', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Link Text"
                      value={dualCards.import?.linkText || ''}
                      onChange={(e) => handleUpdateDualCard('import', 'linkText', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Link URL"
                      value={dualCards.import?.linkUrl || ''}
                      onChange={(e) => handleUpdateDualCard('import', 'linkUrl', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Export Card */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2.5, border: '1px solid #ffccbc', borderRadius: 2, bgcolor: '#fff8f6' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#c94a38', mb: 2 }}>
                  Card 2: Ethiopian Coffee (Export)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Card Tag"
                      value={dualCards.export?.tag || ''}
                      onChange={(e) => handleUpdateDualCard('export', 'tag', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Card Title"
                      value={dualCards.export?.title || ''}
                      onChange={(e) => handleUpdateDualCard('export', 'title', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Description"
                      value={dualCards.export?.description || ''}
                      onChange={(e) => handleUpdateDualCard('export', 'description', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Link Text"
                      value={dualCards.export?.linkText || ''}
                      onChange={(e) => handleUpdateDualCard('export', 'linkText', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Link URL"
                      value={dualCards.export?.linkUrl || ''}
                      onChange={(e) => handleUpdateDualCard('export', 'linkUrl', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
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
                value={about.title || ''}
                onChange={(e) => handleUpdateAbout('title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ImageUploadField
                label="About Facility / Team Picture"
                value={about.imageUrl || ''}
                onChange={(url) => handleUpdateAbout('imageUrl', url)}
                helperText="Upload team or facility photo from your device"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mission & Narrative (Paragraph 1)"
                value={about.paragraphs?.[0] || ''}
                onChange={(e) => handleUpdateAboutParagraph(0, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Quality Assurance Mission (Paragraph 2)"
                value={about.paragraphs?.[1] || ''}
                onChange={(e) => handleUpdateAboutParagraph(1, e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact & Company Details */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a2b26' }}>
            Company Contact Information & Branding
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company / Brand Name"
                value={site.name || ''}
                onChange={(e) => handleUpdateSite('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Header Tagline / Motto"
                value={site.tagline || ''}
                onChange={(e) => handleUpdateSite('tagline', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={site.phone || ''}
                onChange={(e) => handleUpdateSite('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={site.email || ''}
                onChange={(e) => handleUpdateSite('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Office Address"
                value={site.address || ''}
                onChange={(e) => handleUpdateSite('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Operating Hours"
                value={site.hours || ''}
                onChange={(e) => handleUpdateSite('hours', e.target.value)}
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
