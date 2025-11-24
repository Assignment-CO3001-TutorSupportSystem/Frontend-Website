import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
} from "@mui/material";

export default function ScheduleTable({ data }) {
  function GetButton({ state }) {
    if (state == "running") {
      return (
        <Button variant="contained" color="success" size="small">
          Theo dõi
        </Button>
      );
    } else if (state == "enroll") {
      return (
        <Button variant="outlined" color="success" size="small">
          Đánh giá
        </Button>
      );
    } else {
      return (
        <Button variant="outlined" color="error" size="small">
          Xem lại
        </Button>
      );
    }
  }
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f4f7fb" }}>
              <TableCell sx={{ width: 100 }}>
                <b>Nhóm lớp</b>
              </TableCell>
              <TableCell sx={{ width: 120 }}>
                <b>Giảng viên</b>
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                <b>Nội dung</b>
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                <b>Ngày</b>
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                <b>Giờ</b>
              </TableCell>
              <TableCell sx={{ width: 120 }}>
                <b>Phòng học</b>
              </TableCell>
              <TableCell sx={{ width: 150 }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.group}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.content}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <Link href="#" underline="hover">
                    {row.room}
                  </Link>
                </TableCell>
                <TableCell>
                  <GetButton state={row.state} />
                </TableCell>
              </TableRow>
            ))}

            {[...Array(2)].map((_, idx) => (
              <TableRow key={"empty-" + idx}>
                <TableCell colSpan={7} sx={{ height: "45px" }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button size="small" variant="outlined">
          Previous
        </Button>
        <Button size="small" variant="outlined">
          Next
        </Button>
      </Box>
    </Paper>
  );
}
