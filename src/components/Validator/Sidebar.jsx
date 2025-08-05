
import { Box, List, ListItem, ListItemText, Divider, Typography, ListItemIcon, Badge } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GavelIcon from '@mui/icons-material/Gavel';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { text: "Tổng quan", path: "/validator/dashboard", icon: <DashboardIcon />, color: "#4285f4" },
  { text: "Danh sách Request", path: "/validator/requests", icon: <AssignmentIcon />, color: "#20bf6b", badge: 3 },
  { text: "Quản lý Staking", path: "/validator/staking", icon: <MonetizationOnIcon />, color: "#f39c12" },
  { text: "Slashing & Phần thưởng", path: "/validator/slashing", icon: <GavelIcon />, color: "#e74c3c" },
  { text: "Thống kê hiệu suất", path: "/validator/analytics", icon: <BarChartIcon />, color: "#1976d2" },
  { text: "Thông tin cá nhân", path: "/validator/profile", icon: <AccountCircleIcon />, color: "#8e44ad" },
  { text: "Thông báo", path: "/validator/notifications", icon: <NotificationsIcon />, color: "#ff9800", badge: 2 },
  { text: "Nhật ký hoạt động", path: "/validator/activity", icon: <HistoryIcon />, color: "#607d8b" },
  { text: "Hỗ trợ & Tài liệu", path: "/validator/support", icon: <HelpOutlineIcon />, color: "#009688" },
  { text: "Cài đặt", path: "/validator/settings", icon: <SettingsIcon />, color: "#455a64" },
];

const ValidatorSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box width={240} bgcolor="#f5f6fa" height="100vh" p={0} sx={{ boxShadow: '4px 0 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box sx={{ p: 2.5, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)', background: 'linear-gradient(135deg, rgba(32, 191, 107, 0.05) 0%, rgba(26, 188, 156, 0.05) 100%)' }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)', mb: 1.5, position: 'relative', overflow: 'hidden' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', zIndex: 1 }}>VAL</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', fontSize: '1.1rem' }}>Validator</Typography>
        <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase' }}>Verification Portal</Typography>
      </Box>
      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <List sx={{ px: 1.5, py: 2 }}>
          {sidebarItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 2.5,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: pathname === item.path ? `${item.color}15` : 'transparent',
                border: pathname === item.path ? `1px solid ${item.color}40` : '1px solid transparent',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: `${item.color}22`,
                  border: `1px solid ${item.color}60`,
                  transform: 'translateX(6px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: pathname === item.path ? '3px' : '0px',
                  bgcolor: item.color,
                  transition: 'width 0.3s ease',
                },
                '&:hover::before': {
                  width: '3px',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.color, minWidth: 40 }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: '0.95rem', fontWeight: pathname === item.path ? 600 : 500, color: pathname === item.path ? '#2c3e50' : '#495057', transition: 'all 0.3s' } }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(0,0,0,0.08)' }} />
      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ background: 'linear-gradient(135deg, rgba(32, 191, 107, 0.08) 0%, rgba(26, 188, 156, 0.08) 100%)', borderRadius: 2.5, p: 2, border: '1px solid rgba(32, 191, 107, 0.15)', textAlign: 'center', position: 'relative', overflow: 'hidden', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #20bf6b 0%, #1abc9c 100%)' } }}>
          <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 600, mb: 0.5 }}>
            Tổng số request
          </Typography>
          <Typography variant="h6" sx={{ color: '#20bf6b', fontWeight: 'bold', fontSize: '1.1rem' }}>
            128
          </Typography>
          <Typography variant="caption" sx={{ color: '#6c757d', fontSize: '0.75rem' }}>
            Đã xử lý tháng này
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ValidatorSidebar;
