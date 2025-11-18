"use client";
import React from "react";
import { PRICING_GRADIENT_FROM, PRICING_GRADIENT_TO, PRICING_PRIMARY } from './pricingColors';

export type BillingCycle = "monthly" | "yearly";

interface PricingToggleProps {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
}

export default function PricingToggle({ value, onChange }: PricingToggleProps) {
  const options: BillingCycle[] = ["monthly", "yearly"];
  return (
    <div className="relative inline-flex items-center" role="tablist" aria-label="Select billing cycle">
      <div className="relative flex rounded-full border border-[#dbeafe] bg-white/80 backdrop-blur px-1 py-1 shadow-sm">
        {/* Sliding indicator */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-linear-to-r shadow-md transition-transform duration-400"
          style={{
            transform: value === "yearly" ? "translateX(100%)" : "translateX(0)",
            backgroundImage: `linear-gradient(to right, ${PRICING_GRADIENT_FROM}, ${PRICING_GRADIENT_TO})`
          }}
        />
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(opt)}
              className={
                "relative z-10 min-w-[120px] px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none " +
                (selected
                  ? "text-white"
                  : "text-[#1e3a8a] hover:text-["+PRICING_PRIMARY+"]")
              }
            >
              {opt === "monthly" ? "Monthly" : "Yearly"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
