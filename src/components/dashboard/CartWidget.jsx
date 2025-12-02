// src/components/dashboard/CartWidget.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function CartWidget({ data }) {
  if (!data) return null;
  const size = 207;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data.percent / 100) * circumference;

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        Cart
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <svg width={size} height={size}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c4dff" />
              <stop offset="100%" stopColor="#5ad0ff" />
            </linearGradient>
          </defs>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle r={radius} fill="#f4f6f8" />
            <circle
              r={radius}
              fill="transparent"
              stroke="#e6e9ee"
              strokeWidth={stroke}
            />
            <circle
              r={radius}
              fill="transparent"
              stroke="url(#g1)"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90)"
            />
            <text
              x="0"
              y="6"
              fontSize="18"
              fill="#111"
              textAnchor="middle"
              fontWeight="700"
            >
              {data.percent}%
            </text>
          </g>
        </svg>

        <Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Trên tổng số
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {data.items}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Đánh giá {data.revenue}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
