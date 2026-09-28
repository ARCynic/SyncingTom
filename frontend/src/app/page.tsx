import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-neutral-500">
        SyncingTom
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Small music tools that stay out of the way.
      </h1>
      <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
        First tool: a programmable changing-meter click track.
      </p>
      <div>
        <Link
          href="/tools/meter-sequence"
          className="inline-flex min-h-11 items-center rounded-xl border border-neutral-300 px-4 py-2 font-medium dark:border-neutral-700"
        >
          Open Meter Sequence
        </Link>
      </div>
    </main>
  );
}
