"use client"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
} from "@mui/material"
import { CheckCircle as CheckCircleIcon, PendingActions as PendingActionsIcon } from "@mui/icons-material"
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

const recentActivities = [
  {
    id: 1,
    type: "success",
    title: "Xác thực thành công",
    desc: "Request #1234",
    time: "2 phút trước",
    reward: "+5 NLC",
  },
  {
    id: 2,
    type: "pending",
    title: "Đang xử lý",
    desc: "Request #1235",
    time: "10 phút trước",
    reward: "Pending",
  },
  {
    id: 3,
    type: "success",
    title: "Xác thực thành công",
    desc: "Request #1233",
    time: "30 phút trước",
    reward: "+5 NLC",
  },
  {
    id: 4,
    type: "success",
    title: "Xác thực thành công",
    desc: "Request #1232",
    time: "1 giờ trước",
    reward: "+5 NLC",
  },
]

const RecentActivities = ({ darkMode = false }) => {
  return (
    <Card
      sx={{
        width: 400,
        height: 400,
        borderRadius: 3,
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        background: darkMode
          ? "linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)"
          : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 35px rgba(243, 156, 18, 0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #f39c12 0%, #e67e22 50%, #d35400 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <PendingActionsIcon sx={{ color: "#f39c12", fontSize: 28 }} />
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
              Hoạt động gần đây
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.6)" : "#6c757d",
                fontSize: "0.8rem",
              }}
            >
              Latest verification updates
            </Typography>
          </Box>
          <Chip
            label="Live"
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

        <Divider sx={{ mb: 2 }} />

        <List dense sx={{ maxHeight: 280, overflowY: "auto" }}>
          {recentActivities.map((act, index) => (
            <ListItem
              key={act.id}
              alignItems="flex-start"
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: act.type === "success" ? "rgba(32, 191, 107, 0.05)" : "rgba(243, 156, 18, 0.05)",
                border:
                  act.type === "success" ? "1px solid rgba(32, 191, 107, 0.1)" : "1px solid rgba(243, 156, 18, 0.1)",
                transition: "all 0.3s ease",
                animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                "&:hover": {
                  transform: "translateX(4px)",
                  bgcolor: act.type === "success" ? "rgba(32, 191, 107, 0.08)" : "rgba(243, 156, 18, 0.08)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: act.type === "success" ? "#20bf6b" : "#f39c12",
                    color: "white",
                    width: 36,
                    height: 36,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {act.type === "success" ? <CheckCircleIcon /> : <PendingActionsIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography
                      fontWeight={700}
                      color={act.type === "success" ? "#20bf6b" : "#f39c12"}
                      sx={{ fontSize: "0.9rem" }}
                    >
                      {act.title}
                    </Typography>
                    <Chip
                      label={act.reward}
                      size="small"
                      color={act.type === "success" ? "success" : "warning"}
                      variant="outlined"
                      sx={{ fontSize: "0.7rem" }}
                    />
                  </Stack>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                      {act.desc}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                      {act.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentActivities
