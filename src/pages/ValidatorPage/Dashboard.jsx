import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip, Paper, Stack, Fade } from "@mui/material";
import ValidatorStatsCards from "../../components/Validator/StatsCards";
import TokenStakeCard from "../../components/Validator/TokenStakeCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const pieData = [
  { name: "Đã hoàn thành", value: 120, color: "#20bf6b" },
  { name: "Đang xử lý", value: 8, color: "#f39c12" },
  { name: "Mới", value: 5, color: "#4285f4" },
];


const recentActivities = [
  { id: 1, type: 'success', title: 'Xác thực thành công', desc: 'Request #1234', time: '2 phút trước' },
  { id: 2, type: 'pending', title: 'Đang xử lý', desc: 'Request #1235', time: '10 phút trước' },
  { id: 3, type: 'success', title: 'Xác thực thành công', desc: 'Request #1233', time: '30 phút trước' },
  { id: 4, type: 'success', title: 'Xác thực thành công', desc: 'Request #1232', time: '1 giờ trước' },
];

const leaderboard = [
  { name: 'Validator01', score: 120, icon: <EmojiEventsIcon color="warning" /> },
  { name: 'Validator02', score: 110 },
  { name: 'Validator03', score: 98 },
];



const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="drop-shadow(0 2px 8px #20bf6b33)"
      />
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight={700} fontSize={16}>
        {payload.name}
      </text>
      <text x={ex} y={ey} textAnchor={cos >= 0 ? "start" : "end"} fill="#333" fontWeight={600} fontSize={14}>
        {`${value} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <Fade in timeout={700}>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ValidatorStatsCards />
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Card sx={{ mt: 3, minHeight: 320, background: 'linear-gradient(135deg, #e0f7fa 0%, #fceabb 100%)', boxShadow: '0 4px 32px #20bf6b33', borderRadius: 4, border: '2px solid #20bf6b22', position: 'relative', overflow: 'visible' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <CheckCircleIcon sx={{ color: '#20bf6b', fontSize: 28, mr: 1 }} />
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#20bf6b', textShadow: '0 2px 8px #fff8' }}>Tỉ lệ xử lý request</Typography>
                    </Box>
                    <Divider sx={{ mb: 2, borderColor: '#20bf6b55' }} />
                    <Box sx={{ height: 160, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(120deg, #f8ffae 0%, #43cea2 100%)', borderRadius: 3, boxShadow: '0 2px 12px #20bf6b22', p: 1 }}>
                      <ResponsiveContainer width={180} height={160}>
                        <PieChart>
                          <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={36}
                            outerRadius={56}
                            paddingAngle={3}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [`${value} request`, name]} contentStyle={{ background: '#fff', color: '#20bf6b', borderRadius: 8, boxShadow: '0 2px 8px #20bf6b33' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                  <Box sx={{ position: 'absolute', top: -18, right: 24 }}>
                    <Chip label="Realtime" color="success" size="small" sx={{ fontWeight: 700, letterSpacing: 1, boxShadow: '0 2px 8px #20bf6b33' }} />
                  </Box>
                </Card>
              </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ mt: 3, minHeight: 320, background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)', boxShadow: '0 4px 32px #f39c1233', borderRadius: 4, border: '2px solid #f39c1222', position: 'relative', overflow: 'visible' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <PendingActionsIcon sx={{ color: '#f39c12', fontSize: 28, mr: 1 }} />
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#f39c12', textShadow: '0 2px 8px #fff8' }}>Hoạt động gần đây</Typography>
                  </Box>
                  <Divider sx={{ mb: 2, borderColor: '#f39c1255' }} />
                  <List dense>
                    {recentActivities.map((act) => (
                      <ListItem key={act.id} alignItems="flex-start" sx={{ borderRadius: 2, mb: 1, background: act.type === 'success' ? 'linear-gradient(90deg, #e0ffe8 0%, #b2f7c1 100%)' : 'linear-gradient(90deg, #fffbe0 0%, #ffe0b2 100%)', boxShadow: act.type === 'success' ? '0 2px 8px #20bf6b22' : '0 2px 8px #f39c1222', transition: '0.2s', '&:hover': { boxShadow: '0 4px 16px #20bf6b44' } }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: act.type === 'success' ? '#20bf6b' : '#f39c12', color: '#fff', boxShadow: '0 2px 8px #0002' }}>
                            {act.type === 'success' ? <CheckCircleIcon /> : <PendingActionsIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography fontWeight={700} color={act.type === 'success' ? '#20bf6b' : '#f39c12'}>{act.title}</Typography>}
                          secondary={<>
                            <Typography variant="body2" color="text.secondary">{act.desc}</Typography>
                            <Typography variant="caption" color="text.secondary">{act.time}</Typography>
                          </>}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ position: 'absolute', top: -18, right: 24 }}>
                  <Chip label="Live" color="warning" size="small" sx={{ fontWeight: 700, letterSpacing: 1, boxShadow: '0 2px 8px #f39c1233' }} />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <TokenStakeCard />
          <Paper elevation={6} sx={{ p: 2, mt: 2, borderRadius: 4, background: 'linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)', border: '2px solid #43cea222', boxShadow: '0 4px 32px #43cea233', position: 'relative', overflow: 'visible' }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <EmojiEventsIcon sx={{ color: '#ffd700', fontSize: 28, mr: 1 }} />
              <Typography variant="h6" fontWeight={700} sx={{ color: '#43cea2', textShadow: '0 2px 8px #fff8' }}>Bảng xếp hạng Validator</Typography>
            </Box>
            <Divider sx={{ mb: 2, borderColor: '#43cea255' }} />
            <Stack spacing={2}>
              {leaderboard.map((item, idx) => (
                <Box key={item.name} display="flex" alignItems="center" gap={2} sx={{ background: idx === 0 ? 'linear-gradient(90deg, #fffbe0 0%, #ffe082 100%)' : 'linear-gradient(90deg, #e0ffe8 0%, #b2f7c1 100%)', borderRadius: 2, p: 1, boxShadow: idx === 0 ? '0 2px 8px #ffd70044' : '0 2px 8px #20bf6b22', border: idx === 0 ? '2px solid #ffd70088' : '2px solid #20bf6b22', alignItems: 'center', minHeight: 48 }}>
                  <Avatar sx={{ bgcolor: idx === 0 ? '#ffd700' : '#20bf6b', color: '#fff', width: 36, height: 36, boxShadow: '0 2px 8px #0002' }}>
                    {item.icon || item.name[0]}
                  </Avatar>
                  <Box flex={1}>
                    <Typography fontWeight={700} color={idx === 0 ? '#f39c12' : '#20bf6b'}>{item.name}</Typography>
                  </Box>
                  <Chip label={`${item.score} điểm`} color={idx === 0 ? 'warning' : 'success'} size="medium" sx={{ fontWeight: 700, fontSize: 16 }} />
                </Box>
              ))}
            </Stack>
            <Box sx={{ position: 'absolute', top: -18, right: 24 }}>
              <Chip label="Top" color="info" size="small" sx={{ fontWeight: 700, letterSpacing: 1, boxShadow: '0 2px 8px #43cea233' }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </Fade>
  );
}

export default Dashboard;
