"use client"

import { Box, Grid, Typography, Card, CardContent } from "@mui/material"
import LenderTopBar from "../../components/Lender/LenderTopBar"
import SearchOpportunitiesCard from "../../components/Lender/SearchOpportunitiesCard"
import LoanRequestsTable from "../../components/Lender/LoanRequestsTable"
import { Search as SearchIcon } from "@mui/icons-material"
import LenderSidebar from "../../components/Lender/LenderSidebar"
import { useInvestment, InvestmentProvider } from "../../context/InvestmentContext"


const mockLoanRequests = [
  {
    id: "LR001",
    company: "ABC Trading Co.",
    borrower: "Nguyễn Văn A",
    amount: "$50,000",
    interest: "8.5%",
    duration: "12 tháng",
    riskLevel: "Thấp",
    collateral: "RWA-NFT #123",
    creditScore: 742,
    status: "Mới",
    avatar: "/placeholder.svg?height=40&width=40&text=A",
  },
  {
    id: "LR002",
    company: "XYZ Manufacturing",
    borrower: "Trần Thị B",
    amount: "$75,000",
    interest: "9.2%",
    duration: "18 tháng",
    riskLevel: "Trung bình",
    collateral: "Bất động sản",
    creditScore: 698,
    status: "Đang xem xét",
    avatar: "/placeholder.svg?height=40&width=40&text=B",
  },
  {
    id: "LR003",
    company: "Tech Startup Ltd",
    borrower: "Lê Văn C",
    amount: "$25,000",
    interest: "7.8%",
    duration: "6 tháng",
    riskLevel: "Thấp",
    collateral: "Không",
    creditScore: 785,
    status: "Ưu tiên",
    avatar: "/placeholder.svg?height=40&width=40&text=C",
  },
  {
    id: "LR004",
    company: "Green Energy Co.",
    borrower: "Phạm Thị D",
    amount: "$100,000",
    interest: "10.1%",
    duration: "24 tháng",
    riskLevel: "Cao",
    collateral: "RWA-NFT #456",
    creditScore: 654,
    status: "Mới",
    avatar: "/placeholder.svg?height=40&width=40&text=D",
  },
]


import { useState } from "react"

const FindOpportunitiesContent = () => {
  const { investLoan } = useInvestment()
  const [filteredRequests, setFilteredRequests] = useState(mockLoanRequests)

  // Hàm lọc dữ liệu theo bộ lọc
  const handleSearch = (filters) => {
    const {
      amountRange,
      interestRange,
      duration,
      riskLevel,
      collateralType,
      creditScore,
      searchTerm,
    } = filters

    // Chuyển đổi riskLevel
    const riskLevelMap = {
      low: "Thấp",
      medium: "Trung bình",
      high: "Cao",
    }
    // Chuyển đổi collateralType
    const collateralTypeMap = {
      "rwa-nft": "RWA-NFT",
      "real-estate": "Bất động sản",
      none: "Không",
    }

    let results = mockLoanRequests.filter((req) => {
      // Lọc theo số tiền vay
      const amountNum = Number(String(req.amount).replace(/[^\d]/g, ""))
      if (amountRange && (amountNum < amountRange[0] || amountNum > amountRange[1])) return false
      // Lọc theo lãi suất
      const interestNum = Number(String(req.interest).replace(/[^\d.]/g, ""))
      if (interestRange && (interestNum < interestRange[0] || interestNum > interestRange[1])) return false
      // Lọc theo kỳ hạn
      const durationNum = Number(String(req.duration).replace(/[^\d]/g, ""))
      if (duration === "short" && durationNum > 12) return false
      if (duration === "medium" && (durationNum <= 12 || durationNum > 24)) return false
      if (duration === "long" && durationNum <= 24) return false
      // Lọc theo mức độ rủi ro
      if (riskLevel && req.riskLevel !== riskLevelMap[riskLevel]) return false
      // Lọc theo loại tài sản thế chấp
      if (collateralType) {
        // Kiểm tra chứa chuỗi (vì mock có thể là "RWA-NFT #123")
        const colType = collateralTypeMap[collateralType]
        if (!req.collateral || !req.collateral.includes(colType)) return false
      }
      // Lọc theo điểm tín dụng
      if (creditScore && (req.creditScore < creditScore[0] || req.creditScore > creditScore[1])) return false
      // Lọc theo từ khóa tìm kiếm
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        if (
          !req.company.toLowerCase().includes(term) &&
          !req.borrower.toLowerCase().includes(term)
        ) {
          return false
        }
      }
      return true
    })
    setFilteredRequests(results)
  }

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
              <SearchOpportunitiesCard onSearch={handleSearch} onClear={() => setFilteredRequests(mockLoanRequests)} />
            </Grid>

            {/* Right Column - Results */}
            <Grid item xs={12} lg={8}>
              <LoanRequestsTable requests={filteredRequests} onInvest={investLoan} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

const FindOpportunities = () => {
  return (
    <InvestmentProvider>
      <FindOpportunitiesContent />
    </InvestmentProvider>
  )
}

export default FindOpportunities
