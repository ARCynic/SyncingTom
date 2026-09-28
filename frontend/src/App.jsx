import { Route, Routes } from "react-router";

import SiteLayout from "@/components/layout/SiteLayout.jsx";
import HomePage from "@/pages/HomePage.jsx";
import MeterSequencePage from "@/pages/meter_sequence/MeterSequencePage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="tools/meter-sequence" element={<MeterSequencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
