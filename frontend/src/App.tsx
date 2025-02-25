// App.tsx - Arquivo de rotas principal
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Media from "./pages/Media";
import Reports from "./pages/Reports";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";
import MediaUpload from "./pages/MediaUpload";
import MediaProgrammatic from "./pages/MediaProgrammatic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/upload" element={<MediaUpload />} />
        <Route path="/media/programmatic" element={<MediaProgrammatic />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
