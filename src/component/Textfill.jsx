import React from 'react';
import { TextField, Box } from '@mui/material';

/**
 * TextFill – Ô nhập liệu tái sử dụng (Input / TextArea)
 * ------------------------------------------------------
 * Props:
 * - label: string — tiêu đề hiển thị phía trên
 * - placeholder: string — gợi ý trong ô nhập
 * - value: string — giá trị hiện tại
 * - onChange: (event) => void — callback khi nhập
 * - error: boolean — có lỗi không
 * - helperText: string — mô tả hoặc lỗi
 * - multiline: boolean — cho phép nhập nhiều dòng
 * - rows: number — số dòng khi multiline = true
 * - fullWidth: boolean — chiếm toàn chiều ngang (mặc định true)
 * - width: số hoặc chuỗi — nếu muốn set chiều rộng cố định (vd: 300 hoặc '50%')
 */
export default function TextFill({
  label,
  placeholder = '',
  value,
  onChange,
  error = false,
  helperText = '',
  multiline = false,
  rows = 3,
  fullWidth = true,
  width,
  ...rest
}) {
  return (
    <Box sx={{ width: fullWidth ? '100%' : width || 320 }}>
      <TextField
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
        error={error}
        helperText={helperText}
        multiline={multiline}
        rows={multiline ? rows : 1}
        size="medium"
        fullWidth={fullWidth}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          mt: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            '& fieldset': { borderColor: '#D0D7D9' },
            '&:hover fieldset': { borderColor: '#0F6B73' },
            '&.Mui-focused fieldset': { borderColor: '#0F6B73', borderWidth: '2px' },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#0F6B73',
          },
        }}
        {...rest}
      />
    </Box>
  );
}
