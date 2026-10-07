import {
  useState,
} from "react";

export function ScaleFamilySelector({
  families,
  value,
  onChange,
}) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const selected =
    families.find(
      (family) =>
        family.id === value,
    ) ?? families[0];

  return (
    <div
      className="
        relative
        shrink-0
      "
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget,
          )
        ) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() =>
          setOpen(
            (current) =>
              !current,
          )
        }
        className="
          flex
          min-w-44
          items-center
          justify-between
          gap-5
          rounded-xl
          border
          border-white/10
          bg-black/30
          px-4
          py-3
          text-left
          transition-colors
          hover:border-white/20
          hover:bg-white/[0.035]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-cyan-300/30
        "
      >
        <span>
          <span
            className="
              block
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            Scale family
          </span>

          <span
            className="
              mt-1
              block
              text-sm
              font-semibold
              text-white/80
            "
          >
            {selected?.name}
          </span>
        </span>

        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`
            h-4
            w-4
            text-white/35
            transition-transform
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
          aria-hidden="true"
        >
          <path
            d="m6 8 4 4 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+0.5rem)]
            z-40
            min-w-full
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#0b0c0e]/95
            p-1.5
            shadow-[0_18px_50px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
          "
        >
          {families.map(
            (family) => {
              const active =
                family.id ===
                value;

              return (
                <button
                  key={
                    family.id
                  }
                  type="button"
                  onClick={() => {
                    onChange(
                      family.id,
                    );

                    setOpen(
                      false,
                    );
                  }}
                  className={`
                    block
                    w-full
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    transition-colors

                    ${
                      active
                        ? "bg-cyan-300/10 text-cyan-100"
                        : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {family.name}
                </button>
              );
            },
          )}
        </div>
      ) : null}
    </div>
  );
}