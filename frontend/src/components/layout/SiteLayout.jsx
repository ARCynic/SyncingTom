import { Outlet } from "react-router";

import FloatingNotes from "@/components/home/FloatingNotes.jsx";

import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function SiteLayout() {
  return (
    <div
      className="
        relative
        isolate
        flex
        min-h-screen
        flex-col
        overflow-x-hidden
        bg-[#09090b]
        text-neutral-200
        selection:bg-purple-500/30
        selection:text-purple-100
      "
    >
      {/* --------------------------------------------------
          GLOBAL BACKGROUND
      -------------------------------------------------- */}

      {/* Base background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          bg-[#09090b]
        "
      />

      {/* Structural sequencer / sheet grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[1]
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:32px_32px]
        "
      />

      {/* Global animated musical field */}
      <FloatingNotes
        count={18}
        className="
          fixed
          inset-0
          z-[2]
          opacity-75
        "
      />

      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[3]
          bg-[radial-gradient(circle_900px_at_50%_8%,transparent_10%,rgba(9,9,11,0.18)_48%,#09090b_115%)]
        "
      />

      {/* Very subtle lower-page darkness */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-[4]
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-black/20
        "
      />

      {/* --------------------------------------------------
          SITE CONTENT
      -------------------------------------------------- */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
        "
      >
        <Navbar />

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}