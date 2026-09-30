import {
  PolymeterTool,
} from "@/components/polymeter/PolymeterTool.jsx";

export default function PolymeterPage() {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-10
        sm:px-6
        lg:px-8
      "
    >
      <header
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
            tracking-[0.22em]
            text-cyan-300
          "
        >
          Rhythm Lab
        </p>

        <h1
          className="
            mt-3
            text-4xl
            font-semibold
            tracking-[-0.045em]
            text-white
            sm:text-5xl
          "
        >
          Polymeter Player
        </h1>

        <p
          className="
            mt-4
            text-sm
            leading-7
            text-white/45
            sm:text-base
          "
        >
          Build independent
          drum patterns with
          different cycle lengths.
          Every lane follows the
          same master BPM and
          realigns at the least
          common multiple of the
          active pattern lengths.
        </p>
      </header>

      <PolymeterTool />
    </main>
  );
}