import { Box, Paper, Typography, Grid } from "@mui/material";
import Textfill from "../../components/Textfill";
import Button from "../../components/Button";
import { useAccountSetting } from "../../hooks/useAccountSetting";

const AccountSetting = () => {
  const { form, handleFieldChange, updateInfo } = useAccountSetting();

  const fields = [
    { label: "Họ và tên", field: "name" },
    { label: "ID", field: "id" },
    { label: "Email", field: "email" },
    { label: "Vai trò", field: "role" },
    { label: "Số điện thoại", field: "phone" },
    { label: "Trạng thái", field: "status" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#e7f0f4",
        borderRadius: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: { xs: "left", md: "center" },
            flex: 1,
          }}
        >
          Quản lí tài khoản
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          bgcolor: "#ffffff",
          p: 2,
          maxWidth: 1200,
          mx: "auto",
        }}
        component="form"
        onSubmit={updateInfo}
      >
        <Box sx={{ maxWidth: 1100, mx: "auto", position: "relative" }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} container justifyContent="center">
              {/* main column: keep inputs in a single vertical column, labels left, inputs right */}
              <Grid item xs={12} md={8} lg={6}>
                {/* fields block: limit width so inputs appear centered in content area */}
                <Box sx={{ maxWidth: 900, mx: "auto" }}>
                  <Grid container spacing={3}>
                    {(() => {
                      const mid = Math.ceil(fields.length / 2);
                      const leftFields = fields.slice(0, mid);
                      const rightFields = fields.slice(mid);
                      return (
                        <>
                          <Grid item xs={12} md={6}>
                            {leftFields.map((f) => (
                              <Grid
                                container
                                alignItems="center"
                                spacing={2}
                                key={f.field}
                                sx={{ mb: 2 }}
                              >
                                <Grid item xs={12} md={4}>
                                  <Typography
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: 18,
                                      // width: "100%",
                                      width: 120,
                                      textAlign: { xs: "left" },
                                      pr: { md: 2 },
                                    }}
                                  >
                                    {f.label}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Box sx={{ width: "100%" }}>
                                    <Textfill
                                      value={form[f.field] ?? ""}
                                      onChange={handleFieldChange(f.field)}
                                      fullWidth
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                          <Grid item xs={12} md={6} px={2}>
                            {rightFields.map((f) => (
                              <Grid
                                container
                                alignItems="center"
                                spacing={2}
                                key={f.field}
                                sx={{ mb: 2 }}
                              >
                                <Grid item xs={12} md={4}>
                                  <Typography
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: 18,
                                      // width: "100%",
                                      width: 140,
                                      textAlign: { xs: "left" },
                                      pr: { md: 2 },
                                    }}
                                  >
                                    {f.label}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Box sx={{ width: "100%" }}>
                                    <Textfill
                                      value={form[f.field] ?? ""}
                                      onChange={handleFieldChange(f.field)}
                                      fullWidth
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </>
                      );
                    })()}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* save button aligned with main inputs (to the right side of main column) */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              width={200}
              height={45}
              onClick={updateInfo}
              style={{
                borderRadius: 999,
                backgroundColor: "#006571",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Cập nhật thông tin
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountSetting;
