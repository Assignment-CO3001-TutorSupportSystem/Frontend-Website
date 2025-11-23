import React, { useState } from "react";
import { Box, Typography, Collapse, List, ListItemButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const topics = [
  "Computer Programming",
  "Data Structures and Algorithms",
  "Discrete Mathematics",
  "Computer Architecture",
  "Operating Systems",
  "Computer Networks",
  "Database Systems",
  "Compiler Design",
  "Theory of Computation",
  "Artificial Intelligence",
  "Machine Learning",
];

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CompoBox(data) {
  return (
    <Autocomplete
      disablePortal
      options={data}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Topic" />}
    />
  );
}
