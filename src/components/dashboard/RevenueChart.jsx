// src/components/dashboard/RevenueChart.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

function formatMoney(v) {
  return `$${Math.round(v).toLocaleString()}`;
}

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value));
  const highlightedIndex = data.findIndex((d) => d.value === max);

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Revenue Chart
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: 0,
          gap: 2,
          alignItems: "end",
          height: 220,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: "100%",
        }}
      >
        {/* Y axis labels (simple) */}
        <Box
          sx={{
            width: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            pr: 1,
          }}
        >
          <Typography variant="caption">{formatMoney(max)}</Typography>
          <Typography variant="caption">
            {formatMoney(Math.round(max * 0.66))}
          </Typography>
          <Typography variant="caption">
            {formatMoney(Math.round(max * 0.33))}
          </Typography>
          <Typography variant="caption">$0</Typography>
        </Box>

        {/* Bars */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            gap: 1,
            width: "100%",
            minWidth: 0,
          }}
        >
          {data.map((d, i) => {
            const heightPercent = (d.value / max) * 100;
            const isHighlighted = i === highlightedIndex;
            return (
              <Box key={d.day} sx={{ flex: 1, textAlign: "center" }}>
                <Box
                  sx={{
                    height: `${Math.max(6, heightPercent)}%`,
                    transition: "height .3s",
                    borderRadius: 1,
                    background: isHighlighted
                      ? "linear-gradient(180deg,#ff8080,#ff4d4d)"
                      : "linear-gradient(180deg,#ffd29b,#ffb26b)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    p: 0.5,
                    boxShadow: isHighlighted
                      ? "0 6px 18px rgba(255,77,77,0.12)"
                      : "none",
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  {d.day}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
