import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * SearchBar – Ô tìm kiếm tái sử dụng
 * -------------------------------------
 * Props:
 * - value: string – giá trị của input
 * - onChange: (event) => void – callback khi nhập text
 * - onSearch: () => void – callback khi nhấn nút tìm kiếm
 * - onClear: () => void – callback khi xóa nội dung
 * - placeholder: string – gợi ý hiển thị trong ô tìm kiếm
 * - width: số hoặc chuỗi (ví dụ 300 hoặc '100%')
 */
export default function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Tìm kiếm...',
  width = 320,
}) {
  return (
    <Box sx={{ width, display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch()}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            '& fieldset': { border: '1px solid #D0D7D9' },
            '&:hover fieldset': { borderColor: '#0F6B73' },
            '&.Mui-focused fieldset': { borderColor: '#0F6B73', borderWidth: '2px' },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={onSearch}>
                <SearchIcon sx={{ color: '#0F6B73' }} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={onClear}>
                <ClearIcon sx={{ color: '#777' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
