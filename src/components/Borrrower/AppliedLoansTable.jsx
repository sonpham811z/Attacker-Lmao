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
  IconButton,
  Avatar,
  LinearProgress,
} from "@mui/material"
import {
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  TableChart as TableChartIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
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

const loanData = [
  {
    id: "NLCID25001",
    company: "ZXC LLC",
    type: "Fix & Flip",
    underwriter: "Jamie Komle",
    affiliate: "Prestige Global",
    amount: "N/A",
    status: "Approved",
    progress: 85,
    avatar: "/placeholder.svg?height=40&width=40&text=ZXC",
    priority: "high",
  },
  {
    id: "NLCID25002",
    company: "ZXC LLC",
    type: "Fix & Flip",
    underwriter: "Jamie Komle",
    affiliate: "Prestige Global",
    amount: "$20,000.00",
    status: "Approved",
    progress: 100,
    avatar: "/placeholder.svg?height=40&width=40&text=ZXC",
    priority: "medium",
  },
  {
    id: "NLCID25003",
    company: "ABC Corp",
    type: "Commercial",
    underwriter: "Sarah Wilson",
    affiliate: "Elite Partners",
    amount: "$50,000.00",
    status: "Pending",
    progress: 45,
    avatar: "/placeholder.svg?height=40&width=40&text=ABC",
    priority: "high",
  },
  {
    id: "NLCID25004",
    company: "DEF Holdings",
    type: "Residential",
    underwriter: "Mike Johnson",
    affiliate: "Prime Lending",
    amount: "$35,000.00",
    status: "Under Review",
    progress: 60,
    avatar: "/placeholder.svg?height=40&width=40&text=DEF",
    priority: "low",
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "success"
    case "Pending":
      return "warning"
    case "Under Review":
      return "info"
    default:
      return "default"
  }
}


const AppliedLoansTable = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
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
      <CardContent sx={{ p: 0 }}>
        {/* Enhanced Header */}
        <Box sx={{ p: 3, borderBottom: "1px solid #f0f0f0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TableChartIcon sx={{ color: "#4285f4", fontSize: 28 }} />
              <Box>
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
                  Applied Loans
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                  Manage Your Loan Applications Effortlessly
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
                  4 Active
                </Typography>
              </Box>

              <TrendingUpIcon
                sx={{
                  color: "#20bf6b",
                  fontSize: 24,
                  animation: `${float} 3s ease-in-out infinite`,
                }}
              />

              <IconButton
                sx={{
                  bgcolor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                    border: "1px solid #4285f4",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Enhanced Table - Fixed Layout */}
        <TableContainer sx={{ overflow: "hidden" }}>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "19%"
                  }}
                >
                  Company
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "18%",
                  }}
                >
                  Loan Details
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "15%",
                  }}
                >
                  Underwriter
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "12%",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "15%",
                  }}
                >
                  Progress
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "12%",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 2.5,
                    border: "none",
                    color: "#2c3e50",
                    width: "9%",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanData.map((loan, index) => (
                <TableRow
                  key={loan.id}
                  sx={{
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#f8f9fa",
                      "& .action-button": {
                        transform: "scale(1.1)",
                        bgcolor: "#e3f2fd",
                      },
                      "& .company-avatar": {
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      },
                      "& .progress-bar": {
                        animation: `${shimmer} 1s ease-in-out`,
                      },
                    },
                    borderBottom: index === loanData.length - 1 ? "none" : "1px solid #f0f0f0",
                    
                    "&:hover::before": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Company */}
                  <TableCell sx={{ py: 3, border: "none", width: "20%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        className="company-avatar"
                        src={loan.avatar}
                        sx={{
                          width: 45,
                          height: 45,
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          border: "2px solid #fff",
                          transition: "all 0.3s ease",
                          flexShrink: 0,
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "#2c3e50",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {loan.company}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6c757d",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {loan.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Loan Details */}
                  <TableCell sx={{ py: 3, border: "none", width: "18%" }}>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          color: "#2c3e50",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {loan.type}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6c757d",
                          fontSize: "0.8rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {loan.affiliate}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Underwriter */}
                  <TableCell sx={{ py: 3, border: "none", width: "15%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "#2c3e50",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {loan.underwriter}
                    </Typography>
                  </TableCell>

                  {/* Amount */}
                  <TableCell sx={{ py: 3, border: "none", width: "12%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: loan.amount !== "N/A" ? 700 : 500,
                        color: loan.amount !== "N/A" ? "#2c3e50" : "#6c757d",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {loan.amount}
                    </Typography>
                  </TableCell>

                  {/* Progress */}
                  <TableCell sx={{ py: 3, border: "none", width: "15%" }}>
                    <Box sx={{ width: "100%", maxWidth: 100 }}>
                      <LinearProgress
                        className="progress-bar"
                        variant="determinate"
                        value={loan.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "#f0f0f0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: loan.progress === 100 ? "#20bf6b" : "#f39c12",
                            borderRadius: 4,
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                              animation: `${shimmer} 2s infinite`,
                            },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6c757d",
                          fontSize: "0.75rem",
                          mt: 0.5,
                          fontWeight: 600,
                        }}
                      >
                        {loan.progress}%
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Status */}
                  <TableCell sx={{ py: 3, border: "none", width: "12%" }}>
                    <Chip
                      label={loan.status}
                      color={getStatusColor(loan.status)}
                      size="small"
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        height: 28,
                        maxWidth: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Action */}
                  <TableCell sx={{ py: 3, border: "none", width: "8%" }}>
                    <IconButton
                      className="action-button"
                      size="small"
                      sx={{
                        bgcolor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "#e3f2fd",
                          border: "1px solid #4285f4",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default AppliedLoansTable
