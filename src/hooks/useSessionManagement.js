import { useState } from "react";
import { MOCK_SESSION_DATA as SESSIONS } from "../data/mockSessionData.js";
import sessionStudents from "../data/sessionStudents.js";

export const useSessionManagement = () => {
  // Chuẩn hóa dữ liệu đầu vào để phù hợp với cấu trúc component
  const normalizedSessions = SESSIONS.map((s, idx) => ({
    id: s.group ?? `s${idx + 1}`,
    time: [s.date, s.time].filter(Boolean).join(" "),
    tutor: s.teacher ?? s.tutor ?? "",
    place: s.room ?? s.place ?? "",
    qty: s.qty ?? (s.students ? s.students.length : 0),
    ...s,
  }));

  // --- Khai báo State ---

  // Quản lý danh sách các buổi học
  const [sessions, setSessions] = useState(normalizedSessions);

  // Quản lý danh sách ID các hàng đang được chọn (checkbox)
  const [selected, setSelected] = useState(sessions.map((s) => s.id));

  // Quản lý trang hiện tại của bảng
  const [page, setPage] = useState(1);

  // Quản lý trạng thái menu ngữ cảnh (dấu 3 chấm)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  // Quản lý dialog xem chi tiết
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSession, setDialogSession] = useState(null);

  // Quản lý dialog chỉnh sửa
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editSession, setEditSession] = useState(null);
  const [editForm, setEditForm] = useState({
    building: "",
    room: "",
    from: "",
    to: "",
    confirm: true,
  });

  // Quản lý dialog xóa/hủy
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSession, setDeleteSession] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // --- Logic Phân trang (Pagination) ---
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(sessions.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagedSessions = sessions.slice(start, start + pageSize);

  // --- Logic Dữ liệu phụ trợ ---
  // Lấy danh sách sinh viên tương ứng cho dialog xem chi tiết
  const currentSessionStudents = dialogSession
    ? sessionStudents[dialogSession.id] || []
    : [];

  // --- Các hàm xử lý sự kiện (Handlers) ---

  // Mở dialog xem chi tiết danh sách sinh viên
  const handleOpenDialog = (id) => {
    const s = sessions.find((x) => x.id === id) || null;
    setDialogSession(s);
    setDialogOpen(true);
  };

  // Đóng dialog xem chi tiết
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogSession(null);
  };

  // Mở menu ngữ cảnh tại dòng cụ thể
  const handleOpenMenu = (event, id) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuRowId(id);
  };

  // Đóng menu ngữ cảnh
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setMenuRowId(null);
  };

  // Thay đổi trang hiển thị
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Xử lý chọn/bỏ chọn một dòng (checkbox)
  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Xử lý chọn/bỏ chọn tất cả các dòng
  const handleSelectAll = (e) => {
    if (e.target.checked) setSelected(sessions.map((s) => s.id));
    else setSelected([]);
  };

  // Mở dialog chỉnh sửa và phân tích dữ liệu (time/place) vào form
  const handleOpenEditDialog = (id) => {
    const s = sessions.find((x) => x.id === id) || null;

    // Phân tích chuỗi thời gian thành từ/đến
    let from = "";
    let to = "";
    if (s && s.time) {
      const t = String(s.time);
      if (t.includes(" - ")) {
        const parts = t.split(" - ");
        from = parts[0].trim();
        to = parts[1] ? parts[1].trim() : "";
      } else {
        from = t;
        to = "";
      }
    }

    // Phân tích địa điểm thành tòa/phòng
    let building = "";
    let room = "";
    if (s && s.place) {
      const p = String(s.place).trim();
      if (p.toLowerCase() === "online") {
        building = "Online";
        room = "";
      } else if (p.includes("-")) {
        const parts = p.split("-").map((x) => x.trim());
        building = parts[0] || "";
        room = parts[1] || "";
      } else {
        const parts = p.split(/\s+/);
        building = parts[0] || p;
        room = parts[1] || "";
      }
    }

    setEditSession(s);
    setEditForm({
      building,
      room,
      from,
      to,
      confirm: true,
    });
    setEditDialogOpen(true);
  };

  // Đóng dialog chỉnh sửa
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditSession(null);
  };

  // Cập nhật giá trị form chỉnh sửa
  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Xác nhận lưu thay đổi sau khi sửa
  const handleSubmitEdit = () => {
    if (!editSession) return handleCloseEditDialog();

    // Ghép lại chuỗi địa điểm
    const place = editForm.building
      ? editForm.building === "Online"
        ? "Online"
        : `${editForm.building}${editForm.room ? `-${editForm.room}` : ""}`
      : editSession.place;

    // Ghép lại chuỗi thời gian
    const updated = {
      ...editSession,
      place,
      time:
        editForm.from || editForm.to
          ? [editForm.from, editForm.to].filter(Boolean).join(" - ")
          : editSession.time,
    };

    setSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditSession(updated);

    // Cập nhật lại dialog chi tiết nếu đang mở đúng session này
    if (dialogOpen && dialogSession?.id === updated.id) {
      setDialogSession(updated);
    }

    // Đảm bảo ID vẫn nằm trong danh sách selected
    setSelected((prev) =>
      prev.includes(updated.id) ? prev : [...prev, updated.id]
    );

    handleCloseEditDialog();
  };

  // Mở dialog xác nhận xóa/hủy
  const handleOpenDelete = (id) => {
    const s = sessions.find((x) => x.id === id) || null;
    setDeleteSession(s);
    setDeleteConfirm(false);
    setDeleteDialogOpen(true);
  };

  // Đóng dialog xóa
  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteSession(null);
    setDeleteConfirm(false);
  };

  // Xác nhận hành động xóa (chuyển trạng thái sang cancel)
  const handleConfirmDelete = () => {
    if (!deleteSession) return handleCloseDelete();

    setSessions((prev) =>
      prev.map((s) =>
        s.id === deleteSession.id ? { ...s, state: "cancel" } : s
      )
    );

    // Bỏ chọn dòng này nếu đang được chọn
    setSelected((prev) => prev.filter((id) => id !== deleteSession.id));
    handleCloseDelete();
  };

  // Cập nhật checkbox xác nhận xóa
  const handleDeleteConfirmChange = (checked) => {
    setDeleteConfirm(checked);
  };

  return {
    sessions,
    pagedSessions,
    selected,
    page,
    totalPages,
    menuAnchorEl,
    menuRowId,
    dialogOpen,
    dialogSession,
    currentSessionStudents, // Dữ liệu sinh viên của session đang xem
    editDialogOpen,
    editSession,
    editForm,
    deleteDialogOpen,
    deleteSession,
    deleteConfirm,

    handlePageChange,
    handleToggle,
    handleSelectAll,
    handleOpenMenu,
    handleCloseMenu,
    handleOpenDialog,
    handleCloseDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditChange,
    handleSubmitEdit,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,
    handleDeleteConfirmChange,
  };
};
