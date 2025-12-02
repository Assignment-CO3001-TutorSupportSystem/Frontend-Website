// src/pages/DashboardPage.jsx
import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import useDashboardStats from "../../hooks/useDashboardStats";
import StatsCard from "../../components/dashboard/StatsCard";
import CartWidget from "../../components/dashboard/CartWidget";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import TopSession from "../../components/dashboard/TopSession";

export default function DashboardPage() {
  const { overview, cartWidget, recentTransactions, topSession } =
    useDashboardStats();

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh", width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Thống kê
        </Typography>
      </Box>

      {/* Overview cards */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {overview.map((o) => (
          <Grid item xs={12} sm={6} md={2.4} key={o.id}>
            <StatsCard title={o.title} value={o.value} delta={o.delta} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* Main content */}
        <Grid container sx={{ width: "100%" }} spacing={2}>
          {/* <Box sx={{ width: "80%" }}>
            <Grid item xs={12} md={4}>
              <RevenueChart data={revenueChart} />
            </Grid>
          </Box> */}
          <Box sx={{ width: "50%" }}>
            <Grid item xs={12} md={4}>
              <CartWidget data={cartWidget} />
            </Grid>
          </Box>

          <Box sx={{ width: "48%" }}>
            <Grid item xs={12} md={6}>
              <TopSession data={topSession} />
            </Grid>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Grid item xs={12} md={6}>
              <RecentTransactions data={recentTransactions} />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
