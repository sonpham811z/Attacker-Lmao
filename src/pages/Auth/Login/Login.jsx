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
} from "@mui/material"
import {
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import { useDispatch } from 'react-redux'
import { loginBorrowerAPI } from "../../../redux/borrowerSlice"
import { toast } from "react-toastify"

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
      await dispatch(loginBorrowerAPI(formData)).unwrap();
      navigate('/borrower/dashboard')
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
            "radial-gradient(circle at 20% 80%, rgba(66, 133, 244, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(66, 133, 244, 0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="sm" sx={{ width: "100%", px: 4, position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Fade in={true} timeout={600}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
                mt: 3,
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
              <Typography variant="h5" sx={{ fontWeight: 700, color: "white", zIndex: 1 }}>
                NLC
              </Typography>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #2c3e50 0%, #4285f4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                fontSize: { xs: "2rem", md: "2.5rem" },
                letterSpacing: "-0.02em",
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6c757d",
                fontSize: "1rem",
                mb: 2,
              }}
            >
              Sign in to your account to continue
            </Typography>
          </Box>
        </Fade>

        {/* Login Form */}
        <Fade in={true} timeout={800}>
          <Card
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              border: "1px solid #e9ecef",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              overflow: "hidden",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
              },
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#6c757d" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4285f4",
                        },
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4285f4",
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4285f4",
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
                        <LockIcon sx={{ color: "#6c757d" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: "#6c757d" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4285f4",
                        },
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4285f4",
                        },
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#4285f4",
                    },
                  }}
                />

                {/* Forgot Password Link */}
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="text"
                    sx={{
                      color: "#4285f4",
                      textTransform: "none",
                      fontWeight: 500,
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
                    borderRadius: 2,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: isFormValid() ? "0 4px 12px rgba(66, 133, 244, 0.3)" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: isFormValid() ? "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" : "#e9ecef",
                      transform: isFormValid() ? "translateY(-2px)" : "none",
                      boxShadow: isFormValid() ? "0 8px 20px rgba(66, 133, 244, 0.4)" : "none",
                    },
                    "&:disabled": {
                      background: "#e9ecef",
                      color: "#6c757d",
                    },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CircularProgress size={20} color="inherit" />
                      Signing in...
                    </Box>
                  ) : (
                    <>
                      <LoginIcon sx={{ mr: 1 }} />
                      Sign In
                    </>
                  )}
                </Button>

                {/* Divider */}
                <Box sx={{ textAlign: "center", my: 2 }}>
                  <Typography variant="body2" sx={{ color: "#8e9aaf" }}>
                    Don't have an account?
                  </Typography>
                </Box>

                {/* Register Link */}
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/register")}
                  sx={{
                    borderColor: "#e9ecef",
                    color: "#4285f4",
                    borderRadius: 2,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#4285f4",
                      bgcolor: "rgba(66, 133, 244, 0.04)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  Create New Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Footer */}
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#8e9aaf",
                fontSize: "0.9rem",
              }}
            >
              © 2025 NLC Platform. All rights reserved.
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default Login
