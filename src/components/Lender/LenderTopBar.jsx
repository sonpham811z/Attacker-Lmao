"use client"

import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar, Button, Divider } from "@mui/material"
import {
  NotificationsActive as NotificationIcon,
  AccountBalanceWallet as WalletIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Language as LanguageIcon,
  TrendingUp as TrendingUpIcon,
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

const LenderTopBar = () => {
  const [walletConnected, setWalletConnected] = useState(true)
  const [walletAddress, setWalletAddress] = useState("0x742d35Cc6634C0532925a3b8D3Cb2")
  const { pathname } = useLocation()
  const isInitialMount = useRef(true)

  // Map routes to titles for lender
  const routeToTitle = {
    "/lender/dashboard": "Lender Dashboard",
    "/lender/requests": "Loan Requests",
    "/lender/search": "Find Opportunities",
    "/lender/portfolio": "My Portfolio",
    "/lender/analytics": "Analytics",
    "/lender/company": "Company Profile",
    "/lender/support": "Contact Support",
    "/lender/": "Lender Dashboard",
  }

  const currentTitle = routeToTitle[pathname] || "Lender Dashboard"

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
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        color: "#2c3e50",
        borderBottom: "1px solid #e9ecef",
        width: "100%",
        ml: 0,
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
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
                background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 50%, #16a085 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                letterSpacing: "-0.5px",
                animation: getTextGlowAnimation(),
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
              {currentTitle}
            </Typography>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Investment Performance Indicator */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: 2,
              px: 2,
              py: 1,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: 20, color: "#20bf6b" }} />
            <Box>
              <Typography variant="caption" sx={{ color: "#6c757d", fontSize: "0.7rem" }}>
                Portfolio ROI
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#20bf6b", fontSize: "0.85rem" }}>
                +12.5%
              </Typography>
            </Box>
          </Box>

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

          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "#dee2e6" }} />

          {/* Connect Wallet Button */}
          {!walletConnected ? (
            <Button
              variant="outlined"
              startIcon={<WalletIcon />}
              onClick={connectWallet}
              sx={{
                borderColor: "#20bf6b",
                color: "#20bf6b",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                "&:hover": {
                  borderColor: "#1abc9c",
                  bgcolor: "rgba(32, 191, 107, 0.08)",
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
                "&:hover": {
                  background: "linear-gradient(135deg, #1ea557 0%, #17a2b8 100%)",
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
            <Badge badgeContent={3} color="error">
              <NotificationIcon sx={{ color: "#6c757d" }} />
            </Badge>
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
                Green Capital
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6c757d",
                  fontSize: "0.75rem",
                }}
              >
                Verified Lender
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                border: "2px solid #20bf6b",
                bgcolor: "#e3f2fd",
                color: "#1976d2",
              }}
            >
              GC
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
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LenderTopBar
