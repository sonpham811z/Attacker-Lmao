"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { Box, List, ListItem, ListItemText, Divider, Typography, ListItemIcon, Badge, Chip, Drawer } from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  MonetizationOn as MonetizationOnIcon,
  Gavel as GavelIcon,
  BarChart as BarChartIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  HelpOutline as HelpOutlineIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"
const drawerWidth = 240;
const slideIn = keyframes`
  0% {
    transform: translateX(-10px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
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

const sidebarItems = [
  { text: "Overview", path: "/validator/dashboard", icon: <DashboardIcon />, color: "#4285f4" },
  { text: "Request List", path: "/validator/requests", icon: <AssignmentIcon />, color: "#20bf6b", badge: 3 },
  { text: "Staking Management", path: "/validator/staking", icon: <MonetizationOnIcon />, color: "#f39c12" },
  { text: "Slashing & Rewards", path: "/validator/slashing", icon: <GavelIcon />, color: "#e74c3c" },
  { text: "Performance Analytics", path: "/validator/analytics", icon: <BarChartIcon />, color: "#1976d2" },
  { text: "Profile", path: "/validator/profile", icon: <AccountCircleIcon />, color: "#8e44ad" },
  { text: "Notifications", path: "/validator/notifications", icon: <NotificationsIcon />, color: "#ff9800", badge: 2 },
  { text: "Activity Log", path: "/validator/activity", icon: <HistoryIcon />, color: "#607d8b" },
  { text: "Support & Docs", path: "/validator/support", icon: <HelpOutlineIcon />, color: "#009688" },
  { text: "Settings", path: "/validator/settings", icon: <SettingsIcon />, color: "#455a64" },
]

const ValidatorSidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)",
          color: "#2c3e50",
          border: "none",
          position: "fixed",
          height: "100vh",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2.5,
          textAlign: "center",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "linear-gradient(135deg, rgba(32, 191, 107, 0.05) 0%, rgba(26, 188, 156, 0.05) 100%)",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 3,
            background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
            mb: 1.5,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(32, 191, 107, 0.3)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
              borderRadius: 3,
            },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: "white", zIndex: 1 }}>
            VAL
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            fontSize: "1.3rem",
            mb: 0.5,
          }}
        >
          Validator Portal
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#6c757d",
            fontSize: "0.8rem",
            letterSpacing: 1,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Verification Center
        </Typography>
      </Box>

      {/* Navigation Menu */}
      
        <List sx={{ px: 1.5, py: 2 }}>
          {sidebarItems.map((item, index) => (
            <Box
              key={item.text}
              sx={{
                animation: `${slideIn} 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: 2.5,
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: pathname === item.path ? `${item.color}15` : "transparent",
                  border: pathname === item.path ? `1px solid ${item.color}30` : "1px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: pathname === item.path ? `${item.color}20` : `${item.color}10`,
                    transform: "translateX(6px)",
                    border: `1px solid ${item.color}40`,
                    boxShadow: `0 4px 15px ${item.color}20`,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: pathname === item.path ? "4px" : "0px",
                    bgcolor: item.color,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::before": {
                    width: "4px",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pathname === item.path ? item.color : "#6c757d",
                    minWidth: 40,
                    transition: "all 0.3s ease",
                    "& svg": {
                      fontSize: "1.3rem",
                      filter: pathname === item.path ? `drop-shadow(0 0 6px ${item.color}40)` : "none",
                    },
                  }}
                >
                  {item.badge ? (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          animation: `${pulse} 2s infinite`,
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "0.95rem",
                      fontWeight: pathname === item.path ? 600 : 500,
                      color: pathname === item.path ? "#2c3e50" : "#495057",
                      transition: "all 0.3s ease",
                    },
                  }}
                />
              </ListItem>
            </Box>
          ))}
        </List>


      <Divider sx={{ bgcolor: "rgba(0,0,0,0.08)" }} />

      {/* Bottom Section - Enhanced Stats */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            background: "linear-gradient(135deg, rgba(32, 191, 107, 0.08) 0%, rgba(26, 188, 156, 0.08) 100%)",
            borderRadius: 2.5,
            p: 2,
            border: "1px solid rgba(32, 191, 107, 0.15)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)",
            },
          }}
        >
          <TrendingUpIcon sx={{ color: "#20bf6b", fontSize: 28, mb: 1 }} />
          <Typography
            variant="body2"
            sx={{
              color: "#2c3e50",
              fontWeight: 600,
              mb: 1,
              fontSize: "0.9rem",
            }}
          >
            Total Requests
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#20bf6b",
              fontWeight: 800,
              fontSize: "1.8rem",
              mb: 0.5,
            }}
          >
            128
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#6c757d",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            Processed this month
          </Typography>

          {/* Performance Indicator */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Chip
              label="+23% Growth"
              size="small"
              sx={{
                bgcolor: "rgba(32, 191, 107, 0.15)",
                color: "#20bf6b",
                fontWeight: 600,
                fontSize: "0.7rem",
                border: "1px solid rgba(32, 191, 107, 0.3)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default ValidatorSidebar
