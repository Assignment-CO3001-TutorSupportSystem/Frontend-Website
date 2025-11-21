// TutorStudentManagementPage.jsx
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import FixedButton from '../../component/Button.jsx'; // đường dẫn tùy cấu trúc project của bạn

export default function TutorStudentManagementPage({
  onManageTutor,
  onManageStudent,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: '#E8F1F3',              // nền xanh nhạt giống hình
        minHeight: '100vh',              // nếu đã có layout khác thì có thể bỏ
        p: 4,
      }}
    >
      {/* Khối nội dung chính, canh giữa theo chiều ngang */}
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {/* Tiêu đề trang */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#0F2437',
            mb: 6,
          }}
        >
          Quản lý tutor/sinh viên
        </Typography>

        {/* Vùng chứa 2 nút, đặt giữa màn hình */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6,
          }}
        >
          <Stack spacing={4} alignItems="center">
            <FixedButton
              width={320}
              height={64}
              onClick={onManageTutor}
            >
              Quản lý Tutor
            </FixedButton>

            <FixedButton
              width={320}
              height={64}
              onClick={onManageStudent}
            >
              Quản lý Sinh viên
            </FixedButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
