"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Card, CardContent, Typography, Button, Container, Grid, Avatar, Fade, Grow } from "@mui/material"
import {
  Person as PersonIcon,
  AccountBalance as BankIcon,
  VerifiedUser as VerifiedIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { keyframes } from "@mui/system"


const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const Register = () => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: "borrower",
      title: "Borrower",
      description: "Apply for loans and funding for your projects",
      icon: <PersonIcon sx={{ fontSize: 32 }} />,
      color: "#4285f4",
      gradient: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
      path: "/register/borrower",
    },
    {
      id: "lender",
      title: "Lender",
      description: "Invest and lend money to earn returns",
      icon: <BankIcon sx={{ fontSize: 32 }} />,
      color: "#20bf6b",
      gradient: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
      path: "/register/lender",
    },
    {
      id: "verifier",
      title: "Verifier",
      description: "Verify and evaluate loan applications",
      icon: <VerifiedIcon sx={{ fontSize: 32 }} />,
      color: "#f39c12",
      gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
      path: "/register/verifier",
    },
  ]

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id)
    setTimeout(() => {
      navigate(role.path)
    }, 200)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(66, 133, 244, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(32, 191, 107, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ width: "100%", px: 4, position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={true} timeout={600}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mt:2,
                width: 80,
                height: 80,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
                mb: 3,
                boxShadow: "0 8px 32px rgba(66, 133, 244, 0.3)",
                position: "relative",
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
              <Typography variant="h4" sx={{ fontWeight: 700, color: "white", zIndex: 1}}>
                NLC
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #2c3e50 0%, #4285f4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                letterSpacing: "-0.02em",
              }}
            >
              Welcome to NLC
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#6c757d",
                fontWeight: 400,
                mb: 1,
                fontSize: "1.2rem",
              }}
            >
              Smart Lending Platform
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#8e9aaf",
                fontSize: "1rem",
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Choose your role to begin your financial journey with us
            </Typography>
          </Box>
        </Fade>

        {/* Role Selection Cards */}
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1000, mx: "auto" }}>
          {roles.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={role.id}>
              <Grow in={true} timeout={800 + index * 100}>
                <Card
                  onClick={() => handleRoleSelect(role)}
                  sx={{
                    height: 300,
                    cursor: "pointer",
                    bgcolor: "white",
                    border: "1px solid #e9ecef",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: selectedRole === role.id ? "scale(0.98)" : "scale(1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: role.gradient,
                    },
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: `0 20px 40px ${role.color}20`,
                      border: `1px solid ${role.color}30`,
                      "& .role-icon": {
                        background: role.gradient,
                        color: "white",
                        transform: "scale(1.1)",
                      },
                      "& .role-button": {
                        background: role.gradient,
                        color: "white",
                        transform: "translateY(-2px)",
                      },
                      "& .shimmer-effect": {
                        animation: `${shimmer} 1.5s ease-in-out`,
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}
                  >
                    {/* Icon */}
                    <Avatar
                      className="role-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        mx: "auto",
                        mb: 3,
                        bgcolor: `${role.color}10`,
                        color: role.color,
                        transition: "all 0.4s ease",
                        border: `2px solid ${role.color}20`,
                      }}
                    >
                      {role.icon}
                    </Avatar>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        mb: 2,
                        fontSize: "1.3rem",
                      }}
                    >
                      {role.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        lineHeight: 1.6,
                        mb: 4,
                        flex: 1,
                      }}
                    >
                      {role.description}
                    </Typography>

                    {/* Button */}
                    <Button
                      className="role-button"
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderColor: `${role.color}30`,
                        color: role.color,
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 500,
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          borderColor: role.color,
                        },
                      }}
                    >
                      Select Role
                    </Button>

                    {/* Shimmer Effect */}
                    <Box
                      className="shimmer-effect"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "-200px",
                        width: "200px",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        transform: "skewX(-20deg)",
                        pointerEvents: "none",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Fade in={true} timeout={1200}>
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#8e9aaf",
                fontSize: "0.9rem",
              }}
            >
              Already have an account?{" "}
              <Button
                variant="text"
                sx={{
                  color: "#4285f4",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(66, 133, 244, 0.04)",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Register
