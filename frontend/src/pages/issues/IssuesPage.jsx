import IssueCard from "@/components/issues/IssueCard.jsx";

import {
  ISSUE_SECTIONS,
  PROJECT_ISSUES,
  PROJECT_STATUS_UPDATED,
} from "@/data/issues/issues.js";

export default function IssuesPage() {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-screen-xl
        px-4
        pb-32
        pt-14
        sm:px-6
        sm:pt-20
        lg:px-8
      "
    >
      {/* Intro */}

      <section
        className="
          max-w-3xl
        "
      >
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.22em]
            text-purple-300/55
          "
        >
          Project status
        </p>

        <h1
          className="
            mt-4
            text-4xl
            font-semibold
            tracking-[-0.045em]
            text-white
            sm:text-5xl
          "
        >
          Issues &{" "}
          <span
            className="
              bg-gradient-to-r
              from-purple-300
              to-emerald-300
              bg-clip-text
              text-transparent
            "
          >
            Improvements
          </span>
        </h1>

        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-white/45
            sm:text-lg
          "
        >
          SyncingTom is still
          evolving. This page tracks
          known limitations, active
          refinements and ideas that
          may become part of the
          platform.
        </p>

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-x-6
            gap-y-2
            text-xs
            uppercase
            tracking-[0.12em]
            text-white/25
          "
        >
          <span>
            {
              PROJECT_ISSUES.length
            }{" "}
            tracked items
          </span>

          <span>
            Updated{" "}
            {
              PROJECT_STATUS_UPDATED
            }
          </span>
        </div>
      </section>

      {/* Principle */}

      <section
        className="
          mt-12
          rounded-3xl
          border
          border-white/[0.08]
          bg-white/[0.02]
          p-5
          sm:p-6
        "
      >
        <p
          className="
            max-w-3xl
            text-sm
            leading-7
            text-white/45
          "
        >
          This is not intended to be
          a complete development
          roadmap. It is a visible
          record of rough edges,
          ongoing experiments and
          likely directions as the
          tools are actually used and
          tested.
        </p>
      </section>

      {/* Sections */}

      <div
        className="
          mt-16
          space-y-20
        "
      >
        {ISSUE_SECTIONS.map(
          (section) => {
            const entries =
              PROJECT_ISSUES.filter(
                (item) =>
                  item.section ===
                  section.id,
              );

            if (
              entries.length === 0
            ) {
              return null;
            }

            return (
              <section
                key={
                  section.id
                }
              >
                <div
                  className="
                    mb-6
                    flex
                    items-end
                    justify-between
                    gap-6
                    border-b
                    border-white/[0.07]
                    pb-5
                  "
                >
                  <div>
                    <h2
                      className="
                        text-2xl
                        font-semibold
                        tracking-[-0.025em]
                        text-white
                        sm:text-3xl
                      "
                    >
                      {
                        section.title
                      }
                    </h2>

                    <p
                      className="
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        text-white/35
                      "
                    >
                      {
                        section.description
                      }
                    </p>
                  </div>

                  <span
                    className="
                      hidden
                      text-xs
                      font-semibold
                      text-white/20
                      sm:block
                    "
                  >
                    {
                      entries.length
                    }
                  </span>
                </div>

                <div
                  className="
                    grid
                    gap-4
                  "
                >
                  {entries.map(
                    (item) => (
                      <IssueCard
                        key={
                          item.id
                        }
                        item={
                          item
                        }
                      />
                    ),
                  )}
                </div>
              </section>
            );
          },
        )}
      </div>
    </main>
  );
}