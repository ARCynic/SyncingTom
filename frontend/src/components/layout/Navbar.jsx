import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import logoSyncingTom from "@/assets/logo_syncingtom.png";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  {
    label: "Home",
    to: "/",
    end: true,
  },
  {
    label: "Meter Sequence",
    to: "/tools/meter-sequence",
  },
];

const styles = {
  shell:
    "bg-black/65 ring-1 ring-white/10 backdrop-blur-xl " +
    "shadow-[0_16px_50px_rgba(0,0,0,0.40)]",

  pillBase:
    "bg-white/[0.035] text-white/65 ring-1 ring-white/[0.06] " +
    "hover:bg-white/[0.08] hover:text-white",

  pillActive:
    "bg-gradient-to-r from-purple-300 to-emerald-300 text-black " +
    "ring-1 ring-emerald-200/40 " +
    "shadow-[0_0_25px_rgba(52,211,153,0.14)]",
};

function HamburgerIcon({ open }) {
  return (
    <span
      className="relative block h-7 w-8"
      aria-hidden="true"
    >
      <span
        className={cx(
          "absolute left-0 top-1 h-[3px] w-8 rounded-full",
          "bg-purple-200 shadow-[0_0_10px_rgba(52,211,153,0.45)]",
          "transition-all duration-300",
          open && "top-3 rotate-45",
        )}
      />

      <span
        className={cx(
          "absolute left-0 top-3 h-[3px] w-8 rounded-full",
          "bg-purple-200 shadow-[0_0_14px_rgba(192,132,252,0.55)]",
          "transition-all duration-300",
          open && "opacity-0",
        )}
      />

      <span
        className={cx(
          "absolute left-0 top-5 h-[3px] w-8 rounded-full",
          "bg-purple-200 shadow-[0_0_14px_rgba(192,132,252,0.55)]",
          "transition-all duration-300",
          open && "top-3 -rotate-45",
        )}
      />
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/[0.06]
        bg-black/45
        backdrop-blur-xl
      "
    >
      <nav
        className="
          mx-auto
          flex
          w-full
          max-w-screen-2xl
          items-center
          justify-between
          gap-6
          px-4
          py-3
          sm:px-6
          lg:px-8
        "
      >
        {/* Brand */}
        <NavLink
          to="/"
          aria-label="SyncingTom home"
          className="
            group
            flex
            shrink-0
            items-center
            gap-3
          "
          onClick={() => setMobileOpen(false)}
        >
          {/* Logo */}
          <div
  className="
    flex
    h-16
    w-16
    shrink-0
    items-center
    justify-center
  "
>
  <img
    src={logoSyncingTom}
    alt="SyncingTom"
    draggable="false"
    className="
      syncingtom-logo
      h-full
      w-full
      object-contain
      transition
      duration-300
      group-hover:brightness-125
    "
  />
</div>

          {/* Brand name */}
          <div className="flex flex-col">
            <span
              className="
                text-[1.35rem]
                font-semibold
                leading-none
                tracking-[-0.03em]
                text-white
                sm:text-2xl
              "
            >
              Syncing
              <span
                className="
                  bg-gradient-to-r
                  from-purple-300
                  to-emerald-300
                  bg-clip-text
                  text-transparent
                "
              >
                Tom
              </span>
            </span>

            <span
              className="
                mt-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-white/35
                sm:text-[9px]
              "
            >
              Rhythm · Timing · Practice
            </span>
          </div>
        </NavLink>

        {/* Desktop navigation */}
        <div className="hidden items-center lg:flex">
          <div
            className={cx(
              "rounded-full p-1",
              styles.shell,
            )}
          >
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cx(
                        "inline-flex h-11 items-center justify-center rounded-full px-5",
                        "text-xs font-bold uppercase tracking-[0.12em] transition-all",
                        isActive
                          ? styles.pillActive
                          : styles.pillBase,
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() =>
            setMobileOpen((open) => !open)
          }
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="syncingtom-mobile-menu"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            p-2
            transition
            hover:bg-white/5
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-emerald-300
            lg:hidden
          "
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen ? (
        <div
          id="syncingtom-mobile-menu"
          className="
            mx-auto
            w-full
            max-w-screen-2xl
            px-4
            pb-4
            sm:px-6
            lg:hidden
          "
        >
          <div
            className={cx(
              "rounded-3xl p-2",
              styles.shell,
            )}
          >
            <ul className="flex flex-col gap-1.5">
              {items.map((item) => (
                <li key={`mobile-${item.to}`}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={({ isActive }) =>
                      cx(
                        "block rounded-2xl px-4 py-3.5",
                        "text-sm font-bold uppercase tracking-[0.1em] transition",
                        isActive
                          ? styles.pillActive
                          : styles.pillBase,
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}