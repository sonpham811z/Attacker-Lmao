"use client"

import { Box, Grid, Typography, Card, CardContent } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import SearchOpportunitiesCard from "../../components/Lender/SearchOpportunitiesCard"
import LoanRequestsTable from "../../components/Lender/LoanRequestsTable"
import { Search as SearchIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar"

const FindOpportunities = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#e9ecef", width: "100%" }}>
            <LenderSidebar/>
            <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
      <LenderTopBar />
      <Box sx={{ p: 3, width: "100%" }}>
        {/* Header */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SearchIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Tìm Cơ hội Đầu tư
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Khám phá và lọc các yêu cầu vay phù hợp với chiến lược đầu tư của bạn
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Left Column - Search & Filters */}
          <Grid item xs={12} lg={4}>
            <SearchOpportunitiesCard />
          </Grid>

          {/* Right Column - Results */}
          <Grid item xs={12} lg={8}>
            <LoanRequestsTable />
          </Grid>
        </Grid>
      </Box>
      </Box>
    </Box>
  )
}

export default FindOpportunities
