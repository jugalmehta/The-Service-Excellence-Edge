"use client";

import { motion } from "framer-motion";
import { Mail, Bot, Layers, Server, Database, MessagesSquare, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Node = { label: string; icon: LucideIcon; hub?: boolean };

const NODES: Node[] = [
  { label: "Email", icon: Mail },
  { label: "AI Agent", icon: Bot, hub: true },
  { label: "Jira", icon: Layers },
  { label: "ServiceNow", icon: Server },
  { label: "SAP", icon: Database },
  { label: "Teams", icon: MessagesSquare },
  { label: "Analytics", icon: BarChart3 },
];

export function AnimatedWorkflow() {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] sm:overflow-visible">
          <div className="flex min-w-[640px] items-start justify-between gap-1 sm:min-w-0 sm:gap-2">
            {NODES.map((node, i) => (
          <div key={node.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex items-center justify-center rounded-2xl ${
                  node.hub
                    ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] bg-brand-gradient shadow-glass-lg"
                    : "h-12 w-12 sm:h-14 sm:w-14 glass-panel"
                }`}
              >
                {node.hub && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl bg-blue-400/40"
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.35, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <node.icon
                  size={node.hub ? 28 : 20}
                  strokeWidth={1.75}
                  className={node.hub ? "text-white relative" : "text-blue-600"}
                />
              </motion.div>
              <span className={`text-[11px] sm:text-xs font-medium text-center ${node.hub ? "text-navy font-semibold" : "text-navy-soft"}`}>
                {node.label}
              </span>
            </div>

            {i < NODES.length - 1 && (
              <div className="relative mx-1 sm:mx-2 mt-6 sm:mt-7 h-px flex-1 bg-gradient-to-r from-blue-600/30 via-blue-400/40 to-blue-600/30 overflow-visible">
                <motion.span
                  className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.6)]"
                  animate={{ left: ["0%", "94%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                />
              </div>
            )}
          </div>
          ))}
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white to-transparent sm:hidden" />
      </div>
      <p className="mt-8 text-center text-sm text-navy-faint">
        Everything connected through intelligent automation.
      </p>
    </div>
  );
}
