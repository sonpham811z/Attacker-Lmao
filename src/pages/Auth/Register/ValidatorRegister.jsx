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
  Grid,
  Avatar,
  Fade,
  FormControlLabel,
  Checkbox,
  IconButton,
  LinearProgress,
  CircularProgress,
} from "@mui/material"
import {
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  HowToReg as RegisterIcon,
  Shield as ShieldIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { registerValidatorAccountAPI  } from "../../../apis"

const ValidatorRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [uploadedAvatar, setUploadedAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    registrationCode: "",
    address: "",
    email: "",
    phone: "",
    iso: "",
    password: "",
    confirmPassword: "",
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

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avatar: "Kích thước file không được vượt quá 5MB" })
        return
      }

      setUploadedAvatar(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setErrors({ ...errors, avatar: "" })
    }
  }

  const removeAvatar = () => {
    setUploadedAvatar(null)
    setAvatarPreview(null)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn"
    }

    if (!formData.registrationCode.trim()) {
      newErrors.registrationCode = "Vui lòng nhập mã đăng ký"
    } else if (!/^[A-Z0-9]{6,12}$/.test(formData.registrationCode)) {
      newErrors.registrationCode = "Mã đăng ký phải có 6-12 ký tự (chữ hoa và số)"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ (10-11 số)"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ"
    }


    if (!formData.iso.trim()) {
      newErrors.iso = "Vui lòng nhập thông tin ISO"
    }

    if (!formData.password.trim()) {
        newErrors.password = "Please enter a password"
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }
  
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match"
      }

    if (!uploadedAvatar) {
      newErrors.avatar = "Vui lòng tải lên ảnh đại diện"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validateForm()) {
      return
    }

    if (!agreedToTerms) {
      setErrors({ terms: "Vui lòng đồng ý với điều khoản và điều kiện" })
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()

      for (const key in formData) {
        formDataToSend.append(key, formData[key])
      }

      if (uploadedAvatar) {
        formDataToSend.append("avatar", uploadedAvatar)
      }

      await registerValidatorAccountAPI(formDataToSend)
      navigate(`/validator/verify-otp?Registeremail=${formData.email}`)

      console.log("Đăng ký thành công", formData)
    } catch (error) {
      console.error("Lỗi đăng ký:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.name &&
      formData.registrationCode &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.iso &&
      uploadedAvatar &&
      agreedToTerms &&
      Object.keys(errors).length === 0
    )
  }

  const completedFields = Object.values(formData).filter((value) => value.trim()).length + (uploadedAvatar ? 1 : 0)
  const progress = (completedFields / 7) * 100

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
        px: 0,
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md" sx={{ width: "100%" }}>
        {/* Header */}
        <Fade in={true} timeout={600}>
          <Box sx={{ mb: 4, position: "relative", textAlign: "center" }}>
            <IconButton
              onClick={() => window.history.back()}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                bgcolor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 3,
                  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <ShieldIcon sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  mb: 2,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Đăng Ký Validator
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                Đăng ký để trở thành validator chính thức trong hệ thống
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ maxWidth: 500, mx: "auto" }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mt: 1,
                    display: "block",
                    fontWeight: 500,
                  }}
                >
                  {Math.round(progress)}% hoàn thành
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Main Form */}
        <Fade in={true} timeout={800}>
          <Card
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Grid container spacing={4} justifyContent="center">
                {/* Avatar Upload */}
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Ảnh Đại Diện
                  </Typography>

                  <Box
                    sx={{
                      border: `3px dashed ${errors.avatar ? "#f44336" : "#e3f2fd"}`,
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      bgcolor: errors.avatar ? "rgba(244, 67, 54, 0.02)" : "#fafbfc",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.3s ease",
                      minHeight: 280,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth: 400,
                      mx: "auto",
                      "&:hover": {
                        borderColor: errors.avatar ? "#f44336" : "#667eea",
                        bgcolor: errors.avatar ? "rgba(244, 67, 54, 0.04)" : "rgba(102, 126, 234, 0.02)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.15)",
                      },
                    }}
                  >
                    <Box
                      component="input"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />

                    {avatarPreview ? (
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={avatarPreview}
                          sx={{
                            width: 140,
                            height: 140,
                            mx: "auto",
                            mb: 2,
                            border: "4px solid #667eea",
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                          }}
                          variant="rounded"
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            removeAvatar()
                          }}
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "#f44336",
                            color: "white",
                            width: 36,
                            height: 36,
                            "&:hover": {
                              bgcolor: "#d32f2f",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box>
                        <PersonIcon sx={{ fontSize: 60, color: "#90a4ae", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600, mb: 1 }}>
                          Tải lên ảnh đại diện
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Nhấp hoặc kéo thả để tải lên (Tối đa 5MB)
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {errors.avatar && (
                    <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
                      {errors.avatar}
                    </Typography>
                  )}
                </Grid>

                {/* Form Fields */}
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 4,
                      textAlign: "center",
                    }}
                  >
                    Thông Tin Cá Nhân
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tên đầy đủ"
                        placeholder="Nhập tên đầy đủ của bạn"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Mã đăng ký"
                        placeholder="VD: VAL123456"
                        value={formData.registrationCode}
                        onChange={handleInputChange("registrationCode")}
                        error={!!errors.registrationCode}
                        helperText={errors.registrationCode}
                        inputProps={{ style: { textTransform: "uppercase" } }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        placeholder="0123456789"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ đầy đủ"
                        value={formData.address}
                        onChange={handleInputChange("address")}
                        error={!!errors.address}
                        helperText={errors.address}
                        rows={1}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>


                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="ISO"
                        placeholder="VD: ISO 27001:2013"
                        value={formData.iso}
                        onChange={handleInputChange("iso")}
                        error={!!errors.iso}
                        helperText={errors.iso}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                         type="password"
                        label="Confirm password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#667eea",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#667eea",
                          },
                        }}
                      />
                    </Grid>

                  </Grid>
                </Grid>

                {/* Terms and Conditions */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                      borderRadius: 3,
                      p: 4,
                      border: `2px solid ${errors.terms ? "#f44336" : "transparent"}`,
                      maxWidth: 600,
                      mx: "auto",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked)
                            if (errors.terms) {
                              setErrors({ ...errors, terms: "" })
                            }
                          }}
                          sx={{
                            color: "#667eea",
                            "&.Mui-checked": {
                              color: "#667eea",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
                          Tôi đồng ý với{" "}
                          <Button
                            variant="text"
                            sx={{
                              color: "#667eea",
                              textDecoration: "underline",
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                bgcolor: "transparent",
                                color: "#5a67d8",
                              },
                            }}
                          >
                            Điều khoản và Điều kiện
                          </Button>{" "}
                          và{" "}
                          <Button
                            variant="text"
                            sx={{
                              color: "#667eea",
                              textDecoration: "underline",
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                bgcolor: "transparent",
                                color: "#5a67d8",
                              },
                            }}
                          >
                            Thỏa thuận Validator
                          </Button>
                        </Typography>
                      }
                    />
                    {errors.terms && (
                      <Typography variant="body2" color="error" sx={{ mt: 1, ml: 4 }}>
                        {errors.terms}
                      </Typography>
                    )}
                  </Box>
                </Grid>

                {/* Action Button */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleRegister}
                    //   disabled={!isFormValid() }
                      sx={{
                        background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                        width: "400px",
                        height: "56px",
                        color: "white",
                        borderRadius: 3,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
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
                          Đang xử lý đăng ký...
                        </Box>
                      ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <RegisterIcon />
                          Đăng Ký Validator
                        </Box>
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>
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
                  color: "#0d3a84",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "hsla(217, 28.00%, 85.30%, 0.04)",
                  },
                }}
                onClick={() => navigate("/login/validator")}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
      </Container>
    </Box>
  )
}

export default ValidatorRegister
