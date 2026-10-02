import {
  useState,
} from "react";

import {
  sendContactMessage,
} from "@/lib/contact/contactApi.js";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const LIMITS = {
  name: 100,
  email: 254,
  subject: 160,
  message: 5000,
};

const INPUT_CLASS = `
  mt-2
  w-full
  rounded-xl
  border
  border-white/10
  bg-black/30
  px-4
  py-3
  text-sm
  text-white
  outline-none
  transition
  placeholder:text-white/20
  hover:border-white/20
  focus:border-cyan-300/40
  focus:ring-2
  focus:ring-cyan-300/10
`;

function validateForm(
  form,
) {
  const errors = {};

  const name =
    form.name.trim();

  const email =
    form.email.trim();

  const subject =
    form.subject.trim();

  const message =
    form.message.trim();

  if (!name) {
    errors.name =
      "Enter your name.";
  } else if (
    name.length >
    LIMITS.name
  ) {
    errors.name =
      "Name is too long.";
  }

  if (!email) {
    errors.email =
      "Enter your email.";
  } else if (
    email.length >
    LIMITS.email
  ) {
    errors.email =
      "Email is too long.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email,
    )
  ) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!subject) {
    errors.subject =
      "Enter a subject.";
  } else if (
    subject.length >
    LIMITS.subject
  ) {
    errors.subject =
      "Subject is too long.";
  }

  if (!message) {
    errors.message =
      "Enter a message.";
  } else if (
    message.length >
    LIMITS.message
  ) {
    errors.message =
      "Message is too long.";
  }

  return errors;
}

function FieldLabel({
  htmlFor,
  children,
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="
        text-[10px]
        font-bold
        uppercase
        tracking-[0.18em]
        text-white/35
      "
    >
      {children}
    </label>
  );
}

function FieldError({
  id,
  children,
}) {
  if (!children) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className="
        mt-2
        text-xs
        text-rose-300/80
      "
    >
      {children}
    </p>
  );
}

