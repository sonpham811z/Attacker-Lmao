import { Card, CardContent, Box, Typography } from "@mui/material"
import { TrendingUp, CheckCircle, ShowChart as ShowChartIcon } from "@mui/icons-material"
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts"
import { keyframes } from "@mui/system"
import { useSelector } from "react-redux"
import { selectCurrentBorrower } from "../../redux/borrowerSlice"

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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`

// Sample data for the area chart matching the image
const chartData = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 45 },
  { name: "May", value: 40 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 50 },
  { name: "Aug", value: 65 },
]

const CommunicationCard = () => {
  const borrower = useSelector(selectCurrentBorrower)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
      {/* Top Section - Performance Chart */}
      <Card
        sx={{
          flex: 1,
          bgcolor: "white",
          border: "1px solid #dee2e6",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            border: "1px solid #4285f4",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4285f4 0%, #1976d2 50%, #0d47a1 100%)",
          },
        }}
      >
        <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShowChartIcon sx={{ color: "#4285f4", fontSize: 24 }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #2c3e50 0%, #34495e 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Performance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                  Monthly Overview
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#20bf6b",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <TrendingUp
                sx={{
                  color: "#4285f4",
                  fontSize: 24,
                  animation: `${float} 3s ease-in-out infinite`,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1, minHeight: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285f4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4285f4" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  dy={5}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4285f4"
                  strokeWidth={3}
                  fill="url(#colorBlue)"
                  dot={{ fill: "#4285f4", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#4285f4", strokeWidth: 3, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: "#20bf6b",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#20bf6b",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              +23% Growth
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Section - Credit Score */}
      <Card
        sx={{
          flex: 1,
          border: "1px solid #dee2e6",
          boxShadow: "none",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            border: "1px solid #764ba2",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
            p: 3,
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
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "white",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontSize: "0.9rem",
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                CREDIT SCORE
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                fontSize: "3.5rem",
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                animation: `${float} 4s ease-in-out infinite`,
              }}
            >
              {borrower.creditScore}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
              <CheckCircle
                sx={{
                  fontSize: 28,
                  animation: `${pulse} 3s infinite`,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Excellent
              </Typography>
            </Box>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.6)",
                  animation: `${pulse} 2s infinite`,
                }}
              />
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.6)",
                  animation: `${pulse} 2s infinite 0.5s`,
                }}
              />
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.6)",
                  animation: `${pulse} 2s infinite 1s`,
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CommunicationCard
