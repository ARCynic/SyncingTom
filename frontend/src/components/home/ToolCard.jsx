import {
  useState,
} from "react";

import {
  Link,
} from "react-router";

const cx = (...classes) =>
  classes
    .filter(Boolean)
    .join(" ");

function hexToRgba(
  hex,
  alpha = 1,
) {
  if (
    typeof hex !== "string" ||
    !hex.startsWith("#")
  ) {
    return `rgba(192, 132, 252, ${alpha})`;
  }

  const value =
    hex
      .replace("#", "")
      .trim();

  const full =
    value.length === 3
      ? value
          .split("")
          .map(
            (character) =>
              character +
              character,
          )
          .join("")
      : value;

  const numeric =
    Number.parseInt(
      full,
      16,
    );

  if (
    !Number.isFinite(
      numeric,
    )
  ) {
    return `rgba(192, 132, 252, ${alpha})`;
  }

  const red =
    (numeric >> 16) & 255;

  const green =
    (numeric >> 8) & 255;

  const blue =
    numeric & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function ToolCard({
  to,
  title,
  description,
  practice,

  group,

  stampSrc,
  stampAlt = "",
  monogram,

  accent = "#c084fc",
  glow,

  badge,

  minHeight = 280,
  split = [1.7, 1],
  stampSide = "right",

  ctaLabel = "Open tool",

  className = "",
}) {
  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  const [
    textRatio,
    stampRatio,
  ] = Array.isArray(split)
    ? split
    : [1.7, 1];

  const gridTemplateColumns =
    stampSide === "right"
      ? `${textRatio}fr ${stampRatio}fr`
      : `${stampRatio}fr ${textRatio}fr`;

  const glowColor =
    glow ??
    hexToRgba(
      accent,
      0.13,
    );

  const TextColumn = (
    <div
      className="
        relative
        z-10
        flex
        flex-col
        justify-center
        p-6
        sm:p-8
        lg:p-10
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        {group ? (
          <span
            aria-hidden="true"
            className="
              text-3xl
              leading-none
              sm:text-4xl
            "
          >
            {group}
          </span>
        ) : null}

        {badge ? (
          <span
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.035]
              px-2.5
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/40
            "
          >
            {badge}
          </span>
        ) : null}
      </div>

      <Link
        to={to}
        className="
          mt-4
          w-fit
          text-2xl
          font-semibold
          tracking-[-0.035em]
          text-white
          transition-colors
          hover:text-white/80
          sm:text-3xl
        "
      >
        {title}
      </Link>

      {description ? (
        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-7
            text-white/60
            sm:text-[15px]
          "
        >
          {description}
        </p>
      ) : null}

      {practice ? (
        <div
          className="
            mt-5
            max-w-2xl
            border-l
            border-white/10
            pl-4
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-white/25
            "
          >
            Practice
          </p>

          <p
            className="
              mt-1.5
              text-sm
              leading-6
              text-white/40
            "
          >
            {practice}
          </p>
        </div>
      ) : null}

      <div className="mt-7">
        <Link
          to={to}
          className="
            inline-flex
            min-h-11
            items-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.045]
            px-4
            py-2
            text-sm
            font-semibold
            text-white/75
            ring-4
            ring-white/[0.035]
            transition-all
            duration-200
            hover:border-white/15
            hover:bg-white/[0.08]
            hover:text-white
            hover:ring-white/[0.07]
          "
        >
          {ctaLabel}

          <span
            aria-hidden="true"
            className="
              ml-2
              text-white/40
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
          </span>
        </Link>
      </div>
    </div>
  );

  const StampColumn = (
    <div
      className="
        relative
        flex
        min-h-52
        items-center
        justify-center
        overflow-hidden
        p-4
        sm:min-h-60
        md:min-h-0
        md:p-6
      "
    >
      {/* fade between text and image */}

      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none",
          "absolute",
          "inset-0",

          stampSide ===
            "right"
            ? [
                "bg-gradient-to-r",
                "from-black/45",
                "via-black/10",
                "to-transparent",
              ].join(" ")
            : [
                "bg-gradient-to-l",
                "from-black/45",
                "via-black/10",
                "to-transparent",
              ].join(" "),
        )}
      />

      {/* local glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[14%]
          rounded-full
          opacity-70
          blur-3xl
          transition
          duration-500
          group-hover:opacity-100
        "
        style={{
          background:
            glowColor,
        }}
      />

      {stampSrc &&
      !imageFailed ? (
        <img
          src={stampSrc}
          alt={
            stampAlt ||
            `${title} illustration`
          }
          draggable="false"
          onError={() =>
            setImageFailed(
              true,
            )
          }
          className="
            relative
            z-[1]
            h-48
            w-full
            object-contain
            opacity-90
            transition-all
            duration-300
            ease-out
            group-hover:scale-[1.025]
            group-hover:opacity-100
            sm:h-56
            md:h-[85%]
            md:max-h-[21rem]
          "
        />
      ) : (
        <div
          className="
            relative
            z-[1]
            flex
            h-36
            w-36
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/25
            text-4xl
            font-semibold
            tracking-[-0.06em]
            text-white/25
            backdrop-blur-sm
          "
          style={{
            boxShadow:
              `0 0 70px ${glowColor}`,
          }}
        >
          {monogram ??
            title
              ?.slice(0, 2)
              .toUpperCase()}
        </div>
      )}
    </div>
  );

  return (
    <article
      className={cx(
        "group",
        "relative",
        "overflow-hidden",
        "rounded-[2rem]",

        "border",
        "border-white/[0.08]",

        "bg-black/70",
        "backdrop-blur-md",

        "shadow-[0_24px_80px_rgba(0,0,0,0.22)]",

        "transition-all",
        "duration-300",

        "hover:-translate-y-0.5",
        "hover:border-white/[0.13]",
        "hover:bg-black/75",

        className,
      )}
      style={{
        minHeight,
      }}
    >
      {/* accent glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          background:
            `radial-gradient(
              760px circle at 12% 0%,
              ${hexToRgba(
                accent,
                0.16,
              )},
              transparent 55%
            )`,
        }}
      />

      {/* subtle top line */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-10
          top-0
          h-px
          opacity-50
        "
        style={{
          background:
            `linear-gradient(
              90deg,
              transparent,
              ${hexToRgba(
                accent,
                0.65,
              )},
              transparent
            )`,
        }}
      />

      {/* desktop */}

      <div
        className="
          relative
          hidden
          h-full
          md:grid
        "
        style={{
          gridTemplateColumns,
        }}
      >
        {stampSide ===
        "left"
          ? StampColumn
          : TextColumn}

        {stampSide ===
        "left"
          ? TextColumn
          : StampColumn}
      </div>

      {/* mobile */}

      <div
        className="
          relative
          md:hidden
        "
      >
        {TextColumn}

        {StampColumn}
      </div>
    </article>
  );
}