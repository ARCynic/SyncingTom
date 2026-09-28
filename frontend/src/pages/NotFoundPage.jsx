import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-screen-xl flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/65">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Nothing is playing here.
        </h1>
        <p className="mt-4 text-white/50">
          The route does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
