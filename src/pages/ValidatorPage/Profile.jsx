import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Avatar, Grid, Divider, Stack, Button, Chip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditIcon from '@mui/icons-material/Edit';

const userInfo = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  role: "Validator",
  joined: "2024-12-01",
  status: "Đã xác thực",
  avatar: "https://i.pravatar.cc/150?img=3",
  requests: 150,
  reward: 3200,
  slashing: 3,
};


import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Profile = () => {
  const [info, setInfo] = useState(userInfo);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ name: info.name, email: info.email });
  const [snackbar, setSnackbar] = useState(false);

  const handleEditOpen = () => {
    setEditData({ name: info.name, email: info.email });
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    setInfo({ ...info, ...editData });
    setEditOpen(false);
    setSnackbar(true);
  };
  const handleSnackbarClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(false);
  };

  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={3} mb={2}>
            <Avatar src={info.avatar} sx={{ width: 80, height: 80, border: '3px solid #20bf6b' }} />
            <Box>
              <Typography variant="h5" fontWeight={700}>{info.name}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon color="primary" fontSize="small" />
                <Typography variant="body2" color="text.secondary">{info.email}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <VerifiedUserIcon color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">{info.status}</Typography>
              </Stack>
            </Box>
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ ml: 'auto', borderRadius: 2 }} onClick={handleEditOpen}>
              Chỉnh sửa
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Vai trò</Typography>
              <Chip label={info.role} color="primary" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Ngày tham gia</Typography>
              <Typography variant="body1" fontWeight={600}>{info.joined}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Request đã xử lý</Typography>
              <Typography variant="h6" fontWeight={700}>{info.requests}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Phần thưởng</Typography>
              <Typography variant="h6" fontWeight={700}>{info.reward} NLC</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Slashing</Typography>
              <Typography variant="h6" fontWeight={700} color="error.main">{info.slashing}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
        <DialogTitle>Chỉnh sửa thông tin
          <IconButton onClick={handleEditClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField label="Họ và tên" name="name" value={editData.name} onChange={handleEditChange} fullWidth />
            <TextField label="Email" name="email" value={editData.email} onChange={handleEditChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Hủy</Button>
          <Button onClick={handleEditSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message="Cập nhật thông tin thành công!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Profile;
