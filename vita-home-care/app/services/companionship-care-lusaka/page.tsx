import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";

export default function CompanionshipCarePage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Companionship Care in Lusaka
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            Companionship care to reduce loneliness and keep clients connected
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            Our companionship care focuses on emotional support, conversation and meaningful
            activities so that clients feel seen, heard and part of everyday life.
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
              Companionship care is non-medical support focused on social contact and emotional
              wellbeing. Our care assistants spend time with clients, listening, chatting and
              encouraging gentle activity.
            </p>
            <p>
              This kind of support can make a big difference to mood, confidence and quality of
              life, especially for clients who spend long periods at home.
            </p>
          </div>

          {/* Who this service is for */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
              Who this service is for
            </h2>
            <p>
              Companionship care is suitable for clients who feel isolated, lonely or anxious, or
              who would benefit from gentle encouragement to stay engaged with daily life.
            </p>
            <p>
              It can support elderly clients, people living with dementia, or anyone who would
              appreciate regular friendly visits alongside personal care or domestic help.
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
                  <p className="font-semibold text-[#111827]">Conversation & companionship</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Unhurried time to talk, share stories and listen, building trust and a sense
                    of connection.
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
                  <p className="font-semibold text-[#111827]">Activities & hobbies</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Gentle encouragement to enjoy hobbies, simple games, music, TV or radio in a
                    way that suits the client.
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
                  <p className="font-semibold text-[#111827]">Accompanied walks</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Support with short, safe walks inside or near the home to add gentle movement
                    into the day where appropriate.
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
                  <p className="font-semibold text-[#111827]">Emotional check-ins</p>
                  <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                    Regular check-ins to notice changes in mood or behaviour and communicate these
                    to family if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#f97316]/40 bg-[#fff7ed] px-4 py-3 text-[13px] md:text-sm text-[#7c2d12]">
            <p className="font-semibold">Important to know</p>
            <p className="mt-1">
              Companionship care is non-medical. We do not provide counselling or clinical mental
              health treatment, but we can work alongside your existing healthcare team.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="/companionship.jpg"
                alt="Care assistant providing companionship at home"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 text-sm md:text-base text-[#4b5563]">
              <p>
                We aim to match each client with a companion who feels like a natural fit &mdash;
                someone they feel comfortable talking to and spending time with.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about companionship care?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Share a little about your loved one&apos;s personality and routine and we will help you
              shape a companionship care plan.
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
