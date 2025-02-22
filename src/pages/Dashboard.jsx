import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../services/auth"; // 用於檢查 token

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      navigate("/login"); // 沒有 token 則跳轉到登入頁
    } else {
      // 假設有 API 獲取用戶資訊
      setUser({ username: "User123" });
    }
  }, [navigate]);

  if (!user) return <div>正在載入...</div>;

  return (
    <div>
      <h1>歡迎，{user.username}</h1>
      <p>這是你的 Dashboard 頁面。</p>
    </div>
  );
}

export default Dashboard;
