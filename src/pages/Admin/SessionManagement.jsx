import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Checkbox,
} from "@mui/material";
import CustomButton from "../../components/Button.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "../../components/Pagination.jsx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useSessionManagement } from "../../hooks/useSessionManagement.js";

const SessionManagement = () => {
  // Lấy dữ liệu và các hàm xử lý từ hook
  const {
    sessions,
    pagedSessions,
    selected,
    page,
    totalPages,
    menuAnchorEl,
    menuRowId,
    dialogOpen,
    dialogSession,
    currentSessionStudents,
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
  } = useSessionManagement();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <title>Session Management Page</title>
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          Quản lý buổi tư vấn
        </Typography>
      </Box>

      {/* Bảng danh sách buổi tư vấn */}
      <Box sx={{ mt: 2 }}>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            border: "2px solid #eef6f6",
            borderRadius: 1,
          }}
        >
          <Table
            size="small"
            sx={{ "& td, & th": { borderBottom: "1px dotted #e6eef0" } }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={
                      sessions.length > 0 && selected.length === sessions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thời gian</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tutor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thời điểm</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Số lượng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {pagedSessions.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size="small"
                      checked={selected.includes(r.id)}
                      onChange={() => handleToggle(r.id)}
                    />
                  </TableCell>
                  <TableCell>{r.time}</TableCell>
                  <TableCell>{r.tutor}</TableCell>
                  <TableCell>{r.place}</TableCell>
                  <TableCell>{r.qty}</TableCell>
                  <TableCell>{r.state} </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleOpenMenu(e, r.id)}
                      aria-controls={
                        menuRowId === r.id ? "row-menu" : undefined
                      }
                      aria-haspopup="true"
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      id={"row-menu"}
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl) && menuRowId === r.id}
                      onClose={handleCloseMenu}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleOpenDialog(menuRowId);
                          handleCloseMenu();
                        }}
                      >
                        Xem danh sách
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleOpenEditDialog(menuRowId);
                          handleCloseMenu();
                        }}
                      >
                        Sửa buổi đăng kí
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleOpenDelete(menuRowId);
                          handleCloseMenu();
                        }}
                      >
                        Hủy buổi đăng kí
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Phân trang */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#607189" }}>
              Trang {page}/{totalPages}
            </Typography>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </TableContainer>
      </Box>

      {/* Dialog: Danh sách sinh viên */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 800 }}>
          {dialogSession
            ? `Danh sách sinh viên tư vấn với Tutor ${dialogSession.tutor}`
            : "Danh sách sinh viên"}
        </DialogTitle>

        <DialogContent dividers>
          {dialogSession && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">
                Thời gian: {dialogSession.time}
              </Typography>
              <Typography variant="body2">
                Địa điểm : {dialogSession.place}
              </Typography>
            </Box>
          )}

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ tên sinh viên</TableCell>
                <TableCell>Khoa</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSessionStudents.map((u, idx) => (
                <TableRow key={u.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.dept}</TableCell>
                  <TableCell>
                    <Avatar src="/avatar.png" sx={{ width: 32, height: 32 }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <CustomButton
            onClick={handleCloseDialog}
            sx={{ width: 220, height: 48, borderRadius: 6 }}
          >
            Xong
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Dialog: Chỉnh sửa buổi học */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 750 }}>
          {editSession
            ? `Chỉnh sửa buổi tư vấn với Tutor ${editSession.tutor}`
            : "Chỉnh sửa buổi tư vấn"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="building-label">Tòa</InputLabel>
                <Select
                  labelId="building-label"
                  value={editForm.building}
                  label="Tòa"
                  onChange={(e) => handleEditChange("building", e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">Chọn tòa</MenuItem>
                  <MenuItem value="H1">H1</MenuItem>
                  <MenuItem value="H2">H2</MenuItem>
                  <MenuItem value="H6">H6</MenuItem>
                  <MenuItem value="Online">Online</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel id="room-label" shrink>
                  Phòng
                </InputLabel>
                <Select
                  labelId="room-label"
                  value={editForm.room}
                  label="Phòng"
                  onChange={(e) => handleEditChange("room", e.target.value)}
                  displayEmpty
                  disabled={editForm.building === "Online"}
                >
                  <MenuItem value="">Chọn phòng</MenuItem>
                  <MenuItem value="111">111</MenuItem>
                  <MenuItem value="703">703</MenuItem>
                  <MenuItem value="810">810</MenuItem>
                  <MenuItem value="610">610</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box sx={{ minWidth: 70 }}>Khung giờ</Box>
              <TextField
                size="small"
                placeholder="Từ"
                value={editForm.from}
                onChange={(e) => handleEditChange("from", e.target.value)}
                sx={{ flex: 1 }}
              />
              <Box sx={{ width: 40, textAlign: "center" }}>Đến</Box>
              <TextField
                size="small"
                placeholder="Đến"
                value={editForm.to}
                onChange={(e) => handleEditChange("to", e.target.value)}
                sx={{ flex: 1 }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editForm.confirm}
                    onChange={(e) =>
                      handleEditChange("confirm", e.target.checked)
                    }
                  />
                }
                label="Xác nhận chỉnh sửa buổi tư vấn, thông báo sẽ gửi đến tutor và sinh viên"
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <CustomButton
            onClick={handleSubmitEdit}
            sx={{ width: 140, height: 44, borderRadius: 6, mr: 2 }}
          >
            Xác nhận
          </CustomButton>
          <Button
            onClick={handleCloseEditDialog}
            sx={{
              width: 140,
              height: 44,
              borderRadius: 6,
              bgcolor: "#c62828",
              color: "#fff",
              "&:hover": { bgcolor: "#b71c1c" },
            }}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Xác nhận hủy/xóa */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 800 }}>
          {deleteSession
            ? `Hủy buổi tư vấn với Tutor ${deleteSession.tutor}`
            : "Hủy buổi tư vấn"}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteConfirm}
                  onChange={(e) => handleDeleteConfirmChange(e.target.checked)}
                />
              }
              label="Xác nhận hủy buổi tư vấn, thông báo sẽ gửi đến tutor và sinh viên"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <CustomButton
            onClick={handleConfirmDelete}
            disabled={!deleteConfirm}
            sx={{ width: 140, height: 44, borderRadius: 6, mr: 2 }}
          >
            Xác nhận
          </CustomButton>
          <Button
            onClick={handleCloseDelete}
            sx={{
              width: 140,
              height: 44,
              borderRadius: 6,
              bgcolor: "#c62828",
              color: "#fff",
              "&:hover": { bgcolor: "#b71c1c" },
            }}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SessionManagement;
