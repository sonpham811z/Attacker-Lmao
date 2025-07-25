"use client"

import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material"
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material"
import { useState } from "react"
import { keyframes } from "@mui/system"

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

const SearchOpportunitiesCard = () => {
  const [filters, setFilters] = useState({
    amountRange: [10000, 100000],
    interestRange: [5, 15],
    duration: "",
    riskLevel: "",
    collateralType: "",
    creditScore: [600, 850],
  })

  const [searchTerm, setSearchTerm] = useState("")

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      amountRange: [10000, 100000],
      interestRange: [5, 15],
      duration: "",
      riskLevel: "",
      collateralType: "",
      creditScore: [600, 850],
    })
    setSearchTerm("")
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #f39c12 0%, #e67e22 50%, #d35400 100%)",
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchIcon sx={{ color: "#f39c12", fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#2c3e50" }}>
                Tìm Cơ hội Đầu tư
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lọc và tìm kiếm các khoản vay phù hợp
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={clearFilters}
            sx={{
              borderColor: "#e74c3c",
              color: "#e74c3c",
              textTransform: "none",
              "&:hover": {
                borderColor: "#c0392b",
                bgcolor: "rgba(231, 76, 60, 0.08)",
              },
            }}
          >
            Xóa bộ lọc
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm theo tên công ty, người vay..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#6c757d", mr: 1 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#f8f9fa",
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Filters */}
        <Grid container spacing={3}>
          {/* Amount Range */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#2c3e50" }}>
              Số tiền vay (USD)
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.amountRange}
                onChange={(e, value) => handleFilterChange("amountRange", value)}
                valueLabelDisplay="auto"
                min={1000}
                max={500000}
                step={1000}
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                sx={{
                  color: "#f39c12",
                  "& .MuiSlider-thumb": {
                    bgcolor: "#f39c12",
                  },
                  "& .MuiSlider-track": {
                    bgcolor: "#f39c12",
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  ${filters.amountRange[0].toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${filters.amountRange[1].toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Interest Range */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#2c3e50" }}>
              Lãi suất (%)
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.interestRange}
                onChange={(e, value) => handleFilterChange("interestRange", value)}
                valueLabelDisplay="auto"
                min={1}
                max={25}
                step={0.5}
                valueLabelFormat={(value) => `${value}%`}
                sx={{
                  color: "#20bf6b",
                  "& .MuiSlider-thumb": {
                    bgcolor: "#20bf6b",
                  },
                  "& .MuiSlider-track": {
                    bgcolor: "#20bf6b",
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {filters.interestRange[0]}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filters.interestRange[1]}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Duration */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Thời hạn</InputLabel>
              <Select
                value={filters.duration}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
                label="Thời hạn"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="short">Ngắn hạn (≤ 12 tháng)</MenuItem>
                <MenuItem value="medium">Trung hạn (12-24 tháng)</MenuItem>
                <MenuItem value="long">Dài hạn (&gt; 24 tháng)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Risk Level */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Mức độ rủi ro</InputLabel>
              <Select
                value={filters.riskLevel}
                onChange={(e) => handleFilterChange("riskLevel", e.target.value)}
                label="Mức độ rủi ro"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="low">Thấp</MenuItem>
                <MenuItem value="medium">Trung bình</MenuItem>
                <MenuItem value="high">Cao</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Collateral Type */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Loại tài sản thế chấp</InputLabel>
              <Select
                value={filters.collateralType}
                onChange={(e) => handleFilterChange("collateralType", e.target.value)}
                label="Loại tài sản thế chấp"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="rwa-nft">RWA-NFT</MenuItem>
                <MenuItem value="real-estate">Bất động sản</MenuItem>
                <MenuItem value="none">Không có</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Credit Score Range */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#2c3e50" }}>
              Điểm tín dụng
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={filters.creditScore}
                onChange={(e, value) => handleFilterChange("creditScore", value)}
                valueLabelDisplay="auto"
                min={300}
                max={850}
                step={10}
                sx={{
                  color: "#9b59b6",
                  "& .MuiSlider-thumb": {
                    bgcolor: "#9b59b6",
                  },
                  "& .MuiSlider-track": {
                    bgcolor: "#9b59b6",
                  },
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {filters.creditScore[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filters.creditScore[1]}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Active Filters */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#2c3e50" }}>
            Bộ lọc đang áp dụng
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {searchTerm && (
              <Chip
                label={`Tìm kiếm: "${searchTerm}"`}
                onDelete={() => setSearchTerm("")}
                color="primary"
                size="small"
              />
            )}
            {filters.duration && (
              <Chip
                label={`Thời hạn: ${filters.duration}`}
                onDelete={() => handleFilterChange("duration", "")}
                color="secondary"
                size="small"
              />
            )}
            {filters.riskLevel && (
              <Chip
                label={`Rủi ro: ${filters.riskLevel}`}
                onDelete={() => handleFilterChange("riskLevel", "")}
                color="warning"
                size="small"
              />
            )}
            {filters.collateralType && (
              <Chip
                label={`Tài sản: ${filters.collateralType}`}
                onDelete={() => handleFilterChange("collateralType", "")}
                color="info"
                size="small"
              />
            )}
          </Box>
        </Box>

        {/* Search Button */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
              color: "white",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(243, 156, 18, 0.3)",
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                boxShadow: "0 6px 20px rgba(243, 156, 18, 0.4)",
              },
            }}
          >
            Tìm kiếm cơ hội đầu tư
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SearchOpportunitiesCard
