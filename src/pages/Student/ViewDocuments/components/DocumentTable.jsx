import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export default function DocumentTable({ data }) {
  const navigate = useNavigate();
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 3, mt: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Tên tài liệu</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tác giả</TableCell>
              <TableCell sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: 400 }}>{row.title}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell sx={{ width: 150 }}>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => navigate(`/documents/${row.id}`)}
                  >
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
