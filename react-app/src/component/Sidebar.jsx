import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, ClipboardList, Calendar, Settings, Menu } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: <Home size={22} />, label: "Trang chủ" },
    { icon: <User size={22} />, label: "Quản lý buổi tư vấn" },
    { icon: <ClipboardList size={22} />, label: "Quản lý tutor/ sinh viên" },
    { icon: <Calendar size={22} />, label: "Lịch" },
    { icon: <Settings size={22} />, label: "Cài đặt" },
  ];

  return (
    <div className="flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 left-5 z-20 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <Menu size={20} />
      </button>

      <motion.div
        animate={{ width: isOpen ? 250 : 80 }}
        className="bg-[#001b3a] text-white h-screen p-4 flex flex-col items-center rounded-r-3xl shadow-lg"
      >
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="mb-6 mt-10 text-center"
        >
          {isOpen && (
            <div className="p-3 rounded-xl bg-blue-900 inline-block">
              <img
                src="https://i.pravatar.cc/50"
                alt="avatar"
                className="rounded-full mx-auto mb-2"
              />
              <p className="font-semibold">Anh Minh</p>
              <p className="text-sm text-gray-300">A0001</p>
            </div>
          )}
        </motion.div>

        <ul className="flex flex-col gap-3 w-full mt-4">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-4 py-3 bg-blue-800 hover:bg-blue-700 rounded-xl cursor-pointer transition"
            >
              {item.icon}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="flex-1 p-10 text-gray-700">
        <h1 className="text-2xl font-bold">Nội dung chính ở đây</h1>
      </div>
    </div>
  );
}
