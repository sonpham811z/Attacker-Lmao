import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Alert,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import {
  AccountBalance,
  TrendingUp,
  Schedule,
  Security,
  Send
} from "@mui/icons-material";
import TopBar from "../../components/Borrrower/TopBar";
import Sidebar from "../../components/Borrrower/Sidebar";

const mockRwaNfts = [
  { id: "nft1", name: "RWA-NFT #1" },
  { id: "nft2", name: "RWA-NFT #2" },
  { id: "nft3", name: "RWA-NFT #3" },
];

const STATUS_LABELS = {
  open: "Mở",
  pending: "Đang chờ",
  funded: "Đã được tài trợ",
  rejected: "Đã từ chối",
};

const STATUS_COLORS = {
  open: "default",
  pending: "warning",
  funded: "success",
  rejected: "error",
};

export default function Loans() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    interest: "",
    duration: "",
    rwaNft: "",
  });
  const [activeTab, setActiveTab] = useState(0);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isBig = Number(form.amount) >= 10000;
    if (isBig && !form.rwaNft) {
      alert("Khoản vay lớn cần chọn RWA-NFT làm tài sản thế chấp!");
      return;
    }
    setRequests([
      {
        id: Date.now(),
        amount: form.amount,
        interest: form.interest,
        duration: form.duration,
        rwaNft: isBig ? form.rwaNft : null,
        status: "pending",
        createdAt: new Date().toLocaleDateString('vi-VN'),
      },
      ...requests,
    ]);
    setForm({ amount: "", interest: "", duration: "", rwaNft: "" });
  }

  const getFilteredRequests = () => {
    const statusKeys = Object.keys(STATUS_LABELS);
    if (activeTab === 0) return requests; // All requests
    const selectedStatus = statusKeys[activeTab - 1];
    return requests.filter(r => r.status === selectedStatus);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "109.5%" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
        <TopBar />
        <Box sx={{ p: 3, width: "100%" }}>
          <Grid container spacing={3}>
            {/* Left Column - Loan Request Form */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, #fff 0%, #f8f9ff 100%)"
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <AccountBalance sx={{ fontSize: 32, color: "#1976d2", mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2" }}>
                      Tạo yêu cầu vay
                    </Typography>
                  </Box>
                  
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                      name="amount"
                      type="number"
                      label="Số tiền muốn vay (USDC)"
                      value={form.amount}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <AccountBalance sx={{ color: "#1976d2", mr: 1 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                    
                    <TextField
                      name="interest"
                      type="number"
                      label="Lãi suất mong muốn (%)"
                      value={form.interest}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <TrendingUp sx={{ color: "#1976d2", mr: 1 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                    
                    <TextField
                      name="duration"
                      type="number"
                      label="Kỳ hạn (tháng)"
                      value={form.duration}
                      onChange={handleChange}
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <Schedule sx={{ color: "#1976d2", mr: 1 }} />,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                    
                    {Number(form.amount) >= 10000 && (
                      <FormControl fullWidth required>
                        <InputLabel>RWA-NFT làm tài sản thế chấp</InputLabel>
                        <Select
                          name="rwaNft"
                          value={form.rwaNft}
                          onChange={handleChange}
                          label="RWA-NFT làm tài sản thế chấp"
                          startAdornment={<Security sx={{ color: "#1976d2", mr: 1 }} />}
                          sx={{ borderRadius: 2 }}
                        >
                          {mockRwaNfts.map(nft => (
                            <MenuItem key={nft.id} value={nft.name}>
                              {nft.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    
                    {Number(form.amount) >= 10000 && (
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        Khoản vay từ 10,000 USDC trở lên yêu cầu tài sản thế chấp RWA-NFT
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{
                        py: 2,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        fontWeight: 700,
                        fontSize: 16,
                        boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                          boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                        }
                      }}
                    >
                      Gửi yêu cầu vay
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Loan Requests Status */}
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                height: "fit-content"
              }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3, pb: 0 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#34495e", mb: 2 }}>
                      Trạng thái yêu cầu vay
                    </Typography>
                  </Box>
                  
                  <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ 
                      px: 3,
                      "& .MuiTab-root": {
                        fontWeight: 600,
                        textTransform: "none",
                      }
                    }}
                  >
                    <Tab label="Tất cả" />
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <Tab key={key} label={label} />
                    ))}
                  </Tabs>
                  
                  <Divider />
                  
                  <Box sx={{ p: 3, maxHeight: 400, overflow: "auto" }}>
                    {getFilteredRequests().length === 0 ? (
                      <Paper sx={{ p: 4, textAlign: "center", bgcolor: "#f8f9fa", borderRadius: 2 }}>
                        <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
                          Chưa có yêu cầu nào.
                        </Typography>
                      </Paper>
                    ) : (
                      <List sx={{ p: 0 }}>
                        {getFilteredRequests().map((request) => (
                          <ListItem
                            key={request.id}
                            sx={{
                              mb: 2,
                              p: 0,
                              "&:last-child": { mb: 0 }
                            }}
                          >
                            <Paper
                              sx={{
                                width: "100%",
                                p: 3,
                                borderRadius: 2,
                                border: "1px solid #e0e7ef",
                                background: "linear-gradient(135deg, #f8f9ff 0%, #fff 100%)",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                                  transform: "translateY(-2px)"
                                }
                              }}
                            >
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#1976d2" }}>
                                  Yêu cầu #{request.id.toString().slice(-4)}
                                </Typography>
                                <Chip
                                  label={STATUS_LABELS[request.status]}
                                  color={STATUS_COLORS[request.status]}
                                  size="small"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                              
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Số tiền
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {Number(request.amount).toLocaleString()} USDC
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Lãi suất
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {request.interest}%
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="text.secondary">
                                    Kỳ hạn
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {request.duration} tháng
                                  </Typography>
                                </Grid>
                                {request.rwaNft && (
                                  <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">
                                      RWA-NFT
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                      {request.rwaNft}
                                    </Typography>
                                  </Grid>
                                )}
                                <Grid item xs={12}>
                                  <Typography variant="body2" color="text.secondary">
                                    Ngày tạo: {request.createdAt}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
