import {
  SubdivisionLadderTool,
} from "@/components/subdivision-ladder/SubdivisionLadderTool.jsx";

export default function SubdivisionLadderPage() {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-screen-2xl
        px-4
        py-8
        sm:px-6
        sm:py-12
        lg:px-8
      "
    >
      <div
        className="
          mb-8
          max-w-3xl
        "
      >
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-purple-300/50
          "
        >
          SyncingTom
        </p>

        <h1
          className="
            mt-3
            text-4xl
            font-semibold
            tracking-[-0.04em]
            text-white
            sm:text-5xl
          "
        >
          Subdivision Ladder
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-base
            leading-7
            text-white/40
          "
        >
          Hold the meter steady.
          Increase, decrease or
          rearrange the rhythmic
          density inside each pulse.
        </p>
      </div>

      <SubdivisionLadderTool />
    </main>
  );
}