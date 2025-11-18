import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";

export default function RespiteCarePage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Respite Care in Lusaka
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Respite care to give family caregivers a safe break
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Respite care provides short-term cover so that family caregivers can rest, travel or
            focus on other responsibilities while knowing their loved one is in safe hands.
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
              Respite care offers temporary, non-medical support for the client so that the main
              caregiver can take a planned break. Our care assistants follow existing routines so
              that the client feels secure.
            </p>
            <p>
              Breaks can range from a few hours to several days, depending on what your family
              needs and what is agreed in the care plan.
            </p>
          </div>

          {/* Who this service is for */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              Who this service is for
            </h2>
            <p>
              Respite care is designed for families who are providing most of the day-to-day
              support themselves and need planned time to rest, travel or attend to other
              responsibilities.
            </p>
            <p>
              It can support families caring for elderly relatives, people with dementia, mobility
              challenges or prolonged health conditions.
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
                  <p className="font-semibold text-[#111827]">Personal care cover</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Assistance with washing, dressing, toileting and mobility following the
                    client&apos;s usual routines.
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
                  <p className="font-semibold text-[#111827]">Companionship & routines</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Conversation, activities and routine support to keep the client&apos;s day feeling
                    familiar while the main caregiver is away.
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
                  <p className="font-semibold text-[#111827]">Domestic support</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Light housekeeping, meal preparation and laundry so that the home remains
                    organised during the respite period.
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
                  <p className="font-semibold text-[#111827]">Flexible duration</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Options for a few hours, overnight support or several days, depending on your
                    family&apos;s needs and budget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f97316]/40 bg-[#fff7ed] px-4 py-3 text-[13px] md:text-sm text-[#7c2d12]">
            <p className="font-semibold">Important to know</p>
            <p className="mt-1">
              Respite care does not change the client&apos;s underlying medical plan. We follow the
              instructions from your doctor or hospital and do not provide clinical nursing
              procedures.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/respite care.jpg"
                alt="Care assistant providing respite care support"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-sm md:text-base text-[#4b5563]">
              <p>
                We work with you to agree exactly what happens during respite visits so that you
                can truly rest, knowing your loved one is supported in line with their usual
                routines.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about respite care?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Tell us how often you provide care and what kind of break you need, and we will help
              you plan respite cover.
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
