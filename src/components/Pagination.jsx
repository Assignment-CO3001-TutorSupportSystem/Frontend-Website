<<<<<<< HEAD
import React from "react";
import { Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FixedButton from "./Button.jsx";

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
=======
import React from 'react';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FixedButton from './Button.jsx';

// A small previous/next control used across pages.
// Props:
// - onPrevious: () => void
// - onNext: () => void
// - disablePrevious: boolean
// - disableNext: boolean
export default function Pagination({ onPrevious, onNext, disablePrevious = false, disableNext = false }) {
>>>>>>> feature/dpvpages-management-student
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
<<<<<<< HEAD
      sx={{ width: "100%", mt: 3 }}
=======
      sx={{ width: '100%', mt: 1 }}
>>>>>>> feature/dpvpages-management-student
      gap={2}
    >
      <FixedButton
        variant="secondary"
        width={110}
        height={40}
        onClick={onPrevious}
        disabled={disablePrevious}
        icon={<ArrowBackIosNewIcon fontSize="small" />}
      >
        Previous
      </FixedButton>

      <FixedButton
        variant="secondary"
        width={110}
        height={40}
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
