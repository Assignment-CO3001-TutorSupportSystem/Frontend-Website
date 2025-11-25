import { Box, Button } from "@mui/material";

export default function PaginationFooter() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button variant="outlined" sx={{ borderRadius: "8px", width: 90 }}>
        Next
      </Button>
    </Box>
  );
}
