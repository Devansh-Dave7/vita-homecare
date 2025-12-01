import TopBar from "@/components/TopBar";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import AboutPageClient from "@/components/AboutPageClient";
import { Onest } from "next/font/google";
import React from "react";

const onest = Onest({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "About Us | Vita Homecare",
  description:
    "Learn about Vita Homecare's vision, mission, and compassionate caregiving team in Zambia.",
};

export default function AboutPage() {
  return (
    <main className={`${onest.className} min-h-screen bg-white text-[#2c254c]`}>
      <TopBar />
      <HeaderNav />

      {/* All dynamic content fetched client-side for instant updates */}
      <AboutPageClient />

      <Footer />
    </main>
  );
}
