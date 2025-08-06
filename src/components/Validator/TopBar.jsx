import Button from "@mui/material/Button";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Badge, Tooltip, Popover, List, ListItem, ListItemAvatar, ListItemText, Chip, Stack, Divider } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from "react-router-dom";
import { useWeb3 } from '../../contexts/Web3Context';
import React, { useState, useContext } from "react";
import { NotificationContext } from '../../pages/ValidatorPage/NotificationPage';

const routeTitles = {
  "/validator/dashboard": "Dashboard Validator",
  "/validator/requests": "Xử lý Request Xác thực",
  "/validator/staking": "Quản lý Staking",
  "/validator/report": "Báo cáo & Lịch sử",
};

const notifications = [
  { id: 1, type: 'success', title: 'Yêu cầu xác thực đã hoàn thành', desc: 'Bạn đã xác thực thành công request #1234.', time: '2 phút trước', read: false },
  { id: 2, type: 'error', title: 'Slashing cảnh báo', desc: 'Bạn bị slashing do không xác thực đúng hạn.', time: '1 giờ trước', read: false },
  { id: 3, type: 'info', title: 'Cập nhật hệ thống', desc: 'Hệ thống sẽ bảo trì lúc 22:00.', time: 'Hôm qua', read: true },
];

const typeMap = {
  success: { icon: <CheckCircleIcon color="success" />, color: 'success' },
  error: { icon: <ErrorIcon color="error" />, color: 'error' },
  info: { icon: <InfoIcon color="primary" />, color: 'primary' },
};

const ValidatorTopBar = ({ unread = 0 }) => {
  const { account, isConnected, connectWallet, isLoading } = useWeb3();
  const { pathname } = useLocation();
  const title = routeTitles[pathname] || "Validator Portal";
  const notificationCtx = useContext(NotificationContext);
  const setUnread = notificationCtx ? notificationCtx.setUnread : () => {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [notiList, setNotiList] = useState(notifications);

  React.useEffect(() => {
    setUnread(notiList.filter(n => !n.read).length);
  }, [notiList, setUnread]);

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMarkRead = (id) => {
    setNotiList(notiList.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const handleRemove = (id) => {
    setNotiList(notiList.filter(n => n.id !== id));
  };
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleAddressClick = () => {
    setShowFullAddress((prev) => !prev);
    setCopySuccess(false);
  };
  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    }
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: '0 2px 12px #20bf6b22', width: '100%', maxWidth: '100vw' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '100vw', minHeight: 64 }}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Kết nối ví và hiển thị địa chỉ */}
          {isConnected ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title={showFullAddress ? 'Ẩn địa chỉ' : 'Hiện đầy đủ địa chỉ'}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', userSelect: 'text' }}
                  onClick={handleAddressClick}
                >
                  {showFullAddress ? account : `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </Typography>
              </Tooltip>
              <Tooltip title="Copy địa chỉ ví">
                <IconButton size="small" onClick={handleCopy} sx={{ ml: 0.5 }}>
                  <AccountCircleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {copySuccess && (
                <Chip label="Đã copy!" color="success" size="small" sx={{ ml: 0.5 }} />
              )}
            </Box>
          ) : (
            <Button variant="contained" color="secondary" onClick={connectWallet} disabled={isLoading}>
              {isLoading ? "Đang kết nối..." : "Kết nối Ví"}
            </Button>
          )}
          {/* ...existing notification UI... */}
          <Tooltip title="Xem thông báo mới">
            <IconButton color="inherit" onClick={handleBellClick}>
              <Badge badgeContent={notiList.filter(n => !n.read).length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { width: 340, maxWidth: '90vw', p: 1, borderRadius: 3 } }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Badge badgeContent={notiList.filter(n => !n.read).length} color="error">
                <NotificationsIcon color="primary" fontSize="medium" />
              </Badge>
              <Typography variant="h6" fontWeight={700} color="primary.dark">
                Thông báo
              </Typography>
              <Chip label={notiList.length} color="primary" sx={{ ml: 1, fontWeight: 700 }} />
            </Stack>
            <Divider sx={{ mb: 1 }} />
            <List sx={{ maxHeight: 320, overflowY: 'auto', p: 0 }}>
              {notiList.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ p: 2 }}>Không có thông báo nào.</Typography>
              ) : notiList.map((n) => (
                <ListItem key={n.id} alignItems="flex-start" sx={{ bgcolor: n.read ? '#f5f6fa' : '#e3f0ff', borderRadius: 2, mb: 1, boxShadow: n.read ? 0 : 2, p: 1 }}
                  secondaryAction={
                    <Tooltip title="Xóa thông báo">
                      <IconButton edge="end" onClick={() => handleRemove(n.id)}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: `${typeMap[n.type].color}.main` }}>
                      {typeMap[n.type].icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography fontWeight={700} component="span">{n.title}</Typography>
                        {!n.read && <Chip label="Mới" color="error" size="small" />}
                      </Stack>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary" component="span">{n.desc}</Typography>
                        <Typography variant="caption" color="text.secondary" component="span">{n.time}</Typography>
                      </>
                    }
                  />
                  {!n.read && (
                    <Tooltip title="Đánh dấu đã đọc">
                      <IconButton onClick={() => handleMarkRead(n.id)}>
                        <CheckCircleIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  )}
                </ListItem>
              ))}
            </List>
          </Popover>
          <Avatar sx={{ bgcolor: '#20bf6b', width: 36, height: 36 }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
            Validator01
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ValidatorTopBar;
