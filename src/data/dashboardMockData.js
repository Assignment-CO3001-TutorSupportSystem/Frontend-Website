import TopSession from "../components/dashboard/TopSession";

// src/data/dashboardMockData.js
export const DASHBOARD_DATA = {
  overview: [
    {
      id: "revenue",
      title: "Tổng số sinh viên",
      value: "957",
    },
    { id: "profit", title: "Tổng số giảng viên", value: "30" },
    { id: "orders", title: "Tổng số phiên học", value: "50" },
  ],

  revenueChart: [
    { day: 17, value: 1200 },
    { day: 18, value: 4200 },
    { day: 19, value: 3000 },
    { day: 20, value: 3500 },
    { day: 21, value: 2800 },
    { day: 22, value: 3200 },
    { day: 23, value: 3900 },
    { day: 24, value: 8500 },
    { day: 25, value: 4200 },
    { day: 26, value: 3600 },
    { day: 27, value: 4000 },
    { day: 28, value: 4500 },
  ],

  cartWidget: {
    percent: 78,
    items: "957 Sinh viên",
    revenue: "tích cực",
  },
  recentTransactions: [
    {
      id: "5412390",
      name: "Nguyễn Văn A",
      datetime: "08:12 03.01.2024",
      amount: "4",
    },
    {
      id: "5412391",
      name: "Trần Thị B",
      datetime: "11:45 14.02.2024",
      amount: "6",
    },
    {
      id: "5412392",
      name: "Lê Văn C",
      datetime: "16:20 27.03.2024",
      amount: "3",
    },
    {
      id: "5412393",
      name: "Phạm Thị D",
      datetime: "09:58 05.04.2024",
      amount: "8",
    },
    {
      id: "5412394",
      name: "Đỗ Văn E",
      datetime: "18:33 19.05.2024",
      amount: "2",
    },

    {
      id: "5412395",
      name: "Bùi Thị F",
      datetime: "07:41 22.06.2024",
      amount: "5",
    },
    {
      id: "5412396",
      name: "Hồ Văn G",
      datetime: "14:55 03.07.2024",
      amount: "7",
    },
    {
      id: "5412397",
      name: "Võ Thị H",
      datetime: "19:28 15.07.2024",
      amount: "9",
    },
    {
      id: "5412398",
      name: "Ngô Văn I",
      datetime: "12:37 29.07.2024",
      amount: "1",
    },
    {
      id: "5412399",
      name: "Phan Thị K",
      datetime: "10:11 02.08.2024",
      amount: "4",
    },

    {
      id: "5412400",
      name: "Tạ Văn L",
      datetime: "21:44 17.08.2024",
      amount: "6",
    },
    {
      id: "5412401",
      name: "Lương Thị M",
      datetime: "06:59 25.08.2024",
      amount: "2",
    },
    {
      id: "5412402",
      name: "Trịnh Văn N",
      datetime: "15:16 01.09.2024",
      amount: "8",
    },
    {
      id: "5412403",
      name: "Phùng Thị O",
      datetime: "09:22 11.09.2024",
      amount: "5",
    },
    {
      id: "5412404",
      name: "Tô Văn P",
      datetime: "20:10 23.09.2024",
      amount: "3",
    },

    {
      id: "5412405",
      name: "Nguyễn Thị Q",
      datetime: "13:04 04.10.2024",
      amount: "7",
    },
    {
      id: "5412406",
      name: "Trần Văn R",
      datetime: "17:58 19.10.2024",
      amount: "6",
    },
    {
      id: "5412407",
      name: "Lê Thị S",
      datetime: "08:49 28.10.2024",
      amount: "4",
    },
    {
      id: "5412408",
      name: "Phạm Văn T",
      datetime: "22:31 06.11.2024",
      amount: "9",
    },
    {
      id: "5412409",
      name: "Đỗ Thị U",
      datetime: "05:43 18.11.2024",
      amount: "1",
    },

    {
      id: "5412410",
      name: "Bùi Văn V",
      datetime: "16:20 29.11.2024",
      amount: "3",
    },
    {
      id: "5412411",
      name: "Hồ Thị X",
      datetime: "11:37 07.12.2024",
      amount: "8",
    },
    {
      id: "5412412",
      name: "Võ Văn Y",
      datetime: "19:12 18.12.2024",
      amount: "2",
    },
    {
      id: "5412413",
      name: "Ngô Thị Z",
      datetime: "07:25 30.12.2024",
      amount: "7",
    },
    {
      id: "5412414",
      name: "Phan Văn AA",
      datetime: "12:44 08.01.2025",
      amount: "5",
    },

    {
      id: "5412415",
      name: "Tạ Thị AB",
      datetime: "09:03 19.01.2025",
      amount: "4",
    },
    {
      id: "5412416",
      name: "Lương Văn AC",
      datetime: "15:52 27.01.2025",
      amount: "9",
    },
    {
      id: "5412417",
      name: "Trịnh Thị AD",
      datetime: "18:39 03.02.2025",
      amount: "6",
    },
    {
      id: "5412418",
      name: "Phùng Văn AE",
      datetime: "10:28 14.02.2025",
      amount: "8",
    },
    {
      id: "5412419",
      name: "Tô Thị AF",
      datetime: "22:17 20.02.2025",
      amount: "1",
    },

    {
      id: "5412420",
      name: "Nguyễn Văn AG",
      datetime: "06:49 03.03.2025",
      amount: "7",
    },
    {
      id: "5412421",
      name: "Trần Thị AH",
      datetime: "14:12 12.03.2025",
      amount: "5",
    },
    {
      id: "5412422",
      name: "Lê Văn AI",
      datetime: "17:21 25.03.2025",
      amount: "3",
    },
    {
      id: "5412423",
      name: "Phạm Thị AJ",
      datetime: "09:46 05.04.2025",
      amount: "6",
    },
    {
      id: "5412424",
      name: "Đỗ Văn AK",
      datetime: "20:58 17.04.2025",
      amount: "4",
    },
  ],

  topSession: [
    { name: "Machine Learning", points: "395 lượt đăng ký" },
    { name: "Game Programming", points: "297 lượt đăng ký" },
    { name: "Big Data", points: "256 lượt đăng ký" },
  ],
};
