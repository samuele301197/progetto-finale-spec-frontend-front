import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./pages/wineList.jsx";
import WineDetail from "./pages/wineDetail.jsx";
import ComparisonPage from "./pages/comparatorPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WineList />} />
      <Route path="/wines/:id" element={<WineDetail />} />
      <Route path="/comparatore" element={<ComparisonPage />} />
    </Routes>
  );
}

export default App;
