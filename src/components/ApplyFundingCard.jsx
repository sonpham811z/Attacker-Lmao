import { Card, CardContent, Box, Typography, Button } from "@mui/material"
import { ArrowForward as ArrowForwardIcon, TrendingUp as TrendingUpIcon } from "@mui/icons-material"
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

const ApplyFundingCard = () => {
  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: "white",
        border: "1px solid #dee2e6",
        boxShadow: "none",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          border: "1px solid #f39c12",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #f39c12 0%, #e67e22 50%, #d35400 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <TrendingUpIcon sx={{ color: "#f39c12", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  background: "linear-gradient(45deg, #2c3e50 0%, #34495e 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Apply For Funding Today !
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.5,
                mb: 1,
              }}
            >
              No Obligations, Credit Check, Or Hidden Costs!
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#20bf6b",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#20bf6b",
                    animation: `${pulse} 2s infinite`,
                  }}
                />
                Fast Approval
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "#4285f4",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#4285f4",
                    animation: `${pulse} 2s infinite 0.5s`,
                  }}
                />
                Secure Process
              </Box>
            </Box>
          </Box>

          {/* Animated Button */}
          <Box sx={{ flexShrink: 0, ml: 3 }}>
            <Button
              variant="contained"
              endIcon={
                <ArrowForwardIcon
                  sx={{
                    transition: "transform 0.3s ease",
                    ".MuiButton-root:hover &": {
                      transform: "translateX(4px)",
                      animation: `${slideIn} 0.3s ease`,
                    },
                  }}
                />
              }
              sx={{
                background: "linear-gradient(45deg, #f39c12 0%, #e67e22 100%)",
                color: "white",
                borderRadius: 3,
                px: 4,
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
              Get Started
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ApplyFundingCard
