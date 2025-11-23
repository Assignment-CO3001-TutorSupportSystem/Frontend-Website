import React from 'react';
import { Button, CircularProgress } from '@mui/material';


export default function FixedButton({
  variant = 'primary',
  icon,
  iconPosition = 'left',
  loading = false,
  width = 160,
  height = 48,
  children,
  ...rest
}) {
  const getButtonStyle = () => {
    const base = {
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: '10px',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      transition: 'all 0.2s ease-in-out',
      '&:active': { transform: 'scale(0.97)' },
    };

    switch (variant) {
      case 'secondary':
        return {
          ...base,
          backgroundColor: '#E0F2F1',
          color: '#004D40',
          '&:hover': { backgroundColor: '#B2DFDB' }
        };
      case 'success':
        return {
          ...base,
          backgroundColor: '#2E7D32',
          color: '#fff',
          '&:hover': { backgroundColor: '#1B5E20' }
        };
      case 'danger':
        return {
          ...base,
          backgroundColor: '#C62828',
          color: '#fff',
          '&:hover': { backgroundColor: '#B71C1C' }
        };
      default:
        return {
          ...base,
          backgroundColor: '#0F6B73',
          color: '#fff',
          '&:hover': { backgroundColor: '#0B4F55' }
        };
    }
  };

  return (
    <Button
      variant="contained"
      disabled={loading || rest.disabled}
      sx={getButtonStyle()}
      {...rest}
    >
      {!loading && icon && iconPosition === 'left' && icon}
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <span>{children}</span>
      )}
      {!loading && icon && iconPosition === 'right' && icon}
    </Button>
  );
}