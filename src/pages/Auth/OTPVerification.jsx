"use client"

import { useState, useRef } from "react"
import { useNavigate, useSearchParams, useLocation} from "react-router-dom"
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
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material"
import {
  MarkEmailRead as EmailIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material"
import { verifyAccountAPI, verifyAccountLendersAPI } from "../../apis"

const OTPVerification = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const role = location.pathname.split('/')[1]
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  let[searchParams] = useSearchParams()
  const registerdEmail = searchParams.get('Registeremail')


  // Refs for OTP inputs
  const inputRefs = useRef([])

  // Get email from navigation state or use default
  const userEmail = registerdEmail


  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user starts typing
    if (error) setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit)
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    setError("")

    try {
      if (role === 'borrower') {
        await verifyAccountAPI({ otpCode: otpString, email: registerdEmail })
        setSuccess(true)
        setTimeout(() => navigate('/login/borrower'), 2000)
      } else if (role === 'lender') {
        await verifyAccountLendersAPI({ otpCode: otpString, email: registerdEmail })
        setSuccess(true)
        setTimeout(() => navigate('/login/lender'), 2000)
      } else {
        throw new Error('Unsupported role')
      }

    } catch (err) {
      setError("Verification failed. Please try again.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }




  const isOtpComplete = otp.every((digit) => digit !== "")

  if (success) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          m: 0,
        }}
      >
        <Container maxWidth="sm">
          <Fade in={true} timeout={600}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                border: "1px solid #e9ecef",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                textAlign: "center",
                p: 4,
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    bgcolor: "#4caf50",
                    color: "white",
                  }}
                >
                  <CheckIcon sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography variant="h4" sx={{ color: "#2c3e50", mb: 2, fontWeight: 600 }}>
                  Verification Successful!
                </Typography>

                <Typography variant="body1" sx={{ color: "#6c757d", mb: 3 }}>
                  Your account has been verified successfully. Redirecting to dashboard...
                </Typography>

                <CircularProgress size={24} sx={{ color: "#4285f4" }} />
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    )
  }

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
              onClick={() => navigate("/register/borrower")}
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
                  width: 64,
                  height: 64,
                  mx: "auto",
                  mb: 3,
                  background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(66, 133, 244, 0.3)",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%": {
                      transform: "translateY(0px)",
                    },
                    "50%": {
                      transform: "translateY(-10px)",
                    },
                    "100%": {
                      transform: "translateY(0px)",
                    },
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 32 }} />
              </Avatar>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  mb: 1,
                }}
              >
                Verify Your Email
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#6c757d",
                  mb: 1,
                }}
              >
                We've sent a 6-digit verification code to
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#4285f4",
                  fontWeight: 500,
                  mb: 3,
                }}
              >
                {userEmail}
              </Typography>

              
            </Box>
          </Box>
        </Fade>

        {/* Main Card */}
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
              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError("")}>
                  {error}
                </Alert>
              )}

              {/* OTP Input Fields */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#2c3e50",
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  Enter Verification Code
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: "1.5rem",
                          fontWeight: "600",
                          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                          color: "#2c3e50",
                        },
                      }}
                      sx={{
                        width: 56,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          height: 56,
                          background: digit
                            ? "linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, rgba(66, 133, 244, 0.02) 100%)"
                            : "white",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#4285f4",
                            },
                          },
                          "&.Mui-focused": {
                            background:
                              "linear-gradient(135deg, rgba(66, 133, 244, 0.08) 0%, rgba(66, 133, 244, 0.04) 100%)",
                            transform: "scale(1.05)",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#4285f4",
                              borderWidth: 2,
                              boxShadow: "0 0 0 3px rgba(66, 133, 244, 0.1)",
                            },
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
                </Box>

                {/* Verify Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleVerifyOtp}
                  disabled={!isOtpComplete || loading}
                  sx={{
                    background: isOtpComplete ? "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)" : "#e9ecef",
                    color: isOtpComplete ? "white" : "#6c757d",
                    borderRadius: 2,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&::before": isOtpComplete
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          animation: loading ? "none" : "shimmer 2s infinite",
                          "@keyframes shimmer": {
                            "0%": { left: "-100%" },
                            "100%": { left: "100%" },
                          },
                        }
                      : {},
                    "&:hover": {
                      background: isOtpComplete ? "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" : "#e9ecef",
                      transform: isOtpComplete ? "translateY(-2px)" : "none",
                      boxShadow: isOtpComplete ? "0 6px 20px rgba(66, 133, 244, 0.4)" : "none",
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
                      Verifying your code...
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon sx={{ fontSize: 20 }} />
                      Verify Code
                    </Box>
                  )}
                </Button>
    

              {/* Help Text */}
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "#8e9aaf", fontSize: "0.875rem" }}>
                  Having trouble? Check your spam folder or{" "}
                  <Button
                    variant="text"
                    sx={{
                      color: "#4285f4",
                      textDecoration: "underline",
                      p: 0,
                      minWidth: "auto",
                      textTransform: "none",
                      fontSize: "0.875rem",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    contact support
                  </Button>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  )
}

export default OTPVerification
