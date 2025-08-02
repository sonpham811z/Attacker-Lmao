"use client"
import { Card, CardContent, Typography, Box, LinearProgress, Chip, Stack, Divider } from "@mui/material"
import {
  MonetizationOn as MonetizationOnIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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

const StakedTokensCard = ({ darkMode = false }) => (
  <Card
    sx={{
      width: 400,
      height: 510,
      borderRadius: 3,
      border: "1px solid rgba(32, 191, 107, 0.2)",
      background: 'white',
      boxShadow: "0 4px 20px rgba(32, 191, 107, 0.15)",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 35px rgba(32, 191, 107, 0.25)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)",
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "rgba(32, 191, 107, 0.2)",
            border: "2px solid rgba(32, 191, 107, 0.3)",
            color: "#20bf6b",
            animation: `${pulse} 2s infinite`,
          }}
        >
          <MonetizationOnIcon />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: darkMode ? "#fff" : "#2c3e50",
              fontSize: "1.1rem",
              mb: 0.5,
            }}
          >
            Staked Tokens
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.6)" : "#6c757d",
              fontSize: "0.8rem",
            }}
          >
            Your validator stake
          </Typography>
        </Box>
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
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Main Amount */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#20bf6b",
            fontSize: "2.5rem",
            textShadow: "0 2px 4px rgba(32, 191, 107, 0.2)",
            mb: 1,
          }}
        >
          12,500
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: darkMode ? "rgba(255,255,255,0.8)" : "#2c3e50",
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          NLC Tokens
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: darkMode ? "rgba(255,255,255,0.7)" : "text.secondary",
              fontWeight: 600,
            }}
          >
            Staking Progress
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#20bf6b",
              fontWeight: 700,
            }}
          >
            83%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={83}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(32, 191, 107, 0.1)",
            "& .MuiLinearProgress-bar1Determinate": {
              borderRadius: 4,
              background: "linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)",
            },
          }}
        />

      </Box>

      {/* Stats Grid */}
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
            bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(32, 191, 107, 0.05)",
            border: "1px solid rgba(32, 191, 107, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUpIcon sx={{ color: "#20bf6b", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.8)" : "#2c3e50",
                fontWeight: 600,
              }}
            >
              Fees Earned
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#20bf6b",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            320 NLC
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
            bgcolor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(243, 156, 18, 0.05)",
            border: "1px solid rgba(243, 156, 18, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ color: "#f39c12", fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.8)" : "#2c3e50",
                fontWeight: 600,
              }}
            >
              Unlock Time
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#f39c12",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            7 days
          </Typography>
        </Box>
      </Stack>

      {/* Important Notice */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: darkMode ? "rgba(255, 193, 7, 0.1)" : "rgba(255, 193, 7, 0.1)",
          border: "1px solid rgba(255, 193, 7, 0.3)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: darkMode ? "rgba(255,255,255,0.8)" : "#856404",
            fontSize: "0.8rem",
            fontWeight: 500,
            display: "block",
            textAlign: "center",
          }}
        >
          ⚠️ Stake can be withdrawn after 7-day cooldown period
        </Typography>
      </Box>
    </CardContent>
  </Card>
)

export default StakedTokensCard
