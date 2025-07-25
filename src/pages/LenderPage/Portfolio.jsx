"use client"

import { Box, Typography, Card, CardContent } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import InvestmentStatsCard from "../../components/Lender/InvestmentStatsCard"
import { TrendingUp as PortfolioIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar"

const Portfolio = () => {
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
            background: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PortfolioIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Danh mục Đầu tư
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Theo dõi hiệu suất và quản lý các khoản đầu tư của bạn
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Portfolio Stats */}
        <InvestmentStatsCard />
      </Box>
      </Box>
    </Box>
  )
}

export default Portfolio
