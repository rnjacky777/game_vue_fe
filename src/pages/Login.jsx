import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../services/auth"; // 用於儲存 token
import {
  Button,
  InputLabel,
  TextField
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        username,
        password,
      }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
        { withCredentials: true }
      );

      console.log(response.data)
      // 假設 API 返回 token  
      setAuthToken(response.data.access_token);

      // 登入成功後跳轉到 Dashboard
      navigate("/game");
    } catch (err) {
      setError("登入失敗，請檢查用戶名與密碼。");
    }
  };

  return (
    <div className="game-container">
      <header className="header">登入</header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div>
            <InputLabel>用戶名：</InputLabel>
            <TextField
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <InputLabel>密碼：</InputLabel>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <Button
            color="primary"
            className="explore-button"
            variant="contained"
            type="submit">登入</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
