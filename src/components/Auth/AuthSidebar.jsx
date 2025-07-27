import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

const sidebarItems = [
  { text: "Đăng nhập", icon: <LoginIcon />, path: "/login", color: "#4285f4" },
  { text: "Đăng ký", icon: <PersonAddIcon />, path: "/register", color: "#20bf6b" },
  { text: "Xác thực OTP", icon: <VerifiedUserIcon />, path: "/verify-otp", color: "#f39c12" },
  { text: "Hỗ trợ", icon: <SupportAgentIcon />, path: "/support", color: "#e74c3c" },
];

const AuthSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
          color: '#2c3e50',
          border: 'none',
          position: 'fixed',
          height: '100vh',
          boxShadow: '4px 0 20px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ p: 2.5, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4285f4', mb: 1 }}>
          AUTH
        </Typography>
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.8rem', letterSpacing: 1 }}>
          User Access
        </Typography>
      </Box>
      <List sx={{ px: 1.5, py: 2, flex: 1 }}>
        {sidebarItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2.5,
              bgcolor: pathname === item.path ? `${item.color}15` : 'transparent',
              border: pathname === item.path ? `1px solid ${item.color}40` : '1px solid transparent',
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: `${item.color}22`,
                border: `1px solid ${item.color}60`,
                transform: 'translateX(6px)',
              },
            }}
          >
            <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AuthSidebar;
