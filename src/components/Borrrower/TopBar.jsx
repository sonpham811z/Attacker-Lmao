"use client"

import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar, Button, Divider } from "@mui/material"
import {
  NotificationsActive as NotificationIcon,
  AccountBalanceWallet as WalletIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Brightness4 as DarkModeIcon,
  Language as LanguageIcon,
} from "@mui/icons-material"
import { useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import { keyframes } from "@mui/system"

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
    text-shadow: 0 0 10px rgba(67, 133, 244, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(67, 133, 244, 0.6), 0 0 30px rgba(67, 133, 244, 0.4);
  }
  100% {
    text-shadow: 0 0 10px rgba(67, 133, 244, 0.3);
  }
`

const TopBar = () => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const { pathname } = useLocation()
  const isInitialMount = useRef(true)

  // Map routes to titles
  const routeToTitle = {
    "/borrower/dashboard": "Dashboard",
    "/borrower/loans": "Loans",
    "/borrower/submit-deal": "Submit Another Deal",
    "/borrower/transaction-history": "Transaction History",
    "/borrower/contact-support": "Contact Support",
    "/borrower/deals-room": "Deals Room",
    "/borrower/": "Dashboard", // Default route
  }

  const currentTitle = routeToTitle[pathname] || "Dashboard"

  // Control textGlow animation
  const getTextGlowAnimation = () => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return `${textGlow} 4s ease-in-out infinite`
    }
    return "none"
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length > 0) {
          setWalletConnected(true)
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
        <AppBar
            elevation={0}
            position="static"
            color="inherit"
            sx={{
                background: "#fff",
                borderBottom: "1px solid #e0e0e0",
                zIndex: 1201,
                width: '100%',
                maxWidth: '100vw',
            }}
    >
      <Toolbar sx={{ justifyContent: "space-between", width: "100%", py: 1.5 }}>
        {/* Left Section - Dynamic Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: "2rem",
                background: "linear-gradient(135deg, #4285f4 0%, #1976d2 50%, #0d47a1 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                letterSpacing: "-0.5px",
                animation: getTextGlowAnimation(),
                "&::before": {
                  content: `"${currentTitle}"`,
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
                  background: "linear-gradient(90deg, #4285f4 0%, transparent 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              {currentTitle}
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

          {/* Connect Wallet Button */}
          {!walletConnected ? (
            <Button
              variant="outlined"
              startIcon={<WalletIcon />}
              onClick={connectWallet}
              sx={{
                borderColor: "#f39c12",
                color: "#f39c12",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#e67e22",
                  bgcolor: "rgba(243, 156, 18, 0.08)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 15px rgba(243, 156, 18, 0.2)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<WalletIcon />}
              endIcon={
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#20bf6b",
                    animation: `${pulse} 2s infinite`,
                  }}
                />
              }
              onClick={disconnectWallet}
              sx={{
                background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
                color: "white",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #1ea557 0%, #17a2b8 100%)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 15px rgba(32, 191, 107, 0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover::before": {
                  left: "100%",
                  animation: `${shimmer} 0.8s ease-in-out`,
                },
              }}
            >
              {formatAddress(walletAddress)}
            </Button>
          )}

          {/* Notifications */}
          <IconButton
            sx={{
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <NotificationIcon sx={{ color: "#6c757d" }} />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#dee2e6" }} />

          {/* User Profile */}
          <Box
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
                Sơn Phạm
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.75rem",
                }}
              >
                Premium User
              </Typography>
            </Box>
            <Avatar
              src="https://res.cloudinary.com/sonpham811205/image/upload/v1745545657/dataEmployer/s0pxwnofrg8at89x8bjq.jpg"
              sx={{
                width: 42,
                height: 42,
                border: "2px solid #f39c12",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 4px 15px rgba(243, 156, 18, 0.3)",
                },
              }}
            />
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
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar