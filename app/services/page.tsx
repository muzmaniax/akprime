"use client";
import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BookingModal } from "@/components/ui/BookingModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, Database, Cpu, GraduationCap, Kanban, FileSearch, 
  Network, TrendingUp, PieChart, Banknote, ShieldCheck, ServerCrash, 
  Calculator, Scale, Briefcase, Megaphone, Target
} from "lucide-react";
import { servicesData, ServiceCategory } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  "database": Database,
  "cpu": Cpu,
  "graduation-cap": GraduationCap,
  "kanban": Kanban,
  "file-search": FileSearch,
  "network": Network,
  "trending-up": TrendingUp,
  "pie-chart": PieChart,
  "banknote": Banknote,
  "shield-check": ShieldCheck,
  "server-crash": ServerCrash,
  "calculator": Calculator,
  "scale": Scale,
  "briefcase": Briefcase,
  "megaphone": Megaphone,
  "target": Target,
};

const CATEGORIES: ServiceCategory[] = [
  "Systems & Technology",
  "Finance & Compliance",
  "Strategy & Transformation",
  "Growth & Impact",
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceCategory | "All">("All");

  const filtered = activeTab === "All"
    ? servicesData
    : servicesData.filter((s) => s.category === activeTab);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* Directory Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#0E3E3E] text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[#082121]/50 mix-blend-multiply pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
             Our Capabilities
          </h1>
          <p className="text-lg text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
             16 integrated service lines designed to modernise enterprise operations from the ground up.
          </p>
        </div>
      </section>

      {/* Services Directory */}
      <section className="py-14 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           {/* Category Sticky Nav */}
           <div className="sticky top-[70px] z-30 bg-[#F4FAFA]/80 backdrop-blur-md py-4 mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
             <div className="flex gap-2 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide snap-x">
               <button
                  onClick={() => setActiveTab("All")}
                  className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === "All"
                      ? "bg-[#37B4B4] text-[#082121] shadow-lg shadow-[#37B4B4]/20"
                      : "bg-white text-[#3a5a5a] hover:bg-[#E0F2F2] border border-[#37B4B4]/10"
                  }`}
               >
                 All Services
               </button>
               {CATEGORIES.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveTab(cat)}
                   className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                     activeTab === cat
                       ? "bg-[#37B4B4] text-[#082121] shadow-lg shadow-[#37B4B4]/20"
                       : "bg-white text-[#3a5a5a] hover:bg-[#E0F2F2] border border-[#37B4B4]/10"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>

           {/* Directory Link Grid */}
           <AnimatePresence mode="popLayout">
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filtered.map((service, i) => {
                 const Icon = iconMap[service.icon] || ChevronRight;
                 return (
                   <motion.div
                     key={service.slug}
                     initial={{ opacity: 0, y: 16, scale: 0.97 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -8, scale: 0.97 }}
                     transition={{ duration: 0.22, delay: i * 0.04, ease: "easeOut" }}
                   >
                     <Link
                       href={`/services/${service.slug}`}
                       className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(55,180,180,0.15)] hover:-translate-y-1.5 hover:border-[#37B4B4]/40 transition-all duration-500 ease-out flex flex-col h-full overflow-hidden"
                     >
                       {/* Subtle hover gradient background */}
                       <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#37B4B4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                       
                       <div className="relative z-10 flex items-center justify-between mb-5">
                         <div className="w-12 h-12 rounded-xl bg-[#37B4B4]/10 flex items-center justify-center text-[#37B4B4] group-hover:bg-[#37B4B4] group-hover:text-[#082121] transition-colors duration-500">
                           <Icon size={24} strokeWidth={2} />
                         </div>
                         <div className="text-xs font-bold tracking-wider text-[#3a5a5a] uppercase bg-gray-50 px-3 py-1.5 rounded-md">
                           {service.category.split(" & ")[0]}
                         </div>
                       </div>
                       <h3 className="text-xl md:text-2xl font-bold text-[#082121] mb-3 group-hover:text-[#37B4B4] transition-colors line-clamp-2">
                         {service.name}
                       </h3>
                       <p className="relative z-10 text-base text-[#3a5a5a] leading-relaxed mb-8 flex-grow">
                         {service.shortDescription}
                       </p>
                       <div className="relative z-10 flex justify-between items-center pt-5 border-t border-gray-50 mt-auto group-hover:border-[#37B4B4]/20 transition-colors duration-500">
                         <span className="text-base font-semibold text-[#082121] group-hover:text-[#37B4B4] transition-colors">
                           View Capability
                         </span>
                         <div className="w-8 h-8 rounded-full bg-transparent group-hover:bg-[#37B4B4]/10 flex items-center justify-center transition-all duration-500">
                           <ChevronRight size={18} className="text-[#37B4B4] translate-x-0 group-hover:translate-x-1 transition-transform duration-500" />
                         </div>
                       </div>
                     </Link>
                   </motion.div>
                 );
               })}
             </div>
           </AnimatePresence>

        </div>
      </section>

    </div>
  );
}
