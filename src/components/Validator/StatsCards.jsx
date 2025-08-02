"use client"

import { Grid, Card, CardContent, Typography, Box, Grow } from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  PendingActions as PendingIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`

const stats = [
  {
    label: "Total Verifications",
    value: 120,
    icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
    color: "#20bf6b",
    gradient: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
    change: "+12%",
  },
  {
    label: "In Progress",
    value: 8,
    icon: <PendingIcon sx={{ fontSize: 32 }} />,
    color: "#f39c12",
    gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
    change: "+3",
  },
  {
    label: "Completed",
    value: 112,
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
    color: "#4285f4",
    gradient: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
    change: "+18%",
  },
  {
    label: "Success Rate",
    value: "93%",
    icon: <AssessmentIcon sx={{ fontSize: 32 }} />,
    color: "#9b59b6",
    gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
    change: "+2.1%",
  },
]

const ValidatorStatsCards = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 3, justifyContent: 'center' }}>
      {stats.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={item.label} >
          <Grow in={true} timeout={600 + index * 100}>
            <Card
              sx={{
                background: "white",
                borderRadius: 3,
                border: "1px solid #e9ecef",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 40px ${item.color}20`,
                  border: `1px solid ${item.color}30`,
                  "& .stat-icon": {
                    transform: "scale(1.1)",
                    animation: `${float} 2s ease-in-out infinite`,
                  },
                  "& .stat-value": {
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: item.gradient,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover::after": {
                  left: "100%",
                  animation: `${shimmer} 0.8s ease-in-out`,
                },
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1, width: 230 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box
                    className="stat-icon"
                    sx={{
                      width: 80,
                      height: 56,
                      borderRadius: 2,
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                      transition: "all 0.3s ease",
                      border: `2px solid ${item.color}20`,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: `${item.color}10`,
                      color: item.color,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.change}
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6c757d",
                    fontWeight: 500,
                    mb: 1,
                    fontSize: "0.9rem",
                  }}
                >
                  {item.label}
                </Typography>

                <Typography
                  className="stat-value"
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#2c3e50",
                    fontSize: "2.2rem",
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {item.value}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: item.color,
                      animation: `${pulse} 2s infinite`,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#8e9aaf",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    Last 30 days
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      ))}
    </Grid>
  )
}

export default ValidatorStatsCards
