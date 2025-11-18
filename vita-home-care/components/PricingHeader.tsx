"use client";
import React from "react";
import PricingToggle, { BillingCycle } from "./PricingToggle";
import { PRICING_PRIMARY, PRICING_UNDERLINE } from './pricingColors';

interface PricingHeaderProps {
  cycle: BillingCycle;
  onCycleChange: (c: BillingCycle) => void;
}

export default function PricingHeader({ cycle, onCycleChange }: PricingHeaderProps) {
  return (
    <header className="text-center">
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: PRICING_PRIMARY }}>Pricing</p>
      <h1
        className="mt-4"
        style={{
          fontSize: '72px',
          fontWeight: 500,
          lineHeight: '84.024px',
          color: 'rgb(9,7,23)'
        }}
      >
        Plans &amp; Pricing
        <span
          className="relative block mx-auto mt-1 h-[7px] w-48 rounded-full"
          aria-hidden="true"
          style={{ backgroundColor: PRICING_UNDERLINE }}
        />
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-[#4a435d]">
        Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu egestas morbi sem vulputate etiam facilisis
        pellentesque ut quis.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <PricingToggle value={cycle} onChange={onCycleChange} />
      </div>
    </header>
  );
}
