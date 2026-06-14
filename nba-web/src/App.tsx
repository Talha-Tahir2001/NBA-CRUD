import { Routes, Route } from "react-router-dom";
import PlayersPage from "./pages/PlayersPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/players" element={<PlayersPage />} />
    </Routes>
  );
}