// src/components/RegisterButton.jsx
import React from "react";
import { Button } from "@mui/material";

const RegisterButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#3D8C40",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#357634" },
      }}
    >
      Đăng ký
    </Button>
  );
};

export default RegisterButton;
