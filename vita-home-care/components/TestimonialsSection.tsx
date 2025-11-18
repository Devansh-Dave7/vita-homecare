"use client";
import { useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  image: string;
  attribution: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The support and kindness from the caregivers has made a real difference. We feel at ease knowing our loved one is in great hands.",
    name: "Emily Thompson",
    location: "Seattle, WA",
    image:
      "/testimonial1.jpg",
    attribution: "Angelina Litvin on Unsplash",
  },
  {
    quote:
      "The care and attention provided has been exceptional. Our family feels supported and confident in the quality of service.",
    name: "Sarah Mitchell",
    location: "Portland, OR",
    image:
      "/testimonial2.jpg",
    attribution: "Tom Morbey on Unsplash",
  },
  {
    quote:
      "Professional, compassionate, and reliable. The team has made such a positive difference in our daily lives.",
    name: "Michael Roberts",
    location: "San Francisco, CA",
    image:
      "/testimonial3.jpg",
    attribution: "Matin Hosseini on Unsplash",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handlePrevious = () => {
    if (isFading) return; // Prevent rapid clicks during animation
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => {
        setIsFading(false);
      }, 50); // Small delay to ensure content is updated before fading in
    }, 250); // Half of the animation duration (500ms / 2)
  };

  const handleNext = () => {
    if (isFading) return; // Prevent rapid clicks during animation
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsFading(false);
      }, 50); // Small delay to ensure content is updated before fading in
    }, 250); // Half of the animation duration (500ms / 2)
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative mt-24 py-16 bg-neutral-100 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 px-4 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0000FF]">
          Testimonials
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#003366] md:text-5xl">
          Don't take our word for
          <br />
          it take theirs
          <span className="relative ml-2 inline-block">
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="8"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C50 2 150 2 198 6"
                stroke="#0000FF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      {/* Testimonial Card with Navigation */}
      <div className="relative flex flex-col items-center justify-center px-4 md:px-8">
        {/* Desktop Arrows - Hidden on mobile */}
        <div className="hidden lg:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full items-center justify-between pointer-events-none z-10">
          <button
            onClick={handlePrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2563eb] shadow-lg hover:bg-[#e6f0ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-[#2563eb]/20 pointer-events-auto ml-8"
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 transition-all duration-300 hover:scale-110 hover:shadow-xl pointer-events-auto mr-8"
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Testimonial Card */}
        <div className="relative mx-auto max-w-5xl w-full">
            <div className="relative overflow-hidden rounded-4xl shadow-[0_25px_60px_-20px_rgba(37,99,235,0.35)]">
            {/* Responsive background - vertical split on mobile (white top, colored bottom), horizontal split on desktop */}
            <div className="absolute inset-0 flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-white" />
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#e6f0ff]" />
            </div>

            {/* Content */}
            <div className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              {/* Text Content - Top on mobile, Left on desktop */}
              <div className="flex flex-col justify-center order-1 lg:order-1">
                {/* Quotation Icon */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="mb-6 text-[#2563eb]"
                >
                  <path
                    d="M12 28C12 24.686 14.686 22 18 22V18C12.477 18 8 22.477 8 28V34C8 36.209 9.791 38 12 38H18C20.209 38 22 36.209 22 34V28C22 25.791 20.209 24 18 24H14C14 22.895 14.895 22 16 22H18V18H16C13.791 18 12 19.791 12 22V28Z"
                    fill="currentColor"
                  />
                  <path
                    d="M30 28C30 24.686 32.686 22 36 22V18C30.477 18 26 22.477 26 28V34C26 36.209 27.791 38 30 38H36C38.209 38 40 36.209 40 34V28C40 25.791 38.209 24 36 24H32C32 22.895 32.895 22 34 22H36V18H34C31.791 18 30 19.791 30 22V28Z"
                    fill="currentColor"
                  />
                </svg>

                {/* Quote Text */}
                <p className="text-base md:text-lg leading-relaxed text-[#6b7280] mb-8 text-center lg:text-left">
                  {currentTestimonial.quote}
                </p>

                {/* Name and Location */}
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-[#2c254c]">
                    {currentTestimonial.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#2563eb]">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>

              {/* Image - Bottom on mobile, Right on desktop */}
              <div className="flex items-center justify-center lg:justify-end order-2 lg:order-2">
                <div className="relative h-[300px] md:h-[350px] lg:h-[400px] w-full max-w-[340px] overflow-hidden rounded-3xl shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)]">
                  <img
                    src={currentTestimonial.image}
                    alt={`${currentTestimonial.name} - ${currentTestimonial.attribution}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Arrows - Below card on mobile, hidden on desktop */}
        <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2563eb] shadow-lg hover:bg-[#e6f0ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-[#2563eb]/20"
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 transition-all duration-300 hover:scale-110 hover:shadow-xl"
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Browse Plans Button */}
      <div className="mt-12 text-center px-4 md:px-8">
        <a
          href="/inquiry"
          className="inline-block rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#1e40af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Browse plans
        </a>
      </div>
    </section>
  );
}