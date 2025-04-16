import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../services/auth"; // 用於儲存 token
import {
  Button,
  InputLabel,
  TextField
} from "@mui/material";
import GameContainer from "../components/common/GameContainer/GameContainer";
import FormCard from "../components/common/FormCard/FormCard";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        username,
        password,
      }, { headers: { "Content-Type": "application/json"} },
        { withCredentials: true }
      );

      console.log(response.data)
      // 假設 API 返回 token  
      sessionStorage.setItem("token",response.data.access_token);

      // 登入成功後跳轉到 Dashboard
      navigate("/game");
    } catch (err) {
      console.log(err)
      setError("登入失敗，請檢查用戶名與密碼。");
    }
  };

  return (
    <GameContainer>
      <header className="header">登入</header>
      <div className="content">
        <FormCard onSubmit={handleSubmit}>
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
        </FormCard>
      </div>
      </GameContainer>
  );
}

export default Login;
