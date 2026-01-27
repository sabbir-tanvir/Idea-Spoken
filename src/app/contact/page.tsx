// TODO: Replace this with API data when available.
const contactData = {
  hero: {
    badge: "Contact",
    title: "Let's craft something meaningful together",
    subtitle:
      "Tell us about your project, request a demo, or just say hello. Our team replies within one business day.",
  },
  quickCards: [
    {
      label: "Office",
      value: "1564 Goosetown Drive",
      detail: "Matthews, NC 28105",
      tone: "bg-emerald-500/15 text-emerald-700",
      icon: "pin",
    },
    {
      label: "Hours",
      value: "Mon to Fri: 9:00 AM to 5:00 PM",
      detail: "Second Sat: 10:00 AM to 2:00 PM",
      tone: "bg-amber-500/15 text-amber-700",
      icon: "clock",
    },
    {
      label: "Call",
      value: "(00) 875 784 568",
      detail: "Customer care and support",
      tone: "bg-sky-500/15 text-sky-700",
      icon: "phone",
    },
    {
      label: "Email",
      value: "info@gmail.com",
      detail: "We reply within 24 hours",
      tone: "bg-slate-500/15 text-slate-700",
      icon: "mail",
    },
  ],
  spotlight: {
    title: "Visit our studio",
    description:
      "Stop by for a coffee and a whiteboard session. Prefer remote? We can set up a call in minutes.",
    address: "1925 Boggess Street, Charlotte, NC 28205",
  },
  socials: ["LinkedIn", "Dribbble", "Instagram", "X"],
  footer: [
    {
      label: "Address",
      value: "1925 Boggess Street, Charlotte",
      icon: "pin",
    },
    {
      label: "Phone",
      value: "(00) 875 784 568",
      icon: "phone",
    },
    {
      label: "Email",
      value: "info@gmail.com",
      icon: "mail",
    },
  ],
};

const iconMap: Record<string, JSX.Element> = {
  pin: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  clock: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 2" />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path d="M5 4.5a2 2 0 0 1 2-2h2l2 4-2 1.4a11 11 0 0 0 5.6 5.6L16 12l4 2v2a2 2 0 0 1-2 2h-.5A13.5 13.5 0 0 1 4.5 6.5V6a2 2 0 0 1 .5-1.5Z" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-200/70 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-amber-200/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-slate-200/70 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                {contactData.hero.badge}
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
                {contactData.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-600">
                {contactData.hero.subtitle}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {contactData.quickCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${item.tone}`}
                        aria-hidden="true"
                      >
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {item.value}
                        </p>
                        <p className="mt-1 text-md text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-amber-200">
                    {iconMap.pin}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {contactData.spotlight.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      {contactData.spotlight.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-slate-900">
                      {contactData.spotlight.address}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {contactData.socials.map((network) => (
                    <a
                      key={network}
                      href="#"
                      className="rounded-full border border-slate-200/70 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      {network}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-8 shadow-2xl shadow-slate-200/60">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Send a message</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Fill out the form and we will get back to you shortly.
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  {iconMap.mail}
                </div>
              </div>

              <form className="mt-8 grid gap-5" action="#">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    placeholder="name@email.com"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="contact-phone"
                    placeholder="(00) 875 784 568"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    placeholder="How can we help?"
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="contact-message"
                    rows={5}
                    placeholder="Share a few details about your project."
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200/70"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200 transition hover:bg-slate-800"
                >
                  Send message
                </button>
                <p className="text-xs text-slate-500">
                  By sending this message, you agree to our response policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/60 bg-slate-900 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-slate-100 sm:flex-row sm:items-center sm:justify-between">
          {contactData.footer.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-200">
                {iconMap[item.icon]}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
