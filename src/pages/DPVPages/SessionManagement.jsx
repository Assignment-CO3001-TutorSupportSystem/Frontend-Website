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

const SessionManagement = () => {

    const sampleSessions = [
        { id: 's1', time: '07:00 15/10/25', tutor: 'Kiều Minh', place: 'H6-111', qty: 3 },
        { id: 's2', time: '10:00 15/10/25', tutor: 'Trần Píck Minh', place: 'H2-810', qty: 4 },
        { id: 's3', time: '15:00 15/10/25', tutor: 'Hồ Thị Minh Thu', place: 'H1-703', qty: 1 },
        { id: 's4', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
        { id: 's5', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
        { id: 's6', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
        { id: 's7', time: '15:30 15/10/25', tutor: 'Frieren', place: 'Online', qty: 2 },
    ];

    const [selected, setSelected] = useState(sampleSessions.map(s => s.id));
    const [page, setPage] = useState(0);
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(sampleSessions.length / pageSize));
    const paged = sampleSessions.slice(page * pageSize, (page + 1) * pageSize);

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [menuRowId, setMenuRowId] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogSession, setDialogSession] = useState(null);

    // Edit dialog state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editSession, setEditSession] = useState(null);
    const [editForm, setEditForm] = useState({ location: '', from: '', to: '', confirm: true });

    // sample students per session (demo data)
    const sessionStudents = {
        s1: [
            { id: 'u1', name: 'Kiều Minh', dept: 'MT' },
            { id: 'u2', name: 'Minh', dept: 'MT' },
            { id: 'u3', name: 'Hồ Thị Minh Thu', dept: 'MT' },
            { id: 'u4', name: 'Nguyễn Tiểu Anh', dept: 'MT' },
        ],
        s2: [
            { id: 'u5', name: 'Student A', dept: 'KT' },
            { id: 'u6', name: 'Student B', dept: 'KT' },
        ],
    };

    const handleOpenDialog = (id) => {
        const s = sampleSessions.find(x => x.id === id) || null;
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
        const s = sampleSessions.find(x => x.id === id) || null;
        setEditSession(s);
        setEditForm({
            location: s ? s.place : '',
            from: '',
            to: '',
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
        console.log('Submit edit', editSession?.id, editForm);
        // TODO: call API to save changes
        handleCloseEditDialog();
    };

    // Delete dialog state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteSession, setDeleteSession] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const handleOpenDelete = (id) => {
        const s = sampleSessions.find(x => x.id === id) || null;
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
        console.log('Confirmed delete', deleteSession?.id);
        // TODO: call API to delete session and refresh list
        handleCloseDelete();
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) setSelected(sampleSessions.map(s => s.id));
        else setSelected([]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <title>Session Management Page</title>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                    Quản lý buổi tư vấn
                </Typography>

                <Box sx={{ ml: 'auto' }}>
                    <CustomButton sx={{ width: '5rem', height: '2.5rem', borderRadius: '11px', fontSize: '12px' }} icon={<AddIcon />}>
                        Thêm
                    </CustomButton>
                </Box>
            </Box>

            {/* session table */}
            <Box sx={{ mt: 2 }}>
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '2px solid #eef6f6', borderRadius: 1 }}>
                    <Table size="small" sx={{ '& td, & th': { borderBottom: '1px dotted #e6eef0' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox size="small" checked={selected.length === sampleSessions.length} onChange={handleSelectAll} />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Thời gian</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Tutor</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Thời điểm</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Số lượng</TableCell>
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

                    <Box sx={{ px: 2, py: 1 }}>
                        <Pagination
                            onPrevious={() => setPage(p => Math.max(0, p - 1))}
                            onNext={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disablePrevious={page === 0}
                            disableNext={page >= totalPages - 1}
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
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel id="location-label">Địa điểm</InputLabel>
                            <Select
                                labelId="location-label"
                                value={editForm.location}
                                label="Địa điểm"
                                onChange={(e) => handleEditChange('location', e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">Chọn địa điểm</MenuItem>
                                <MenuItem value="H6-111">H6 - 111</MenuItem>
                                <MenuItem value="H2-810">H2 - 810</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </Select>
                        </FormControl>

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

