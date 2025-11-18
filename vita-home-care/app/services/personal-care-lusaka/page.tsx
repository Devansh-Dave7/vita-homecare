import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";

export default function PersonalCarePage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Personal Care in Lusaka
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Personal care at home for daily comfort and dignity
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Our healthcare assistants and nurse assistants provide sensitive, non-medical personal care
            in your own home. We help with everyday tasks like bathing, grooming, dressing and mobility
            so your loved one can stay clean, comfortable and independent while remaining close to family.
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
              Personal care focuses on dignified, hands-on support with daily routines in the
              comfort of your own home. It is non-medical support delivered by trained healthcare
              assistants and nurse assistants, not registered nurses.
            </p>
            <p>
              Our team helps with sensitive tasks like washing, dressing and using the toilet in a
              way that protects privacy, respect and independence. The goal is to keep your loved
              one clean, comfortable and confident while staying close to family and community.
            </p>
          </div>

          {/* Who this service is for */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              Who this service is for
            </h2>
            <p>
              Personal care is ideal for elderly clients, people with reduced mobility, and
              individuals living with prolonged health conditions who need day-to-day assistance
              but do not require hospital-level treatment.
            </p>
            <p>
              It can be arranged for clients living alone or with family, and can be combined with
              our other services such as domestic help, companionship or transport and escort.
            </p>
          </div>

          {/* What’s included in the service? */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              What&apos;s included in the service?
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Bathing & grooming</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Help with washing, showering, hair care and general hygiene so clients feel
                    fresh, confident and respected.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Dressing & toileting</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Support with choosing clothes, getting dressed, continence care and safe use of
                    the toilet, always with privacy and dignity.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Mobility & transfers</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Gentle assistance with moving around the home, getting in and out of bed or
                    chairs, and safe positioning.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                <div className="relative z-10">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                    Core task
                  </div>
                  <p className="font-semibold text-[#111827]">Medication reminders</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Non-clinical prompts to take prescribed medication on time, following the plan
                    from your doctor or clinic.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f97316]/40 bg-[#fff7ed] px-4 py-3 text-[13px] md:text-sm text-[#7c2d12]">
            <p className="font-semibold">Important to know</p>
            <p className="mt-1">
              Vita Homecare does <span className="font-semibold">not</span> provide clinical nursing procedures such as
              wound care, injections or medical decision-making. Our role is to support daily
              life around the medical plan set by your doctor or hospital.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/personal care.jpg"
                alt="Personal care at home"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-sm md:text-base text-[#4b5563]">
              <p>
                We match each client with a small team of care assistants who get to know their
                routines, preferences and cultural background. Visits can be scheduled in the
                morning, evening or throughout the day depending on what your family needs.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about personal care?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Share a few details about your situation and budget and we will help you plan
              personal care support that fits your family.
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
