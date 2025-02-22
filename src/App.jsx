import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <nav style={{ margin: 20 }}>
        <Link to="/login" style={{ margin: 10 }}>login</Link>
        <Link to="/dashboard" style={{ margin: 10 }}>dashboard</Link>
        <Link to="/" style={{ margin: 10 }}>home</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
