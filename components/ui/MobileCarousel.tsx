"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IndustryCard, IndustryCardProps } from "./IndustryCard";

export interface MobileCarouselProps {
  cards: IndustryCardProps[];
}

const SWIPE_THRESHOLD = 40;

export function MobileCarousel({ cards }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    const isAtStart = currentIndex === 0 && delta > 0;
    const isAtEnd = currentIndex === cards.length - 1 && delta < 0;
    setDragOffset(isAtStart || isAtEnd ? delta * 0.25 : delta);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -SWIPE_THRESHOLD && currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (dragOffset > SWIPE_THRESHOLD && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
    setDragOffset(0);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 py-4 select-none">
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: "pan-y" }}
      >
        <motion.div
          className="flex"
          animate={{ x: `calc(-${currentIndex * 100}% + ${dragOffset}px)` }}
          transition={
            isDragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 32, mass: 0.8 }
          }
        >
          {cards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4" style={{ minWidth: "100%" }}>
              <IndustryCard {...card} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentIndex(index); setDragOffset(0); }}
            aria-label={`Go to card ${index + 1}`}
            className="transition-all duration-300 rounded-full focus:outline-none"
            style={{
              width: index === currentIndex ? "20px" : "8px",
              height: "8px",
              backgroundColor: index === currentIndex ? "#37B4B4" : "rgba(255,255,255,0.35)",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
