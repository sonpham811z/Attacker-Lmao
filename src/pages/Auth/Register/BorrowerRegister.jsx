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
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  PhotoCamera as CameraIcon,
  Delete as DeleteIcon,
  AppRegistration as RegisterIcon,
} from "@mui/icons-material"
import { registerAccountAPI } from "../../../apis"
import { toast } from "react-toastify"

const BorrowerRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    fullName: "",
    occupation: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "File size must not exceed 5MB" })
        return
      }

      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setErrors({ ...errors, image: "" })
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setImagePreview(null)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name"
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Please enter your occupation"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter your phone number"
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = "Please enter your ID number"
    } else if (!/^[0-9]{12}$/.test(formData.idNumber)) {
      newErrors.idNumber = "ID number must be 12 digits"
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

    if (!uploadedImage) {
      newErrors.image = "Please upload your photo"
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

      for(const key in formData) {
        formDataToSend.append(key, formData[key])
      }

      if(uploadedImage) {
        formDataToSend.append('avatar', uploadedImage)
      }

      await registerAccountAPI(formDataToSend)
      navigate(`/borrower/verify-otp?Registeremail=${formData.email}`)
      
    } catch (error) {
      toast.error("Register error")
      console.log(error)
    } finally {
      setLoading(false)
    }

   
  }

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.occupation &&
      formData.email &&
      formData.phoneNumber &&
      formData.idNumber &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      uploadedImage &&
      agreedToTerms &&
      Object.keys(errors).length === 0
    )
  }

  const completedFields = Object.values(formData).filter((value) => value.trim()).length + (uploadedImage ? 1 : 0)
  const progress = (completedFields / 8) * 100

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
                  bgcolor: "#4285f4",
                  color: "white",
                }}
              >
                <PersonIcon />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  mb: 1,
                }}
              >
                Borrower Registration
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#6c757d",
                  mb: 3,
                }}
              >
                Complete your information to start your lending journey
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#e9ecef",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#4285f4",
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: "#6c757d", mt: 1, display: "block" }}>
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
              border: "1px solid #e9ecef",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4} justifyContent="center">
                {/* Profile Photo */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Profile Photo
                  </Typography>

                  <Box
                    sx={{
                      border: `2px dashed ${errors.image ? "#f44336" : "#e9ecef"}`,
                      borderRadius: 2,
                      p: 4,
                      textAlign: "center",
                      bgcolor: errors.image ? "rgba(244, 67, 54, 0.02)" : "#fafbfc",
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
                        borderColor: errors.image ? "#f44336" : "#4285f4",
                        bgcolor: errors.image ? "rgba(244, 67, 54, 0.04)" : "rgba(66, 133, 244, 0.02)",
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
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

                    {imagePreview ? (
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          src={imagePreview}
                          sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            mb: 2,
                            border: "3px solid #4285f4",
                          }}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation()
                            removeImage()
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
                        <CameraIcon sx={{ fontSize: 48, color: "#6c757d", mb: 2 }} />
                        <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 500, mb: 1 }}>
                          Upload Profile Photo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click or drag to upload (Max 5MB)
                        </Typography>
                      </>
                    )}
                  </Box>

                  {errors.image && (
                    <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: "center" }}>
                      {errors.image}
                    </Typography>
                  )}
                </Grid>

                {/* Personal Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#2c3e50",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Personal Information
                  </Typography>

                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange("fullName")}
                        error={!!errors.fullName}
                        helperText={errors.fullName}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Occupation"
                        value={formData.occupation}
                        onChange={handleInputChange("occupation")}
                        error={!!errors.occupation}
                        helperText={errors.occupation}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="ID Number"
                        value={formData.idNumber}
                        onChange={handleInputChange("idNumber")}
                        error={!!errors.idNumber}
                        helperText={errors.idNumber}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
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
                      bgcolor: "#fafbfc",
                      borderRadius: 2,
                      p: 3,
                      border: `1px solid ${errors.terms ? "#f44336" : "#e9ecef"}`,
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
                            color: "#4285f4",
                            "&.Mui-checked": {
                              color: "#4285f4",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: "#2c3e50" }}>
                          I agree to the{" "}
                          <Button
                            variant="text"
                            sx={{
                              color: "#4285f4",
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
                          of NLC Platform
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
                    // disabled={!isFormValid() || loading}
                    sx={{
                      bgcolor: "#4285f4",
                      width: '450px',
                      height: '40px',
                      color:  "white" ,
                      borderRadius: 2,
                      py: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor:  "#1976d2" ,
                        transform: isFormValid() ? "translateY(-1px)" : "none",
                        boxShadow: isFormValid() ? "0 4px 12px rgba(66, 133, 244, 0.3)" : "none",
                      },
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CircularProgress size={20} color="inherit" />
                        Processing...
                      </Box>
                    ) : (
                      <>
                        <RegisterIcon sx={{mr: 1 }} />
                        Register
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

export default BorrowerRegister