"use client"

import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar } from "@mui/material"
import { CheckCircle, HourglassTop, TrendingUp } from "@mui/icons-material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import InvestmentStatsCard from "../../components/Lender/InvestmentStatsCard"
import { TrendingUp as PortfolioIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar"

import { useState } from "react"

const investmentRows = [
  {
    id: "LR001",
    company: "ABC Trading Co.",
    avatar: "/placeholder.svg?height=32&width=32&text=A",
    borrower: "Nguyễn Văn A",
    amount: "$50,000",
    interest: "8.5%",
    duration: "12 tháng",
    date: "01/07/2025",
    status: { label: "Đang hoạt động", color: "#20bf6b", bgcolor: "#eafaf1" },
    income: "$4,250",
    detail: "Khoản vay cho ABC Trading Co. với lãi suất ưu đãi, thế chấp RWA-NFT."
  },
  {
    id: "LR002",
    company: "XYZ Manufacturing",
    avatar: "/placeholder.svg?height=32&width=32&text=B",
    borrower: "Trần Thị B",
    amount: "$75,000",
    interest: "9.2%",
    duration: "18 tháng",
    date: "15/06/2025",
    status: { label: "Đang hoạt động", color: "#1976d2", bgcolor: "#e3f0ff" },
    income: "$10,350",
    detail: "Khoản vay doanh nghiệp sản xuất, lãi suất cao hơn, thời hạn dài."
  },
  {
    id: "LR003",
    company: "Tech Startup Ltd",
    avatar: "/placeholder.svg?height=32&width=32&text=C",
    borrower: "Lê Văn C",
    amount: "$25,000",
    interest: "7.8%",
    duration: "6 tháng",
    date: "20/05/2025",
    status: { label: "Đang hoạt động", color: "#9b59b6", bgcolor: "#f5e9fa" },
    income: "$975",
    detail: "Khoản vay cho startup công nghệ, không thế chấp, rủi ro thấp."
  },
]

const Portfolio = () => {
  const [selectedRow, setSelectedRow] = useState(null)
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
      <LenderSidebar/>
      <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
        <LenderTopBar />
        <Box sx={{ p: 3, width: "100%" }}>
        {/* Header */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PortfolioIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Danh mục Đầu tư
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Theo dõi hiệu suất và quản lý các khoản đầu tư của bạn
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Portfolio Stats */}
        <InvestmentStatsCard />

        {/* Investment Details Table - Beautiful MUI Table */}
        <Card sx={{ mt: 4, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Chi tiết các khoản đầu tư đang hoạt động
            </Typography>
            <TableContainer>
              <Table sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow sx={{ background: '#f5f6fa' }}>
                    <TableCell>Mã khoản vay</TableCell>
                    <TableCell>Công ty</TableCell>
                    <TableCell>Người vay</TableCell>
                    <TableCell align="right">Số tiền</TableCell>
                    <TableCell align="right">Lãi suất</TableCell>
                    <TableCell align="right">Kỳ hạn</TableCell>
                    <TableCell align="center">Ngày đầu tư</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                    <TableCell align="right">Thu nhập dự kiến</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investmentRows.map((row, idx) => (
                    <TableRow
                      key={row.id}
                      hover
                      onClick={() => setSelectedRow(idx)}
                      sx={{
                        cursor: 'pointer',
                        transition: '0.2s',
                        background: selectedRow === idx ? '#e3f2fd' : undefined,
                        boxShadow: selectedRow === idx ? '0 4px 16px #1976d233' : undefined,
                        transform: selectedRow === idx ? 'scale(1.01)' : 'scale(1)',
                        '&:hover': {
                          background: selectedRow === idx ? '#e3f2fd' : '#f0f3fa',
                          boxShadow: '0 2px 8px #1976d222',
                          transform: 'scale(1.01)',
                        },
                      }}
                    >
                      <TableCell><Chip label={row.id} color="primary" variant="outlined" /></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={row.avatar} sx={{ width: 32, height: 32 }} />
                          <Typography fontWeight={600}>{row.company}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.borrower}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.interest}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">
                        <Chip icon={<TrendingUp sx={{ color: row.status.color }} />} label={row.status.label} sx={{ bgcolor: row.status.bgcolor, color: row.status.color, fontWeight: 600 }} />
                      </TableCell>
                      <TableCell align="right">{row.income}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Hiển thị chi tiết khoản vay khi click */}
        {selectedRow !== null && (
          <Card sx={{ mt: 2, borderRadius: 3, boxShadow: '0 2px 12px #1976d233', bgcolor: '#fff' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={investmentRows[selectedRow].avatar} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: investmentRows[selectedRow].status.color }}>
                    {investmentRows[selectedRow].company}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888' }}>{investmentRows[selectedRow].borrower} • {investmentRows[selectedRow].date}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Số tiền:</b> {investmentRows[selectedRow].amount}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Lãi suất:</b> {investmentRows[selectedRow].interest} • <b>Kỳ hạn:</b> {investmentRows[selectedRow].duration}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Thu nhập dự kiến:</b> {investmentRows[selectedRow].income}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}><b>Trạng thái:</b> <span style={{ color: investmentRows[selectedRow].status.color }}>{investmentRows[selectedRow].status.label}</span></Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{investmentRows[selectedRow].detail}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Chip label="Đóng" color="primary" onClick={() => setSelectedRow(null)} sx={{ cursor: 'pointer', fontWeight: 600 }} />
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
      </Box>
    </Box>
  )
}

export default Portfolio
