"use client";
import React, { useState } from "react";
import PricingHeader from "./PricingHeader";
import PlanCard, { Plan } from "./PlanCard";
import { BillingCycle } from "./PricingToggle";

const plans: Plan[] = [
  {
    id: "basic",
    title: "Basic",
    monthly: 2999,
    description: "Lorem ipsum dolor sit amet onselor ctetur adipiscing elit accums.",
    features: [
      { text: "General care" },
      { text: "2 Day programs" },
      { text: "Senior adult day" },
    ],
  },
  {
    id: "standard",
    title: "Standard",
    monthly: 3999,
    description: "Lorem ipsum dolor sit amet onselor ctetur adipiscing elit accums.",
    features: [
      { text: "Personal care" },
      { text: "4 Day programs" },
      { text: "Senior adult day" },
    ],
    highlighted: true,
  },
  {
    id: "luxury",
    title: "Luxury",
    monthly: 4999,
    description: "Lorem ipsum dolor sit amet onselor ctetur adipiscing elit accums.",
    features: [
      { text: "Premium care" },
      { text: "6 Day programs" },
      { text: "Senior adult day" },
    ],
  },
];

export default function PricingGrid() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 pt-24 pb-32">
      <PricingHeader cycle={cycle} onCycleChange={setCycle} />
      <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} index={i} />
        ))}
      </div>
    </section>
  );
}
