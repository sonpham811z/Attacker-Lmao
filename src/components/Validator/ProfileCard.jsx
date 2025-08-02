"use client"

import { Card, CardContent, Typography, Box, Avatar, Chip, Divider } from "@mui/material"
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"

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

const ValidatorProfileCard = () => {
  return (
    <Card
      sx={{
        background: "white",
        borderRadius: 3,
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 35px rgba(155, 89, 182, 0.15)",
          border: "1px solid rgba(155, 89, 182, 0.3)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #9b59b6 0%, #8e44ad 50%, #7d3c98 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 4px 15px rgba(155, 89, 182, 0.3)",
            }}
          >
            <PersonIcon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#2c3e50",
                fontSize: "1.1rem",
                mb: 0.5,
              }}
            >
              Validator Information
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#6c757d",
                fontSize: "0.8rem",
              }}
            >
              Profile & Verification Status
            </Typography>
          </Box>
          <Chip
            icon={<VerifiedIcon />}
            label="Verified"
            size="small"
            sx={{
              bgcolor: "rgba(32, 191, 107, 0.1)",
              color: "#20bf6b",
              fontWeight: 600,
              border: "1px solid rgba(32, 191, 107, 0.3)",
            }}
          />
        </Box>

        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
              fontSize: "2rem",
              fontWeight: 700,
              border: "3px solid rgba(155, 89, 182, 0.2)",
              boxShadow: "0 4px 15px rgba(155, 89, 182, 0.3)",
            }}
          >
            NV
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#2c3e50",
                mb: 0.5,
                fontSize: "1.3rem",
              }}
            >
              Nguyen Van A
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#6c757d",
                mb: 1,
                fontSize: "0.9rem",
              }}
            >
              Senior Validator
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarIcon sx={{ color: "#f39c12", fontSize: 16 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#f39c12",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                4.9 Rating
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Contact Information */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(155, 89, 182, 0.05)",
              border: "1px solid rgba(155, 89, 182, 0.1)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(155, 89, 182, 0.08)",
                transform: "translateX(4px)",
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "rgba(66, 133, 244, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmailIcon sx={{ fontSize: 16, color: "#4285f4" }} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  fontSize: "0.9rem",
                }}
              >
                validator@email.com
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.75rem",
                }}
              >
                Primary Contact
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(155, 89, 182, 0.05)",
              border: "1px solid rgba(155, 89, 182, 0.1)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(155, 89, 182, 0.08)",
                transform: "translateX(4px)",
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "rgba(243, 156, 18, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BadgeIcon sx={{ fontSize: 16, color: "#f39c12" }} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  fontSize: "0.9rem",
                }}
              >
                Validator ID: VAL-001
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.75rem",
                }}
              >
                Unique Identifier
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Status Indicators */}
        <Box sx={{ mt: 3, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="Active"
            size="small"
            sx={{
              bgcolor: "rgba(32, 191, 107, 0.1)",
              color: "#20bf6b",
              fontWeight: 600,
              border: "1px solid rgba(32, 191, 107, 0.3)",
            }}
          />
          <Chip
            label="KYC Verified"
            size="small"
            sx={{
              bgcolor: "rgba(66, 133, 244, 0.1)",
              color: "#4285f4",
              fontWeight: 600,
              border: "1px solid rgba(66, 133, 244, 0.3)",
            }}
          />
          <Chip
            label="Premium"
            size="small"
            sx={{
              bgcolor: "rgba(243, 156, 18, 0.1)",
              color: "#f39c12",
              fontWeight: 600,
              border: "1px solid rgba(243, 156, 18, 0.3)",
              animation: `${pulse} 2s infinite`,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ValidatorProfileCard
