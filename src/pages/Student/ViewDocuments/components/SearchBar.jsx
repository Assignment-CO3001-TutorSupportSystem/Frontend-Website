import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch, onClickShowFilter }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      if (!keyword) {
        alert(
          "Vui lòng nhập từ khóa để tìm kiếm theo tên tài liệu hoặc tác giả"
        );
      }
      onSearch(keyword);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Button
        variant="contained"
        startIcon={<FilterListRoundedIcon />}
        sx={{
          backgroundColor: "#0B3954",
          textTransform: "none",
          borderRadius: "12px",
          px: 3,
        }}
        onClick={onClickShowFilter}
      >
        Lọc
      </Button>

      <TextField
        fullWidth
        placeholder="Tìm kiếm"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        InputProps={{
          sx: {
            borderRadius: "12px",
            backgroundColor: "white",
            px: 1.5,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ background: "#052B52", color: "white", p: 1.2 }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
