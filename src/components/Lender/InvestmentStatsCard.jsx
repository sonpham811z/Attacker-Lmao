"use client"
import { Card, CardContent, Box, Typography, Grid, Avatar } from "@mui/material"
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material"
import { AreaChart, Area, XAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useState } from "react"
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

// Sample data for charts
const monthlyData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 61000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 67000 },
]

const portfolioData = [
  { name: "Bất động sản", value: 40, color: "#20bf6b", desc: "Đầu tư vào bất động sản, nhà đất, căn hộ." },
  { name: "Cho vay doanh nghiệp", value: 35, color: "#1976d2", desc: "Khoản vay cho các doanh nghiệp, công ty." },
  { name: "Cho vay cá nhân", value: 15, color: "#9b59b6", desc: "Khoản vay cho cá nhân, tiêu dùng, mua sắm." },
  { name: "Khác", value: 10, color: "#e74c3c", desc: "Các khoản đầu tư khác." },
]

const InvestmentStatsCard = () => {
  const [selected, setSelected] = useState(null)
  return (
    <>
      {/* Stats Cards Row */}
      <Grid container spacing={3} sx={{ mb: 1 }}>
        {/* ...existing code for stats cards... */}
        <Grid item xs={12} sm={6} md={3}>
          {/* ...Tổng đầu tư... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Tổng đầu tư
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    $2.4M
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      +12.5%
                    </Typography>
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                    animation: `${float} 3s ease-in-out infinite`,
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* ...Khoản vay hoạt động... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Khoản vay hoạt động
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    156
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      +8 tháng này
                    </Typography>
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                    animation: `${float} 3s ease-in-out infinite 1s`,
                  }}
                >
                  <AssessmentIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* ...ROI trung bình... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    ROI trung bình
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    12.5%
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      +2.1% so với tháng trước
                    </Typography>
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                    animation: `${float} 3s ease-in-out infinite 2s`,
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* ...Thu nhập tháng này... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Thu nhập tháng này
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    $45.2K
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TrendingUpIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      +18.3%
                    </Typography>
                  </Box>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 56,
                    height: 56,
                    animation: `${float} 3s ease-in-out infinite 3s`,
                  }}
                >
                  <MonetizationOnIcon sx={{ fontSize: 28 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={8}>
          {/* ...AreaChart... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              position: "relative",
              overflow: "hidden",
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mr: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50" }}>
                    Xu hướng Đầu tư
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    6 tháng gần đây
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 , ml: 8}}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#20bf6b",
                      animation: `${pulse} 2s infinite`,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#20bf6b", fontWeight: 600 }}>
                    Tăng trưởng ổn định
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#20bf6b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#20bf6b" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#20bf6b"
                      strokeWidth={3}
                      fill="url(#colorGreen)"
                      dot={{ fill: "#20bf6b", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: "#20bf6b", strokeWidth: 3, stroke: "#fff" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* ...PieChart... */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.13)",
              background: "linear-gradient(135deg, #f5d020 0%, #f53803 100%)",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              minHeight: 370,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #dcd817ff 0%, #22c9e6ff 50%, #d3c500ff 100%)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", mb: 1 }}>
                Phân bổ Danh mục
              </Typography>
              <Box sx={{ height: 220, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ percent, x, y, index }) => (
                        <text
                          x={x}
                          y={y}
                          fill={portfolioData[index].color}
                          fontSize={18}
                          fontWeight={700}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ cursor: 'pointer', filter: 'drop-shadow(0 1px 2px #fff8)' }}
                          onClick={() => setSelected(index)}
                        >
                          {`${Math.round(percent * 100)}%`}
                        </text>
                      )}
                      isAnimationActive={true}
                      onClick={(_, idx) => setSelected(idx)}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              {/* Hiển thị thông tin chi tiết khi chọn */}
              {selected !== null && (
                <Box sx={{ mt: 2, p: 2, bgcolor: '#fff', borderRadius: 2, color: '#222', boxShadow: '0 2px 8px #0001', minHeight: 80 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: portfolioData[selected].color, mb: 0.5 }}>
                    {portfolioData[selected].name} ({portfolioData[selected].value}%)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Giá trị: <b>{portfolioData[selected].value}% tổng danh mục</b>
                  </Typography>
                  <Typography variant="body2">{portfolioData[selected].desc}</Typography>
                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <span style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 600 }} onClick={() => setSelected(null)}>Đóng</span>
                  </Box>
                </Box>
              )}
              {/* Legend đẹp với icon và màu sắc */}
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {portfolioData.map((item, idx) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', opacity: selected === idx || selected === null ? 1 : 0.5 }} onClick={() => setSelected(idx)}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: '#fff', mr: 1 }}>
                      {/* icon có thể thêm sau nếu muốn */}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: item.color, minWidth: 120 }}>{item.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff', ml: 1 }}>{item.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  );
}

export default InvestmentStatsCard;

