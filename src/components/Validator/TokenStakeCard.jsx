import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const TokenStakeCard = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" fontWeight={700} mb={1}>
        Token đã stake
      </Typography>
      <Typography variant="h4" color="primary" fontWeight={700}>
        12,500 NLC
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Phí tích lũy: 320 NLC
      </Typography>
      <Box mt={2}>
        <Typography variant="caption" color="text.secondary">
          Có thể rút stake sau 7 ngày
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TokenStakeCard;
