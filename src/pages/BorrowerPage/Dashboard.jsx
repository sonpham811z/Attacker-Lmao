import { Box } from "@mui/material"
import Sidebar from "../../components/Borrrower/Sidebar"
import TopBar from "../../components/Borrrower/TopBar"
import StatsCards from "../../components/Borrrower/StatsCards"
import ApplyFundingCard from "../../components/Borrrower/ApplyFundingCard"
import ProfileSection from "../../components/Borrrower/ProfileSection"
import CommunicationCard from "../../components/Borrrower/CommunicationCard"
import AppliedLoansTable from "../../components/Borrrower/AppliedLoansTable"
import React from "react";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
        <TopBar/>
        <Box sx={{ p: 3, width: "100%" }}>
          {/* Top Section: Stats Cards + Communication Card */}
          <Box sx={{ display: "flex", gap: 3, mb: 3, width: "101%" }}>
            {/* Left side: Stats Cards */}
            <Box sx={{ flex: 2, width: "100%" }}>
              <Box sx={{ mb: 3 }}>
                <StatsCards />
              </Box>
              {/* Apply for Funding */}
              <Box sx={{ mb: 3 }}>
                <ApplyFundingCard />
              </Box>
              {/* Profile Section */}
              <ProfileSection />
            </Box>

            {/* Right side: Communication Card */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <CommunicationCard />
            </Box>
          </Box>

          {/* Applied Loans Table */}
          <Box sx={{ width: "100%" }}>
            <AppliedLoansTable />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
