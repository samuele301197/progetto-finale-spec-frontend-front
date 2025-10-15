import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./pages/wineList.jsx";
import WineDetail from "./pages/WineDetail.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import NavBar from "./components/navBar.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<WineList />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/comparatore" element={<ComparisonPage />} />
        <Route path="/wines/:id" element={<WineDetail />} />
      </Routes>
    </>
  );
}
