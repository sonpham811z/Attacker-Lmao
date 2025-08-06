import React, { useState, useContext } from "react";
import { Box, Card, CardContent, Typography, Divider, Stack, Switch, FormControlLabel, Button, Snackbar, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LockIcon from '@mui/icons-material/Lock';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { DarkModeContext } from "./index";
const SettingsPage = () => {
  const { darkMode, setDarkMode, noti, setNoti } = useContext(DarkModeContext);
  const [openPwd, setOpenPwd] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });

  const handleSave = () => {
    setSnackbarMsg("Cập nhật cài đặt thành công!");
    setSnackbar(true);
  };
  const handleSnackbarClose = (e, reason) => { if (reason === 'clickaway') return; setSnackbar(false); };
  const handlePwdOpen = () => setOpenPwd(true);
  const handlePwdClose = () => setOpenPwd(false);
  const handlePwdChange = (e) => setPwd({ ...pwd, [e.target.name]: e.target.value });
  const handlePwdSave = () => { setOpenPwd(false); setSnackbarMsg("Đổi mật khẩu thành công!"); setSnackbar(true); setPwd({ old: '', new: '', confirm: '' }); };
  const handleDarkModeToggle = (e) => {
    setDarkMode(e.target.checked);
    setSnackbarMsg(e.target.checked ? "Đã bật chế độ tối" : "Đã tắt chế độ tối");
    setSnackbar(true);
  };
  const handleNotiToggle = (e) => {
    setNoti(e.target.checked);
    // Không hiện snackbar khi bật/tắt nhận thông báo
  };

  return (
    <Box p={3}>
      <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <SettingsIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight={700} color="primary.dark">Cài đặt</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleDarkModeToggle} color="primary" />}
              label={<Stack direction="row" alignItems="center" spacing={1}><DarkModeIcon /> <span>Chế độ tối</span></Stack>}
            />
            <FormControlLabel
              control={<Switch checked={noti} onChange={handleNotiToggle} color="primary" />}
              label={<Stack direction="row" alignItems="center" spacing={1}><NotificationsActiveIcon /> <span>Nhận thông báo</span></Stack>}
            />
            <Button variant="outlined" startIcon={<LockIcon />} onClick={handlePwdOpen} sx={{ alignSelf: 'flex-start', borderRadius: 2 }}>
              Đổi mật khẩu
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} sx={{ alignSelf: 'flex-end', borderRadius: 2 }}>
              Lưu thay đổi
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog open={openPwd} onClose={handlePwdClose} maxWidth="xs" fullWidth>
        <DialogTitle>Đổi mật khẩu
          <IconButton onClick={handlePwdClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField label="Mật khẩu cũ" name="old" type="password" value={pwd.old} onChange={handlePwdChange} fullWidth />
            <TextField label="Mật khẩu mới" name="new" type="password" value={pwd.new} onChange={handlePwdChange} fullWidth />
            <TextField label="Xác nhận mật khẩu mới" name="confirm" type="password" value={pwd.confirm} onChange={handlePwdChange} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePwdClose}>Hủy</Button>
          <Button onClick={handlePwdSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackbarMsg}
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

export default SettingsPage;
