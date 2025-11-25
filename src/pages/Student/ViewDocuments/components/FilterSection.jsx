import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function FilterSection({ fields, subjects, onClickFilter }) {
  const [field, setField] = useState("");
  const [subject, setSubject] = useState("");

  function handleClickFilter() {
    onClickFilter(field, subject);
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        bgcolor: "#e8f1f3",
        borderRadius: 2,
        justifyContent: "space-between",
      }}
    >
      <FormControl sx={{ minWidth: 200, width: "100%" }}>
        <InputLabel>Lĩnh vực</InputLabel>
        <Select
          value={field}
          onChange={(e) => setField(e.target.value)}
          label="Lĩnh vực"
        >
          <MenuItem value="">
            <em>Chọn lĩnh vực</em>
          </MenuItem>
          {fields.map((f) => (
            <MenuItem value={f.name}>{f.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200, width: "100%" }}>
        <InputLabel>Chủ đề</InputLabel>
        <Select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          label="Chủ đề"
        >
          <MenuItem value="">
            <em>Chọn chủ đề</em>
          </MenuItem>
          {subjects.map((s) => (
            <MenuItem value={s.name}>{s.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        sx={{ height: 40 }}
        onClick={handleClickFilter}
      >
        Lọc
      </Button>
    </Box>
  );
}
