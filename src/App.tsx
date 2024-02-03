import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Episodes from "./pages/EpisodeDetails";
// import PageNotFound from "./pages/PageNotFound";
// import Episodes from "./pages/EpisodeDetails";
// import Characters from "./pages/CharacterDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="EpisodeDetails/:EpisodeID" element={<Episodes />} />
        {/* <Route path="EpisodeDetails/:EpisodeID" element={<Episodes />} />
        <Route path="CharacterDetails/:CharacterID" element={<Characters />} />
        <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
