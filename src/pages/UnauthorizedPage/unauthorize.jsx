import { Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import unauthorized  from "../../assets/unauthorized.webp";
import {Link} from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/register"); // Điều hướng về trang chủ
  };

  return (
    
          <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",              // ⬅ full chiều cao trình duyệt
          width: "100%",
          minWidth: '210vh',
          
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >

      <img src={unauthorized} alt="401"/>
      <Link to="/">
        <Button
          startIcon={<HomeIcon />}
          variant="outlined"
          size="large"
          onClick={handleBackHome}
          sx={{ textTransform: "none", 
              color: "black",
              borderColor: "e8e8e8",
              "&:hover": {
                  backgroundColor: "#e8e8e8",
                  borderColor: "black",
              }

          }}
        >
          Back Home
        </Button>
      </Link>
      
    </Box>
   
  );
};

export default Unauthorized;