export default function ContactForm() {
  const [
    form,
    setForm,
  ] = useState(
    INITIAL_FORM,
  );

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    status,
    setStatus,
  ] = useState(
    "idle",
  );

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const isSubmitting =
    status ===
    "submitting";

  const isSuccess =
    status ===
    "success";

  function updateField(
    field,
    value,
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      }),
    );

    setErrors(
      (current) => {
        if (
          !current[field]
        ) {
          return current;
        }

        const next = {
          ...current,
        };

        delete next[field];

        return next;
      },
    );

    setSubmitError("");
  }

  async function handleSubmit(
    event,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    /*
     * Honeypot.
     * Real users never see it.
     */
    if (form.website) {
      setStatus(
        "success",
      );

      return;
    }

    const nextErrors =
      validateForm(
        form,
      );

    if (
      Object.keys(
        nextErrors,
      ).length > 0
    ) {
      setErrors(
        nextErrors,
      );

      return;
    }

    setErrors({});
    setSubmitError("");
    setStatus(
      "submitting",
    );

    try {
      await sendContactMessage({
        name:
          form.name.trim(),

        email:
          form.email.trim(),

        subject:
          form.subject.trim(),

        message:
          form.message.trim(),
      });

      setForm(
        INITIAL_FORM,
      );

      setStatus(
        "success",
      );
    } catch (error) {
      setStatus(
        "error",
      );

      setSubmitError(
        error instanceof
          Error
          ? error.message
          : "Something went wrong.",
      );
    }
  }

  if (isSuccess) {
    return (
      <div
        className="
          flex
          min-h-[28rem]
          flex-col
          items-center
          justify-center
          text-center
        "
        role="status"
        aria-live="polite"
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-emerald-300/20
            bg-emerald-300/[0.06]
            text-lg
            text-emerald-200
          "
        >
          ✓
        </div>

        <h2
          className="
            mt-5
            text-2xl
            font-semibold
            tracking-[-0.03em]
            text-white
          "
        >
          Message sent.
        </h2>

        <p
          className="
            mt-3
            max-w-sm
            text-sm
            leading-6
            text-white/40
          "
        >
          Thanks for getting in
          touch.
        </p>

        <button
          type="button"
          onClick={() =>
            setStatus(
              "idle",
            )
          }
          className="
            mt-6
            rounded-xl
            border
            border-white/10
            bg-white/[0.025]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white/55
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      noValidate
    >
      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
        "
      >
        <div>
          <FieldLabel htmlFor="contact-name">
            Name
          </FieldLabel>

          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            maxLength={
              LIMITS.name
            }
            value={
              form.name
            }
            onChange={(
              event,
            ) =>
              updateField(
                "name",
                event.target
                  .value,
              )
            }
            aria-invalid={
              Boolean(
                errors.name,
              )
            }
            aria-describedby={
              errors.name
                ? "contact-name-error"
                : undefined
            }
            className={
              INPUT_CLASS
            }
            placeholder="Your name"
          />

          <FieldError id="contact-name-error">
            {errors.name}
          </FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="contact-email">
            Email
          </FieldLabel>

          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            maxLength={
              LIMITS.email
            }
            value={
              form.email
            }
            onChange={(
              event,
            ) =>
              updateField(
                "email",
                event.target
                  .value,
              )
            }
            aria-invalid={
              Boolean(
                errors.email,
              )
            }
            aria-describedby={
              errors.email
                ? "contact-email-error"
                : undefined
            }
            className={
              INPUT_CLASS
            }
            placeholder="you@example.com"
          />

          <FieldError id="contact-email-error">
            {errors.email}
          </FieldError>
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel htmlFor="contact-subject">
          Subject
        </FieldLabel>

        <input
          id="contact-subject"
          type="text"
          name="subject"
          maxLength={
            LIMITS.subject
          }
          value={
            form.subject
          }
          onChange={(
            event,
          ) =>
            updateField(
              "subject",
              event.target
                .value,
            )
          }
          aria-invalid={
            Boolean(
              errors.subject,
            )
          }
          aria-describedby={
            errors.subject
              ? "contact-subject-error"
              : undefined
          }
          className={
            INPUT_CLASS
          }
          placeholder="What's on your mind?"
        />

        <FieldError id="contact-subject-error">
          {errors.subject}
        </FieldError>
      </div>

      <div className="mt-5">
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <FieldLabel htmlFor="contact-message">
            Message
          </FieldLabel>

          <span
            className="
              text-[10px]
              text-white/20
            "
          >
            {
              form.message.length
            }
            /
            {
              LIMITS.message
            }
          </span>
        </div>

        <textarea
          id="contact-message"
          name="message"
          rows={9}
          maxLength={
            LIMITS.message
          }
          value={
            form.message
          }
          onChange={(
            event,
          ) =>
            updateField(
              "message",
              event.target
                .value,
            )
          }
          aria-invalid={
            Boolean(
              errors.message,
            )
          }
          aria-describedby={
            errors.message
              ? "contact-message-error"
              : undefined
          }
          className={`
            ${INPUT_CLASS}
            resize-y
          `}
          placeholder="Write your message..."
        />

        <FieldError id="contact-message-error">
          {errors.message}
        </FieldError>
      </div>

      {/* Honeypot */}
      <div
        className="
          absolute
          -left-[10000px]
          h-px
          w-px
          overflow-hidden
        "
        aria-hidden="true"
      >
        <label htmlFor="contact-website">
          Website
        </label>

        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={
            form.website
          }
          onChange={(
            event,
          ) =>
            updateField(
              "website",
              event.target
                .value,
            )
          }
        />
      </div>

      {submitError ? (
        <div
          role="alert"
          className="
            mt-5
            rounded-xl
            border
            border-rose-300/15
            bg-rose-300/[0.04]
            px-4
            py-3
            text-sm
            leading-6
            text-rose-200/80
          "
        >
          {submitError}
        </div>
      ) : null}

      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            max-w-sm
            text-xs
            leading-5
            text-white/25
          "
        >
          Your email is used only
          so a reply can be sent.
        </p>

        <button
          type="submit"
          disabled={
            isSubmitting
          }
          className="
            min-h-11
            rounded-xl
            border
            border-cyan-300/25
            bg-cyan-300/[0.065]
            px-5
            text-sm
            font-semibold
            text-cyan-100
            transition
            hover:border-cyan-300/40
            hover:bg-cyan-300/[0.1]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          {isSubmitting
            ? "Sending..."
            : "Send message"}
        </button>
      </div>
    </form>
  );
}