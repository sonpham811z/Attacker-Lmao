import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ValidatorProfileCard = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          Thông tin Validator
        </Typography>
        {/* Thêm thông tin chi tiết ở đây */}
        <Typography variant="body2">Tên: Nguyễn Văn A</Typography>
        <Typography variant="body2">Email: validator@email.com</Typography>
      </CardContent>
    </Card>
  );
};

export default ValidatorProfileCard;
