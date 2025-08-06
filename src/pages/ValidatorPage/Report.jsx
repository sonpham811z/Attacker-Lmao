import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Stack, Divider, Snackbar, IconButton, Tooltip, Chip, useTheme } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';

const reportData = {
  totalRequests: 150,
  completed: 140,
  slashing: 3,
  slashingRate: "2%",
  reward: 3200,
  bestDay: "2025-07-20",
  bestReward: 500,
  avgTime: "2 phút 30 giây",
};


function exportToCSV(data) {
  const rows = [
    ["Tổng request đã xử lý", "Đã hoàn thành", "Slashing", "Tỷ lệ slashing", "Phần thưởng", "Ngày tốt nhất", "Phần thưởng cao nhất/ngày", "Thời gian xử lý TB"],
    [data.totalRequests, data.completed, data.slashing, data.slashingRate, data.reward + " NLC", data.bestDay, data.bestReward + " NLC", data.avgTime],
  ];
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "bao_cao_validator.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const Report = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();

  const handleExport = () => {
    exportToCSV(reportData);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Box p={3}>
      <Card
        sx={{
          background: `linear-gradient(120deg, #f8fafc 0%, #e3f0ff 60%, #f0f7ff 100%)`,
          boxShadow: 8,
          borderRadius: 4,
          border: '1px solid #e0e7ef',
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <AssignmentTurnedInIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight={700} color="primary.dark">
              Báo cáo tổng hợp
            </Typography>
            <Chip label="Validator" color="secondary" sx={{ ml: 2, fontWeight: 700 }} />
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Tooltip title="Tổng số request đã xử lý">
                  <TrendingUpIcon color="success" fontSize="large" />
                </Tooltip>
                <Typography variant="body2">Tổng request đã xử lý</Typography>
                <Typography variant="h5" fontWeight={700}>{reportData.totalRequests}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Tooltip title="Số lượng request đã hoàn thành">
                  <CheckCircleIcon color="primary" fontSize="large" />
                </Tooltip>
                <Typography variant="body2">Đã hoàn thành</Typography>
                <Typography variant="h5" fontWeight={700}>{reportData.completed}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Tooltip title="Số lần bị slashing">
                  <ErrorOutlineIcon color="error" fontSize="large" />
                </Tooltip>
                <Typography variant="body2">Slashing</Typography>
                <Typography variant="h5" fontWeight={700}>{reportData.slashing}</Typography>
                <Chip label={reportData.slashingRate} color="error" size="small" />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Tooltip title="Tổng phần thưởng nhận được">
                  <TrendingDownIcon color="secondary" fontSize="large" />
                </Tooltip>
                <Typography variant="body2">Phần thưởng</Typography>
                <Typography variant="h5" fontWeight={700}>{reportData.reward} NLC</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Ngày có phần thưởng cao nhất</Typography>
              <Typography variant="subtitle1" fontWeight={600}>{reportData.bestDay}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Phần thưởng cao nhất/ngày</Typography>
              <Typography variant="subtitle1" fontWeight={600}>{reportData.bestReward} NLC</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Thời gian xử lý trung bình</Typography>
              <Typography variant="subtitle1" fontWeight={600}>{reportData.avgTime}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{ fontWeight: 700, borderRadius: 2, boxShadow: 2 }}
            >
              Xuất báo cáo CSV
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message="Xuất báo cáo thành công!"
            action={
              <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Report;
