"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { IndustryCard, IndustryCardProps } from "./IndustryCard";

const SCROLL_SPEED_NORMAL = 40; // px per second (auto-scroll)
const SCROLL_SPEED_HOVER  = 14; // px per second (slowed on hover)

function getCardDimensions(width: number) {
  if (width < 640) return { cardWidth: 300, cardGap: 16 };
  if (width < 1024) return { cardWidth: 360, cardGap: 24 };
  return { cardWidth: 420, cardGap: 32 };
}

export interface TickerCarouselProps {
  cards: IndustryCardProps[];
}

export function TickerCarousel({ cards }: TickerCarouselProps) {
  const [dims, setDims] = useState(() => getCardDimensions(1280));

  const containerRef  = useRef<HTMLDivElement>(null);
  const x             = useMotionValue(0);
  const isHoveredRef  = useRef(false); // ref — does NOT trigger re-renders
  const isDraggingRef = useRef(false);
  const animFrameRef  = useRef<number | null>(null);
  const lastTsRef     = useRef<number | null>(null);

  useEffect(() => {
    setDims(getCardDimensions(window.innerWidth));
    const handleResize = () => setDims(getCardDimensions(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardWidth, cardGap } = dims;
  const totalCards    = cards.length;
  const singleSetWidth = (cardWidth + cardGap) * totalCards;
  const duplicatedCards = [...cards, ...cards, ...cards];

  // rAF-based auto-scroll — hover state is read from a ref, never causes restarts
  const tick = useCallback((ts: number) => {
    if (isDraggingRef.current) {
      lastTsRef.current = null;
      animFrameRef.current = requestAnimationFrame(tick);
      return;
    }

    if (lastTsRef.current === null) lastTsRef.current = ts;
    const elapsed = (ts - lastTsRef.current) / 1000; // seconds
    lastTsRef.current = ts;

    const speed = isHoveredRef.current ? SCROLL_SPEED_HOVER : SCROLL_SPEED_NORMAL;
    let next = x.get() - speed * elapsed;

    // seamless loop: when we've scrolled one full set, jump back
    if (next <= -singleSetWidth) next += singleSetWidth;

    x.set(next);
    animFrameRef.current = requestAnimationFrame(tick);
  }, [x, singleSetWidth]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, [tick]);

  // Manual prev/next — stop rAF briefly, animate, then restart
  const handlePrev = () => {
    isDraggingRef.current = true;
    let target = x.get() + (cardWidth + cardGap);
    if (target > 0) target -= singleSetWidth;
    
    animate(x, target, {
      duration: 0.45,
      ease: "circOut",
      onComplete: () => {
        isDraggingRef.current = false;
        lastTsRef.current = null;
      }
    });
  };

  const handleNext = () => {
    isDraggingRef.current = true;
    let target = x.get() - (cardWidth + cardGap);
    if (target <= -singleSetWidth) target += singleSetWidth;
    
    animate(x, target, {
      duration: 0.45,
      ease: "circOut",
      onComplete: () => {
        isDraggingRef.current = false;
        lastTsRef.current = null;
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-10"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <motion.div
        className="flex"
        style={{ x, gap: `${cardGap}px` }}
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
