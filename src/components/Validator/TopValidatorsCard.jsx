"use client"
import { Card, CardContent, Typography, Box, Chip, Stack, Divider } from "@mui/material"
import { EmojiEvents as EmojiEventsIcon, TrendingUp as TrendingUpIcon } from "@mui/icons-material"
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

const leaderboard = [
  { name: "Validator01", score: 120, icon: <EmojiEventsIcon />, trend: "+5%" },
  { name: "Validator02", score: 110, trend: "+3%" },
  { name: "Validator03", score: 98, trend: "+2%" },
  { name: "You", score: 85, trend: "+8%" },
]

const TopValidatorsCard = ({ darkMode = false }) => {
  return (
    <Card
      sx={{
        width: 400,
        borderRadius: 3,
        border: "1px solid #e9ecef",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        background: darkMode
          ? "linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.8) 100%)"
          : "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 35px rgba(255, 215, 0, 0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #ffd700 0%, #ffb347 50%, #ff8c00 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <EmojiEventsIcon sx={{ color: "#ffd700", fontSize: 28 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: darkMode ? "#fff" : "#2c3e50",
                fontSize: "1.1rem",
                mb: 0.5,
              }}
            >
              Top Validators
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.6)" : "#6c757d",
                fontSize: "0.8rem",
              }}
            >
              Top performers this month
            </Typography>
          </Box>
          <Chip
            label="Top"
            size="small"
            sx={{
              bgcolor: "rgba(255, 215, 0, 0.1)",
              color: "#ffd700",
              fontWeight: 600,
              border: "1px solid rgba(255, 215, 0, 0.3)",
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          {leaderboard.map((item, idx) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor:
                  idx === 0
                    ? "rgba(255, 215, 0, 0.05)"
                    : item.name === "You"
                      ? "rgba(67, 133, 244, 0.05)"
                      : "rgba(32, 191, 107, 0.05)",
                border:
                  idx === 0
                    ? "1px solid rgba(255, 215, 0, 0.2)"
                    : item.name === "You"
                      ? "1px solid rgba(67, 133, 244, 0.2)"
                      : "1px solid rgba(32, 191, 107, 0.1)",
                transition: "all 0.3s ease",
                animation: `${fadeInUp} 0.6s ease-out ${idx * 0.1}s both`,
                "&:hover": {
                  transform: "translateX(4px)",
                  bgcolor:
                    idx === 0
                      ? "rgba(255, 215, 0, 0.08)"
                      : item.name === "You"
                        ? "rgba(67, 133, 244, 0.08)"
                        : "rgba(32, 191, 107, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: idx === 0 ? "#ffd700" : item.name === "You" ? "#4285f4" : "#20bf6b",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {idx === 0 ? item.icon : idx + 1}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  fontWeight={700}
                  color={idx === 0 ? "#f39c12" : item.name === "You" ? "#4285f4" : "#20bf6b"}
                  sx={{ fontSize: "0.95rem" }}
                >
                  {item.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                    {item.score} điểm
                  </Typography>
                  <Chip
                    label={item.trend}
                    size="small"
                    color="success"
                    variant="outlined"
                    icon={<TrendingUpIcon />}
                    sx={{ height: 20, fontSize: "0.7rem" }}
                  />
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TopValidatorsCard
