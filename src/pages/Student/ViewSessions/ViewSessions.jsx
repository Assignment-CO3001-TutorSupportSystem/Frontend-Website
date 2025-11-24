import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

import { MOCK_SESSION_DATA } from "../../../data/mockSessionData";

import { StatCard, ScheduleTable } from "./components";

function ViewSessions() {
  const [presentTab, setPresentTab] = useState("running");

  function handleClickTab(newTab) {
    setPresentTab(newTab);
  }

  return (
    <Box sx={{ bgcolor: "#E7F0F4", borderRadius: 4, p: 3 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, mb: 3, color: "#002554" }}
      >
        Buổi tư vấn của tôi
      </Typography>
      <Box
        sx={{ display: "flex", gap: 4, p: 4, justifyContent: "space-around" }}
      >
        <StatCard
          icon={DescriptionIcon}
          title="Đang diễn ra"
          value={
            MOCK_SESSION_DATA.filter((row) => row.state == "running").length
          }
          tab={"running"}
          presentTab={presentTab}
          onClick={handleClickTab}
        />
        <StatCard
          icon={DescriptionIcon}
          title="Đã tham gia"
          value={
            MOCK_SESSION_DATA.filter((row) => row.state == "enroll").length
          }
          tab={"enroll"}
          presentTab={presentTab}
          onClick={handleClickTab}
        />
        <StatCard
          icon={DescriptionIcon}
          title="Đã huỷ bỏ"
          value={
            MOCK_SESSION_DATA.filter((row) => row.state == "cancel").length
          }
          tab={"cancel"}
          presentTab={presentTab}
          onClick={handleClickTab}
        />
      </Box>
      <ScheduleTable
        data={MOCK_SESSION_DATA.filter((row) => row.state == presentTab)}
      />
    </Box>
  );
}

export default ViewSessions;
