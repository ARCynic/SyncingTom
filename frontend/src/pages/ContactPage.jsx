import ContactForm from "@/components/contact/ContactForm.jsx";

export default function ContactPage() {
  return (
    <main
      className="
        relative
        mx-auto
        w-full
        max-w-screen-xl
        flex-1
        px-4
        py-10
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-16
      "
    >
      <div
        className="
          grid
          gap-10
          lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
          lg:gap-16
        "
      >
        {/* Intro */}
        <section
          className="
            max-w-xl
            lg:pt-4
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-cyan-300/55
            "
          >
            Contact
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-semibold
              tracking-[-0.05em]
              text-white
              sm:text-5xl
            "
          >
            Get in{" "}

            <span
              className="
                bg-gradient-to-r
                from-purple-300
                to-emerald-300
                bg-clip-text
                text-transparent
              "
            >
              touch.
            </span>
          </h1>

          <p
            className="
              mt-5
              text-base
              leading-8
              text-white/48
            "
          >
            Have an idea for a
            practice tool, want
            to talk music and
            software or maybe found a bug in the site?
          </p>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-white/32
            "
          >
            Musical ideas, bug reports, theory
            corrections and usability
            feedback  are all welcome.
          </p>
        </section>

        {/* Form */}
        <section
          className="
            relative
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-black/25
            p-5
            shadow-[0_24px_80px_rgba(0,0,0,0.22)]
            backdrop-blur-sm
            sm:p-7
            lg:p-8
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-12
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-300/30
              to-transparent
            "
          />

          <ContactForm />
        </section>
      </div>
    </main>
  );
}