import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Login.module.css';
import { setAuthToken } from "../services/auth"; // 用於儲存 token

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
      },{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

      // 假設 API 返回 token
      setAuthToken(response.data.access_token); 

      // 登入成功後跳轉到 Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("登入失敗，請檢查用戶名與密碼。");
    }
  };

  return (
    <div className="login-container">
      <h1>登入</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>用戶名：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密碼：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">登入</button>
      </form>
    </div>
  );
}

export default Login;
