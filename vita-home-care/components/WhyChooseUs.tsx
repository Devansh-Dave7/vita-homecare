import React from "react";
import { getWhyChooseUsSettings } from "@/lib/data/whyChooseUsSettings";
import { getIconByName } from "@/lib/icons";
import { getTransformedImageUrl } from "@/lib/storage/images";
import Link from "next/link";

export default async function WhyChooseUs() {
  const settings = await getWhyChooseUsSettings();
  const enabledFeatures = settings.features.filter(f => f.enabled);

  return (
    <section className="relative mx-auto mt-24 max-w-7xl px-4 text-[#2c254c] md:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: bento-box image layout */}
        <div className="relative order-2 lg:order-1 min-h-[520px]">
          {/* Grid container for images */}
          <div className="relative grid grid-cols-2 gap-4 h-[520px] max-w-[540px] mx-auto">
            {/* Left column - two stacked images */}
            <div className="flex flex-col gap-4">
              {/* Image 1: top-left - elderly couple at laptop */}
              <div className="h-[250px] overflow-hidden rounded-[28px] shadow-[0_20px_45px_-25px_rgba(37,99,235,0.45)]">
                {settings.image_url_1 ? (
                  <img
                    src={await getTransformedImageUrl(settings.image_url_1, { width: 540, height: 250, quality: 80 })}
                    alt="Why choose us image 1"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src="/personal care.jpg" alt="Elderly couple using laptop together" className="h-full w-full object-cover" />
                )}
              </div>

              {/* Image 2: bottom-left - woman with hat and flowers */}
              <div className="h-[250px] overflow-hidden rounded-[28px] shadow-[0_20px_45px_-25px_rgba(37,99,235,0.45)]">
                {settings.image_url_2 ? (
                  <img
                    src={await getTransformedImageUrl(settings.image_url_2, { width: 540, height: 250, quality: 80 })}
                    alt="Why choose us image 2"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src="/companionship.jpg" alt="Senior woman with hat holding flowers outdoors" className="h-full w-full object-cover" />
                )}
              </div>
            </div>

            {/* Right column - single large image */}
            <div className="h-full overflow-hidden rounded-[36px] shadow-[0_35px_70px_-35px_rgba(37,99,235,0.60)]">
              {settings.image_url_3 ? (
                <img
                  src={await getTransformedImageUrl(settings.image_url_3, { width: 540, height: 520, quality: 80 })}
                  alt="Why choose us image 3"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src="/domestic help.jpg" alt="Elderly couple embracing warmly" className="h-full w-full object-cover" />
              )}
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">{settings.badge_text}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#181322] md:text-5xl">
            {settings.heading_main} <span className="relative inline-block">
              {settings.heading_highlight}
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded bg-[#2563eb]" aria-hidden />
            </span>{" "}
            {settings.heading_suffix}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4f4865]">
            {settings.description}
          </p>

          {/* Features grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {enabledFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f0ff] text-[#2563eb] shadow-[0_12px_25px_-12px_rgba(37,99,235,0.6)]">
                  {getIconByName(feature.icon_name, "h-6 w-6")}
                </span>
                <span className="text-lg font-semibold">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {settings.primary_button_enabled && (
              <Link
                href={settings.primary_button_url}
                className="rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#1e40af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                {settings.primary_button_text}
              </Link>
            )}
            {settings.secondary_button_enabled && (
              <Link
                href={settings.secondary_button_url || '#'}
                className="rounded-full border-2 border-[#dbeafe] bg-white px-8 py-4 text-sm font-semibold text-[#2c254c] shadow-md hover:border-[#2563eb] hover:bg-[#e6f0ff] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                {settings.secondary_button_text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
