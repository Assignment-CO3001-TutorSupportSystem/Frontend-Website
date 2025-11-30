import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button.jsx";


const Management = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                    Quản lý tutor/sinh viên
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="column" alignItems="center" spacing={4}>
                    <CustomButton onClick={() => navigate('/tutorManagement')} sx={{ width: '15rem', height: '5rem', borderRadius: '15px', fontSize: '22px' }}>Quản lý Tutor</CustomButton>
                    <CustomButton onClick={() => navigate('/studentManagement')} sx={{ width: '15rem', height: '5rem', borderRadius: '15px', fontSize: '22px' }}>Quản lý Sinh viên</CustomButton>
                </Stack>
            </Box>
        </Box>
    );
};

export default Management;