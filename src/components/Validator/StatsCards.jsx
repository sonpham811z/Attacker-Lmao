import React, { useEffect, useState } from "react";
import { useWeb3 } from '../../contexts/Web3Context';
import { Grid, Card, CardContent, Typography } from "@mui/material";

function ValidatorStatsCards() {
  const { isConnected, contract } = useWeb3();
  const [totalStaked, setTotalStaked] = useState('0');
  useEffect(() => {
    const fetchTotal = async () => {
      if (isConnected && contract) {
        try {
          const total = await contract.totalStaked();
          setTotalStaked(total ? total.toString() : '0');
        } catch (e) {
          setTotalStaked('0');
        }
      }
    };
    fetchTotal();
  }, [isConnected, contract]);
  const statsData = [
    { label: "Tổng số xác thực (Stake)", value: isConnected ? totalStaked : '0' },
    { label: "Đang xử lý", value: 8 },
    { label: "Đã hoàn thành", value: 112 },
    { label: "Tỷ lệ thành công", value: "93%" },
  ];
  return (
    <Grid container spacing={2} mb={2}>
      {statsData.map((item) => (
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
}


export default ValidatorStatsCards;
