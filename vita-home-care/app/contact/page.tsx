import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Contact us
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Let&apos;s talk about care for your loved one
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Share a few details about your situation and how we can help. Our team will review
            your message and get back to you to discuss next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14 grid gap-10 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
        {/* Contact form */}
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 md:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="preferredTime" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                  Preferred time to reach you
                </label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="text"
                  placeholder="e.g. Weekday afternoons, 14:00–17:00"
                  className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="serviceType" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                What type of support are you looking for?
              </label>
              <select
                id="serviceType"
                name="serviceType"
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
              >
                <option value="">Select an option</option>
                <option value="personal-care">Personal care</option>
                <option value="domestic-help">Domestic help</option>
                <option value="live-in-care">Live-in care</option>
                <option value="companionship">Companionship care</option>
                <option value="transport-escort">Transport &amp; escort</option>
                <option value="respite-care">Respite care</option>
                <option value="not-sure">I&apos;m not sure yet</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Tell us a bit about your situation
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                placeholder="For example: who the care is for, where they live, and what kind of help you think they may need."
              />
            </div>

            <div className="space-y-3 rounded-2xl bg-[#f9fafb] px-4 py-3 text-[12px] text-[#4b5563]">
              <p>
                For detailed pricing and care planning, you can also use our inquiry form. The
                contact form here is ideal if you prefer a quick call-back or email first.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb]"
            >
              Send message
            </button>
          </form>
        </div>

        {/* Contact details / reassurance card */}
        <aside className="space-y-6 text-sm md:text-base">
          <div className="rounded-3xl border border-[#e5e7eb] bg-[#eff6ff] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
              HOW WE RESPOND
            </p>
            <h2 className="mt-3 text-lg md:text-xl font-semibold text-[#111827]">
              A real person will follow up
            </h2>
            <p className="mt-2 text-[13px] md:text-sm text-[#4b5563]">
              Your message goes straight to our coordination team in Lusaka. We aim to respond
              within one working day to understand your needs and suggest next steps.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 space-y-3 text-[13px] md:text-sm text-[#4b5563]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Phone
              </p>
              <p className="mt-1 text-[#111827]">+260 7542 532477</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Email
              </p>
              <p className="mt-1 text-[#111827]">hello@vitahomecare.co.zm</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Service area
              </p>
              <p className="mt-1 text-[#111827]">Lusaka and surrounding areas</p>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
