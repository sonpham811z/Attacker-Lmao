import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const stats = [
  { label: "Tổng số xác thực", value: 120 },
  { label: "Đang xử lý", value: 8 },
  { label: "Đã hoàn thành", value: 112 },
  { label: "Tỷ lệ thành công", value: "93%" },
];

const ValidatorStatsCards = () => (
  <Grid container spacing={2} mb={2}>
    {stats.map((item) => (
      <Grid item xs={12} sm={6} md={3} key={item.label}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {item.value}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default ValidatorStatsCards;
