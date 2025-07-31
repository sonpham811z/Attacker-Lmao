"use client"

import { Box, Grid } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import CompanyInfoCard from "../../components/Lender/CompanyInfoCard.jsx"
import LoanRequestsTable from "../../components/Lender/LoanRequestsTable"
import InvestmentStatsCard from "../../components/Lender/InvestmentStatsCard"
import LenderSidebar from "../../components/Lender/LenderSidebar.jsx"

const LenderDashboard = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
    <LenderSidebar/>
     <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>

    
      <LenderTopBar />
      <Box sx={{ p: 3, width: "100%" }}>
        {/* Investment Stats */}
        <Box sx={{ mb: 3 }}>
          <InvestmentStatsCard />
        </Box>

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            {/* Loan Requests Table */}
            <LoanRequestsTable />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={4}>
            {/* Company Info */}
            <CompanyInfoCard />
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Box>
  )
}

export default LenderDashboard
