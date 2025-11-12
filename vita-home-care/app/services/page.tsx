import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import ServicesCarousel from "../../components/ServicesCarousel";

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f6f4fb] text-[#2c254c]">
      <TopBar />
      <HeaderNav />

      <section className="relative mx-auto max-w-5xl px-4 pb-8 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6d55d9]">Our services</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          A wide range of <span className="relative inline-block">services
            <span className="absolute left-0 bottom-1 h-1.5 w-full rounded bg-[#6d55d9]" aria-hidden="true"/>
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#4a435d]">
          Elit amet enim, pretium consequat lectus odio ut sed enim at level adipiscing orci sed aliquam craset,
          gravida elementum non egestas.
        </p>
      </section>

      <section className="bg-neutral-100 overflow-hidden pb-20">
        <ServicesCarousel />
      </section>
    </main>
  );
}
