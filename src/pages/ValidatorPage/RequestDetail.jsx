import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, TextField, Grid, Chip } from "@mui/material";

const RequestDetail = () => {
  const [action, setAction] = useState("");
  return (
    <Box p={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Chi tiết request xác thực
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Loại tài sản: Bất động sản</Typography>
              <Typography variant="body2">Địa chỉ ví borrower: 0x123...abc</Typography>
              <Typography variant="body2">Ngày tạo: 2025-07-25</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Tài liệu gốc:</Typography>
              <Chip label="Giấy tờ.pdf" color="primary" size="small" sx={{ mr: 1 }} />
              <Chip label="Ảnh tài sản.jpg" color="secondary" size="small" />
            </Grid>
          </Grid>
          <Box mb={2}>
            <Typography variant="subtitle2" fontWeight={600}>Thao tác:</Typography>
            <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={() => setAction("accept")}>Chấp nhận</Button>
            <Button variant="outlined" color="error" onClick={() => setAction("reject")}>Từ chối</Button>
          </Box>
          {action === "accept" && (
            <Box mb={2}>
              <TextField label="Giá trị ước tính" fullWidth sx={{ mb: 2 }} />
              <TextField label="Thời hạn bảo hành ước tính" fullWidth />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>Phát hành VC & chuyển dữ liệu</Button>
            </Box>
          )}
          {action === "reject" && (
            <Box mb={2}>
              <TextField label="Lý do từ chối" fullWidth />
              <Button variant="contained" color="error" sx={{ mt: 2 }}>Gửi từ chối</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RequestDetail;
