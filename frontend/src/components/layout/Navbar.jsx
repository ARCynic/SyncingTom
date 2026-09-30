import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  NavLink,
} from "react-router";

import logoSyncingTom from "@/assets/logo_syncingtom.png";

function cx(...classes) {
  return classes
    .filter(Boolean)
    .join(" ");
}

const items = [
  {
    label: "Home",
    to: "/",
    end: true,
  },
  {
    label: "Meter Seq",
    to: "/meter-sequence",
  },
  {
    label: "Scales",
    to: "/scales",
  },
  {
    label: "Subdiv Lad",
    to: "/subdivision-ladder",
  },
  {
    label: "Polymeter",
    to: "/polymeter",
  },
];

const styles = {
  desktopShell:
    "bg-black/35 ring-1 ring-white/[0.08] backdrop-blur-xl " +
    "shadow-[0_12px_45px_rgba(0,0,0,0.25)]",

  mobileShell:
    "bg-[#0b0b0d]/88 ring-1 ring-white/[0.10] backdrop-blur-2xl " +
    "shadow-[0_24px_80px_rgba(0,0,0,0.55)]",

  pillBase:
    "text-white/55 " +
    "hover:bg-white/[0.06] hover:text-white",

  pillActive:
    "bg-gradient-to-r from-purple-300 to-emerald-300 text-black " +
    "shadow-[0_0_24px_rgba(192,132,252,0.12)]",
};

function HamburgerIcon({
  open,
}) {
  return (
    <span
      className="
        relative
        block
        h-6
        w-7
      "
      aria-hidden="true"
    >
      <span
        className={cx(
          "absolute left-0 top-[3px] h-[2px] w-7 rounded-full",
          "bg-purple-200",
          "shadow-[0_0_10px_rgba(192,132,252,0.50)]",
          "transition-all duration-300",
          open &&
            "top-[11px] rotate-45",
        )}
      />

      <span
        className={cx(
          "absolute left-0 top-[11px] h-[2px] w-7 rounded-full",
          "bg-emerald-200",
          "shadow-[0_0_10px_rgba(110,231,183,0.40)]",
          "transition-all duration-300",
          open &&
            "scale-x-0 opacity-0",
        )}
      />

      <span
        className={cx(
          "absolute left-0 top-[19px] h-[2px] w-7 rounded-full",
          "bg-purple-200",
          "shadow-[0_0_10px_rgba(192,132,252,0.50)]",
          "transition-all duration-300",
          open &&
            "top-[11px] -rotate-45",
        )}
      />
    </span>
  );
}

