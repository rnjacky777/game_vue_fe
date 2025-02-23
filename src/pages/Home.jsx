import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // 點擊後跳轉到 /login 頁面
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff', // 淺藍色背景
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
        歡迎來到遊戲
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        請點擊下面的按鈕開始遊戲！
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '12px',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#3b7dd8', // 當鼠標懸停時改變顏色
          },
        }}
        onClick={handleClick}
      >
        前往登入頁面
      </Button>
    </Box>
  );
}

export default Home;
