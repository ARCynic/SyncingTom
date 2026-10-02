export function ScaleFamilySelector({
  families,
  value,
  onChange,
}) {
  return (
    <fieldset>
      <legend
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.18em]
          text-white/35
        "
      >
        Scale family
      </legend>

      <div
        className="
          mt-2
          flex
          flex-wrap
          gap-2
        "
      >
        {families.map(
          (family) => {
            const selected =
              family.id === value;

            return (
              <button
                key={
                  family.id
                }
                type="button"
                aria-pressed={
                  selected
                }
                onClick={() =>
                  onChange(
                    family.id,
                  )
                }
                className="
                  min-h-12
                  rounded-xl
                  border
                  px-5
                  text-sm
                  font-semibold
                  transition
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-cyan-300/35
                "
                style={{
                  borderColor:
                    selected
                      ? "color-mix(in srgb, var(--scale-accent) 55%, transparent)"
                      : "rgba(255,255,255,0.09)",

                  background:
                    selected
                      ? "color-mix(in srgb, var(--scale-accent) 12%, transparent)"
                      : "rgba(255,255,255,0.02)",

                  color:
                    selected
                      ? "white"
                      : "rgba(255,255,255,0.48)",

                  boxShadow:
                    selected
                      ? "0 0 30px color-mix(in srgb, var(--scale-accent) 8%, transparent)"
                      : "none",
                }}
              >
                {family.name}
              </button>
            );
          },
        )}
      </div>
    </fieldset>
  );
}