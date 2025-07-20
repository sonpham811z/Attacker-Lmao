import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Dashboard from "./pages/Dashboard"

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
            marign: '2px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#a3a0a0'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#005bb5', // Darker blue on hover
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
