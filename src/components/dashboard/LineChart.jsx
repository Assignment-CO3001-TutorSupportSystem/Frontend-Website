import { LineChart } from "@mui/x-charts/LineChart";

export default function DashboardLineChart({ data }) {
  return (
    <LineChart
      xAxis={[{ data: data.map((d) => d.month), label: "Tháng" }]}
      series={[
        { data: data.map((d) => d.users), label: "Người dùng" },
        { data: data.map((d) => d.documents), label: "Tài liệu" },
      ]}
      width={900}
      height={350}
    />
  );
}
