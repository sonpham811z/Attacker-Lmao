import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Login from "./pages/Auth/Login/Login";
import LoginLender from "./pages/Auth/Login/LoginLender";
import Register from "./pages/Auth/Register/Register";
import BorrowerRegister from "./pages/Auth/Register/BorrowerRegister";
import LenderRegister from "./pages/Auth/Register/LenderRegister";
import VerifierRegister from "./pages/Auth/Register/VerifierRegister";
import OTPVerification from "./pages/Auth/OTPVerification";
import NotFoundPage from "./pages/404NotFound/404page";
import Unauthorized from "./pages/UnauthorizedPage/unauthorize";

// Route Layouts
import BorrowerRoutes from "./pages/BorrowerPage"; // index.jsx
import LenderRoutes from "./pages/LenderPage";
import ValidatorRoutes from "./pages/ValidatorPage/index.jsx";


// Redux selector
import { selectCurrentBorrower } from "./redux/borrowerSlice";
import { selectCurrentLender } from "./redux/lenderSlice";

// ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; 

const theme = createTheme({
  palette: {
    primary: { main: "#2c3e50" },
    secondary: { main: "#f39c12" },
    background: { default: "#f5f7fa" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "3px",
            height: "3px",
          },
          "*::-webkit-scrollbar-track": {
            margin: "2px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#a3a0a0",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#005bb5",
          },
        },
      },
    },
  },
});

function App() {
  const currentBorrower = useSelector(selectCurrentBorrower);
  const currentLender = useSelector(selectCurrentLender);

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
          <Route path="/borrower/verify-otp" element={<OTPVerification />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
  
        {/* 👥 PUBLIC ROUTES - Lender */}
        <Route element={<PublicRoute user={currentLender} redirectPath="/lender/dashboard" />}>
          <Route path="/login/lender" element={<LoginLender />} />
          <Route path="/register/lender" element={<LenderRegister />} />
          <Route path="/lender/verify-otp" element={<OTPVerification />} />
        </Route>
  
        {/* 🔐 PROTECTED ROUTES */}
        <Route element={<ProtectedRoute user={currentBorrower} />}>
          <Route path="/borrower/*" element={<BorrowerRoutes />} />
        </Route>
        <Route element={<ProtectedRoute user={currentLender} />}>
          <Route path="/lender/*" element={<LenderRoutes />} />
        </Route>
  
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )  
}

export default App;
