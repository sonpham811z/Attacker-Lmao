"use client"

import { Card, CardContent, Box, Typography, Avatar, Button, Grid, Chip, Divider } from "@mui/material"
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const CompanyInfoCard = () => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        background: "linear-gradient(135deg, #fff 0%, #f8f9ff 100%)",
        animation: `${fadeInUp} 0.8s ease-out`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #20bf6b 0%, #1abc9c 50%, #16a085 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <BusinessIcon sx={{ fontSize: 32, color: "#20bf6b" }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#2c3e50", mb: 0.5 }}>
                Thông tin Công ty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hồ sơ nhà đầu tư được xác minh
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<VerifiedIcon />}
            label="Verified"
            color="success"
            sx={{
              fontWeight: 600,
              animation: `${pulse} 2s infinite`,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Company Logo and Basic Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#e3f2fd",
                  border: "3px solid #20bf6b",
                }}
              >
                <BusinessIcon sx={{ fontSize: 48, color: "#1976d2" }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50", mb: 1 }}>
                Green Capital Investment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sustainable Finance Solutions
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  borderColor: "#20bf6b",
                  color: "#20bf6b",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#1abc9c",
                    bgcolor: "rgba(32, 191, 107, 0.08)",
                  },
                }}
              >
                Chỉnh sửa
              </Button>
            </Box>
          </Grid>

          {/* Company Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <LocationIcon sx={{ fontSize: 20, color: "#6c757d" }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Địa chỉ
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      123 Nguyễn Huệ, Q1, TP.HCM
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <PhoneIcon sx={{ fontSize: 20, color: "#6c757d" }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Điện thoại
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      +84 28 1234 5678
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <EmailIcon sx={{ fontSize: 20, color: "#6c757d" }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      contact@greencapital.vn
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <BusinessIcon sx={{ fontSize: 20, color: "#6c757d" }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Mã số thuế
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      0123456789
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Investment Stats */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#20bf6b" }}>
                    $2.4M
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tổng đầu tư
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#f39c12" }}>
                    156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Khoản vay
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#9b59b6" }}>
                    12.5%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ROI trung bình
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CompanyInfoCard
