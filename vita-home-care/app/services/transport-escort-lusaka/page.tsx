import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";

export default function TransportEscortPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Transport &amp; Escort in Lusaka
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Transport and escort for safe, supported trips out of the home
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Our transport and escort service helps clients attend appointments, church, family
            visits and other important activities with a care assistant by their side.
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
              Transport and escort is non-medical support that makes it easier and safer for
              clients to leave the house. A care assistant travels with the client, helping them
              before, during and after the journey.
            </p>
            <p>
              This can reduce stress for both the client and family members, especially when
              travelling to busy places like hospitals, clinics or crowded events.
            </p>
          </div>

          {/* Who this service is for */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              Who this service is for
            </h2>
            <p>
              Transport and escort is ideal for clients who feel anxious or unsteady travelling
              alone, or who need physical assistance getting in and out of vehicles and buildings.
            </p>
            <p>
              It can support elderly clients, people with reduced mobility, or clients living with
              dementia or prolonged health conditions that make travel more challenging.
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
                  <p className="font-semibold text-[#111827]">Assistance before and after trips</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Help with getting ready to leave, locking up the home, and settling back in
                    safely afterwards.
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
                  <p className="font-semibold text-[#111827]">Support during journeys</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Physical support with getting in and out of vehicles, and reassurance during
                    the journey.
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
                  <p className="font-semibold text-[#111827]">Escort at destinations</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Staying with the client at the clinic, church, family home or other venue
                    until they are ready to return.
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
                  <p className="font-semibold text-[#111827]">Liaison with family</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Sharing key updates with family or primary caregivers about how the trip went
                    and any concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f97316]/40 bg-[#fff7ed] px-4 py-3 text-[13px] md:text-sm text-[#7c2d12]">
            <p className="font-semibold">Important to know</p>
            <p className="mt-1">
              Transport and escort does not replace ambulance or emergency medical transport. We
              provide support around planned journeys; emergency care must always go through
              formal medical services.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/transport.jpg"
                alt="Care assistant escorting a client to an appointment"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-sm md:text-base text-[#4b5563]">
              <p>
                We plan each journey in advance with you, including pick-up times, routes and any
                mobility aids or extra support the client might need.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about transport and escort?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Tell us about the types of journeys your loved one needs to make and we will help
              you plan safe, supported trips.
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
