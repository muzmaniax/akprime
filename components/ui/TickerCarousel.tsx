"use client";
import { useState, useEffect } from "react";
import { IndustryCard, IndustryCardProps } from "./IndustryCard";

const SCROLL_SPEED = 70; // px per second — consistent across screen sizes

function getCardDimensions(width: number) {
  if (width < 640) return { cardWidth: 280, cardGap: 16 };
  if (width < 1024) return { cardWidth: 340, cardGap: 20 };
  return { cardWidth: 400, cardGap: 24 };
}

export interface TickerCarouselProps {
  cards: IndustryCardProps[];
}

export function TickerCarousel({ cards }: TickerCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [dims, setDims] = useState(() =>
    getCardDimensions(typeof window !== "undefined" ? window.innerWidth : 1280)
  );

  useEffect(() => {
    const handleResize = () => setDims(getCardDimensions(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cardWidth, cardGap } = dims;
  // Triple the cards so the seamless loop never runs out of content
  const duplicatedCards = [...cards, ...cards, ...cards];
  const scrollDistance = (cardWidth + cardGap) * cards.length;
  const duration = scrollDistance / SCROLL_SPEED;

  return (
    <div
      className="w-full overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes ak-ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${scrollDistance}px); }
        }
        .ak-ticker-track {
          animation-name: ak-ticker-scroll;
          animation-duration: ${duration}s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
        }
        .ak-ticker-track.ak-ticker-paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={`flex ak-ticker-track${isPaused ? " ak-ticker-paused" : ""}`}
        style={{ gap: `${cardGap}px` }}
      >
        {duplicatedCards.map((card, index) => (
          <div key={index} style={{ width: `${cardWidth}px`, flexShrink: 0 }}>
            <IndustryCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
