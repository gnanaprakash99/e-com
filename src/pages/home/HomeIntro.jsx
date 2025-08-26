import React from "react";

const HomeIntro = () => {
  return (
    <section className="bg-[#e3e2e2] text-primaryText px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-16">
        {/* Left Section - Logo / Branding */}
        <div className="flex justify-center md:justify-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-center md:text-left leading-tight">
            <span className="text-secondaryText text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              H
            </span>
            ridya
            <span className="text-secondaryText text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              T
            </span>
            arangini
          </h1>
        </div>

        {/* Right Section - Content */}
        <div className="text-center md:text-left">
          <p className="uppercase text-xs sm:text-sm tracking-widest text-mutedText mb-2 sm:mb-3">
            BY HridyaTarangini
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-snug">
            A CELEBRATION OF CREATIVITY
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
            HridyaTarangini is your curated destination for handcrafted artistry and
            meaningful design. From pottery to paintings, every creation is
            thoughtfully made to bring elegance and soul into your space.
            <br />
            <br />
            We connect passionate artists with appreciative buyers, making every
            piece more than just décor — it’s a story, a memory, a masterpiece.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
