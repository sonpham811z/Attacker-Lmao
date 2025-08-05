
import { Box, Grid, ThemeProvider, createTheme } from "@mui/material";
import ValidatorSidebar from "../../components/Validator/Sidebar";
import ValidatorTopBar from "../../components/Validator/TopBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Dashboard from './Dashboard';
import RequestList from './RequestList';
import RequestDetail from './RequestDetail';
import Staking from './Staking';
import Report from './Report';
import SlashingAndRewards from './SlashingAndRewards';
import PerformanceAnalytics from './PerformanceAnalytics';
import Profile from './Profile';
import NotificationPage, { NotificationContext } from './NotificationPage';
import SettingsPage from './SettingsPage';

const DarkModeContext = React.createContext({ darkMode: false, setDarkMode: () => {} });

const ValidatorRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const path = window.location.pathname;
    const sidebarItems = document.querySelectorAll(".MuiListItem-root");
    sidebarItems.forEach((item) => {
      const text = item.querySelector(".MuiListItemText-root")?.textContent;
      const routeMap = {
        "Dashboard": "/validator/dashboard",
        // Thêm các route khác nếu có
      };
      if (text && routeMap[text] === path) {
        item.style.backgroundColor = "rgba(67, 133, 244, 0.1)";
        item.style.border = "1px solid rgba(67, 133, 244, 0.2)";
      } else {
        item.style.backgroundColor = "transparent";
        item.style.border = "1px solid transparent";
      }
    });
  }, [navigate]);

  const [unread, setUnread] = React.useState(2);
  const [darkMode, setDarkMode] = React.useState(false);
  const [noti, setNoti] = React.useState(true);

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#20bf6b' },
    },
  }), [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, noti, setNoti }}>
      <NotificationContext.Provider value={{ unread: noti ? unread : 0, setUnread }}>
        <ThemeProvider theme={theme}>
          <Box bgcolor={darkMode ? 'background.default' : '#f5f6fa'} minHeight="100vh">
            <ValidatorTopBar unread={noti ? unread : 0} />
            <Grid container>
              <Grid item md={2} sm={3} xs={12}>
                <ValidatorSidebar />
              </Grid>
              <Grid item md={10} sm={9} xs={12}>
                <Box>
                  <Routes>
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="requests" element={<RequestList />} />
                    <Route path="requests/:id" element={<RequestDetail />} />
                    <Route path="staking" element={<Staking />} />
                    <Route path="slashing" element={<SlashingAndRewards />} />
                    <Route path="analytics" element={<PerformanceAnalytics />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="notifications" element={<NotificationPage />} />
                    <Route path="report" element={<Report />} />
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </NotificationContext.Provider>
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext };
export default ValidatorRoutes;


