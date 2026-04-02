"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { IndustryCard, IndustryCardProps } from "./IndustryCard";

const SCROLL_SPEED = 50; // px per second

function getCardDimensions(width: number) {
  if (width < 640) return { cardWidth: 300, cardGap: 16 };
  if (width < 1024) return { cardWidth: 360, cardGap: 24 };
  return { cardWidth: 420, cardGap: 32 };
}

export interface TickerCarouselProps {
  cards: IndustryCardProps[];
}

export function TickerCarousel({ cards }: TickerCarouselProps) {
  const [dims, setDims] = useState(() =>
    getCardDimensions(typeof window !== "undefined" ? window.innerWidth : 1280)
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleResize = () => setDims(getCardDimensions(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardWidth, cardGap } = dims;
  // We double the cards for a seamless loop
  const totalCards = cards.length;
  const singleSetWidth = (cardWidth + cardGap) * totalCards;
  const duplicatedCards = [...cards, ...cards, ...cards]; 

  // Auto-scroll effect
  useEffect(() => {
    if (isDragging) return;

    const startAutoScroll = () => {
      const currentX = x.get();
      if (currentX <= -singleSetWidth) {
        x.set(currentX + singleSetWidth);
      }

      const remainingDistance = singleSetWidth + x.get();
      const duration = remainingDistance / SCROLL_SPEED;

      controls.start({
        x: -singleSetWidth,
        transition: {
          duration: isHovered ? duration * 3 : duration,
          ease: "linear",
        }
      }).then(() => {
        // When one loop finishes, reset and start again
        x.set(0);
        startAutoScroll();
      });
    };

    startAutoScroll();
    return () => controls.stop();
  }, [controls, singleSetWidth, isDragging, isHovered, x]);

  const handlePrev = () => {
    controls.stop();
    const currentX = x.get();
    const targetX = currentX + (cardWidth + cardGap);
    
    controls.start({
      x: targetX,
      transition: { duration: 0.5, ease: "circOut" }
    }).then(() => {
      if (targetX >= 0) x.set(targetX - singleSetWidth);
    });
  };

  const handleNext = () => {
    controls.stop();
    const currentX = x.get();
    const targetX = currentX - (cardWidth + cardGap);
    
    controls.start({
      x: targetX,
      transition: { duration: 0.5, ease: "circOut" }
    }).then(() => {
      if (targetX <= -singleSetWidth) x.set(targetX + singleSetWidth);
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex"
        style={{ x, gap: `${cardGap}px` }}
        animate={controls}
      >
        {duplicatedCards.map((card, index) => (
          <div key={index} style={{ width: `${cardWidth}px`, flexShrink: 0 }}>
            <IndustryCard {...card} />
          </div>
        ))}
      </motion.div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-[#37B4B4]/30 flex items-center justify-center text-[#37B4B4] hover:bg-[#37B4B4] hover:text-[#082121] transition-all duration-300"
          aria-label="Previous industry"
        >
          <span className="text-lg">←</span>
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-[#37B4B4]/30 flex items-center justify-center text-[#37B4B4] hover:bg-[#37B4B4] hover:text-[#082121] transition-all duration-300"
          aria-label="Next industry"
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
