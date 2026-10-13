'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  helperText,
}: ImageUploadFieldProps) {
  const [tab, setTab] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WebP, SVG)');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please check network connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1a2b26' }}>
        {label}
      </Typography>

      <Tabs
        value={tab}
        onChange={(_, val) => setTab(val)}
        sx={{ minHeight: 36, mb: 1.5 }}
      >
        <Tab icon={<CloudUploadIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Upload File" sx={{ minHeight: 36, py: 0.5, fontSize: '0.8rem' }} />
        <Tab icon={<LinkIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Paste Image URL" sx={{ minHeight: 36, py: 0.5, fontSize: '0.8rem' }} />
      </Tabs>

      {tab === 0 ? (
        <Box
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          sx={{
            border: '2px dashed',
            borderColor: dragOver ? '#297a48' : '#ccd2ce',
            bgcolor: dragOver ? '#f0f7f3' : '#fafbf9',
            borderRadius: 2,
            p: 2.5,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { borderColor: '#1a2b26' },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          {uploading ? (
            <Box sx={{ py: 2 }}>
              <CircularProgress size={28} sx={{ color: '#297a48' }} />
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Uploading image...
              </Typography>
            </Box>
          ) : (
            <Box>
              <CloudUploadIcon sx={{ fontSize: 36, color: '#555c58', mb: 0.5 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#141716' }}>
                Click to browse or drag & drop picture here
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supports PNG, JPG, WebP, SVG (Max 10MB)
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <TextField
          fullWidth
          size="small"
          placeholder="https://images.unsplash.com/... or custom URL"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          helperText={helperText || "Direct link to hosted picture"}
        />
      )}

      {/* Live Preview Bar */}
      {value && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 1.5,
          p: 1.5,
          bgcolor: '#ffffff',
          borderRadius: 1.5,
          border: '1px solid #e1e4e2'
        }}>
          <Box sx={{
            width: 72,
            height: 52,
            borderRadius: 1,
            overflow: 'hidden',
            bgcolor: '#e9ece6',
            flexShrink: 0
          }}>
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#297a48', display: 'block' }}>
              CURRENT IMAGE ACTIVE
            </Typography>
            <Typography variant="body2" noWrap sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
              {value}
            </Typography>
          </Box>
          <IconButton size="small" color="error" onClick={() => onChange('')} title="Remove image">
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
