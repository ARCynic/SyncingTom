import { Outlet } from "react-router";

import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function SiteLayout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#050708] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 bg-[#050708]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-64 -top-64 h-[700px] w-[700px] rounded-full bg-cyan-400/[0.055] blur-[150px]" />
        <div className="absolute -bottom-72 -right-64 h-[750px] w-[750px] rounded-full bg-emerald-400/[0.045] blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      <Navbar />

      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
