"use client"

import { Box, Typography, Container, Button, Card, CardContent, Avatar } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { AccountBalance as BankIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material"

const LenderRegister = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
      }}
    >
      <Container maxWidth="sm" sx={{ width: "100%" }}>
        <Card
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            border: "1px solid #e9ecef",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            textAlign: "center",
            p: 4,
          }}
        >
          <CardContent>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 3,
                bgcolor: "#4285f4",
                color: "white",
              }}
            >
              <BankIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <Typography variant="h4" sx={{ color: "#2c3e50", mb: 2, fontWeight: 600 }}>
              Lender Registration
            </Typography>

            <Typography variant="body1" sx={{ color: "#6c757d", mb: 4 }}>
              This feature is currently under development...
            </Typography>

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: "#4285f4",
                color: "white",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  bgcolor: "#1976d2",
                },
              }}
            >
              Back to Selection
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default LenderRegister
