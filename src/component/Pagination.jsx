import React from 'react';
import { Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FixedButton from './Button.jsx';

/**
 * PaginationControls – Cụm điều khiển Previous / Next cho bảng
 * -----------------------------------------------------------
 * Props:
 * - onPrevious: hàm xử lý khi nhấn Previous
 * - onNext: hàm xử lý khi nhấn Next
 * - disablePrevious: boolean (mặc định false)
 * - disableNext: boolean (mặc định false)
 */
export default function PaginationControls({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%', mt: 3 }}
    >
      <FixedButton
        variant="secondary"
        width={140}
        height={44}
        onClick={onPrevious}
        disabled={disablePrevious}
        icon={<ArrowBackIosNewIcon fontSize="small" />}
      >
        Previous
      </FixedButton>

      <FixedButton
        variant="secondary"
        width={140}
        height={44}
        onClick={onNext}
        disabled={disableNext}
        icon={<ArrowForwardIosIcon fontSize="small" />}
        iconPosition="right"
      >
        Next
      </FixedButton>
    </Stack>
  );
}