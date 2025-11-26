import React, { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    TextField,
    InputAdornment,
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
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from "../../components/Pagination.jsx";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { MOCK_SESSION_DATA as SESSIONS } from "../../data/mockSessionData.js";
import sessionStudents from "../../data/sessionStudents.js";

const SessionManagement = () => {

    // const sampleSessions = [
    //     { id: 's1', time: '07:00 15/10/25', tutor: 'Kiều Minh', place: 'H6-111', qty: 3 },
    //     { id: 's2', time: '10:00 15/10/25', tutor: 'Trần Píck Minh', place: 'H2-810', qty: 4 },
    //     { id: 's3', time: '15:00 15/10/25', tutor: 'Hồ Thị Minh Thu', place: 'H1-703', qty: 1 },
    //     { id: 's4', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
    //     { id: 's5', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
    //     { id: 's6', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
    //     { id: 's7', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
    // ];

    // normalize incoming mock data to the shape this component expects
    const normalizedSessions = SESSIONS.map((s, idx) => ({
        id: s.group ?? `s${idx + 1}`,
        time: [s.date, s.time].filter(Boolean).join(' '),
        tutor: s.teacher ?? s.tutor ?? '',
        place: s.room ?? s.place ?? '',
        qty: s.qty ?? (s.students ? s.students.length : 0),
        // keep original fields available too
        ...s,
    }));

    // keep sessions in state so edits/deletes update the UI immediately
    const [sessions, setSessions] = useState(normalizedSessions);
    const [selected, setSelected] = useState(sessions.map(s => s.id));
    // use 1-based page index to match Pagination component
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(sessions.length / pageSize));
    const start = (page - 1) * pageSize;
    const paged = sessions.slice(start, start + pageSize);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuRowId, setMenuRowId] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogSession, setDialogSession] = useState(null);

    // Edit dialog state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editSession, setEditSession] = useState(null);
    const [editForm, setEditForm] = useState({ building: '', room: '', from: '', to: '', confirm: true });

    // sessionStudents is imported from ../../data/sessionStudents.js

    const handleOpenDialog = (id) => {
        const s = sessions.find(x => x.id === id) || null;
        setDialogSession(s);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogSession(null);
    };

    const handleOpenMenu = (event, id) => {
        setMenuAnchorEl(event.currentTarget);
        setMenuRowId(id);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
        setMenuRowId(null);
    };

    const handleToggle = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const handleOpenEditDialog = (id) => {
        const s = sessions.find(x => x.id === id) || null;
        // parse existing time into from/to if possible
        let from = '';
        let to = '';
        if (s && s.time) {
            const t = String(s.time);
            if (t.includes(' - ')) {
                const parts = t.split(' - ');
                from = parts[0].trim();
                to = parts[1] ? parts[1].trim() : '';
            } else {
                // no range; put full time into "from" so user sees current time
                from = t;
                to = '';
            }
        }

        // parse place into building and room (e.g. "H6-111" -> building: H6, room: 111)
        let building = '';
        let room = '';
        if (s && s.place) {
            const p = String(s.place).trim();
            if (p.toLowerCase() === 'online') {
                building = 'Online';
                room = '';
            } else if (p.includes('-')) {
                const parts = p.split('-').map(x => x.trim());
                building = parts[0] || '';
                room = parts[1] || '';
            } else {
                // fallback: try split by space
                const parts = p.split(/\s+/);
                building = parts[0] || p;
                room = parts[1] || '';
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

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEditSession(null);
    };

    const handleEditChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmitEdit = () => {
        if (!editSession) return handleCloseEditDialog();

        const place = editForm.building
            ? (editForm.building === 'Online' ? 'Online' : `${editForm.building}${editForm.room ? `-${editForm.room}` : ''}`)
            : editSession.place;

        const updated = {
            ...editSession,
            place,
            time: (editForm.from || editForm.to) ? [editForm.from, editForm.to].filter(Boolean).join(' - ') : editSession.time,
        };

        setSessions(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditSession(updated);
        // if the dialog showing students is open for this session, refresh it
        if (dialogOpen && dialogSession?.id === updated.id) setDialogSession(updated);

        // ensure selected contains this id
        setSelected(prev => prev.includes(updated.id) ? prev : [...prev, updated.id]);

        handleCloseEditDialog();
    };

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteSession, setDeleteSession] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const handleOpenDelete = (id) => {
        const s = sessions.find(x => x.id === id) || null;
        setDeleteSession(s);
        setDeleteConfirm(false);
        setDeleteDialogOpen(true);
    };

    const handleCloseDelete = () => {
        setDeleteDialogOpen(false);
        setDeleteSession(null);
        setDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (!deleteSession) return handleCloseDelete();
        // mark session as canceled instead of removing it
        setSessions(prev => prev.map(s => s.id === deleteSession.id ? { ...s, state: 'cancel' } : s));
        // remove from selection if present
        setSelected(prev => prev.filter(id => id !== deleteSession.id));
        handleCloseDelete();
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) setSelected(sessions.map(s => s.id));
        else setSelected([]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <title>Session Management Page</title>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                    Quản lý buổi tư vấn
                </Typography>

                {/* <Box sx={{ ml: 'auto' }}>
                    <CustomButton sx={{ width: '5rem', height: '2.5rem', borderRadius: '11px', fontSize: '12px' }} icon={<AddIcon />}>
                        Thêm
                    </CustomButton>
                </Box> */}
            </Box>

            {/* session table */}
            <Box sx={{ mt: 2 }}>
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '2px solid #eef6f6', borderRadius: 1 }}>
                    <Table size="small" sx={{ '& td, & th': { borderBottom: '1px dotted #e6eef0' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox size="small" checked={selected.length === sessions.length} onChange={handleSelectAll} />
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
                            {paged.map(r => (
                                <TableRow key={r.id} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox size="small" checked={selected.includes(r.id)} onChange={() => handleToggle(r.id)} />
                                    </TableCell>
                                    <TableCell>{r.time}</TableCell>
                                    <TableCell>{r.tutor}</TableCell>
                                    <TableCell>{r.place}</TableCell>
                                    <TableCell>{r.qty}</TableCell>
                                    <TableCell>{r.state}    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, r.id)} aria-controls={menuRowId === r.id ? 'row-menu' : undefined} aria-haspopup="true">
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                        <Menu
                                            id={"row-menu"}
                                            anchorEl={menuAnchorEl}
                                            open={Boolean(menuAnchorEl) && menuRowId === r.id}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        >
                                            <MenuItem onClick={() => { handleOpenDialog(menuRowId); handleCloseMenu(); }}>Xem danh sách</MenuItem>
                                            <MenuItem onClick={() => { handleOpenEditDialog(menuRowId); handleCloseMenu(); }}>Sửa buổi đăng kí</MenuItem>
                                            <MenuItem onClick={() => { handleOpenDelete(menuRowId); handleCloseMenu(); }}>Hủy buổi đăng kí</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

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
                                    onPageChange={(newPage) => setPage(newPage)}
                                  />
                                </Box>
                </TableContainer>
            </Box>

            {/* Dialog: session students list */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 800 }}>
                    {dialogSession ? `Danh sách sinh viên tư vấn với Tutor ${dialogSession.tutor}` : 'Danh sách sinh viên'}
                </DialogTitle>

                <DialogContent dividers>
                    {dialogSession && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Thời gian: {dialogSession.time}</Typography>
                            <Typography variant="body2">Địa điểm : {dialogSession.place}</Typography>
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
                            {(dialogSession ? (sessionStudents[dialogSession.id] || []) : []).map((u, idx) => (
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

                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <CustomButton onClick={handleCloseDialog} sx={{ width: 220, height: 48, borderRadius: 6 }}>Xong</CustomButton>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog: edit session */}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 750 }}>
                {editSession ? `Chỉnh sửa buổi tư vấn với Tutor ${editSession.tutor}` : 'Chỉnh sửa buổi tư vấn'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="building-label">Tòa</InputLabel>
                                <Select
                                    labelId="building-label"
                                    value={editForm.building}
                                    label="Tòa"
                                    onChange={(e) => handleEditChange('building', e.target.value)}
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
                                <InputLabel id="room-label" shrink>Phòng</InputLabel>
                                <Select
                                    labelId="room-label"
                                    value={editForm.room}
                                    label="Phòng"
                                    onChange={(e) => handleEditChange('room', e.target.value)}
                                    displayEmpty
                                    disabled={editForm.building === 'Online'}
                                >
                                    <MenuItem value="">Chọn phòng</MenuItem>
                                    <MenuItem value="111">111</MenuItem>
                                    <MenuItem value="703">703</MenuItem>
                                    <MenuItem value="810">810</MenuItem>
                                    <MenuItem value="610">610</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Box sx={{ minWidth: 70 }}>Khung giờ</Box>
                            <TextField size="small" placeholder="Từ" value={editForm.from} onChange={(e) => handleEditChange('from', e.target.value)} sx={{ flex: 1 }} />
                            <Box sx={{ width: 40, textAlign: 'center' }}>Đến</Box>
                            <TextField size="small" placeholder="Đến" value={editForm.to} onChange={(e) => handleEditChange('to', e.target.value)} sx={{ flex: 1 }} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={<Checkbox checked={editForm.confirm} onChange={(e) => handleEditChange('confirm', e.target.checked)} />}
                                label="Xác nhận chỉnh sửa buổi tư vấn, thông báo sẽ gửi đến tutor và sinh viên"
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <CustomButton onClick={handleSubmitEdit} sx={{ width: 140, height: 44, borderRadius: 6, mr: 2 }}>Xác nhận</CustomButton>
                    <Button onClick={handleCloseEditDialog} sx={{ width: 140, height: 44, borderRadius: 6, bgcolor: '#c62828', color: '#fff', '&:hover': { bgcolor: '#b71c1c' } }}>Hủy</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleCloseDelete} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 800 }}>
                    {deleteSession ? `Hủy buổi tư vấn với Tutor ${deleteSession.tutor}` : 'Hủy buổi tư vấn'}
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox checked={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.checked)} />}
                            label="Xác nhận hủy buổi tư vấn, thông báo sẽ gửi đến tutor và sinh viên"
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <CustomButton onClick={handleConfirmDelete} disabled={!deleteConfirm} sx={{ width: 140, height: 44, borderRadius: 6, mr: 2 }}>Xác nhận</CustomButton>
                    <Button onClick={handleCloseDelete} sx={{ width: 140, height: 44, borderRadius: 6, bgcolor: '#c62828', color: '#fff', '&:hover': { bgcolor: '#b71c1c' } }}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SessionManagement;

