"use client"
import { useState } from "react"
import { Card, CardContent, Typography, Box, Chip, Divider } from "@mui/material"
import { ShowChart as ShowChartIcon } from "@mui/icons-material"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts"
import { keyframes } from "@mui/system"

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

const pieData = [
  { name: "Đã hoàn thành", value: 120, color: "#20bf6b" },
  { name: "Đang xử lý", value: 8, color: "#f39c12" },
  { name: "Mới", value: 5, color: "#4285f4" },
]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
      />
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight={700} fontSize={14}>
        {payload.name}
      </text>
      <text x={ex} y={ey} textAnchor={cos >= 0 ? "start" : "end"} fill="#333" fontWeight={600} fontSize={12}>
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  )
}

const RequestProcessingChart = ({ darkMode = false }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = (_, index) => setActiveIndex(index)

  return (
    <Card
      sx={{
        height: 400,
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
          boxShadow: "0 12px 35px rgba(32, 191, 107, 0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #20bf6b 0%, #1abc9c 50%, #16a085 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <ShowChartIcon sx={{ color: "#20bf6b", fontSize: 28 }} />
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
              Tỉ lệ xử lý request
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: darkMode ? "rgba(255,255,255,0.6)" : "#6c757d",
                fontSize: "0.8rem",
              }}
            >
              Real-time analytics
            </Typography>
          </Box>
          <Chip
            label="Live"
            size="small"
            sx={{
              bgcolor: "rgba(32, 191, 107, 0.1)",
              color: "#20bf6b",
              fontWeight: 600,
              border: "1px solid rgba(32, 191, 107, 0.3)",
              animation: `${pulse} 2s infinite`,
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
            sx={{
                height: 280,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkMode ? "rgba(255,255,255,0.02)" : "rgba(32, 191, 107, 0.02)",
                borderRadius: 2,
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(32, 191, 107, 0.1)"}`,
            }}
            >
            <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
                {/* Biểu đồ tròn */}
                <Box sx={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => [`${value} requests`, name]}
                        contentStyle={{
                        background: darkMode ? "rgba(26, 26, 46, 0.95)" : "white",
                        border: "1px solid #e9ecef",
                        borderRadius: 8,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        color: darkMode ? "#fff" : "#333",
                        }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </Box>

                {/* Chú thích */}
                <Box sx={{ pl: 2, pr: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {pieData.map((entry, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                        sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: entry.color,
                        mr: 1,
                        }}
                    />
                    <Box sx={{ fontSize: 13, color: darkMode ? "#ddd" : "#333" }}>
                        {entry.name}
                    </Box>
                    </Box>
                ))}
                </Box>
            </Box>
            </Box>

      </CardContent>
    </Card>
  )
}

export default RequestProcessingChart
