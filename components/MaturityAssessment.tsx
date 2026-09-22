"use client";

import { useState } from "react";
import { MATURITY_LEVELS } from "@/lib/content";

export function MaturityAssessment() {
  const [selected, setSelected] = useState(3);
  const active = MATURITY_LEVELS.find((l) => l.level === selected)!;

  return (
    <div className="rounded-2xl border border-hairline bg-white p-6 sm:p-8">
      <h3 className="text-sm font-semibold text-navy">Where is your ITSM practice today?</h3>
      <p className="mt-1 text-xs text-navy-soft">Select a level to see what it looks like in practice.</p>

      <div className="mt-6 flex gap-2">
        {MATURITY_LEVELS.map((l) => (
          <button
            key={l.level}
            onClick={() => setSelected(l.level)}
            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              selected === l.level
                ? "bg-brand-gradient text-white shadow-glass"
                : "bg-paper text-navy-soft hover:bg-blue-pale"
            }`}
          >
            {l.level}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-paper p-5">
        <span className="text-xs font-semibold text-blue-600">Level {active.level} — {active.name}</span>
        <p className="mt-2 text-sm text-navy-soft">{active.desc}</p>
      </div>
    </div>
  );
}
