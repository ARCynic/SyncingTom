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

  ctaLabel = "Open",

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
          gap-2
        "
      >
        {Array.isArray(group) &&
        group.length > 0 ? (
          <div
            className="
              flex
              items-center
              gap-2
            "
            aria-label="Supported instruments"
          >
            {group.map(
              (instrument) => (
                <img
                  key={
                    instrument.src
                  }
                  src={
                    instrument.src
                  }
                  alt={
                    instrument.alt
                  }
                  title={
                    instrument.alt
                  }
                  draggable="false"
                  className="
                    h-8
                    w-8
                    object-contain
                    opacity-80
                    transition
                    duration-200
                    hover:opacity-100
                    sm:h-9
                    sm:w-9
                  "
                />
              ),
            )}
          </div>
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

      <div
  className="
    mt-7
    flex
    items-center
  "
>
  <Link
    to={to}
    className="
      group/cta
      relative
      inline-flex
      min-h-12
      items-center
      overflow-hidden
      rounded-xl
      border
      px-5
      py-2.5
      text-sm
      font-semibold
      tracking-[0.01em]
      text-white/90
      shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_10px_30px_rgba(0,0,0,0.20)]
      backdrop-blur-xl
      transition-colors
      duration-200
      hover:text-white
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-white/30
      focus-visible:ring-offset-2
      focus-visible:ring-offset-black
    "
    style={{
      borderColor:
        hexToRgba(
          accent,
          0.34,
        ),

      background:
        `linear-gradient(
          135deg,
          ${hexToRgba(
            accent,
            0.18,
          )},
          ${hexToRgba(
            accent,
            0.07,
          )} 55%,
          rgba(255,255,255,0.025)
        )`,
    }}
  >
    <span
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        h-px
      "
      style={{
        background:
          `linear-gradient(
            90deg,
            transparent,
            ${hexToRgba(
              accent,
              0.7,
            )},
            transparent
          )`,
      }}
    />

    <span
      aria-hidden="true"
      className="
        mr-3
        flex
        h-7
        w-7
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        bg-black/15
      "
      style={{
        borderColor:
          hexToRgba(
            accent,
            0.28,
          ),
      }}
    >
      <svg
        viewBox="0 0 20 20"
        className="
          h-3.5
          w-3.5
        "
        fill="currentColor"
        style={{
          color:
            hexToRgba(
              accent,
              0.95,
            ),
        }}
        aria-hidden="true"
      >
        <path d="M6.5 4.8a1 1 0 0 1 1.52-.85l7.1 4.7a1.6 1.6 0 0 1 0 2.7l-7.1 4.7A1 1 0 0 1 6.5 15.2V4.8Z" />
      </svg>
    </span>

    <span>
      {ctaLabel}
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
                "from-black/25",
                "via-black/5",
                "to-transparent",
              ].join(" ")
            : [
                "bg-gradient-to-l",
                "from-black/25",
                "via-black/5",
                "to-transparent",
              ].join(" "),
        )}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-[14%]
          rounded-full
          opacity-55
          blur-3xl
          transition
          duration-500
          group-hover:opacity-80
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
            bg-black/20
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

        "bg-white/[0.025]",
        "backdrop-blur-sm",

        "shadow-[0_24px_80px_rgba(0,0,0,0.16)]",

        "transition-all",
        "duration-300",

        "hover:-translate-y-0.5",
        "hover:border-white/[0.13]",
        "hover:bg-black/40",

        className,
      )}
      style={{
        minHeight,
      }}
    >
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
                0.14,
              )},
              transparent 55%
            )`,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-10
          top-0
          h-px
          opacity-40
        "
        style={{
          background:
            `linear-gradient(
              90deg,
              transparent,
              ${hexToRgba(
                accent,
                0.55,
              )},
              transparent
            )`,
        }}
      />

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