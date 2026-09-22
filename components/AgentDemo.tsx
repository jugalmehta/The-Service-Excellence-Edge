"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

const SAMPLE_TICKETS = [
  "I can't log into the VPN from home, keeps saying invalid credentials.",
  "My laptop won't connect to the printer on the 3rd floor.",
  "Outlook keeps crashing every time I open a shared calendar.",
];

const STEPS = [
  "Reading ticket…",
  "Classifying intent…",
  "Checking known-error database…",
  "Resolution found — drafting response…",
];

export function AgentDemo() {
  const [ticket, setTicket] = useState(SAMPLE_TICKETS[0]);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function run() {
    setRunning(true);
    setDone(false);
    setStep(0);
    STEPS.forEach((_, i) => {
      setTimeout(() => {
        setStep(i + 1);
        if (i === STEPS.length - 1) {
          setTimeout(() => {
            setRunning(false);
            setDone(true);
          }, 500);
        }
      }, (i + 1) * 650);
    });
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white p-6 sm:p-8">
      <h3 className="text-sm font-semibold text-navy">Try it: IT Support Agent</h3>
      <p className="mt-1 text-xs text-navy-soft">Pick a sample ticket and watch the agent triage it.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {SAMPLE_TICKETS.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTicket(t);
              setDone(false);
              setStep(0);
            }}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              ticket === t
                ? "border-blue-600 bg-blue-pale text-blue-600 font-semibold"
                : "border-hairline-strong text-navy-soft hover:border-blue-600/40"
            }`}
          >
            {t.slice(0, 28)}…
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-paper p-4 text-sm text-navy">{ticket}</div>

      <button
        onClick={run}
        disabled={running}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glass transition-all hover:shadow-glass-lg disabled:opacity-60"
      >
        {running ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        {running ? "Processing…" : "Run the agent"}
      </button>

      <AnimatePresence>
        {(running || done) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 overflow-hidden border-t border-hairline pt-5"
          >
            <ul className="space-y-2">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-2 text-xs transition-opacity ${
                    step > i ? "opacity-100 text-navy" : "opacity-30 text-navy-soft"
                  }`}
                >
                  {step > i ? (
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                  ) : (
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-hairline-strong" />
                  )}
                  {s}
                </li>
              ))}
            </ul>
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-xl bg-blue-pale p-4 text-xs text-navy"
              >
                <strong className="font-semibold">Resolution drafted:</strong> Matched to known error
                #KE-1042 (VPN credential cache). Suggested fix sent to requester; ticket auto-closed if
                confirmed within 24h.
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
