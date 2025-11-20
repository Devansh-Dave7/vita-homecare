import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { getContactSettings } from "@/lib/data/siteSettings";

export default async function ContactPage() {
  const settings = await getContactSettings();
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
          <ContactForm />
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
              <p className="mt-1 text-[#111827]">{settings.contact_phone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Email
              </p>
              <p className="mt-1 text-[#111827]">{settings.contact_email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                Location
              </p>
              <p className="mt-1 text-[#111827]">{settings.contact_location}</p>
            </div>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
