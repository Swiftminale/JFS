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
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CollectionsIcon from '@mui/icons-material/Collections';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImageUploadField from '@/components/admin/ImageUploadField';

export default function CoffeeManagerPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // New photo draft state
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Harvesting',
    imageUrl: '',
    caption: '',
  });

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

  const handleAddPhoto = () => {
    if (!newPhoto.imageUrl) {
      setSnackbar({ open: true, message: 'Please upload or provide an image URL first', severity: 'error' });
      return;
    }
    const currentGallery = coffee.gallery || [];
    const newItem = {
      id: `gal-${Date.now()}`,
      title: newPhoto.title || 'Ethiopian Coffee Photo',
      category: newPhoto.category || 'General',
      imageUrl: newPhoto.imageUrl,
      caption: newPhoto.caption || '',
    };
    setContent({
      ...content,
      coffeePage: {
        ...coffee,
        gallery: [newItem, ...currentGallery],
      },
    });
    setNewPhoto({ title: '', category: 'Harvesting', imageUrl: '', caption: '' });
    setSnackbar({ open: true, message: 'Photo added to gallery! Remember to click "Save Coffee Page".', severity: 'success' });
  };

  const handleDeletePhoto = (id: string) => {
    const currentGallery = coffee.gallery || [];
    setContent({
      ...content,
      coffeePage: {
        ...coffee,
        gallery: currentGallery.filter((item: any) => item.id !== id),
      },
    });
    setSnackbar({ open: true, message: 'Photo removed from gallery', severity: 'success' });
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const currentGallery = [...(coffee.gallery || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentGallery.length) return;
    const [moved] = currentGallery.splice(index, 1);
    currentGallery.splice(targetIndex, 0, moved);
    setContent({
      ...content,
      coffeePage: {
        ...coffee,
        gallery: currentGallery,
      },
    });
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
            Upload coffee pictures directly, manage origin gallery, edit headlines, and update sourcing pillars.
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

      {/* Coffee Photo Gallery Manager */}
      <Card id="gallery" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <div>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a2b26', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CollectionsIcon sx={{ color: '#c94a38' }} />
                Coffee Origin & Export Photo Gallery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload authentic photos of coffee harvesting, washing stations, sun drying, and export operations.
              </Typography>
            </div>
            <Chip
              label={`${(coffee.gallery || []).length} Photos`}
              color="primary"
              size="small"
              sx={{ bgcolor: '#1a2b26', fontWeight: 700 }}
            />
          </Box>
          <Divider sx={{ mb: 3 }} />

          {/* Add New Photo Box */}
          <Box sx={{
            p: 2.5,
            mb: 4,
            bgcolor: '#fbf7f0',
            border: '1px solid #eadbc8',
            borderRadius: 2
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#24140f', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddPhotoAlternateIcon sx={{ color: '#c97223' }} />
              Add New Photo to Coffee Gallery
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <ImageUploadField
                  label="Upload Photo (from Device or Web URL)"
                  value={newPhoto.imageUrl}
                  onChange={(url) => setNewPhoto({ ...newPhoto, imageUrl: url })}
                  helperText="Upload JPG, PNG, or WebP picture from your device"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Photo Title"
                      placeholder="e.g. Yirgacheffe Cherry Harvest"
                      value={newPhoto.title}
                      onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Category"
                        value={newPhoto.category}
                        onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                      >
                        <MenuItem value="Harvesting">Harvesting</MenuItem>
                        <MenuItem value="Washing Station">Washing Station</MenuItem>
                        <MenuItem value="Sun Drying">Sun Drying</MenuItem>
                        <MenuItem value="Cupping & QC">Cupping & QC</MenuItem>
                        <MenuItem value="Brewing">Brewing</MenuItem>
                        <MenuItem value="Export Logistics">Export Logistics</MenuItem>
                        <MenuItem value="Origin Community">Origin Community</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      label="Photo Caption / Description"
                      placeholder="Add background context, altitude, washing station details, or notes..."
                      value={newPhoto.caption}
                      onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      startIcon={<AddPhotoAlternateIcon />}
                      onClick={handleAddPhoto}
                      sx={{
                        textTransform: 'none',
                        bgcolor: '#c97223',
                        '&:hover': { bgcolor: '#b45309' },
                        px: 3,
                        py: 1,
                        fontWeight: 600
                      }}
                    >
                      Add Photo to Gallery
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Existing Gallery Photos List */}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#1a2b26' }}>
            Current Gallery Photos ({(coffee.gallery || []).length})
          </Typography>

          {(!coffee.gallery || coffee.gallery.length === 0) ? (
            <Box sx={{ p: 4, textAlign: 'center', bgcolor: '#fbfbfb', borderRadius: 2, border: '1px dashed #d0d0d0' }}>
              <Typography variant="body2" color="text.secondary">
                No photos in the gallery yet. Use the upload box above to add your first coffee photo.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {coffee.gallery.map((item: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Box sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'all 0.2s',
                    '&:hover': { boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }
                  }}>
                    {/* Thumbnail */}
                    <Box sx={{ position: 'relative', height: 180, bgcolor: '#24140f', overflow: 'hidden' }}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Chip
                        label={item.category || 'General'}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          bgcolor: 'rgba(26, 17, 14, 0.85)',
                          color: '#e58e37',
                          fontWeight: 700,
                          fontSize: '0.7rem'
                        }}
                      />
                      {/* Action buttons on thumbnail */}
                      <Box sx={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        display: 'flex',
                        gap: 0.5,
                        bgcolor: 'rgba(0,0,0,0.65)',
                        borderRadius: 1,
                        p: 0.25
                      }}>
                        <IconButton
                          size="small"
                          disabled={index === 0}
                          onClick={() => handleMovePhoto(index, 'up')}
                          sx={{ color: '#ffffff', p: 0.5 }}
                        >
                          <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={index === coffee.gallery.length - 1}
                          onClick={() => handleMovePhoto(index, 'down')}
                          sx={{ color: '#ffffff', p: 0.5 }}
                        >
                          <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePhoto(item.id)}
                          sx={{ color: '#ff6b6b', p: 0.5 }}
                        >
                          <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Editable fields */}
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Title"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...coffee.gallery];
                          updated[index].title = e.target.value;
                          setContent({ ...content, coffeePage: { ...coffee, gallery: updated } });
                        }}
                      />
                      <FormControl fullWidth size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                          label="Category"
                          value={item.category || 'Harvesting'}
                          onChange={(e) => {
                            const updated = [...coffee.gallery];
                            updated[index].category = e.target.value;
                            setContent({ ...content, coffeePage: { ...coffee, gallery: updated } });
                          }}
                        >
                          <MenuItem value="Harvesting">Harvesting</MenuItem>
                          <MenuItem value="Washing Station">Washing Station</MenuItem>
                          <MenuItem value="Sun Drying">Sun Drying</MenuItem>
                          <MenuItem value="Cupping & QC">Cupping & QC</MenuItem>
                          <MenuItem value="Brewing">Brewing</MenuItem>
                          <MenuItem value="Export Logistics">Export Logistics</MenuItem>
                          <MenuItem value="Origin Community">Origin Community</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        label="Caption"
                        value={item.caption || ''}
                        onChange={(e) => {
                          const updated = [...coffee.gallery];
                          updated[index].caption = e.target.value;
                          setContent({ ...content, coffeePage: { ...coffee, gallery: updated } });
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

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
