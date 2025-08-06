"use client"

import { Box, Grid, Typography, Card, CardContent, TextField, Button } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import { Support as SupportIcon, Send as SendIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar"

const ContactSupport = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
        <LenderSidebar/>
         <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
    
      <LenderTopBar />
      <Box sx={{ p: 3, width: "100%" }}>
        {/* Header */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SupportIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Hỗ trợ Khách hàng
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Liên hệ với đội ngũ hỗ trợ để được giải đáp thắc mắc
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#2c3e50" }}>
                  Gửi yêu cầu hỗ trợ
                </Typography>

                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    label="Tiêu đề"
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    label="Mô tả chi tiết"
                    multiline
                    rows={6}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": {
                        background: "linear-gradient(135deg, #1ea557 0%, #17a2b8 100%)",
                      },
                    }}
                  >
                    Gửi yêu cầu
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Box>
  )
}

export default ContactSupport
