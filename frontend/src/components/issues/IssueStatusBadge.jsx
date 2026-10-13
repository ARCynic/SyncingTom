const STATUS_STYLES = {
  known: {
    label: "Known issue",

    className:
      "border-amber-300/20 bg-amber-300/[0.07] text-amber-200/70",
  },

  "in-progress": {
    label: "In progress",

    className:
      "border-purple-300/20 bg-purple-300/[0.07] text-purple-200/75",
  },

  planned: {
    label: "Planned",

    className:
      "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200/70",
  },

  exploring: {
    label: "Exploring",

    className:
      "border-blue-300/20 bg-blue-300/[0.07] text-blue-200/70",
  },
};

export default function IssueStatusBadge({
  status,
}) {
  const config =
    STATUS_STYLES[
      status
    ] ??
    STATUS_STYLES.planned;

  return (
    <span
      className={[
        "inline-flex",
        "items-center",
        "rounded-full",
        "border",
        "px-2.5",
        "py-1",
        "text-[9px]",
        "font-bold",
        "uppercase",
        "tracking-[0.13em]",

        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
}