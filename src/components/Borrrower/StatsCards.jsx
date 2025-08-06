import { Box, Card, CardContent, Typography } from "@mui/material"
import { PendingActions, CheckCircle } from "@mui/icons-material"

const StatsCards = () => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Current Loans Pending */}
      <Card
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #ff9f43 0%, #ff7f50 100%)",
          color: "white",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          border: "1px solid #fff",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                Current Loans Pending
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                9
              </Typography>
            </Box>
            <PendingActions sx={{ fontSize: 40, opacity: 0.7 }} />
          </Box>
        </CardContent>
      </Card>

      {/* Total Closed Loans */}
      <Card
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #20bf6b 0%, #26d0ce 100%)",
          color: "white",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          border: "1px solid #fff",
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                Total Closed Loans
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                3
              </Typography>
            </Box>
            <CheckCircle sx={{ fontSize: 40, opacity: 0.7 }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default StatsCards
