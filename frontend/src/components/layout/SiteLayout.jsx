import { Outlet } from "react-router";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function SiteLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#09090b] text-neutral-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Structural Grid Background - Looks like a sequencer timeline or sheet music */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 bg-[#09090b] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Subtle vignette to focus the center without looking like an "orb" */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_50%_10%,transparent_20%,#09090b_100%)]"
      />

      <Navbar />

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}