// TODO: Replace this with API data when available.
const contactData = {
  title: "Get in Touch",
  subtitle: "Suspendisse ultrice gravida dictum fusce placerat ultricies integer",
  address: {
    label: "Our Address",
    line1: "1564 Goosetown Drive",
    line2: "Matthews, NC 28105",
  },
  hours: {
    label: "Hours Of Operation",
    value: "Mon - Fri: 9.00am to 5.00pm",
    note: "[2nd Sat Holiday]",
  },
  contact: {
    label: "Contact",
    phone: "+99- 35895-4565",
    email: "supportyou@info.com",
  },
  socials: [
    { name: "Facebook", icon: "facebook" },
    { name: "Instagram", icon: "instagram" },
    { name: "Pinterest", icon: "pinterest" },
    { name: "Twitter", icon: "twitter" },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Main Card */}
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Contact Info */}
              <div className="p-8 md:p-12 relative">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {contactData.title}
                </h1>
                <p className="text-base text-slate-600 mb-10 max-w-md">
                  {contactData.subtitle}
                </p>

                {/* Contact Info Cards */}
                <div className="space-y-6 mb-12 relative z-10">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base text-slate-500 mb-1">{contactData.address.label}</p>
                      <p className="text-lg font-bold text-slate-900">{contactData.address.line1}</p>
                      <p className="text-lg font-bold text-slate-900">{contactData.address.line2}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <circle cx="12" cy="12" r="8.5" />
                        <path d="M12 7.5v5l3 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base text-slate-500 mb-1">{contactData.hours.label}</p>
                      <p className="text-lg font-bold text-slate-900">{contactData.hours.value}</p>
                      <p className="text-base text-slate-500">{contactData.hours.note}</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M5 4.5a2 2 0 0 1 2-2h2l2 4-2 1.4a11 11 0 0 0 5.6 5.6L16 12l4 2v2a2 2 0 0 1-2 2h-.5A13.5 13.5 0 0 1 4.5 6.5V6a2 2 0 0 1 .5-1.5Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base text-slate-500 mb-1">{contactData.contact.label}</p>
                      <p className="text-lg font-bold text-orange-500">{contactData.contact.phone}</p>
                      <p className="text-lg font-bold text-slate-900">{contactData.contact.email}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Purple Shape with Customer Care */}
                <div className="absolute bottom-0 left-0 w-80 h-56 overflow-hidden pointer-events-none">
                  <svg viewBox="0 0 320 224" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0 224 L0 80 Q0 40 40 40 L120 40 Q160 40 180 80 L320 224 Z"
                      fill="#6366f1"
                    />
                  </svg>
                </div>

                {/* Social Icons - Positioned over the purple shape */}
                <div className="absolute bottom-20 left-8 flex items-center gap-3 z-10">
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-purple-600 transition-colors">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>

                {/* Customer Care Text */}
                <div className="absolute bottom-6 left-8 z-10">
                  <span className="text-white font-medium text-lg">Customer Care</span>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="p-8 md:p-12 bg-white border-l border-slate-100">
                <form className="space-y-6" action="#">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-base font-medium text-slate-900 mb-2">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      placeholder="Name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-base font-medium text-slate-900 mb-2">
                      Email Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      placeholder="Email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-base font-medium text-slate-900 mb-2">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="contact-phone"
                      placeholder="Phone"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-base font-medium text-slate-900 mb-2">
                      Subject<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="contact-subject"
                      placeholder="Subject"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-base font-medium text-slate-900 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="contact-message"
                      rows={4}
                      placeholder=""
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-8 py-3.5 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Footer Section */}
      <section className="bg-slate-900 py-10 mt-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x md:divide-slate-700">
              {/* Address */}
              <div className="flex items-center gap-4 justify-center md:justify-start md:pl-4 lg:pl-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-purple-400 mb-1">Address:</p>
                  <p className="text-lg font-semibold text-white">1925 Boggess Street</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 justify-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M5 4.5a2 2 0 0 1 2-2h2l2 4-2 1.4a11 11 0 0 0 5.6 5.6L16 12l4 2v2a2 2 0 0 1-2 2h-.5A13.5 13.5 0 0 1 4.5 6.5V6a2 2 0 0 1 .5-1.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-purple-400 mb-1">Phone:</p>
                  <p className="text-lg font-semibold text-white">(00) 875 784 568</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 justify-center md:justify-end md:pr-4 lg:pr-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <rect x="3.5" y="6" width="17" height="12" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-purple-400 mb-1">Email:</p>
                  <p className="text-lg font-semibold text-white">info@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
