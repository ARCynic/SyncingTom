import IssueStatusBadge from "./IssueStatusBadge.jsx";

export default function IssueCard({
  item,
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.08]
        bg-black/40
        p-5
        backdrop-blur-sm
        transition
        duration-200
        hover:border-white/[0.13]
        hover:bg-black/50
        sm:p-6
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-48
          w-48
          rounded-full
          bg-purple-300/[0.04]
          blur-3xl
          transition
          duration-500
          group-hover:bg-purple-300/[0.07]
        "
      />

      <div
        className="
          relative
          z-10
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          <IssueStatusBadge
            status={
              item.status
            }
          />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/25
            "
          >
            {item.area}
          </span>
        </div>

        <h3
          className="
            mt-4
            text-lg
            font-semibold
            tracking-tight
            text-white
            sm:text-xl
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3
            max-w-3xl
            text-sm
            leading-6
            text-white/45
          "
        >
          {item.description}
        </p>

        {item.next ? (
          <div
            className="
              mt-5
              border-l
              border-white/10
              pl-4
            "
          >
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white/25
              "
            >
              Next
            </p>

            <p
              className="
                mt-1.5
                text-sm
                leading-6
                text-white/50
              "
            >
              {item.next}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}