import React from "react";
import { Box, Typography, Card, CardContent, Grid, Chip, Divider, Stack, Tooltip } from "@mui/material";
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ValidatorSidebar from "../../components/Validator/Sidebar";
import ValidatorTopBar from "../../components/Validator/TopBar";

const slashingHistory = [
  { date: "2025-07-10", reason: "Không xác thực đúng hạn", amount: 50 },
  { date: "2025-06-22", reason: "Sai dữ liệu xác thực", amount: 30 },
];

const rewardHistory = [
  { date: "2025-07-25", type: "Reward", amount: 200, desc: "Hoàn thành 20 request" },
  { date: "2025-07-20", type: "Bonus", amount: 100, desc: "Top 3 tuần" },
  { date: "2025-07-15", type: "Reward", amount: 150, desc: "Hoàn thành 15 request" },
];

const SlashingAndRewards = () => (
  <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef" }}>
  {/* Sidebar bên trái */}
  <ValidatorSidebar />

  {/* Nội dung chính */}
  <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
    <ValidatorTopBar />

    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        <GavelIcon sx={{ mr: 1, color: 'error.main' }} />
        Slashing & Phần thưởng
      </Typography>

      <Grid container spacing={3}>
        {/* Lịch sử slashing */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderLeft: '5px solid #e74c3c', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <GavelIcon color="error" />
                <Typography variant="h6" fontWeight={600}>Lịch sử Slashing</Typography>
                <Chip label={slashingHistory.length} color="error" size="small" />
              </Stack>
              <Divider sx={{ mb: 1 }} />

              {slashingHistory.length === 0 ? (
                <Typography color="text.secondary">Không có lịch sử slashing.</Typography>
              ) : (
                slashingHistory.map((item, idx) => (
                  <Box key={idx} mb={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Tooltip title={item.reason}>
                        <TrendingDownIcon color="error" />
                      </Tooltip>
                      <Typography variant="body2" sx={{ minWidth: 90 }}>{item.date}</Typography>
                      <Typography variant="body2" color="text.secondary" flex={1}>{item.reason}</Typography>
                      <Chip label={`-${item.amount} NLC`} color="error" size="small" />
                    </Stack>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Lịch sử phần thưởng */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderLeft: '5px solid #20bf6b', boxShadow: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <EmojiEventsIcon color="success" />
                <Typography variant="h6" fontWeight={600}>Lịch sử Phần thưởng</Typography>
                <Chip label={rewardHistory.length} color="success" size="small" />
              </Stack>
              <Divider sx={{ mb: 1 }} />

              {rewardHistory.length === 0 ? (
                <Typography color="text.secondary">Chưa nhận được phần thưởng nào.</Typography>
              ) : (
                rewardHistory.map((item, idx) => (
                  <Box key={idx} mb={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Tooltip title={item.desc}>
                        <TrendingUpIcon color={item.type === 'Bonus' ? 'secondary' : 'success'} />
                      </Tooltip>
                      <Typography variant="body2" sx={{ minWidth: 90 }}>{item.date}</Typography>
                      <Typography variant="body2" color="text.secondary" flex={1}>{item.desc}</Typography>
                      <Chip
                        label={`+${item.amount} NLC`}
                        color={item.type === 'Bonus' ? 'secondary' : 'success'}
                        size="small"
                      />
                    </Stack>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Box>
);

export default SlashingAndRewards;
