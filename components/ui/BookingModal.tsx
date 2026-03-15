"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const services = [
  "ERP Implementation",
  "AI Automation & Intelligence",
  "Enterprise Project Delivery",
  "Financial Strategy & Planning",
  "Digital Transformation",
  "Business Analysis",
  "Audit & Compliance",
  "Interim CFO / Finance Advisory",
  "Change Management & Training",
  "Not Sure Yet",
];

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledService?: string;
}

export function BookingModal({ open, onOpenChange, prefilledService }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: prefilledService },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "booking_modal" }),
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0E3E3E] border border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        {!submitted ? (
          <>
            <DialogHeader className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={18} className="text-[#37B4B4]" />
                <span className="section-label">30-Min Strategy Call</span>
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                Book a Strategy Consultation
              </DialogTitle>
              <DialogDescription className="text-white/55 text-sm leading-relaxed">
                No hard sell — just an honest assessment of your situation and how we can help.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm">Full Name *</Label>
                <Input
                  {...register("name")}
                  placeholder="Your full name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#37B4B4] focus:ring-[#37B4B4]/20 rounded-xl"
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-white/75 text-sm">Company *</Label>
                  <Input
                    {...register("company")}
                    placeholder="Your company"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#37B4B4] rounded-xl"
                  />
                  {errors.company && <p className="text-red-400 text-xs">{errors.company.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white/75 text-sm">Phone / WhatsApp</Label>
                  <Input
                    {...register("phone")}
                    placeholder="+254..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#37B4B4] rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm">Work Email *</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@company.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#37B4B4] rounded-xl"
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm">Service of Interest</Label>
                <Select onValueChange={(val) => setValue("service", val || undefined)} defaultValue={prefilledService || ""}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#37B4B4] rounded-xl">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0E3E3E] border-white/10 text-white">
                    {services.map((s) => (
                      <SelectItem key={s} value={s} className="focus:bg-white/10">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm">Tell us about your challenge</Label>
                <Textarea
                  {...register("message")}
                  placeholder="Brief overview of your current situation..."
                  rows={3}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#37B4B4] rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold rounded-xl py-3 cta-pulse transition-all"
              >
                {isSubmitting ? "Sending…" : "Submit & Get in Touch →"}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-[#37B4B4]/20 border border-[#37B4B4]/40 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-[#37B4B4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">We'll be in touch soon!</h3>
            <p className="text-white/55 text-sm">
              A member of our team will reach out within 24 hours to confirm your consultation time.
            </p>
            <Button
              onClick={() => { setSubmitted(false); onOpenChange(false); }}
              className="mt-6 bg-white/10 hover:bg-white/15 text-white rounded-xl"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
