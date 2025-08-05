import React, { useState } from "react";

import { Box, Typography, Card, CardContent, Grid, Chip, Divider, Stack, Tooltip } from "@mui/material";
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const slashingHistory = [
  { date: "2025-07-10", reason: "Không xác thực đúng hạn", amount: 50 },
  { date: "2025-06-22", reason: "Sai dữ liệu xác thực", amount: 30 },
];

const rewardHistory = [
  { date: "2025-07-25", type: "Reward", amount: 200, desc: "Hoàn thành 20 request" },
  { date: "2025-07-20", type: "Bonus", amount: 100, desc: "Top 3 tuần" },
  { date: "2025-07-15", type: "Reward", amount: 150, desc: "Hoàn thành 15 request" },
];

import { useWeb3 } from '../../contexts/Web3Context';

const SlashingAndRewards = () => {
  const { contract, account, addFraudReport } = useWeb3();
  // State cho reportMispricing
  const [misValidator, setMisValidator] = useState("");
  const [expectedValue, setExpectedValue] = useState("");
  const [actualValue, setActualValue] = useState("");
  const [misStatus, setMisStatus] = useState("");
  // State cho reportFraud
  const [fraudValidator, setFraudValidator] = useState("");
  const [evidence, setEvidence] = useState("");
  const [fraudStatus, setFraudStatus] = useState("");

  const handleReportMispricing = async (e) => {
    e.preventDefault();
    setMisStatus("Đang gửi báo cáo...");
    try {
      if (!contract) throw new Error("Chưa kết nối contract");
      const tx = await contract.reportMispricing(misValidator, expectedValue, actualValue);
      setMisStatus("Đang chờ xác nhận...");
      await tx.wait();
      setMisStatus("Báo cáo vi phạm giá thành công!");
      // Gửi sang context (admin)
      if (addFraudReport) {
        addFraudReport({
          validator: misValidator,
          reporter: account,
          evidence: `Sai giá: expected=${expectedValue}, actual=${actualValue}`,
          status: "Pending",
          type: "mispricing"
        });
      }
    } catch (err) {
      setMisStatus("Báo cáo thất bại: " + (err?.reason || err?.message || ""));
    }
  };

  const handleReportFraud = async (e) => {
    e.preventDefault();
    setFraudStatus("Đang gửi báo cáo...");
    try {
      if (!contract) throw new Error("Chưa kết nối contract");
      const tx = await contract.reportFraud(fraudValidator, evidence);
      setFraudStatus("Đang chờ xác nhận...");
      await tx.wait();
      setFraudStatus("Báo cáo gian lận thành công!");
      // Gửi sang context (admin)
      if (addFraudReport) {
        addFraudReport({
          validator: fraudValidator,
          reporter: account,
          evidence,
          status: "Pending",
          type: "fraud"
        });
      }
    } catch (err) {
      setFraudStatus("Báo cáo thất bại: " + (err?.reason || err?.message || ""));
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        <GavelIcon sx={{ mr: 1, color: 'error.main' }} /> Slashing & Phần thưởng
      </Typography>

      {/* Form báo cáo vi phạm giá */}
      <Card sx={{ mb: 3, p: 2, borderLeft: '5px solid #e67e22' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={1} color="warning.main">
            Báo cáo vi phạm về giá (reportMispricing)
          </Typography>
          <form onSubmit={handleReportMispricing} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <input required placeholder="Địa chỉ validator" value={misValidator} onChange={e => setMisValidator(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }} />
            <input required placeholder="Giá đúng" type="number" value={expectedValue} onChange={e => setExpectedValue(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
            <input required placeholder="Giá thực tế" type="number" value={actualValue} onChange={e => setActualValue(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }} />
            <button type="submit" style={{ padding: '8px 18px', background: '#e67e22', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>Báo cáo</button>
            {misStatus && <span style={{ marginLeft: 8, color: '#e67e22', fontWeight: 600 }}>{misStatus}</span>}
          </form>
        </CardContent>
      </Card>

      {/* Form báo cáo gian lận */}
      <Card sx={{ mb: 3, p: 2, borderLeft: '5px solid #c0392b' }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={1} color="error.main">
            Báo cáo gian lận đạo đức (reportFraud)
          </Typography>
          <form onSubmit={handleReportFraud} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <input required placeholder="Địa chỉ validator" value={fraudValidator} onChange={e => setFraudValidator(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }} />
            <input required placeholder="Bằng chứng (evidence)" value={evidence} onChange={e => setEvidence(e.target.value)} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', minWidth: 220 }} />
            <button type="submit" style={{ padding: '8px 18px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700 }}>Báo cáo</button>
            {fraudStatus && <span style={{ marginLeft: 8, color: '#c0392b', fontWeight: 600 }}>{fraudStatus}</span>}
          </form>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
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
                    <Chip label={`+${item.amount} NLC`} color={item.type === 'Bonus' ? 'secondary' : 'success'} size="small" />
                  </Stack>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
  );
}

export default SlashingAndRewards;
