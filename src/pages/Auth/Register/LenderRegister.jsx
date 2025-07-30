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
  Business as BusinessIcon,
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  AppRegistration as RegisterIcon,
} from "@mui/icons-material"
import { registerLenderAccountAPI } from "../../../apis"
import { toast } from "react-toastify"

const LenderRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [uploadedLogo, setUploadedLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    password: "",
    confirmPassword: "",
    companyWebsite: "",
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

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, logo: "File size must not exceed 5MB" })
        return
      }

      setUploadedLogo(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setErrors({ ...errors, logo: "" })
    }
  }

  const removeLogo = () => {
    setUploadedLogo(null)
    setLogoPreview(null)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Please enter your company name"
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = "Please enter your tax ID number"
    } else if (!/^[0-9]{10,13}$/.test(formData.taxId)) {
      newErrors.taxId = "Tax ID must be 10-13 digits"
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Please enter your company email"
    } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address"
    }

    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone = "Please enter your company phone number"
    } else if (!/^[0-9]{10,11}$/.test(formData.companyPhone)) {
      newErrors.companyPhone = "Please enter a valid phone number"
    }

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Please enter your contact address"
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

    if (!uploadedLogo) {
      newErrors.logo = "Please upload your company logo"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validateForm()) {
      return
    }

    if (!agreedToTerms) {
      setErrors({ terms: "Please agree to the terms and conditions" })
      return
    }

    setLoading(true)

    try {
      const formDataToSend = new FormData()

      for (const key in formData) {
        formDataToSend.append(key, formData[key])
      }

      if (uploadedLogo) {
        formDataToSend.append("companyLogo", uploadedLogo)
      }

      await registerLenderAccountAPI(formDataToSend)
      navigate(`/lender/verify-otp?Registeremail=${formData.companyEmail}`)
    } catch (error) {
      toast.error("Registration error")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.companyName &&
      formData.taxId &&
      formData.companyEmail &&
      formData.companyPhone &&
      formData.companyAddress &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      uploadedLogo &&
      agreedToTerms &&
      Object.keys(errors).length === 0
    )
  }

  const completedFields = Object.values(formData).filter((value) => value.trim()).length + (uploadedLogo ? 1 : 0)
  const progress = (completedFields / 12) * 100

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f8f9fa",
        py: 4,
        px: 0,
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ width: "100%" }}>
        {/* Header */}
        <Fade in={true} timeout={600}>
          <Box sx={{ mb: 4, position: "relative", textAlign: "center" }}>
            <IconButton
              onClick={() => navigate("/register")}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                bgcolor: "white",
                border: "1px solid #e9ecef",
                "&:hover": {
                  bgcolor: "#f8f9fa",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#1976d2",
                  color: "white",
                }}
              >
                <BusinessIcon />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#1565c0",
                  mb: 1,
                }}
              >
                Lender Registration
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#546e7a",
                  mb: 3,
                }}
              >
                Register your company to start providing lending services
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#e3f2fd",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#1976d2",
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: "#546e7a", mt: 1, display: "block" }}>
                  {Math.round(progress)}% Complete
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Main Form */}
        <Fade in={true} timeout={800}>
          <Card
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              border: "1px solid #e3f2fd",
              boxShadow: "0 4px 20px rgba(25, 118, 210, 0.08)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4} justifyContent="center">
                {/* Company Logo */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#1565c0",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Company Logo
                  </Typography>

                  <Box
                    sx={{
                      border: `2px dashed ${errors.logo ? "#f44336" : "#e3f2fd"}`,
                      borderRadius: 2,
                      p: 4,
                      textAlign: "center",
                      bgcolor: errors.logo ? "rgba(244, 67, 54, 0.02)" : "#fafbfc",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.3s ease",
                      minHeight: 300,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth: 400,
                      mx: "auto",
                      "&:hover": {
                        borderColor: errors.logo ? "#f44336" : "#1976d2",
                        bgcolor: errors.logo ? "rgba(244, 67, 54, 0.04)" : "rgba(25, 118, 210, 0.02)",
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />

                    {logoPreview ? (
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={logoPreview}
                          sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            mb: 2,
                            border: "3px solid #1976d2",
                            borderRadius: 2,
                          }}
                          variant="rounded"
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            removeLogo()
                          }}
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            bgcolor: "#f44336",
                            color: "white",
                            width: 32,
                            height: 32,
                            "&:hover": {
                              bgcolor: "#d32f2f",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <>
                        <BusinessIcon sx={{ fontSize: 48, color: "#90a4ae", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#1565c0", fontWeight: 500, mb: 1 }}>
                          Upload Company Logo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click or drag to upload (Max 5MB)
                        </Typography>
                      </>
                    )}
                  </Box>

                  {errors.logo && (
                    <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: "center" }}>
                      {errors.logo}
                    </Typography>
                  )}
                </Grid>

                {/* Company Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#1565c0",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Company Information
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        value={formData.companyName}
                        onChange={handleInputChange("companyName")}
                        error={!!errors.companyName}
                        helperText={errors.companyName}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Tax ID Number"
                        value={formData.taxId}
                        onChange={handleInputChange("taxId")}
                        error={!!errors.taxId}
                        helperText={errors.taxId}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Company Email Address"
                        type="email"
                        value={formData.companyEmail}
                        onChange={handleInputChange("companyEmail")}
                        error={!!errors.companyEmail}
                        helperText={errors.companyEmail}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Company Phone Number"
                        value={formData.companyPhone}
                        onChange={handleInputChange("companyPhone")}
                        error={!!errors.companyPhone}
                        helperText={errors.companyPhone}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Contact Address"
                        value={formData.companyAddress}
                        onChange={handleInputChange("companyAddress")}
                        error={!!errors.companyAddress}
                        helperText={errors.companyAddress}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Company website"
                        value={formData.companyWebsite}
                        onChange={handleInputChange("companyWebsite")}
                        error={!!errors.contactAddress}
                        helperText={errors.contactAddress}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#1976d2",
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
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
                      bgcolor: "#f3f8ff",
                      borderRadius: 2,
                      p: 3,
                      border: `1px solid ${errors.terms ? "#f44336" : "#e3f2fd"}`,
                      maxWidth: 400,
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
                            color: "#1976d2",
                            "&.Mui-checked": {
                              color: "#1976d2",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: "#1565c0" }}>
                          I agree to the{" "}
                          <Button
                            variant="text"
                            sx={{
                              color: "#1976d2",
                              textDecoration: "underline",
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            Terms and Conditions
                          </Button>{" "}
                          and{" "}
                          <Button
                            variant="text"
                            sx={{
                              color: "#1976d2",
                              textDecoration: "underline",
                              p: 0,
                              minWidth: "auto",
                              textTransform: "none",
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            Lender Agreement
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
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleRegister}
                    sx={{
                      bgcolor: "#1976d2",
                      width: "450px",
                      height: "40px",
                      color: "white",
                      borderRadius: 2,
                      py: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#1565c0",
                        transform: isFormValid() ? "translateY(-1px)" : "none",
                        boxShadow: isFormValid() ? "0 4px 12px rgba(25, 118, 210, 0.3)" : "none",
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={20} color="inherit" />
                        Processing Registration...
                      </Box>
                    ) : (
                      <>
                        <RegisterIcon sx={{ mr: 1 }} />
                        Register Company
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  )
}

export default LenderRegister
