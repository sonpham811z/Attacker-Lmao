"use client"

import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Stack,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material"
import {
  NotificationsActive as NotificationIcon,
  AccountCircle as AccountIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Brightness4 as DarkModeIcon,
  Language as LanguageIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import { NotificationContext } from "../../pages/ValidatorPage/NotificationPage"
import { keyframes } from "@mui/system"
import { useDispatch } from "react-redux"
import { logOutAPI } from "../../redux/validatorSlice"
import { toast } from "react-toastify"

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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const textGlow = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(32, 191, 107, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(32, 191, 107, 0.6), 0 0 30px rgba(32, 191, 107, 0.4);
  }
  100% {
    text-shadow: 0 0 10px rgba(32, 191, 107, 0.3);
  }
`

const routeTitles = {
  "/validator/dashboard": "Validator Dashboard",
  "/validator/requests": "Request Processing",
  "/validator/staking": "Staking Management",
  "/validator/report": "Reports & History",
}

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Verification Completed",
    desc: "Successfully verified request #1234.",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "error",
    title: "Slashing Warning",
    desc: "Slashing penalty due to missed verification.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "System Update",
    desc: "System maintenance at 22:00.",
    time: "Yesterday",
    read: true,
  },
]

const typeMap = {
  success: { icon: <CheckCircleIcon color="success" />, color: "success" },
  error: { icon: <ErrorIcon color="error" />, color: "error" },
  info: { icon: <InfoIcon color="primary" />, color: "primary" },
}

const ValidatorTopBar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  // Tách riêng state cho notification và user menu
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)

  const title = routeTitles[pathname] || "Validator Portal"
  const { setUnread } = useContext(NotificationContext)
  const [notiList, setNotiList] = useState(notifications)

  // Handlers cho user menu
  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      dispatch(logOutAPI())
      handleUserMenuClose()
    } catch (error) {
      console.log(error)
      toast.error("Logout error")
    }
  }

  const handleProfile = () => {
    console.log("Navigate to profile...")
    handleUserMenuClose()
  }

  const handleSettings = () => {
    console.log("Navigate to settings...")
    handleUserMenuClose()
  }

  // Handlers cho notification
  const handleBellClick = (event) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null)
  }

  const handleMarkRead = (id) => {
    setNotiList(notiList.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleRemove = (id) => {
    setNotiList(notiList.filter((n) => n.id !== id))
  }

  // States cho notification popover
  const notificationOpen = Boolean(notificationAnchorEl)
  const notificationId = notificationOpen ? "notification-popover" : undefined

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        color: "#2c3e50",
        borderBottom: "1px solid #e9ecef",
        width: "83vw",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: "100%", py: 1.5 }}>
        {/* Left Section - Enhanced Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: "2rem",
                background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 50%, #16a085 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                letterSpacing: "-0.5px",
                animation: `${textGlow} 4s ease-in-out infinite`,
                "&::before": {
                  content: `"${title}"`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.3,
                  transform: "translate(2px, 2px)",
                  zIndex: -1,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "60%",
                  height: "3px",
                  background: "linear-gradient(90deg, #20bf6b 0%, transparent 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Button */}
          <IconButton
            sx={{
              bgcolor: "#f8f9fa",
              border: "1px solid #dee2e6",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#e9ecef",
                border: "1px solid #adb5bd",
                transform: "scale(1.05)",
              },
            }}
          >
            <SearchIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Language Toggle */}
          <IconButton
            sx={{
              bgcolor: "#f8f9fa",
              border: "1px solid #dee2e6",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#e9ecef",
                border: "1px solid #adb5bd",
                transform: "scale(1.05)",
              },
            }}
          >
            <LanguageIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton
            sx={{
              bgcolor: "#f8f9fa",
              border: "1px solid #dee2e6",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#e9ecef",
                border: "1px solid #adb5bd",
                transform: "scale(1.05)",
              },
            }}
          >
            <DarkModeIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#dee2e6" }} />

          {/* Notifications */}
          <Tooltip title="View notifications">
            <IconButton
              onClick={handleBellClick}
              sx={{
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Badge
                badgeContent={notiList.filter((n) => !n.read).length}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    animation: `${pulse} 2s infinite`,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  },
                }}
              >
                <NotificationIcon sx={{ color: "#6c757d" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Popover
            id={notificationId}
            open={notificationOpen}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                width: 380,
                maxWidth: "90vw",
                p: 0,
                borderRadius: 3,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                border: "1px solid #e9ecef",
                overflow: "hidden",
              },
            }}
          >
            {/* Notification Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
                color: "white",
                p: 3,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ position: "relative", zIndex: 1 }}>
                <Badge badgeContent={notiList.filter((n) => !n.read).length} color="error">
                  <NotificationIcon sx={{ fontSize: 24 }} />
                </Badge>
                <Typography variant="h6" fontWeight={700}>
                  Notifications
                </Typography>
                <Chip
                  label={notiList.length}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: 700,
                    ml: "auto",
                  }}
                />
              </Stack>
            </Box>

            {/* Notification List */}
            <List sx={{ maxHeight: 400, overflowY: "auto", p: 1 }}>
              {notiList.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ p: 4 }}>
                  No notifications available.
                </Typography>
              ) : (
                notiList.map((n) => (
                  <ListItem
                    key={n.id}
                    alignItems="flex-start"
                    sx={{
                      bgcolor: n.read ? "#f8f9fa" : "rgba(32, 191, 107, 0.05)",
                      borderRadius: 2,
                      mb: 1,
                      border: n.read ? "1px solid #e9ecef" : "1px solid rgba(32, 191, 107, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: n.read ? "#e9ecef" : "rgba(32, 191, 107, 0.08)",
                        transform: "translateX(4px)",
                      },
                    }}
                    secondaryAction={
                      <Tooltip title="Remove notification">
                        <IconButton
                          edge="end"
                          onClick={() => handleRemove(n.id)}
                          sx={{
                            "&:hover": {
                              bgcolor: "rgba(244, 67, 54, 0.1)",
                              color: "#f44336",
                            },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: `${typeMap[n.type].color}.main`,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {typeMap[n.type].icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography fontWeight={700} sx={{ fontSize: "0.95rem" }}>
                            {n.title}
                          </Typography>
                          {!n.read && (
                            <Chip
                              label="New"
                              color="error"
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                fontWeight: 600,
                              }}
                            />
                          )}
                        </Stack>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {n.desc}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {n.time}
                          </Typography>
                        </>
                      }
                    />
                    {!n.read && (
                      <Tooltip title="Mark as read">
                        <IconButton
                          onClick={() => handleMarkRead(n.id)}
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 50,
                            "&:hover": {
                              bgcolor: "rgba(32, 191, 107, 0.1)",
                            },
                          }}
                        >
                          <CheckCircleIcon color="success" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ListItem>
                ))
              )}
            </List>
          </Popover>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#dee2e6" }} />

          {/* User Profile */}
          <Box
            onClick={handleUserMenuClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
              p: 1,
              borderRadius: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#f8f9fa",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  lineHeight: 1.2,
                }}
              >
                Validator01
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.75rem",
                }}
              >
                Active Validator
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
                border: "2px solid rgba(32, 191, 107, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 4px 15px rgba(32, 191, 107, 0.3)",
                },
              }}
            >
              <AccountIcon />
            </Avatar>
            <ExpandMoreIcon
              sx={{
                color: "#6c757d",
                fontSize: 20,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "rotate(180deg)",
                },
              }}
            />
          </Box>

          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                border: "1px solid #e9ecef",
                "& .MuiMenuItem-root": {
                  px: 2,
                  py: 1.5,
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    transform: "translateX(4px)",
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon sx={{ fontSize: 20, color: "#6c757d" }} />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              />
            </MenuItem>

            <MenuItem onClick={handleSettings}>
              <ListItemIcon>
                <SettingsIcon sx={{ fontSize: 20, color: "#6c757d" }} />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              />
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(244, 67, 54, 0.08) !important",
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "#f44336 !important",
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: 20, color: "#6c757d" }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default ValidatorTopBar
