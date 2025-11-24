import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import Button from "../../components/Button.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { DOCUMENT_DETAILS } from "../../data/DocumentDetailData.js";
import { Bold } from "lucide-react";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const document = DOCUMENT_DETAILS[id];

  return (
    <Box sx={{ bgcolor: "#e7f0f4", p: 4, borderRadius: 3 }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Quản lý tài liệu
      </Typography>

      {/* Back Button */}
      <Button
        variant="secondary"
        width={140}
        height={38}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20 }}
      >
        ← Quay lại
      </Button>

      {/* CARD */}
      <Paper
        elevation={0}
        fullWidth
        sx={{
          borderRadius: 3,
          p: 4,
          bgcolor: "white",
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, width: 150, fontSize: 20 }}>
                Tên
              </TableCell>
              <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>
                {document.title}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>
                Tác giả
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>{document.author}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>
                Lĩnh vực
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>{document.field}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>
                Chủ đề
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>{document.topic}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>
                Định dạng
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>{document.format}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, fontSize: 20, verticalAlign: "top" }}
              >
                Mô tả
              </TableCell>
              <TableCell sx={{ whiteSpace: "pre-line", fontSize: 18 }}>
                {document.description}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Buttons */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            width={140}
            height={40}
            variant="secondary"
            onClick={() => window.open(document.fileUrl, "_blank")}
          >
            Mở tài liệu
          </Button>

          <Button width={140} height={40} variant="secondary">
            Download
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
