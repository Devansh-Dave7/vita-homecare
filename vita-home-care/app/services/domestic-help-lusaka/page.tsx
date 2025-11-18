import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";

export default function DomesticHelpPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Domestic Help in Lusaka
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Domestic help to keep home safe, tidy and comfortable
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Our domestic help service supports the day-to-day running of the home so that your
            loved one can live in a clean, organised and welcoming environment without feeling
            overwhelmed by chores.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] items-start">
        <div className="space-y-8 text-sm md:text-base text-[#374151] leading-relaxed">
          {/* ABOUT THIS SERVICE */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              ABOUT THIS SERVICE
            </h2>
            <p>
              Domestic help focuses on practical, non-medical support with household tasks that
              can become difficult to manage alone. Our healthcare assistants and nurse
              assistants help keep the home clean, safe and easy to live in.
            </p>
            <p>
              By taking care of chores like cleaning, laundry and meal preparation, we free up
              time and energy for family, rest and the activities that matter most to your loved
              one.
            </p>
          </div>

          {/* Who this service is for */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              Who this service is for
            </h2>
            <p>
              Domestic help is ideal for elderly clients, people with reduced mobility, and
              individuals living with prolonged health conditions who are finding it harder to
              manage housework.
            </p>
            <p>
              It can support clients living alone or with family, and works well alongside
              personal care, companionship and other services from Vita Homecare.
            </p>
          </div>

          {/* What’s included in the service? */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              What&apos;s included in the service?
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Housekeeping & cleaning</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Light cleaning, dusting, washing dishes and keeping key areas of the home
                    tidy and safe to move around.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Meal preparation</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Help with planning, preparing and serving simple, nutritious meals and snacks
                    that fit the client&apos;s routine and preferences.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Laundry & bedding</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Washing, drying, folding clothes and changing bedding so clients always have
                    clean, comfortable clothing and linens.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Shopping & errands</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Support with basic shopping and local errands so the home is stocked with
                    essentials without putting strain on the client or family.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f97316]/40 bg-[#fff7ed] px-4 py-3 text-[13px] md:text-sm text-[#7c2d12]">
            <p className="font-semibold">Important to know</p>
            <p className="mt-1">
              Vita Homecare does <span className="font-semibold">not</span> provide clinical nursing procedures or
              hospital-level interventions. Domestic help is focused on everyday household support
              around the medical plan set by your doctor or hospital.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/domestic help.jpg"
                alt="Domestic help in the home"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-sm md:text-base text-[#4b5563]">
              <p>
                We work with you to create a domestic help plan that fits your schedule &mdash; for
                example, focused morning visits for cleaning and laundry, or afternoon visits
                covering meal preparation and errands.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about domestic help?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Share a few details about your home, routines and budget and we will help you plan
              domestic support that fits your family.
            </p>
            <a
              href="/inquiry"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2563eb] px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
            >
              Discuss pricing and care options
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
