import { useState } from "react";
import { Box, Typography } from "@mui/material";

import {
  SearchBar,
  DocumentTable,
  PaginationFooter,
  FilterSection,
} from "./components";

import { MOCK_DOCUMENT_DATA } from "../../../data/mockDocumentData";

function ViewDocuments() {
  const [data, setData] = useState(MOCK_DOCUMENT_DATA);
  const [showFilter, setShowFilter] = useState(false);
  const [field, setField] = useState("");
  const [subject, setSubject] = useState("");

  const fields = [...new Set(MOCK_DOCUMENT_DATA.map((d) => d.field))].map(
    (name, i) => ({ id: i, name })
  );
  const subjects = [...new Set(MOCK_DOCUMENT_DATA.map((d) => d.subject))].map(
    (name, i) => ({ id: i, name })
  );

  function handleSearch(keyword) {
    const search = keyword.toLowerCase();

    const filtered = MOCK_DOCUMENT_DATA.filter(
      ({ title, author, field: f, subject: s }) =>
        title.toLowerCase().includes(search) ||
        author.toLowerCase().includes(search)
    );

    setData(filtered);
    if (!filtered.length) {
      alert("Không tìm thấy tài liệu phù hợp với từ khóa");
    }
  }

  function handleClickShowFilter() {
    setShowFilter(!showFilter);
  }

  function handleClickFilter(f, s) {
    const ff = f.toLowerCase();
    const ss = s.toLowerCase();

    const filtered = MOCK_DOCUMENT_DATA.filter(
      (d) =>
        d.field.toLowerCase().includes(ff) &&
        d.subject.toLowerCase().includes(ss)
    );

    setData(filtered);
    if (!filtered.length) {
      alert("Không tìm thấy tài liệu phù hợp với lọc");
    }

    setField(f);
    setSubject(s);
  }

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, color: "#002554" }}
      >
        Quản lý tài liệu
      </Typography>
      <SearchBar
        onSearch={handleSearch}
        onClickShowFilter={handleClickShowFilter}
      />
      {showFilter && (
        <FilterSection
          fields={fields}
          subjects={subjects}
          onClickFilter={handleClickFilter}
        />
      )}
      <DocumentTable data={data} />
      <PaginationFooter />
    </Box>
  );
}
export default ViewDocuments;
