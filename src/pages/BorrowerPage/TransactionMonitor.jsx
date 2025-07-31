"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Chip,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  Avatar,
} from "@mui/material"
import {
  Search,
  History,
  AccountBalanceWallet,
  OpenInNew,
  Info,
  AccountBalance,
  Receipt,
  Refresh,
} from "@mui/icons-material"
import TransactionHistoryTable from "../../components/Borrrower/TransactionHistoryTable"
import { getWalletInfo } from "../../utils/etherscanApi"
import TopBar from "../../components/Borrrower/TopBar"
import Sidebar from "../../components/Borrrower/Sidebar"

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY

export default function TransactionMonitor() {
  const [input, setInput] = useState("")
  const [address, setAddress] = useState("")
  const [history, setHistory] = useState(["0xCa38Bd4c6e8b0306F1", "0xBF67268D3Cb2", "0x742d35Cc6634C0532925a3b8D3Cb2"])
  const [showMore, setShowMore] = useState(false)
  const [walletInfo, setWalletInfo] = useState(null)
  const [walletLoading, setWalletLoading] = useState(false)
  const [walletError, setWalletError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      const trimmedInput = input.trim()
      setAddress(trimmedInput)
      if (!history.includes(trimmedInput)) {
        setHistory([trimmedInput, ...history].slice(0, 10))
      }
    }
  }

  const handleHistoryClick = (addr) => {
    setInput(addr)
    setAddress(addr)
  }

  const handleEtherscanClick = (addr) => {
    window.open(`https://sepolia.etherscan.io/address/${addr}`, "_blank")
  }

  const handleRefresh = () => {
    if (address) {
      setWalletLoading(true)
      setWalletError("")
      getWalletInfo(address, ETHERSCAN_API_KEY)
        .then((info) => setWalletInfo(info))
        .catch((err) => setWalletError(err.message))
        .finally(() => setWalletLoading(false))
    }
  }

  useEffect(() => {
    if (!address) return
    setWalletLoading(true)
    setWalletError("")
    setWalletInfo(null)
    getWalletInfo(address, ETHERSCAN_API_KEY)
      .then((info) => setWalletInfo(info))
      .catch((err) => setWalletError(err.message))
      .finally(() => setWalletLoading(false))
  }, [address])

  const DISPLAY_LIMIT = 4
  const visibleHistory = showMore ? history : history.slice(0, DISPLAY_LIMIT)

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
        <TopBar />
        <Box sx={{ p: 3, width: "100%" }}>
          {/* Header Section */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
              color: "white",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    width: 64,
                    height: 64,
                    mr: 3,
                  }}
                >
                  <AccountBalanceWallet sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Lịch sử Giao dịch Ethereum
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Tra cứu thông tin ví và lịch sử giao dịch trên mạng Sepolia Testnet
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Left Column - Search and Transaction History */}
            <Grid item xs={12} lg={8}>
              {/* Search Section */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      color: "#1976d2",
                    }}
                  >
                    <Search sx={{ mr: 1 }} />
                    Tra cứu địa chỉ ví Ethereum
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập địa chỉ ví Ethereum (0x...)"
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "#f8f9fa",
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Search />}
                        sx={{
                          px: 4,
                          borderRadius: 2,
                          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                          fontWeight: 600,
                          minWidth: 140,
                          boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                        }}
                      >
                        Tra cứu
                      </Button>
                    </Stack>
                  </Box>

                  {/* Search History */}
                  {history.length > 0 && (
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          color: "#34495e",
                        }}
                      >
                        <History sx={{ mr: 1, color: "#1976d2" }} />
                        Lịch sử tra cứu gần đây
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                        {visibleHistory.map((addr, idx) => (
                          <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Chip
                              label={addr.length > 12 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr}
                              onClick={() => handleHistoryClick(addr)}
                              clickable
                              variant="outlined"
                              sx={{
                                fontWeight: 500,
                                borderColor: "#1976d2",
                                color: "#1976d2",
                                "&:hover": {
                                  bgcolor: "#e3f2fd",
                                  borderColor: "#1565c0",
                                },
                              }}
                            />
                            <Tooltip title="Xem trên Etherscan Sepolia">
                              <IconButton
                                size="small"
                                onClick={() => handleEtherscanClick(addr)}
                                sx={{ ml: 0.5, color: "#1976d2" }}
                              >
                                <OpenInNew fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        ))}
                      </Stack>
                      {history.length > DISPLAY_LIMIT && (
                        <Button
                          size="small"
                          onClick={() => setShowMore(!showMore)}
                          sx={{ mt: 1, textTransform: "none", color: "#1976d2" }}
                        >
                          {showMore ? "Thu gọn" : `Xem thêm ${history.length - DISPLAY_LIMIT} địa chỉ`}
                        </Button>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Transaction History Table */}
              {address && (
                <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          color: "#1976d2",
                        }}
                      >
                        <Receipt sx={{ mr: 1 }} />
                        Lịch sử giao dịch
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Refresh />}
                        onClick={handleRefresh}
                        disabled={walletLoading}
                        sx={{ borderRadius: 2 }}
                      >
                        Làm mới
                      </Button>
                    </Box>
                    <TransactionHistoryTable address={address} enableExport enablePagination />
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Right Column - Wallet Info and Guide */}
            <Grid item xs={12} lg={4}>
              {/* Wallet Info Card */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      color: "#1976d2",
                    }}
                  >
                    <AccountBalance sx={{ mr: 1 }} />
                    Thông tin ví
                  </Typography>

                  {!address && (
                    <Paper
                      sx={{
                        p: 4,
                        textAlign: "center",
                        bgcolor: "#f8f9fa",
                        borderRadius: 2,
                        border: "2px dashed #e0e7ff",
                      }}
                    >
                      <AccountBalanceWallet sx={{ fontSize: 48, color: "#90a4ae", mb: 2 }} />
                      <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                        Nhập địa chỉ ví để xem thông tin chi tiết
                      </Typography>
                    </Paper>
                  )}

                  {address && walletLoading && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
                      <CircularProgress sx={{ mb: 2, color: "#1976d2" }} />
                      <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                        Đang tải thông tin ví...
                      </Typography>
                    </Box>
                  )}

                  {address && walletError && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      <Typography variant="body2">{walletError}</Typography>
                    </Alert>
                  )}

                  {address && walletInfo && (
                    <Box>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: "linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)",
                          border: "1px solid #e3f2fd",
                        }}
                      >
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Địa chỉ ví Sepolia
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            wordBreak: "break-all",
                            mb: 3,
                            p: 2,
                            bgcolor: "rgba(255,255,255,0.7)",
                            borderRadius: 1,
                            border: "1px solid #e0e7ff",
                          }}
                        >
                          {address}
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Paper
                              sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "rgba(255,255,255,0.8)",
                                borderRadius: 2,
                                border: "1px solid #e0e7ff",
                              }}
                            >
                              <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2", mb: 1 }}>
                                {walletInfo.balance}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                ETH Balance
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <Paper
                              sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "rgba(255,255,255,0.8)",
                                borderRadius: 2,
                                border: "1px solid #e0e7ff",
                              }}
                            >
                              <Typography variant="h5" sx={{ fontWeight: 600, color: "#4caf50", mb: 1 }}>
                                {walletInfo.txCount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Total Transactions
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<OpenInNew />}
                        onClick={() => handleEtherscanClick(address)}
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                          fontWeight: 600,
                          py: 1.5,
                        }}
                      >
                        Xem chi tiết trên Etherscan
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Guide Card */}
              <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      color: "#1976d2",
                    }}
                  >
                    <Info sx={{ mr: 1 }} />
                    Hướng dẫn sử dụng
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "#1976d2",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          mr: 2,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        1
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Nhập địa chỉ ví Ethereum hợp lệ (bắt đầu bằng 0x)
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "#1976d2",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          mr: 2,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        2
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Xem thông tin số dư ETH và tổng số giao dịch
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "#1976d2",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          mr: 2,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        3
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Tra cứu lịch sử giao dịch chi tiết với khả năng xuất dữ liệu
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "#1976d2",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          mr: 2,
                          mt: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        4
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        Sử dụng lịch sử tra cứu để truy cập nhanh các địa chỉ đã xem
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 3 }} />

                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    <Typography variant="body2">
                      <strong>Lưu ý:</strong> Dữ liệu được lấy từ mạng Sepolia Testnet. Để xem thông tin mainnet, vui
                      lòng truy cập trực tiếp Etherscan.
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
