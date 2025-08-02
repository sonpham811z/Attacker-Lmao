"use client"
import { Box, Grid, Typography, Fade } from "@mui/material"
import { keyframes } from "@mui/system"
import ValidatorStatsCards from "../../components/Validator/StatsCards"
import RequestProcessingChart from "../../components/Validator/RequestProcessingChart"
import RecentActivities from "../../components/Validator/RecentActivities"
import StakedTokensCard from "../../components/Validator/TokenStakeCard"
import TopValidatorsCard from "../../components/Validator/TopValidatorsCard"
import ValidatorSidebar from "../../components/Validator/Sidebar"
import TopBar from "../../components/Borrrower/TopBar"
import ValidatorTopBar from "../../components/Validator/TopBar"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const Dashboard = ({ darkMode = false }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
      <ValidatorSidebar />
      <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
        <ValidatorTopBar />
        <Box sx={{ p: 3, width: "100%" }}>
          {/* Top Section: Stats Cards */}
          <Box sx={{ mb: 3 }}>
            <ValidatorStatsCards />
          </Box>

          {/* Middle Section: Request Processing Rate & Recent Activities */}
          <Grid container spacing={8} sx={{ mb: 4, justifyContent: 'center' }}>
            <Grid item xs={12} md={6}>
              <RequestProcessingChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <RecentActivities />
            </Grid>
          </Grid>

          {/* Bottom Section: Staked Tokens & Top Validators */}
          <Grid container spacing={8}  sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} md={6}>
              <StakedTokensCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <TopValidatorsCard />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard