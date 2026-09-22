"use client";

import { motion } from "framer-motion";
import { FRAMEWORK_STAGES } from "@/lib/content";

export function FrameworkRoadmap() {
  return (
    <div className="relative">
      <div className="hidden sm:block absolute left-0 right-0 top-6 h-px bg-hairline-strong" />
      <motion.div
        className="hidden sm:block absolute left-0 top-6 h-px bg-brand-gradient"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4">
        {FRAMEWORK_STAGES.map((s, i) => (
          <motion.div
            key={s.stage}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="relative flex flex-col items-start sm:items-center sm:text-center"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white shadow-glass">
              {i + 1}
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy">{s.stage}</h3>
            <p className="mt-2 text-sm text-navy-soft sm:max-w-[11rem]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
