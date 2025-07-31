import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Divider, List, ListItem, ListItemText, Chip, Stack, Paper, Avatar, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const slashingHistory = [
  { date: "2025-07-20", amount: 100, reason: "Sai xác thực", status: "Đã xử lý" },
  { date: "2025-06-15", amount: 50, reason: "Chậm xử lý", status: "Đã xử lý" },
];

function Staking() {
  const [openDialog, setOpenDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const maxStake = 12500;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleWithdraw = () => {
    setOpenDialog(false);
    setSnackbar({ open: true, message: `Yêu cầu rút ${withdrawAmount} NLC đã được gửi!` });
    setWithdrawAmount(0);
  };

  return (
    <Box p={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Card sx={{ flex: 1, background: 'linear-gradient(135deg, #e0f7fa 0%, #fceabb 100%)', boxShadow: '0 4px 32px #20bf6b33', borderRadius: 4, border: '2px solid #20bf6b22', minWidth: 320 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <SavingsIcon sx={{ color: '#20bf6b', fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#20bf6b', textShadow: '0 2px 8px #fff8' }}>Quản lý staking</Typography>
            </Stack>
            <Divider sx={{ mb: 2, borderColor: '#20bf6b55' }} />
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography fontWeight={600}>Số token đã stake:</Typography>
              <Chip label="12,500 NLC" color="success" icon={<CheckCircleIcon />} sx={{ fontWeight: 700, fontSize: 18, px: 2, bgcolor: '#e8f5e9', color: '#20bf6b' }} />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography fontWeight={600}>Có thể rút stake:</Typography>
              <Chip label="7 ngày nữa" color="warning" icon={<AccessTimeIcon />} sx={{ fontWeight: 700, fontSize: 16, px: 2, bgcolor: '#fffde7', color: '#f39c12' }} />
            </Stack>
            <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2, fontWeight: 700, borderRadius: 2, boxShadow: '0 2px 8px #20bf6b44', fontSize: 16 }} onClick={handleOpenDialog}>
              Rút stake
            </Button>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" alignItems="center" gap={1} mb={1}>
              <TrendingDownIcon sx={{ color: '#e53935', fontSize: 24 }} />
              <Typography variant="subtitle1" fontWeight={700} color="error">Lịch sử slashing</Typography>
            </Stack>
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 2px 8px #e5393522', background: 'linear-gradient(120deg, #ffe0e3 0%, #fffbe0 100%)', border: '2px solid #e5393522', mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ background: 'linear-gradient(90deg, #ffe0e3 0%, #fffbe0 100%)' }}>
                    <TableCell sx={{ fontWeight: 700, color: '#e53935' }}>Ngày</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#e53935' }}>Số lượng</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#e53935' }}>Lý do</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#e53935' }}>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slashingHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ color: '#aaa', fontStyle: 'italic' }}>Không có lịch sử slashing</TableCell>
                    </TableRow>
                  ) : slashingHistory.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Chip label={`-${item.amount} NLC`} color="error" icon={<TrendingDownIcon />} sx={{ fontWeight: 700, fontSize: 15, px: 1.5, bgcolor: '#ffebee', color: '#e53935' }} />
                      </TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>
                        <Chip label={item.status} color="success" size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, background: 'linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)', boxShadow: '0 4px 32px #43cea233', borderRadius: 4, border: '2px solid #43cea222', minWidth: 320 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <AccessTimeIcon sx={{ color: '#43cea2', fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#43cea2', textShadow: '0 2px 8px #fff8' }}>Thông tin staking</Typography>
            </Stack>
            <Divider sx={{ mb: 2, borderColor: '#43cea255' }} />
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Ngày bắt đầu stake:</Typography>
                <Chip label="2025-05-01" color="info" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Ngày hết hạn stake:</Typography>
                <Chip label="2025-08-01" color="info" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Tổng số ngày stake:</Typography>
                <Chip label="92 ngày" color="primary" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Tổng số lần slashing:</Typography>
                <Chip label={slashingHistory.length} color="error" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      {/* Dialog rút stake */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Rút stake</DialogTitle>
        <DialogContent dividers>
          <Typography mb={2}>Nhập số lượng NLC muốn rút (tối đa {maxStake}):</Typography>
          <TextField
            type="number"
            fullWidth
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(Math.max(0, Math.min(maxStake, Number(e.target.value))))}
            inputProps={{ min: 0, max: maxStake }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Huỷ</Button>
          <Button onClick={handleWithdraw} variant="contained" color="primary" disabled={withdrawAmount <= 0}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}




export default Staking;
