import React from "react";
import { useWeb3 } from '../../contexts/Web3Context';
import { Card, CardContent, Typography } from "@mui/material";

const ValidatorProfileCard = () => {
  const { account, isConnected } = useWeb3();
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          Thông tin Validator
        </Typography>
        <Typography variant="body2">{isConnected ? `Địa chỉ: ${account}` : 'Chưa kết nối ví'}</Typography>
        {/* Thêm thông tin chi tiết ở đây */}
        <Typography variant="body2">Tên: Nguyễn Văn A</Typography>
        <Typography variant="body2">Email: validator@email.com</Typography>
      </CardContent>
    </Card>
  );
};

export default ValidatorProfileCard;
