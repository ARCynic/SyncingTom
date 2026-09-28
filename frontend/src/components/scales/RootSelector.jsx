import {
  displayNoteName,
  ROOT_OPTIONS,
} from "@/lib/scales/notes.js";

export function RootSelector({
  value,
  onChange,
}) {
  return (
    <label className="block">
      <span
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.18em]
          text-white/35
        "
      >
        Root
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="
          mt-2
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black/35
          px-4
          text-sm
          font-semibold
          text-white
          outline-none
          transition
          hover:border-white/20
        "
      >
        {ROOT_OPTIONS.map(
          (root) => (
            <option
              key={root}
              value={root}
            >
              {displayNoteName(
                root,
              )}
            </option>
          ),
        )}
      </select>
    </label>
  );
}