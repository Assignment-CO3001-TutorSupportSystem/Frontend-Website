import { ButtonBase, Card, Box, Typography } from "@mui/material";

export default function StatCard({
  icon: Icon,
  title,
  value,
  tab,
  presentTab,
  onClick,
}) {
  const bgcolor = tab == presentTab ? "#17444eff" : "#0E5C6E";
  function handleOnClickTab() {
    onClick(tab);
  }
  return (
    <ButtonBase
      className="w-full text-left rounded-2xl"
      sx={{ borderRadius: 3 }}
    >
      <Card
        sx={{
          width: 200,
          height: 100,
          bgcolor: bgcolor,
          color: "white",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 2,
        }}
        onClick={handleOnClickTab}
      >
        <Icon sx={{ fontSize: 40 }} />

        <Box sx={{ ml: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>
        </Box>
      </Card>
    </ButtonBase>
  );
}
