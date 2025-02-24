import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GameInterface from "./pages/GameInterface";
import Settings from "./pages/Settings"
import EmptyPage from "./pages/empty"
import ExplorePage from "./pages/Explore"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<GameInterface />}>
          <Route path="" element={<ExplorePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="empty" element={<EmptyPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;