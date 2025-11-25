import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";

import { MOCK_DOCUMENT_DATA } from "../../../data/mockDocumentData";

import { InfoRow } from "./components";

function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const document = MOCK_DOCUMENT_DATA.filter((doc) => doc.id == id)[0];

  return (
    <Box
      sx={{
        bgcolor: "#E7F0F4",
        borderRadius: 4,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          size="medium"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            textTransform: "none",
          }}
        >
          Quay lại
        </Button>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#002554",
            letterSpacing: 0.3,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Chi tiết tài liệu
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pt: 4,
          bgcolor: "#e8f1f3",
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <InfoRow label="Tên" value={document.title} />
            <InfoRow label="Tác giả" value={document.author} />
            <InfoRow label="Lĩnh vực" value={document.field} />
            <InfoRow label="Chủ đề" value={document.subject} />
            <InfoRow label="Định dạng" value={document.format} />
            <InfoRow label="Mô tả" value={document.description} />

            <Box sx={{ display: "flex", justifyContent: "center", pt: 3 }}>
              <Button variant="contained" size="medium">
                Download
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default DocumentDetail;
