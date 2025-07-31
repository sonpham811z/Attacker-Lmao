import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import BorrowerRoutes from "./pages/BorrowerPage/index";
import Register from "./pages/Auth/Register/Register";
import BorrowerRegister from "./pages/Auth/Register/BorrowerRegister";
import LenderRegister from "./pages/Auth/Register/LenderRegister";
import VerifierRegister from "./pages/Auth/Register/VerifierRegister";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import OTPVerification from "./pages/Auth/OTPVerification";
import LenderRoutes from "./pages/LenderPage";
import ValidatorRoutes from "./pages/ValidatorPage/index.jsx";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#f39c12",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '3px',
            height: '3px',
          },
          '*::-webkit-scrollbar-track': {
            margin: '2px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#a3a0a0',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#005bb5',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/borrower/*" element={<BorrowerRoutes />} />
          <Route path="/lender/*" element={<LenderRoutes />} />
          <Route path="/validator/*" element={<ValidatorRoutes />} />
          {/* Add the lender route in the Routes section */}
          <Route path="/lender/*" element={<LenderRoutes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/borrower" element={<BorrowerRegister />} />
          <Route path="/register/lender" element={<LenderRegister />} />
          <Route path="/register/verifier" element={<VerifierRegister />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;