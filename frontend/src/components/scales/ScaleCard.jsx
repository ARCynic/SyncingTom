export function ScaleCard({
  scale,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onSelect(scale.id)
      }
      className="
        w-full
        rounded-2xl
        border
        p-4
        text-left
        transition
        hover:bg-white/[0.045]
      "
      style={{
        borderColor: selected
          ? "var(--scale-accent)"
          : "rgba(255,255,255,0.08)",

        background: selected
          ? "color-mix(in srgb, var(--scale-accent) 9%, transparent)"
          : "rgba(255,255,255,0.018)",

        boxShadow: selected
          ? "0 0 30px color-mix(in srgb, var(--scale-accent) 10%, transparent)"
          : "none",
      }}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <h3
            className="
              text-base
              font-semibold
              text-white
            "
          >
            {scale.name}
          </h3>

          {scale.modeName !==
          scale.name ? (
            <p
              className="
                mt-1
                text-xs
                text-white/35
              "
            >
              {scale.modeName}
            </p>
          ) : null}
        </div>

        <span
          className="
            rounded-full
            px-2
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-[0.12em]
          "
          style={{
            color:
              "var(--scale-accent)",

            background:
              "color-mix(in srgb, var(--scale-accent) 10%, transparent)",
          }}
        >
          Mode {scale.modeDegree}
        </span>
      </div>

      <p
        className="
          mt-4
          font-mono
          text-xs
          tracking-wide
          text-white/45
        "
      >
        {scale.formula.join(
          " · ",
        )}
      </p>
    </button>
  );
}