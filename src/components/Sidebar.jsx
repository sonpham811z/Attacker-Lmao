import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Chip, Divider } from "@mui/material"
import {
  Dashboard as DashboardIcon,
  AccountBalance as LoansIcon,
  Add as AddIcon,
  Score as CreditScoreIcon,
  Support as SupportIcon,
  MeetingRoom as RoomIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"

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

const drawerWidth = 260 // Reduced from 280

const sidebarItems = [
  { text: "Dashboard", icon: <DashboardIcon />, active: true, color: "#4285f4" },
  { text: "Loans", icon: <LoansIcon />, color: "#20bf6b" },
  { text: "Submit Another Deal", icon: <AddIcon />, color: "#f39c12" },
  { text: "Credit Score", icon: <CreditScoreIcon />, color: "#9b59b6" },
  { text: "Contact Support", icon: <SupportIcon />, color: "#e74c3c" },
  { text: "Deals Room", icon: <RoomIcon />, badge: "NEW", color: "#1abc9c" },
]

const Sidebar = () => {
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
          background: "linear-gradient(135deg, rgba(67, 133, 244, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)",
        }}
      >
        {/* Placeholder for logo image */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 2,
            background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
            mb: 1.5,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "url('/placeholder.svg?height=50&width=50&text=LOGO')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", zIndex: 1 }}>
            NLC
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            fontSize: "1.1rem",
          }}
        >
          NLC Platform
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#6c757d",
            fontSize: "0.7rem",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Lending Solutions
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {sidebarItems.map((item, index) => (
          <Box
            key={item.text}
            sx={{
              animation: `${slideIn} 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <ListItem
              sx={{
                mb: 1,
                borderRadius: 2.5,
                position: "relative",
                overflow: "hidden",
                bgcolor: item.active ? "rgba(67, 133, 244, 0.1)" : "transparent",
                border: item.active ? "1px solid rgba(67, 133, 244, 0.2)" : "1px solid transparent",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: item.active ? "rgba(67, 133, 244, 0.15)" : "rgba(0, 0, 0, 0.04)",
                  transform: "translateX(6px)",
                  border: `1px solid ${item.color}30`,
                  boxShadow: `0 2px 8px ${item.color}20`,
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: item.active ? "3px" : "0px",
                  bgcolor: item.color,
                  transition: "width 0.3s ease",
                },
                "&:hover::before": {
                  width: "3px",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? item.color : "#6c757d",
                  minWidth: 40,
                  transition: "all 0.3s ease",
                  "& svg": {
                    fontSize: "1.2rem",
                    filter: item.active ? `drop-shadow(0 0 6px ${item.color}40)` : "none",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.9rem",
                    fontWeight: item.active ? 600 : 500,
                    color: item.active ? "#2c3e50" : "#495057",
                    transition: "all 0.3s ease",
                  },
                }}
              />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    bgcolor: "#e74c3c",
                    color: "white",
                    fontSize: "0.65rem",
                    height: 20,
                    fontWeight: 600,
                    animation: `${pulse} 2s infinite`,
                    boxShadow: "0 2px 6px rgba(231, 76, 60, 0.3)",
                  }}
                />
              )}
            </ListItem>
          </Box>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(0,0,0,0.08)" }} />

      {/* Bottom Section */}
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
          <TrendingUpIcon sx={{ color: "#20bf6b", fontSize: 24, mb: 0.5 }} />
          <Typography variant="body2" sx={{ color: "#2c3e50", fontWeight: 600, mb: 0.5 }}>
            Performance
          </Typography>
          <Typography variant="h6" sx={{ color: "#20bf6b", fontWeight: "bold", fontSize: "1.1rem" }}>
            +23.5%
          </Typography>
          <Typography variant="caption" sx={{ color: "#6c757d", fontSize: "0.75rem" }}>
            This month
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "rgba(0,0,0,0.03)",
              borderRadius: 2,
              p: 1.2,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.06)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <NotificationsIcon sx={{ color: "#f39c12", fontSize: 18 }} />
            <Typography variant="caption" sx={{ color: "#6c757d", display: "block", mt: 0.3, fontSize: "0.7rem" }}>
              Alerts
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              bgcolor: "rgba(0,0,0,0.03)",
              borderRadius: 2,
              p: 1.2,
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.06)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <SettingsIcon sx={{ color: "#9b59b6", fontSize: 18 }} />
            <Typography variant="caption" sx={{ color: "#6c757d", display: "block", mt: 0.3, fontSize: "0.7rem" }}>
              Settings
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
