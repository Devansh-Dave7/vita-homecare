import React from "react";
import TopBar from "@/components/TopBar";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import PricingGrid from "@/components/PricingGrid";

export const metadata = {
  title: "Plans & Pricing | Vita Home Care",
  description: "Compare our Basic, Standard, and Luxury home care plans.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-sans font-onest">
      <TopBar />
      <HeaderNav />
      <PricingGrid />
      <Footer />
    </main>
  );
}
