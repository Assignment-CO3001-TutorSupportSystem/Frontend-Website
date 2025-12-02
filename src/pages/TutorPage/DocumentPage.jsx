import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
  Collapse,
  MenuItem,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import Button from "../../components/Button.jsx";
import Searchbar from "../../components/Searchbar.jsx";

import { DOCUMENT_FIELDS } from "../../data/DocumentData.js";
import { useDocumentPage } from "../../hooks/useDocumentPage.js";

export default function DocumentPage() {
  // Lay du lieu va cac ham xu ly tu Hook
  const {
    search,
    page,
    totalPages,
    showFilter,
    fieldFilter,
    paginated,
    toggleFilter,
    handleSearchChange,
    handleFieldChange,
    handleNext,
    handlePrev,
    handleRowClick,
  } = useDocumentPage();

  return (
    <Box sx={{ bgcolor: "#e7f0f4", p: 3, borderRadius: 3 }}>
      {/* Tieu de trang */}
      {/* <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Quản lý tài liệu
      </Typography> */}

      {/* Khung noi dung chinh */}
      <Box
        sx={{
          bgcolor: "#e7f0f4",
          p: 1,
          borderRadius: 3,
          mb: 3,
        }}
      >
        {/* Khu vuc Tim kiem va Nut Loc */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          {/* O tim kiem */}
          <Box sx={{ flex: 1 }}>
            <Searchbar
              placeholder="Tìm kiếm tài liệu..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 999, bgcolor: "white", px: 1 },
              }}
            />
          </Box>

          {/* Nut mo/dong bo loc */}
          <Button
            variant="contained"
            onClick={toggleFilter}
            startIcon={
              <FilterListIcon
                sx={{
                  fontSize: 20,
                  stroke: "white",
                  strokeWidth: 0.5,
                }}
              />
            }
            sx={{
              backgroundColor: "#002554",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 500,
              paddingX: 3,
              paddingY: 1.2,
              borderRadius: "10px",
              boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#085f61",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
              },
            }}
          >
            Lọc
          </Button>
        </Box>

        {/* Panel chua cac tuy chon loc */}
        <Collapse in={showFilter}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              mb: 1,
              bgcolor: "#eef5f8",
              borderRadius: 3,
            }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Lọc theo lĩnh vực
            </Typography>

            <TextField
              select
              fullWidth
              value={fieldFilter}
              onChange={handleFieldChange}
              size="small"
            >
              <MenuItem value="">Tất cả</MenuItem>

              {DOCUMENT_FIELDS.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </Collapse>

        {/* Bang danh sach tai lieu */}
        <Paper
          elevation={0}
          sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#f5f8fb" }}
        >
          {/* Header cua bang */}
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Danh sách tài liệu
            </Typography>
          </Box>

          {/* Noi dung bang */}
          <Box sx={{ px: 3, py: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: "55%" }}>
                    Tên tài liệu
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "25%" }}>
                    Tác giả
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "20%" }}>
                    Lĩnh vực
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginated.map((doc) => (
                  <TableRow
                    key={doc.id}
                    hover
                    onClick={() => handleRowClick(doc.id)}
                  >
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.author}</TableCell>
                    <TableCell>{doc.field}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Footer phan trang */}
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

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="secondary"
                width={100}
                height={36}
                disabled={page === 1}
                onClick={handlePrev}
              >
                Previous
              </Button>

              <Button
                variant="secondary"
                width={100}
                height={36}
                disabled={page === totalPages}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
