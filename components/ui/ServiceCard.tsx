"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tools: string[];
  href: string;
}

export function ServiceCard({ icon, title, description, tools, href }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowing, setGlowing] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowing(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setGlowing(true)}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: glowing ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
    >
      <Link href={href} className="block h-full">
        <div
          className={`glass-card rounded-2xl p-6 h-full flex flex-col gap-4 cursor-pointer transition-all duration-300 ${
            glowing ? "border-[#37B4B4]/30 teal-glow" : ""
          }`}
        >
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-[#37B4B4]/15 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4]">
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-2 leading-tight">{title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Tool tags */}
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool) => (
              <span
                key={tool}
                className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/45 font-medium"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-1 text-[#37B4B4] text-sm font-medium mt-1">
            <span>Learn more</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
