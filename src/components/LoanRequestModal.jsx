import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function LoanRequestModal({ open, onClose, request }) {
  if (!request) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", borderRadius: 3, boxShadow: 24, p: 4, minWidth: 340 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#1976d2", fontWeight: 700 }}>
          Chi tiết yêu cầu vay
        </Typography>
        <div style={{ marginBottom: 12 }}>
          <div><b>Borrower:</b> {request.borrower}</div>
          <div><b>Điểm tín dụng:</b> {request.creditScore}</div>
          <div><b>Tài sản thế chấp:</b> {request.collateral}</div>
          <div><b>Lãi suất:</b> {request.interest}%</div>
          <div><b>Thời hạn:</b> {request.duration} tháng</div>
        </div>
        <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={() => alert("Ký hợp đồng & chuyển USDC!")}>Cho vay</Button>
        <Button variant="outlined" color="error" onClick={onClose}>Đóng</Button>
      </Box>
    </Modal>
  );
}
