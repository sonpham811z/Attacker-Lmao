import React from "react";
import { Box, Typography, Card, CardContent, Grid, Divider, Stack, Chip, Tooltip, LinearProgress, Avatar } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const performanceData = {
  totalRequests: 150,
  completed: 140,
  avgTime: 150, // seconds
  bestDay: "2025-07-20",
  bestCount: 22,
  accuracy: 98,
  slashing: 3,
  reward: 3200,
  rank: 2,
  percentile: 95,
};

const dailyStats = [
  { date: "2025-07-25", completed: 8, avgTime: 120 },
  { date: "2025-07-24", completed: 10, avgTime: 140 },
  { date: "2025-07-23", completed: 7, avgTime: 180 },
  { date: "2025-07-22", completed: 12, avgTime: 110 },
  { date: "2025-07-21", completed: 9, avgTime: 130 },
];


const cardGradient = [
  'linear-gradient(135deg, #e3f0ff 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #e0f7ef 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #fffbe6 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #ffeaea 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #e3f0ff 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #f3e6ff 0%, #f8fafc 100%)',
  'linear-gradient(135deg, #e0f7ef 0%, #f8fafc 100%)',
];

const PerformanceAnalytics = () => (
  <Box p={3}>
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
      <BarChartIcon color="primary" fontSize="large" sx={{ fontSize: 38 }} />
      <Typography variant="h4" fontWeight={800} color="primary.dark" letterSpacing={-1}>
        Thống kê hiệu suất
      </Typography>
      <Chip label="Analytics" color="primary" sx={{ ml: 2, fontWeight: 700, fontSize: 16 }} />
    </Stack>
    <Divider sx={{ mb: 2 }} />
    <Grid container spacing={2} mb={2}>
      {/* Tổng request */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[0], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Tổng số request đã nhận">
                <BarChartIcon color="primary" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Tổng request</Typography>
              <Typography variant="h4" fontWeight={800}>{performanceData.totalRequests}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Đã hoàn thành */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[1], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Số request đã hoàn thành">
                <TrendingUpIcon color="success" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Đã hoàn thành</Typography>
              <Typography variant="h4" fontWeight={800}>{performanceData.completed}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Tỉ lệ chính xác */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[2], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Tỉ lệ xác thực đúng">
                <TrendingUpIcon color="primary" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Tỉ lệ chính xác</Typography>
              <Typography variant="h4" fontWeight={800}>{performanceData.accuracy}%</Typography>
              <LinearProgress variant="determinate" value={performanceData.accuracy} sx={{ mt: 1, height: 8, borderRadius: 2, width: '100%', bgcolor: '#e3f2fd' }} />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Slashing */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[3], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Số lần bị slashing">
                <TrendingDownIcon color="error" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Slashing</Typography>
              <Typography variant="h4" fontWeight={800} color="error.main">{performanceData.slashing}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Grid container spacing={2} mb={2}>
      {/* Phần thưởng */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[4], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Tổng phần thưởng nhận được">
                <EmojiEventsIcon color="success" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Phần thưởng</Typography>
              <Typography variant="h4" fontWeight={800}>{performanceData.reward} NLC</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Xếp hạng */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[5], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Xếp hạng trên hệ thống">
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#1976d2', fontWeight: 700, fontSize: 22 }}>{performanceData.rank}</Avatar>
              </Tooltip>
              <Typography variant="body2">Xếp hạng</Typography>
              <Typography variant="h6" fontWeight={700}>/ 100</Typography>
              <Typography variant="caption" color="text.secondary">Top {performanceData.percentile}% hệ thống</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Thời gian xử lý TB */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[6], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Thời gian xử lý trung bình">
                <AccessTimeIcon color="secondary" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Thời gian xử lý TB</Typography>
              <Typography variant="h4" fontWeight={800}>{Math.floor(performanceData.avgTime/60)}:{(performanceData.avgTime%60).toString().padStart(2,'0')} phút</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {/* Ngày tốt nhất */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ boxShadow: 6, background: cardGradient[0], border: 'none', borderRadius: 3 }}>
          <CardContent>
            <Stack alignItems="center" spacing={1}>
              <Tooltip title="Ngày có hiệu suất tốt nhất">
                <BarChartIcon color="primary" fontSize="large" />
              </Tooltip>
              <Typography variant="body2">Ngày tốt nhất</Typography>
              <Typography variant="h6" fontWeight={700}>{performanceData.bestDay}</Typography>
              <Typography variant="caption" color="text.secondary">{performanceData.bestCount} request/ngày</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" fontWeight={700} mb={1} color="primary">Hiệu suất 5 ngày gần nhất</Typography>
    <Box sx={{ width: '100%', overflowX: 'auto', pb: 2 }}>
      <Stack direction="row" spacing={2}>
        {dailyStats.map((stat, idx) => (
          <Card key={idx} sx={{ minWidth: 160, boxShadow: 4, borderRadius: 3, background: cardGradient[idx % cardGradient.length], p: 1 }}>
            <CardContent>
              <Typography variant="subtitle2" color="primary" fontWeight={700}>{stat.date}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUpIcon color="success" fontSize="small" />
                <Typography variant="body2">Hoàn thành: <b>{stat.completed}</b></Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon color="secondary" fontSize="small" />
                <Typography variant="body2">Thời gian TB: <b>{Math.floor(stat.avgTime/60)}:{(stat.avgTime%60).toString().padStart(2,'0')} phút</b></Typography>
              </Stack>
              {/* Biểu đồ cột đơn giản */}
              <Box sx={{ mt: 1, height: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Box sx={{ width: 18, height: stat.completed * 6, bgcolor: '#1976d2', borderRadius: 1, mr: 0.5 }} />
                <Box sx={{ width: 18, height: stat.avgTime / 2, bgcolor: '#20bf6b', borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  </Box>
);

export default PerformanceAnalytics;
