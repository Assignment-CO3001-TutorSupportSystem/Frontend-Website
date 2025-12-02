// src/components/dashboard/StatsCard.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function StatsCard({ title, value, delta }) {
  const positive = delta && delta.startsWith("+");
  return (
    <Card
      sx={{
        borderRadius: 2,
        minWidth: 160,
        flex: "1 1 160px",
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#97adeaff" }}>
            {value}
          </Typography>
          {delta && (
            <Typography
              variant="caption"
              sx={{
                color: positive ? "success.main" : "error.main",
                fontWeight: 700,
                background: "#f4f6f8",
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {delta}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
