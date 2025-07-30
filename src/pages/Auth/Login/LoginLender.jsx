"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Fade,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
  Paper,
  Chip,
} from "@mui/material"
import {
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Security as SecurityIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
  AccountBalance as BankIcon,
} from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { loginLenderAPI } from "../../../redux/lenderSlice"
import { toast } from "react-toastify"
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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    })
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      await dispatch(loginLenderAPI(formData)).unwrap()
      navigate("/lender/dashboard")
    } catch (error) {
      console.log(error)
      toast.error("Login error")
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const isFormValid = () => {
    return formData.email && formData.password && Object.keys(errors).length === 0
  }

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 20 }} />,
      title: "Bank-Grade Security",
      description: "256-bit SSL encryption",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 20 }} />,
      title: "Real-Time Analytics",
      description: "Live market insights",
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 20 }} />,
      title: "Regulatory Compliance",
      description: "SOC 2 Type II certified",
    },
  ]

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100%",
        background: "linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #2c3e50 100%)",
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
          background: `
            radial-gradient(circle at 20% 20%, rgba(66, 133, 244, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(32, 191, 107, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(243, 156, 18, 0.06) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" strokeWidth="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')',
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ width: "100%", px: 4, position: "relative", zIndex: 1 }}>
        <Grid container spacing={0} sx={{ minHeight: "100vh", alignItems: "center" }}>
          {/* Left Side - Branding & Features */}
          <Grid item xs={12} lg={7} sx={{ display: { xs: "none", lg: "block" } }}>
            <Fade in={true} timeout={600}>
              <Box sx={{ pr: 8, py: 4 }}>
                {/* Company Branding */}
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
                        mr: 3,
                        boxShadow: "0 12px 40px rgba(66, 133, 244, 0.4)",
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
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "white", zIndex: 1 }}>
                        NLC
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: "white",
                          fontSize: "2.5rem",
                          letterSpacing: "-0.02em",
                          mb: 0.5,
                        }}
                      >
                        NLC Platform
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontWeight: 400,
                          fontSize: "1.1rem",
                        }}
                      >
                        Enterprise Lending Solutions
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      mb: 3,
                      fontSize: "2.2rem",
                      lineHeight: 1.2,
                    }}
                  >
                    Empowering Financial Growth Through{" "}
                    <Box
                      component="span"
                      sx={{
                        background: "linear-gradient(135deg, #4285f4 0%, #20bf6b 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Smart Lending
                    </Box>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1.1rem",
                      lineHeight: 1.6,
                      mb: 4,
                      maxWidth: 500,
                    }}
                  >
                    Join thousands of financial institutions and lenders who trust our platform for secure, efficient,
                    and compliant lending operations.
                  </Typography>

                  {/* Trust Indicators */}
                  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                    <Chip
                      icon={<CheckCircleIcon />}
                      label="SOC 2 Certified"
                      sx={{
                        bgcolor: "rgba(32, 191, 107, 0.15)",
                        color: "#20bf6b",
                        border: "1px solid rgba(32, 191, 107, 0.3)",
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      icon={<ShieldIcon />}
                      label="Bank-Grade Security"
                      sx={{
                        bgcolor: "rgba(66, 133, 244, 0.15)",
                        color: "#4285f4",
                        border: "1px solid rgba(66, 133, 244, 0.3)",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>

                {/* Features Grid */}
                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Fade in={true} timeout={800 + index * 200}>
                        <Paper
                          sx={{
                            p: 3,
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                            "&:hover": {
                              transform: "translateY(-4px)",
                              bgcolor: "rgba(255, 255, 255, 0.08)",
                              border: "1px solid rgba(66, 133, 244, 0.3)",
                              boxShadow: "0 8px 32px rgba(66, 133, 244, 0.2)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              bgcolor: "rgba(66, 133, 244, 0.15)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: 2,
                              color: "#4285f4",
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "white",
                              fontWeight: 600,
                              mb: 1,
                              fontSize: "1rem",
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255, 255, 255, 0.7)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Paper>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                {/* Stats */}
                <Box sx={{ mt: 6, display: "flex", gap: 6 }}>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#4285f4",
                        fontWeight: 800,
                        fontSize: "2.5rem",
                      }}
                    >
                      $2.5B+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500,
                      }}
                    >
                      Loans Processed
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#20bf6b",
                        fontWeight: 800,
                        fontSize: "2.5rem",
                      }}
                    >
                      10K+
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500,
                      }}
                    >
                      Active Lenders
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#f39c12",
                        fontWeight: 800,
                        fontSize: "2.5rem",
                      }}
                    >
                      99.9%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 500,
                      }}
                    >
                      Uptime SLA
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} lg={5}>
            <Fade in={true} timeout={800}>
              <Box sx={{ maxWidth: 480, mt: 2 ,mx: "auto", px: { xs: 2, sm: 4 } }}>
                {/* Mobile Header */}
                <Box sx={{ display: { xs: "block", lg: "none" }, textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
                      mb: 2,
                      boxShadow: "0 8px 32px rgba(66, 133, 244, 0.3)",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
                      NLC
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    Sign in to your lender account
                  </Typography>
                </Box>

                {/* Login Card */}
                <Card
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 4,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #4285f4 0%, #20bf6b 50%, #f39c12 100%)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 5 }}>
                    {/* Desktop Header */}
                    <Box sx={{ display: { xs: "none", lg: "block" }, textAlign: "center", mb: 4 }}>
                      <BusinessIcon
                        sx={{
                          fontSize: 48,
                          color: "#4285f4",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: "#2c3e50",
                          mb: 1,
                          fontSize: "1.8rem",
                        }}
                      >
                        Lender Portal
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#6c757d",
                          fontSize: "1rem",
                        }}
                      >
                        Access your lending dashboard
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {/* Email Field */}
                      <TextField
                        fullWidth
                        label="Corporate Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: "#4285f4" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: "rgba(248, 249, 250, 0.8)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(248, 249, 250, 1)",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4285f4",
                                borderWidth: "2px",
                              },
                            },
                            "&.Mui-focused": {
                              bgcolor: "white",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4285f4",
                                borderWidth: "2px",
                              },
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "#4285f4",
                            },
                          },
                        }}
                      />

                      {/* Password Field */}
                      <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon sx={{ color: "#4285f4" }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                                sx={{
                                  color: "#6c757d",
                                  "&:hover": {
                                    color: "#4285f4",
                                  },
                                }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: "rgba(248, 249, 250, 0.8)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(248, 249, 250, 1)",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4285f4",
                                borderWidth: "2px",
                              },
                            },
                            "&.Mui-focused": {
                              bgcolor: "white",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4285f4",
                                borderWidth: "2px",
                              },
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "#4285f4",
                            },
                          },
                        }}
                      />

                      {/* Security Notice */}
                      <Box
                        sx={{
                          bgcolor: "rgba(66, 133, 244, 0.05)",
                          border: "1px solid rgba(66, 133, 244, 0.1)",
                          borderRadius: 2,
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <SecurityIcon sx={{ color: "#4285f4", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#4285f4", fontSize: "0.85rem", fontWeight: 500 }}>
                          Your session is protected with enterprise-grade security
                        </Typography>
                      </Box>

                      {/* Forgot Password Link */}
                      <Box sx={{ textAlign: "right" }}>
                        <Button
                          variant="text"
                          sx={{
                            color: "#4285f4",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "rgba(66, 133, 244, 0.04)",
                            },
                          }}
                          onClick={() => navigate("/forgot-password")}
                        >
                          Forgot Password?
                        </Button>
                      </Box>

                      {/* Login Button */}
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        disabled={!isFormValid() || loading}
                        sx={{
                          background: isFormValid() ? "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)" : "#e9ecef",
                          color: isFormValid() ? "white" : "#6c757d",
                          borderRadius: 3,
                          py: 2.5,
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: isFormValid() ? "0 8px 25px rgba(66, 133, 244, 0.4)" : "none",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            background: isFormValid() ? "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" : "#e9ecef",
                            transform: isFormValid() ? "translateY(-2px)" : "none",
                            boxShadow: isFormValid() ? "0 12px 35px rgba(66, 133, 244, 0.5)" : "none",
                            animation: isFormValid() ? `${pulse} 2s infinite` : "none",
                          },
                          "&:disabled": {
                            background: "#e9ecef",
                            color: "#6c757d",
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
                            left: isFormValid() ? "100%" : "-100%",
                          },
                        }}
                      >
                        {loading ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <CircularProgress size={24} color="inherit" />
                            Authenticating...
                          </Box>
                        ) : (
                          <>
                            <LoginIcon sx={{ mr: 1.5 }} />
                            Access Lender Portal
                          </>
                        )}
                      </Button>

                      <Divider sx={{ my: 2 }}>
                        <Typography variant="body2" sx={{ color: "#8e9aaf", px: 2 }}>
                          New to NLC Platform?
                        </Typography>
                      </Divider>

                      {/* Register Link */}
                      <Button
                        fullWidth
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/register")}
                        sx={{
                          borderColor: "rgba(66, 133, 244, 0.3)",
                          color: "#4285f4",
                          borderRadius: 3,
                          py: 2,
                          fontSize: "1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#4285f4",
                            bgcolor: "rgba(66, 133, 244, 0.04)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 4px 15px rgba(66, 133, 244, 0.2)",
                          },
                        }}
                      >
                        <BankIcon sx={{ mr: 1 }} />
                        Apply for Lender Account
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                {/* Footer */}
                <Box sx={{ textAlign: "center", mt: 4 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.9rem",
                    }}
                  >
                    © 2025 NLC Platform. All rights reserved. | SOC 2 Type II Certified
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
