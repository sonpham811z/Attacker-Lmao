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
import ValidatorRegister from "./pages/Auth/Register/ValidatorRegister.jsx";
import VerifierRegister from "./pages/Auth/Register/VerifierRegister";
import OTPVerification from "./pages/Auth/OTPVerification";
import NotFoundPage from "./pages/404NotFound/404page";
import Unauthorized from "./pages/UnauthorizedPage/unauthorize";
import ValidatorLogin from "./pages/Auth/Login/LoginValidator.jsx";

// Route Layouts
import BorrowerRoutes from "./pages/BorrowerPage"; // index.jsx
import LenderRoutes from "./pages/LenderPage";
import ValidatorRoutes from "./pages/ValidatorPage/index.jsx";


// Redux selector
import { selectCurrentBorrower } from "./redux/borrowerSlice";
import { selectCurrentLender } from "./redux/lenderSlice";
import { selectCurrentValidator } from "./redux/validatorSlice.js";
 
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
  const currentValidator = useSelector(selectCurrentValidator);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* 🔓 PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/validator" element={<ValidatorLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/borrower" element={<BorrowerRegister />} />
          <Route path="/register/validator" element={<ValidatorRegister />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 👥 PUBLIC ROUTES - Lender */}
          <Route element={<PublicRoute user={currentLender} redirectPath="/lender/dashboard" />}>
            <Route path="/login/lender" element={<LoginLender />} />
            <Route path="/register/lender" element={<LenderRegister />} />
            <Route path="/lender/verify-otp" element={<OTPVerification />} />
          </Route>

          {/* 👥 PUBLIC ROUTES - Validator */}
          <Route path="/validator/verify-otp" element={<OTPVerification />} />

          {/* 🔐 PROTECTED ROUTES */}
          <Route element={<ProtectedRoute user={currentBorrower} allowedRoles={['borrower']}/>}>
            <Route path="/borrower/*" element={<BorrowerRoutes />} />
          </Route>

          <Route element={<ProtectedRoute user={currentLender} allowedRoles={['lender']}/>}>
            <Route path="/lender/*" element={<LenderRoutes />} />
          </Route>

          <Route element={<ProtectedRoute user={currentValidator} allowedRoles={['validator']} />}>
            <Route path="/validator/*" element={<ValidatorRoutes />} />
          </Route>

          {/* 🛑 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
