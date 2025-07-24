import LoanRequests from "./pages/LoanRequests";
import React from "react";
import Loans from "./pages/Loans";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TransactionMonitor from "./pages/TransactionMonitor";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";


const theme = createTheme({
  palette: {
    background: {
      default: "#f8fafc",
    },
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default function RootLayout() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
        <Sidebar currentPath={location.pathname} />
        <Box component="main" sx={{ flexGrow: 1, width: "100%", minWidth: 0 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitor" element={<TransactionMonitor />} />
            <Route path="/loans" element={<React.Suspense fallback={null}><Loans /></React.Suspense>} />
            <Route path="/loan-requests" element={<LoanRequests />} />
            {/* Thêm các route khác nếu có */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}