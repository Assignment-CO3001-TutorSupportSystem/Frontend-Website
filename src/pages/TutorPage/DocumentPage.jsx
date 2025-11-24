import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { DOCUMENTS } from "../../data/DocumentData.js";
import { DOCUMENT_FIELDS } from "../../data/DocumentData.js";
const ITEMS_PER_PAGE = 9;

export default function DocumentPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // FILTER
  const [showFilter, setShowFilter] = useState(false);
  const [fieldFilter, setFieldFilter] = useState("");

  const toggleFilter = () => setShowFilter((prev) => !prev);

  // Lọc dữ liệu
  const filtered = DOCUMENTS.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchField = fieldFilter ? doc.field === fieldFilter : true;
    return matchSearch && matchField;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handlePrev = () => setPage((p) => Math.max(1, p - 1));

  return (
    <Box sx={{ bgcolor: "#e7f0f4", p: 3, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Quản lý tài liệu
      </Typography>

      {/* Khung tổng */}
      <Box
        sx={{
          bgcolor: "#dfecef",
          p: 1,
          borderRadius: 3,
          mb: 3,
        }}
      >
        {/* SEARCH + FILTER */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Searchbar
              placeholder="Tìm kiếm tài liệu..."
              value={search}
              onChange={(e) => {
                if (e?.target) setSearch(e.target.value);
                else setSearch(e);
                setPage(1);
              }}
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

          {/* NÚT FILTER */}
          {
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
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Lọc
            </Button>
          }
        </Box>

        {/* FILTER PANEL (COLLAPSE) */}
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
              label="Lọc theo lĩnh vực"
              value={fieldFilter}
              onChange={(e) => {
                setFieldFilter(e.target.value);
                setPage(1);
              }}
              size="small"
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  },
                },
              }}
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

        {/* TABLE */}
        <Paper
          elevation={0}
          sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "#f5f8fb" }}
        >
          <Box sx={{ bgcolor: "#002554", color: "white", px: 3, py: 1.5 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
              Danh sách tài liệu
            </Typography>
          </Box>

          <Box sx={{ px: 3, py: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      width: "55%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tên tài liệu
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                      width: "25%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Tác giả
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                      width: "20%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Lĩnh vực
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginated.map((doc) => (
                  <TableRow
                    key={doc.id}
                    hover
                    onClick={() => navigate(`/documents/${doc.id}`)}
                  >
                    <TableCell sx={{ width: "55%" }}>{doc.title}</TableCell>
                    <TableCell sx={{ width: "25%" }}>{doc.author}</TableCell>
                    <TableCell sx={{ width: "20%" }}>{doc.field}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* PAGINATION */}
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
