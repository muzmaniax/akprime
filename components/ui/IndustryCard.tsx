"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface IndustryCardProps {
  image: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

const SMOOTH = [0.25, 0.1, 0.25, 1] as const;

export function IndustryCard({ image, title, description, href = "#", onClick }: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <div className="relative rounded-[22px] overflow-hidden w-full h-full">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[22px]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Floating glass panel */}
      <div
        className="absolute left-[10px] right-[10px] bottom-[10px] rounded-[12px] p-3 sm:p-4"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(16px) saturate(150%)",
          WebkitBackdropFilter: "blur(16px) saturate(150%)",
          boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
        }}
      >
        {/* Title row + arrow */}
        <div className="flex items-center justify-between mb-2">
          {/* Title */}
          <p
            className="text-white shrink-0 font-medium text-lg sm:text-2xl leading-tight"
            style={{
              letterSpacing: "0",
              margin: 0,
            }}
          >
            {title}
          </p>

          {/* Arrow button */}
          <motion.div
            className="flex items-center justify-center rounded-full shrink-0 ml-2"
            style={{ width: "36px", height: "36px" }}
            animate={{
              backgroundColor: isHovered ? "#37B4B4" : "rgba(255,255,255,0.92)",
            }}
            transition={{ duration: 0.38, ease: SMOOTH }}
          >
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              color={isHovered ? "#37B4B4" : "#111827"}
              className={`transition-all duration-300 ${isHovered ? "-rotate-45" : ""}`}
            />
          </motion.div>
        </div>

        {/* Description */}
        <p
          className="text-white/80 text-xs sm:text-[15px] leading-relaxed font-normal"
          style={{ letterSpacing: "0", margin: 0 }}
        >
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer w-full"
      style={{ height: "460px", fontFamily: "inherit" }}
      animate={{ scale: isHovered ? 1.02 : 1 }}
      transition={{ duration: 0.38, ease: SMOOTH }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {href ? (
        <Link href={href} className="block w-full h-full">
          {cardContent}
        </Link>
      ) : (
        <div className="w-full h-full">{cardContent}</div>
      )}
    </motion.div>
  );
}
