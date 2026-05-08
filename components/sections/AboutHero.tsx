"use client";

import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-[#082121]">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero sectionHeight={1500} />
        <OurJourney />
      </ReactLenis>
    </div>
  );
};

const Hero = ({ sectionHeight }: { sectionHeight: number }) => {
  return (
    <div
      style={{ height: `calc(${sectionHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage sectionHeight={sectionHeight} />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[#082121]" />
    </div>
  );
};

const CenterImage = ({ sectionHeight }: { sectionHeight: number }) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, sectionHeight + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [sectionHeight, sectionHeight + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(/images/agile-methodology.jpg",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-[2px]">
            <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="section-overline mb-4 block text-white/90"
            >
                About AK Prime
            </motion.span>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[0.9]"
            >
                Legacy of <br /> clarity
            </motion.h1>
        </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px] relative z-20">
      <ParallaxImg
        src="/images/diverse-team.jpg"
        alt="Team collaboration"
        start={-200}
        end={200}
        className="w-1/3 rounded-[22px]"
      />
      <ParallaxImg
        src="/images/startup-meeting.jpg"
        alt="Data analysis"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-[22px]"
      />
      <ParallaxImg
        src="/images/professional-workspace.jpg"
        alt="Modern office"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-[22px]"
      />
      <ParallaxImg
        src="/images/modern-office.jpg"
        alt="Business strategy"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-[22px]"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }: { className: string, alt: string, src: string, start: number, end: number }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, opacity }}
      className={className}
    >
        <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-full object-cover rounded-[inherit] shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
        />
    </motion.div>
  );
};

const OurJourney = () => {
  return (
    <section
      id="our-journey"
      className="mx-auto max-w-5xl px-4 py-32 text-white"
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-14"
      >
        <span className="section-overline block mb-4">Timeline</span>
        <h2 className="text-3xl md:text-5xl font-medium text-white leading-none">
          Our journey
        </h2>
      </motion.div>
      <JourneyItem title="Foundation" date="Nairobi, 2018" location="Headquarters" />
      <JourneyItem title="Branch Expansion" date="Mombasa, 2020" location="Coast Region" />
      <JourneyItem title="200+ Projects" date="Regional Impact, 2022" location="East Africa" />
      <JourneyItem title="AI Hub Launch" date="Nairobi, 2023" location="Tech Innovation" />
      <JourneyItem title="Global Standards" date="Certification, 2024" location="Compliance" />
      <JourneyItem title="Next Phase" date="Future Ready" location="Strategic Growth" />
    </section>
  );
};

const JourneyItem = ({ title, date, location }: { title: string, date: string, location: string }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-white/10 px-3 pb-9 group hover:border-[#37B4B4]/50 transition-colors"
    >
      <div>
        <p className="mb-1 text-xl md:text-3xl font-medium text-white group-hover:text-[#37B4B4] transition-colors">{title}</p>
        <p className="text-xs uppercase text-white/40">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-white/40">
        <p>{location}</p>
        <FiMapPin className="text-[#37B4B4]" />
      </div>
    </motion.div>
  );
};
