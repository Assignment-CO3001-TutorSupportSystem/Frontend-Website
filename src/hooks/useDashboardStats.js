// src/hooks/useDashboardStats.js
import { useEffect, useState } from "react";
import { DASHBOARD_DATA } from "../data/dashboardMockData";

export default function useDashboardStats() {
  const [overview, setOverview] = useState([]);
  const [revenueChart, setRevenueChart] = useState([]);
  const [cartWidget, setCartWidget] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [topSession, setTopSession] = useState([]);

  useEffect(() => {
    // giả lập fetch
    const t = setTimeout(() => {
      setOverview(DASHBOARD_DATA.overview);
      setRevenueChart(DASHBOARD_DATA.revenueChart);
      setCartWidget(DASHBOARD_DATA.cartWidget);
      setRecentTransactions(DASHBOARD_DATA.recentTransactions);
      setTopSession(DASHBOARD_DATA.topSession);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return {
    overview,
    revenueChart,
    cartWidget,
    recentTransactions,
    topSession,
  };
}
