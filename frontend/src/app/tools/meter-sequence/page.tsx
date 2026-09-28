import type { Metadata } from "next";
import Link from "next/link";

import { MeterSequenceTool } from "@/components/meter-sequence/MeterSequenceTool";

export const metadata: Metadata = {
  title: "Meter Sequence Click Track",
  description: "Build changing-meter practice sequences with SyncingTom.",
};

export default function MeterSequencePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <a
        href="#sequence-editor-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to sequence editor
      </a>

      <header className="mb-10 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <Link href="/" className="text-sm font-medium text-neutral-500 transition hover:text-neutral-950 dark:hover:text-white">
          SyncingTom home
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Rhythm tools</p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Meter Sequence Click Track
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
          Build a changing-meter sequence, set the tempo, and play it as an accurate browser-based click track.
        </p>
      </header>

      <MeterSequenceTool />
    </main>
  );
}
