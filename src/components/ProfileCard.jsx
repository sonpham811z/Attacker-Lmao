import { Card, CardContent, Box, Typography, Avatar, Button, Slide } from "@mui/material"
import { Phone as PhoneIcon, Email as EmailIcon, Edit as EditIcon, CheckCircle } from "@mui/icons-material"
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

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const ProfileCard = () => {
  return (
    <Slide in={true} direction="up" timeout={800}>
      <Card sx={{ width: 350, animation: `${fadeInUp} 0.8s ease-out` }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Avatar src="/placeholder.svg?height=80&width=80" sx={{ width: 80, height: 80 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Jonathan Doe
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Underwriter
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2">012 345 6789</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="body2">underwriter@example.com</Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  bgcolor: "#f39c12",
                  "&:hover": { bgcolor: "#e67e22" },
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          {/* Credit Score Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
              borderRadius: 3,
              p: 3,
              textAlign: "center",
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                animation: `${gradientShift} 4s ease infinite`,
                backgroundSize: "200% 200%",
              },
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                CREDIT SCORE
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                42
              </Typography>
              <CheckCircle sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Slide>
  )
}

export default ProfileCard
