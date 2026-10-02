import { Route, Routes } from "react-router";

import SiteLayout from "@/components/layout/SiteLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import MeterSequencePage from "@/pages/meter_sequence/MeterSequencePage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import ScaleArchivePage from "@/pages/scales/ScaleArchivePage.jsx";
import SubdivisionLadderPage from "@/pages/subdivision_ladder/SubdivisionLadderPage.jsx";
import AboutPage from "./pages/About.jsx";
import PolymeterPage from "@/pages/polymeter/PolymeterPage.jsx";
import FretTheScalesPage from "./pages/fret_the_scales/FretTheScalesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/meter-sequence" element={<MeterSequencePage />} />
        <Route path="/scales" element={<ScaleArchivePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/subdivision-ladder" element={<SubdivisionLadderPage />} />
        <Route path="/polymeter" element={<PolymeterPage />} />
        <Route path="/fret_the_scales" element={<FretTheScalesPage />}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
        
      </Route>
    </Routes>
  );
}
