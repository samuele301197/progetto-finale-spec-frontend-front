import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./pages/wineList.jsx";
import WineDetail from "./pages/wineDetail.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import NavBar from "./components/navBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoaderLayout from "./components/loader/LoaderLayout.jsx";
import HomeWrapper from "./components/LoaderWrapper/HomeWrapper.jsx";
import WineListWrapper from "./components/LoaderWrapper/WineListWrapper.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <LoaderLayout>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/list" element={<WineListWrapper />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/comparatore" element={<ComparisonPage />} />
          <Route path="/wines/:id" element={<WineDetail />} />
        </Routes>
        <Footer />
      </LoaderLayout>
    </>
  );
}
