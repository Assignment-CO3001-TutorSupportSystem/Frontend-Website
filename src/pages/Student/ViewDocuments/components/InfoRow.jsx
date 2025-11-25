import { Box, Typography } from "@mui/material";

export default function InfoRow({ label, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 3,
        py: 1.8,
        px: 2,
        borderBottom: "1px solid #e5e5e5",
        borderRadius: 1,
        transition: "background 0.2s ease",
        "&:hover": {
          background: "#f7f9fa",
        },
      }}
    >
      <Box sx={{ width: 160 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 0.2 }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
