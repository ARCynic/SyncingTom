import { MeterSequenceTool } from "@/components/meter-sequence/MeterSequenceTool.jsx";

export default function MeterSequencePage() {
  return (
    <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-8 max-w-3xl sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/65">
          Rhythm tool
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Meter Sequence Click Track
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-white/50">
          Build changing-meter sequences, set the tempo, and play them with a
          stable browser-based click.
        </p>
      </header>

      <MeterSequenceTool />
    </main>
  );
}
