"use client"

import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  TableChart as TableChartIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material"
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
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`

const loanRequests = [
  {
    id: "LR001",
    borrower: "Nguyễn Văn A",
    company: "ABC Trading Co.",
    amount: "$50,000",
    interest: "8.5%",
    duration: "12 tháng",
    creditScore: 742,
    collateral: "RWA-NFT #123",
    riskLevel: "Thấp",
    status: "Mới",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
  },
  {
    id: "LR002",
    borrower: "Trần Thị B",
    company: "XYZ Manufacturing",
    amount: "$75,000",
    interest: "9.2%",
    duration: "18 tháng",
    creditScore: 698,
    collateral: "Bất động sản",
    riskLevel: "Trung bình",
    status: "Đang xem xét",
    avatar: "/placeholder.svg?height=40&width=40&text=B",
  },
  {
    id: "LR003",
    borrower: "Lê Văn C",
    company: "Tech Startup Ltd",
    amount: "$25,000",
    interest: "7.8%",
    duration: "6 tháng",
    creditScore: 785,
    collateral: "Không",
    riskLevel: "Thấp",
    status: "Ưu tiên",
    avatar: "/placeholder.svg?height=40&width=40&text=C",
  },
  {
    id: "LR004",
    borrower: "Phạm Thị D",
    company: "Green Energy Co.",
    amount: "$100,000",
    interest: "10.1%",
    duration: "24 tháng",
    creditScore: 654,
    collateral: "RWA-NFT #456",
    riskLevel: "Cao",
    status: "Mới",
    avatar: "/placeholder.svg?height=40&width=40&text=D",
  },
]
// ...existing code...

const getStatusColor = (status) => {
  switch (status) {
    case "Ưu tiên":
      return "error"
    case "Mới":
      return "success"
    case "Đang xem xét":
      return "warning"
    default:
      return "default"
  }
}

const getRiskColor = (risk) => {
  switch (risk) {
    case "Thấp":
      return "#20bf6b"
    case "Trung bình":
      return "#f39c12"
    case "Cao":
      return "#e74c3c"
    default:
      return "#6c757d"
  }
}

// ...existing code...
import { useState } from "react"

const LoanRequestsTable = ({ requests = [], onInvest }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleOpen = (request) => {
    setSelected(request)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  return (
    <>
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
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TableChartIcon sx={{ color: "#20bf6b", fontSize: 28 }} />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#2c3e50",
                    }}
                  >
                    Yêu cầu Vay Mới
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                    Danh sách các cơ hội đầu tư tiềm năng
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                  <Typography variant="body2" sx={{ color: "#20bf6b", fontWeight: 600, fontSize: "0.85rem" }}>
                    {requests.length} Yêu cầu
                  </Typography>
                </Box>

                <TrendingUpIcon
                  sx={{
                    color: "#20bf6b",
                    fontSize: 24,
                    animation: `${float} 3s ease-in-out infinite`,
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Người vay
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Thông tin vay
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Điểm tín dụng
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Tài sản thế chấp
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Rủi ro
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Trạng thái
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.9rem", py: 2.5, border: "none", color: "#2c3e50" }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request, index) => (
                  <TableRow
                    key={request.id}
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "#f8f9fa",
                        "& .action-button": {
                          transform: "scale(1.1)",
                          bgcolor: "#e3f2fd",
                        },
                      },
                      borderBottom: index === requests.length - 1 ? "none" : "1px solid #f0f0f0",
                    }}
                  >
                    {/* Borrower */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          src={request.avatar}
                          sx={{
                            width: 45,
                            height: 45,
                            bgcolor: "#e3f2fd",
                            color: "#1976d2",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#2c3e50" }}>
                            {request.borrower}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#6c757d", fontSize: "0.8rem" }}>
                            {request.company}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Loan Info */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#2c3e50" }}>
                          {request.amount}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#6c757d", fontSize: "0.8rem" }}>
                          {request.interest} • {request.duration}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Credit Score */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color:
                              request.creditScore >= 700 ? "#20bf6b" : request.creditScore >= 600 ? "#f39c12" : "#e74c3c",
                          }}
                        >
                          {request.creditScore}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(request.creditScore / 850) * 100}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor:
                                request.creditScore >= 700
                                  ? "#20bf6b"
                                  : request.creditScore >= 600
                                    ? "#f39c12"
                                    : "#e74c3c",
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* Collateral */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {request.collateral !== "Không" ? (
                          <>
                            <SecurityIcon sx={{ fontSize: 16, color: "#20bf6b" }} />
                            <Typography variant="body2" sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                              {request.collateral}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#6c757d", fontStyle: "italic" }}>
                            Không có
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    {/* Risk Level */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Chip
                        label={request.riskLevel}
                        size="small"
                        sx={{
                          bgcolor: `${getRiskColor(request.riskLevel)}20`,
                          color: getRiskColor(request.riskLevel),
                          fontWeight: 600,
                          borderRadius: 3,
                        }}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Chip
                        label={request.status}
                        color={getStatusColor(request.status)}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          borderRadius: 3,
                        }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell sx={{ py: 3, border: "none" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            className="action-button"
                            size="small"
                            onClick={() => handleOpen(request)}
                            sx={{
                              bgcolor: "#f8f9fa",
                              border: "1px solid #dee2e6",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: "#e3f2fd",
                                border: "1px solid #20bf6b",
                              },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AccountBalanceIcon />}
                          sx={{
                            background: "linear-gradient(135deg, #20bf6b 0%, #1abc9c 100%)",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            borderRadius: 2,
                            "&:hover": {
                              background: "linear-gradient(135deg, #1ea557 0%, #17a2b8 100%)",
                            },
                          }}
                          onClick={() => onInvest && onInvest(request.amount, request.interest)}
                        >
                          Cho vay
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog chi tiết */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#faf8f849', fontWeight: 700, fontSize: '1.2rem', textAlign: 'center', borderBottom: '1px solid #eee' }}>
          Chi tiết yêu cầu vay
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#f8f9fa', p: 0 }}>
          {selected && (
            <Box sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', bgcolor: 'white', maxWidth: 500, mx: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar src={selected.avatar} sx={{ width: 80, height: 80, border: '3px solid #e67e22', mb: 1 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#e67e22', mb: 0.5 }}>
                  {selected.borrower}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', mb: 1 }}>
                  {selected.company}
                </Typography>
                <Chip label={selected.status} color={getStatusColor(selected.status)} sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 1 }} />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Số tiền vay</Typography>
                  <Typography variant="h6" sx={{ color: '#f39c12', fontWeight: 700, mb: 2 }}>{selected.amount}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Lãi suất</Typography>
                  <Typography variant="h6" sx={{ color: '#20bf6b', fontWeight: 700, mb: 2 }}>{selected.interest}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Thời hạn</Typography>
                  <Typography variant="h6" sx={{ color: '#e67e22', fontWeight: 700, mb: 2 }}>{selected.duration}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Điểm tín dụng</Typography>
                  <Typography variant="h6" sx={{ color: selected.creditScore >= 700 ? '#20bf6b' : selected.creditScore >= 600 ? '#f39c12' : '#e74c3c', fontWeight: 700, mb: 2 }}>{selected.creditScore}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Tài sản thế chấp</Typography>
                  <Typography variant="h6" sx={{ color: '#9b59b6', fontWeight: 700, mb: 2 }}>{selected.collateral}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>Mức độ rủi ro</Typography>
                  <Chip label={selected.riskLevel} sx={{ bgcolor: `${getRiskColor(selected.riskLevel)}20`, color: getRiskColor(selected.riskLevel), fontWeight: 700, fontSize: '1rem', mb: 2 }} />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', bgcolor: '#f8f9fa' }}>
          <Button onClick={handleClose} color="warning" variant="contained" sx={{ fontWeight: 700, px: 4, borderRadius: 2 }}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoanRequestsTable
