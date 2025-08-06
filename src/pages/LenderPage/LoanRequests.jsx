"use client"

import { Box, Grid } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import LoanRequestsTable from "../../components/Lender/LoanRequestsTable"
import SearchOpportunitiesCard from "../../components/Lender/SearchOpportunitiesCard"
import LenderSidebar from "../../components/Lender/LenderSidebar"

const LoanRequests = () => {
  return (
     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
        <LenderSidebar/>
        <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
      <LenderTopBar />
      <Box sx={{ p: 3, width: "100%" }}>
        <Grid container spacing={3}>
          {/* Left Column - Loan Requests */}
          <Grid item xs={12} lg={8}>
            <LoanRequestsTable />
          </Grid>

          {/* Right Column - Search & Filters */}
          <Grid item xs={12} lg={4}>
            <SearchOpportunitiesCard />
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Box>
  )
}

export default LoanRequests
