import { Card, CardContent, Box, Typography, Avatar, Button } from "@mui/material"
import { Phone as PhoneIcon, Email as EmailIcon, Edit as EditIcon, Person as PersonIcon } from "@mui/icons-material"
import { keyframes } from "@mui/system"

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
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const slideIn = keyframes`
  0% {
    transform: translateX(-5px);
    opacity: 0.7;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

const ProfileSection = () => {
  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "white",
        border: "1px solid #dee2e6",
        boxShadow: "none",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          border: "1px solid #20bf6b",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #20bf6b 0%, #26d0ce 50%, #1ea557 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Profile Avatar with Animation */}
          <Box sx={{ position: "relative" }}>
            <Avatar
              src="https://res.cloudinary.com/sonpham811205/image/upload/v1745545657/dataEmployer/s0pxwnofrg8at89x8bjq.jpg"
              sx={{
                width: 130,
                height: 130,
                borderRadius: 3,
                border: "3px solid #20bf6b",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(32, 191, 107, 0.3)",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "#20bf6b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
                animation: `${pulse} 2s infinite`,
              }}
            >
              <PersonIcon sx={{ fontSize: 14, color: "white" }} />
            </Box>
          </Box>

          {/* Profile Information */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  background: "linear-gradient(45deg, #2c3e50 0%, #34495e 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sơn Phạm
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#20bf6b",
                  animation: `${pulse} 2s infinite`,
                }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: "#6c757d",
                fontSize: "1rem",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Software Engineer
            </Typography>

            {/* Contact Information with Icons */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                </Box>
                <Typography variant="body2" sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  012 345 6789
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "#fff3e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmailIcon sx={{ fontSize: 16, color: "#f57c00" }} />
                </Box>
                <Typography variant="body2" sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  underwriter@example.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Animated Edit Button */}
          <Box sx={{ flexShrink: 0 }}>
            <Button
              variant="contained"
              startIcon={
                <EditIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    ".MuiButton-root:hover &": {
                      transform: "rotate(15deg)",
                      animation: `${slideIn} 0.3s ease`,
                    },
                  }}
                />
              }
              sx={{
                background: "linear-gradient(45deg, #f39c12 0%, #e67e22 100%)",
                color: "white",
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontSize: "0.8rem",
                fontWeight: 600,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #e67e22 0%, #d35400 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(243, 156, 18, 0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-200px",
                  width: "200px",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover::before": {
                  left: "100%",
                  animation: `${shimmer} 0.8s ease-in-out`,
                },
                "&:active": {
                  transform: "translateY(0px)",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProfileSection
