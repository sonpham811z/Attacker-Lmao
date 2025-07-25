"use client"

import { Box, Typography, Card, CardContent } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import CompanyInfoCard from "../../components/Lender/CompanyInfoCard.jsx"
import { Business as CompanyIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar.jsx"

const CompanyProfile = () => {
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
            background: "linear-gradient(135deg, #1abc9c 0%, #16a085 100%)",
            color: "white",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CompanyIcon sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Hồ sơ Công ty
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Quản lý thông tin công ty và hồ sơ nhà đầu tư
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Company Profile Content */}
        <CompanyInfoCard />
      </Box>
      </Box>
    </Box>
  )
}

export default CompanyProfile
