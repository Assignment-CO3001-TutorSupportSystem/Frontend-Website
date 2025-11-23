import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext"; //

const useMockCrud = (initialData, storageKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // 1. Load dữ liệu khi vào trang
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData(initialData);
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
      setLoading(false);
    }, 800); // Giả lập mạng chậm 0.8s
  }, [initialData, storageKey]);

  // Hàm lưu xuống LocalStorage
  const syncToStorage = (newData) => {
    setData(newData);
    localStorage.setItem(storageKey, JSON.stringify(newData));
  };

  // 2. Thêm mới
  const addItem = (item) => {
    setLoading(true);
    setTimeout(() => {
      const maxId =
        data.length > 0
          ? Math.max(...data.map((student) => Number(student.id)))
          : 0;
      const newItem = { ...item, id: maxId + 1 };
      const newData = [newItem, ...data]; // Hoặc [...data, newItem] nếu muốn thêm xuống dưới
      syncToStorage(newData);
      setLoading(false);
      showToast("Thêm mới thành công!", "success");
    }, 500);
  };

  // 3. Xóa
  const deleteItem = (id) => {
    // if (!window.confirm("Xác nhận xóa?")) return; // Bỏ comment nếu muốn hỏi lại
    setLoading(true);
    setTimeout(() => {
      const newData = data.filter((x) => x.id !== id);
      syncToStorage(newData);
      setLoading(false);
      showToast("Đã xóa mục đã chọn", "warning");
    }, 500);
  };

  // 4. Cập nhật
  const updateItem = (id, updatedFields) => {
    setLoading(true);
    setTimeout(() => {
      const newData = data.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );
      syncToStorage(newData);
      setLoading(false);
      showToast("Cập nhật thành công!", "success");
    }, 500);
  };

  // 5. Reset dữ liệu gốc
  const resetData = () => {
    localStorage.removeItem(storageKey);
    setData(initialData);
    showToast("Đã khôi phục dữ liệu gốc", "info");
    setTimeout(() => window.location.reload(), 500); // Reload lại trang
  };

  return { data, loading, addItem, deleteItem, updateItem, resetData };
};

export default useMockCrud;
