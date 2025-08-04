"use client"

import { useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
  Fade,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material"
import {
  Shield as ShieldIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginValidatorAPI } from "../../../redux/validatorSlice"

const ValidatorLogin = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

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

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }

    // Clear login error
    if (loginError) {
      setLoginError("")
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setLoginError("")

    try {
      await dispatch(loginValidatorAPI(formData)).unwrap()
      navigate('/validator/dashboard')
    

      console.log("Đăng nhập thành công", formData)
      // Redirect to dashboard or handle successful login
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  const isFormValid = () => {
    return formData.email && formData.password && Object.keys(errors).length === 0
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Box>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 3,
                  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <ShieldIcon sx={{ fontSize: 40 }} />
              </Avatar>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Validator Login
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 400,
                }}
              >
                Đăng nhập vào hệ thống Validator
              </Typography>
            </Box>

            {/* Login Card */}
            <Card
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.95)",
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 1,
                    }}
                  >
                    Chào mừng trở lại!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#7f8c8d",
                    }}
                  >
                    Vui lòng đăng nhập để tiếp tục
                  </Typography>
                </Box>

                {/* Error Alert */}
                {loginError && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      "& .MuiAlert-message": {
                        fontWeight: 500,
                      },
                    }}
                  >
                    {loginError}
                  </Alert>
                )}

                {/* Login Form */}
                <Box component="form" sx={{ space: 3 }}>
                  {/* Email Field */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleInputChange("email")}
                      onKeyPress={handleKeyPress}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "#f8f9fa",
                          "&:hover": {
                            backgroundColor: "#f1f3f4",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#667eea",
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>

                  {/* Password Field */}
                  <Box sx={{ mb: 4 }}>
                    <TextField
                      fullWidth
                      label="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                      value={formData.password}
                      onChange={handleInputChange("password")}
                      onKeyPress={handleKeyPress}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{
                                color: "#667eea",
                                "&:hover": {
                                  backgroundColor: "rgba(102, 126, 234, 0.1)",
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
                          borderRadius: 2,
                          backgroundColor: "#f8f9fa",
                          "&:hover": {
                            backgroundColor: "#f1f3f4",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                              borderWidth: 2,
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#667eea",
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>

                  {/* Forgot Password Link */}
                  <Box sx={{ textAlign: "right", mb: 4 }}>
                    <Link
                      href="#"
                      sx={{
                        color: "#667eea",
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                          color: "#5a67d8",
                        },
                      }}
                    >
                      Quên mật khẩu?
                    </Link>
                  </Box>

                  {/* Login Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    disabled={!isFormValid() || loading}
                    sx={{
                      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      height: "56px",
                      borderRadius: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(45deg, #5a67d8 30%, #667eea 90%)",
                        transform: isFormValid() ? "translateY(-2px)" : "none",
                        boxShadow: isFormValid() ? "0 8px 25px rgba(102, 126, 234, 0.4)" : "none",
                      },
                      "&:disabled": {
                        background: "linear-gradient(45deg, #bbb 30%, #999 90%)",
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={24} color="inherit" />
                        Đang đăng nhập...
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LoginIcon />
                        Đăng nhập
                      </Box>
                    )}
                  </Button>

                  {/* Divider */}
                  <Divider sx={{ my: 4, color: "#bdc3c7" }}>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", px: 2 }}>
                      hoặc
                    </Typography>
                  </Divider>

                  {/* Sign Up Link */}
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body1" sx={{ color: "#7f8c8d", mb: 2 }}>
                      Chưa có tài khoản?
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={ () => navigate('/register/validator')}
                      startIcon={<SignUpIcon />}
                      sx={{
                        borderColor: "#667eea",
                        color: "#667eea",
                        borderRadius: 2,
                        height: "48px",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#5a67d8",
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                          color: "#5a67d8",
                        }
                      }}
                    >
                      Đăng ký Validator mới
                    </Button>
                  </Box>
                </Box>

              
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}

export default ValidatorLogin
