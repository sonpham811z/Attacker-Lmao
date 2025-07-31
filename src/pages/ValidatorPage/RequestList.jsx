
import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button, TextField, MenuItem, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Stack, Divider, Tooltip, Snackbar } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const assetTypes = ["Bất động sản", "Xe", "Thiết bị", "Khác"];

const statusColor = {
  "Mới": "info",
  "Đang xử lý": "warning",
  "Đã hoàn thành": "success",
};

const RequestList = () => {
  // Dummy data
  const [selected, setSelected] = useState(null);
  const [filterAsset, setFilterAsset] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterBorrower, setFilterBorrower] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: `${label} đã được sao chép!` });
  };
  const requests = [
    { id: 1, asset: "Bất động sản", borrower: "0x123...abc", date: "2025-07-25", status: "Mới", amount: 1000000, description: "Xác thực quyền sở hữu nhà đất", address: "123 Đường ABC, Quận 1, TP.HCM" },
    { id: 2, asset: "Xe", borrower: "0x456...def", date: "2025-07-24", status: "Đang xử lý", amount: 500000, description: "Xác thực quyền sở hữu xe ô tô", address: "456 Đường DEF, Quận 3, TP.HCM" },
    { id: 3, asset: "Thiết bị", borrower: "0x789...ghi", date: "2025-07-23", status: "Đã hoàn thành", amount: 200000, description: "Xác thực quyền sở hữu thiết bị y tế", address: "789 Đường GHI, Quận 5, TP.HCM" },
  ];
  const filtered = requests.filter(r =>
    (!filterAsset || r.asset === filterAsset) &&
    (!filterDate || r.date === filterDate) &&
    (!filterBorrower || r.borrower.includes(filterBorrower))
  );

  const handleDetail = (req) => {
    setDetailData(req);
    setOpenDetail(true);
    setSelected(req.id);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setDetailData(null);
  };

  return (
    <Box p={3}>
      <Card sx={{ mb: 2, background: 'linear-gradient(135deg, #e0f7fa 0%, #fceabb 100%)', boxShadow: '0 4px 32px #20bf6b33', borderRadius: 4, border: '2px solid #20bf6b22', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#20bf6b', textShadow: '0 2px 8px #fff8' }}>
            Danh sách request xác thực
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <TextField select label="Loại tài sản" fullWidth size="small" value={filterAsset} onChange={e => setFilterAsset(e.target.value)}>
                <MenuItem value="">Tất cả</MenuItem>
                {assetTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Ngày tạo" type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} value={filterDate} onChange={e => setFilterDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Địa chỉ ví borrower" fullWidth size="small" value={filterBorrower} onChange={e => setFilterBorrower(e.target.value)} />
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 16px #20bf6b22', background: 'linear-gradient(120deg, #f8ffae 0%, #43cea2 100%)', border: '2px solid #20bf6b22' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'linear-gradient(90deg, #e0ffe8 0%, #b2f7c1 100%)' }}>
                  <TableCell sx={{ fontWeight: 700, color: '#20bf6b' }}>Loại tài sản</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#20bf6b' }}>Borrower</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#20bf6b' }}>Ngày tạo</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#20bf6b' }}>Trạng thái</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: '#20bf6b' }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: '#aaa', fontStyle: 'italic' }}>Không có request nào phù hợp</TableCell>
                  </TableRow>
                ) : filtered.map((req) => (
                  <TableRow
                    key={req.id}
                    hover
                    selected={selected === req.id}
                    onClick={() => setSelected(req.id)}
                    sx={{
                      cursor: 'pointer',
                      background: selected === req.id
                        ? 'linear-gradient(90deg, #fffbe0 0%, #ffe082 100%)'
                        : 'none',
                      boxShadow: selected === req.id ? '0 2px 12px #ffd70044' : 'none',
                      transition: '0.2s',
                    }}
                  >
                    <TableCell>
                      <Chip label={req.asset} color="info" variant="outlined" sx={{ fontWeight: 700, fontSize: 15, px: 1.5, bgcolor: '#e3f2fd', color: '#1976d2' }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={req.borrower} color="default" variant="outlined" sx={{ fontWeight: 700, fontSize: 15, px: 1.5, bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={req.date} color="primary" variant="outlined" sx={{ fontWeight: 700, fontSize: 15, px: 1.5, bgcolor: '#e8f5e9', color: '#388e3c' }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={req.status} color={statusColor[req.status]} size="small" sx={{ fontWeight: 700, fontSize: 15, px: 1.5 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant={selected === req.id ? "contained" : "outlined"}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 2, boxShadow: selected === req.id ? '0 2px 8px #1976d244' : 'none', transition: '0.2s' }}
                        onClick={e => { e.stopPropagation(); handleDetail(req); }}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog chi tiết request */}
      <Dialog open={openDetail} onClose={handleCloseDetail} maxWidth="sm" fullWidth>
        <DialogTitle>
          Thông tin chi tiết request
          <IconButton onClick={handleCloseDetail} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {detailData && (
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1" fontWeight={700} color="primary">{detailData.asset}</Typography>
                <Tooltip title="Sao chép mã request">
                  <IconButton size="small" onClick={() => handleCopy(detailData.id, 'Mã request')}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontWeight={600}>Borrower:</Typography>
                <Chip label={detailData.borrower} color="default" />
                <Tooltip title="Sao chép địa chỉ ví">
                  <IconButton size="small" onClick={() => handleCopy(detailData.borrower, 'Địa chỉ ví')}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Ngày tạo:</Typography>
                <Chip label={detailData.date} color="primary" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Trạng thái:</Typography>
                <Chip label={detailData.status} color={statusColor[detailData.status]} />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Số tiền xác thực:</Typography>
                <Chip label={detailData.amount.toLocaleString()} color="success" />
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Địa chỉ tài sản:</Typography>
                <Typography>{detailData.address}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography fontWeight={600}>Mô tả:</Typography>
                <Typography>{detailData.description}</Typography>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail} color="primary" variant="contained">Đóng</Button>
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
};

export default RequestList;