export default function Navbar() {
  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const headerRef =
    useRef(null);

  useEffect(() => {
    function handleKeyDown(
      event,
    ) {
      if (
        event.key === "Escape"
      ) {
        setMobileOpen(false);
      }
    }

    function handlePointerDown(
      event,
    ) {
      if (
        !mobileOpen ||
        !headerRef.current
      ) {
        return;
      }

      if (
        !headerRef.current.contains(
          event.target,
        )
      ) {
        setMobileOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="
        sticky
        top-0
        z-50
        bg-transparent
      "
    >
      <nav
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-screen-2xl
          items-center
          justify-between
          gap-4
          px-3
          py-2
          sm:px-6
          sm:py-3
          lg:px-8
        "
      >
        {/* -------------------------
            BRAND
        ------------------------- */}

        <NavLink
          to="/"
          aria-label="SyncingTom home"
          className="
            group
            flex
            min-w-0
            shrink-0
            items-center
            gap-2.5
            sm:gap-3
          "
          onClick={() =>
            setMobileOpen(false)
          }
        >
          {/* Logo */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              sm:h-16
              sm:w-16
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

          {/* Name */}

          <div
            className="
              flex
              min-w-0
              flex-col
            "
          >
            <span
              className="
                whitespace-nowrap
                text-lg
                font-semibold
                
                leading-none
                tracking-[-0.03em]
                text-purple
                sm:text-2xl
              "
            >
              <span
                className="
                  bg-gradient-to-r
                  from-amber-300
                  to-purple-300
                  bg-clip-text
                  text-transparent
                "
              >
                Syncing
              </span>
              
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
                mt-1
                hidden
                whitespace-nowrap
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-white/30
                min-[390px]:block
                sm:mt-1.5
              "
            >
              Tools for music practice
            </span>
          </div>
        </NavLink>

        {/* -------------------------
            DESKTOP NAVIGATION
        ------------------------- */}

        <div
          className="
            hidden
            items-center
            lg:flex
          "
        >
          <div
            className={cx(
              "rounded-full p-1",
              styles.desktopShell,
            )}
          >
            <ul
              className="
                flex
                items-center
                gap-1
              "
            >
              {items.map(
                (item) => (
                  <li
                    key={
                      item.to
                    }
                  >
                    <NavLink
                      to={
                        item.to
                      }
                      end={
                        item.end
                      }
                      className={({
                        isActive,
                      }) =>
                        cx(
                          "inline-flex h-10 items-center justify-center rounded-full px-4",
                          "text-[11px] font-bold uppercase tracking-[0.11em]",
                          "transition-all duration-200",

                          isActive
                            ? styles.pillActive
                            : styles.pillBase,
                        )
                      }
                    >
                      {
                        item.label
                      }
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* -------------------------
            MOBILE BUTTON
        ------------------------- */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (open) =>
                !open,
            )
          }
          aria-label={
            mobileOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={
            mobileOpen
          }
          aria-controls="syncingtom-mobile-menu"
          className="
            relative
            inline-flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.07]
            bg-black/20
            backdrop-blur-md
            transition
            duration-200
            hover:border-purple-300/20
            hover:bg-white/[0.05]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-purple-300
            lg:hidden
          "
        >
          <HamburgerIcon
            open={mobileOpen}
          />
        </button>

        {/* -------------------------
            FLOATING MOBILE MENU
        ------------------------- */}

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              id="syncingtom-mobile-menu"
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.98,
              }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="
                absolute
                right-3
                top-[calc(100%+0.5rem)]
                z-[60]
                w-[min(20rem,calc(100vw-1.5rem))]
                origin-top-right
                sm:right-6
                lg:hidden
              "
            >
              <div
                className={cx(
                  "overflow-hidden rounded-[1.6rem] p-2",
                  styles.mobileShell,
                )}
              >
                {/* Small top detail */}

                <div
                  className="
                    mb-1
                    flex
                    items-center
                    justify-between
                    px-3
                    pb-2
                    pt-1
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-white/25
                    "
                  >
                    Navigate
                  </span>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-300
                      shadow-[0_0_10px_rgba(110,231,183,0.65)]
                    "
                  />
                </div>

                <ul
                  className="
                    flex
                    flex-col
                    gap-1
                  "
                >
                  {items.map(
                    (
                      item,
                      index,
                    ) => (
                      <motion.li
                        key={`mobile-${item.to}`}
                        initial={{
                          opacity: 0,
                          x: 8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration:
                            0.18,

                          delay:
                            0.025 *
                            index,
                        }}
                      >
                        <NavLink
                          to={
                            item.to
                          }
                          end={
                            item.end
                          }
                          onClick={() =>
                            setMobileOpen(
                              false,
                            )
                          }
                          className={({
                            isActive,
                          }) =>
                            cx(
                              "group flex min-h-12 items-center justify-between rounded-2xl px-4 py-3",
                              "text-sm font-semibold transition-all duration-200",

                              isActive
                                ? styles.pillActive
                                : [
                                    "text-white/60",
                                    "hover:bg-white/[0.055]",
                                    "hover:text-white",
                                  ].join(
                                    " ",
                                  ),
                            )
                          }
                        >
                          <span>
                            {
                              item.label
                            }
                          </span>

                          <span
                            className="
                              text-xs
                              opacity-30
                              transition
                              group-hover:translate-x-0.5
                              group-hover:opacity-60
                            "
                          >
                            
                          </span>
                        </NavLink>
                      </motion.li>
                    ),
                  )}
                </ul>

                <div
                  className="
                    mx-3
                    mt-2
                    border-t
                    border-white/[0.06]
                    pt-3
                    pb-2
                  "
                >
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      text-white/20
                    "
                  >
                    Practice Tools
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}