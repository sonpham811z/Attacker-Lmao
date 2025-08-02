import React, { useState, useEffect, useContext } from "react";
// Context để chia sẻ số lượng thông báo chưa đọc
export const NotificationContext = React.createContext({ unread: 0, setUnread: () => {} });
import { Box, Card, CardContent, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Chip, Stack, Divider, Badge, Tooltip } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

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

const NotificationPage = () => {
  const [notiList, setNotiList] = useState(notifications);
  const { setUnread } = useContext(NotificationContext);
  useEffect(() => {
    setUnread(notiList.filter(n => !n.read).length);
  }, [notiList, setUnread]);
  const handleMarkRead = (id) => {
    setNotiList(notiList.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const handleRemove = (id) => {
    setNotiList(notiList.filter(n => n.id !== id));
  };
  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Badge badgeContent={notiList.filter(n => !n.read).length} color="error">
              <NotificationsIcon color="primary" fontSize="large" />
            </Badge>
            <Typography variant="h5" fontWeight={700} color="primary.dark">
              Thông báo
            </Typography>
            <Chip label={notiList.length} color="primary" sx={{ ml: 2, fontWeight: 700 }} />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <List>
            {notiList.length === 0 ? (
              <Typography color="text.secondary" align="center">Không có thông báo nào.</Typography>
            ) : notiList.map((n) => (
              <ListItem key={n.id} alignItems="flex-start" sx={{ bgcolor: n.read ? '#f5f6fa' : '#e3f0ff', borderRadius: 2, mb: 1, boxShadow: n.read ? 0 : 2 }}
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
                      <Typography fontWeight={700}>{n.title}</Typography>
                      {!n.read && <Chip label="Mới" color="error" size="small" />}
                    </Stack>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">{n.desc}</Typography>
                      <Typography variant="caption" color="text.secondary">{n.time}</Typography>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationPage;
