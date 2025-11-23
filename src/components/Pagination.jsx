import React from "react";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FixedButton from "./Button.jsx";

// A small previous/next control used across pages.
// Props:
// - onPrevious: () => void
// - onNext: () => void
// - disablePrevious: boolean
// - disableNext: boolean
export default function Pagination({
  onPrevious,
  onNext,
  disablePrevious = false,
  disableNext = false,
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", mt: 1 }}
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
