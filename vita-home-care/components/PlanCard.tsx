"use client";
import React, { useEffect, useState } from "react";
import type { BillingCycle } from "./PricingToggle";
import { PRICING_GRADIENT_FROM, PRICING_GRADIENT_TO, PRICING_BORDER_LIGHT, PRICING_BG_TINT_LIGHT, PRICING_BG_TINT_LIGHTER, PRICING_FEATURE_ICON_BG_FROM, PRICING_FEATURE_ICON_BG_TO, PRICING_GLOW_FROM, PRICING_GLOW_TO, PRICING_PRIMARY, PRICING_TEXT_MUTED } from './pricingColors';

export interface PlanFeature {
  text: string;
}

export interface Plan {
  id: string;
  title: string;
  monthly: number; // whole dollars
  yearly?: number; // optional yearly price
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  cycle: BillingCycle;
  index: number;
}

export default function PlanCard({ plan, cycle, index }: PlanCardProps) {
  const price = cycle === "monthly" ? plan.monthly : plan.yearly ?? plan.monthly * 12;
  const unit = cycle === "monthly" ? "Month" : "Year";
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{ transitionDelay: `${index * 60}ms`, borderColor: PRICING_BORDER_LIGHT,
        backgroundImage: plan.highlighted
          ? `linear-gradient(to bottom right, ${PRICING_BG_TINT_LIGHT}, ${PRICING_BG_TINT_LIGHTER})`
          : undefined
      }}
      className={
        "group relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500 " +
        (plan.highlighted
          ? "shadow-lg"
          : "bg-white hover:shadow-xl") +
        (mounted ? " opacity-100 translate-y-0" : " opacity-0 translate-y-6")
      }
    >
      {/* Glow accent */}
      {plan.highlighted && (
        <span
          className="pointer-events-none absolute -inset-0.5 rounded-3xl blur-xl opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(to right, ${PRICING_GLOW_FROM}, ${PRICING_GLOW_TO})`
          }}
        />
      )}
      <h3 className="text-2xl font-bold text-[#181322] tracking-tight font-monorope">{plan.title}</h3>
      <p
        className="mt-5 text-4xl font-extrabold font-monorope text-transparent bg-clip-text bg-linear-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${PRICING_GRADIENT_FROM}, ${PRICING_GRADIENT_TO})`
        }}
      >
        ${price}/ <span className="align-middle text-base font-medium text-[#3e3566]">{unit}</span>
      </p>
      <div className="my-5 h-px bg-linear-to-r from-transparent via-[#d9d2ef] to-transparent" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-[#4a435d] flex-1">{plan.description}</p>
      <ul className="mt-6 space-y-3 text-base font-monorope">
        {plan.features.map((f) => (
          <li
            key={f.text}
            className="flex items-start gap-3 transition-colors duration-300 group-hover:text-[#2c254c]"
          >
            <span
              className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full shadow-inner"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${PRICING_FEATURE_ICON_BG_FROM}, ${PRICING_FEATURE_ICON_BG_TO})`,
                color: PRICING_PRIMARY
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M9.5 16.5 5 12l1.4-1.4 3.1 3.1 7.1-7.1L18 8l-8.5 8.5z" />
              </svg>
            </span>
            <span className="text-[#2c254c] font-semibold">{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <a
          href="/inquiry"
          className={
            "relative block w-full rounded-xl px-8 py-4 text-center text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] " +
            (plan.highlighted
              ? "bg-linear-to-r text-white shadow hover:shadow-xl hover:scale-[1.02]"
              : "bg-white text-[#2c254c] border border-[#dbeafe] shadow hover:bg-linear-to-r hover:scale-[1.02]")
          }
          style={
            plan.highlighted
              ? { backgroundImage: `linear-gradient(to right, ${PRICING_GRADIENT_FROM}, ${PRICING_GRADIENT_TO})` }
              : { backgroundImage: `linear-gradient(to right, ${PRICING_BG_TINT_LIGHT}, ${PRICING_BG_TINT_LIGHTER})` }
          }
        >
          <span className="inline-flex items-center justify-center gap-2">
            Choose plan
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M5 12h12M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
