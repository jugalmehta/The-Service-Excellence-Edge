"use client";

import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { INDUSTRY_OPTIONS, COMPANY_SIZE_OPTIONS, ITSM_TOOL_OPTIONS } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-10 text-center">
        <CheckCircle2 size={32} className="mx-auto text-blue-600" />
        <h3 className="mt-4 text-lg font-semibold text-navy">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-2 text-sm text-navy-soft">
          We typically respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-hairline bg-white p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Business email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <SelectField label="Industry" name="industry" options={INDUSTRY_OPTIONS} />
        <SelectField label="Company size" name="companySize" options={COMPANY_SIZE_OPTIONS} />
        <SelectField label="Current ITSM tool" name="itsmTool" options={ITSM_TOOL_OPTIONS} />
        <div />
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-navy mb-1.5">Biggest operational challenge</label>
          <textarea
            name="challenge"
            rows={4}
            className="w-full rounded-xl border border-hairline-strong bg-white px-4 py-3 text-sm text-navy outline-none focus:border-blue-600"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glass transition-all hover:shadow-glass-lg disabled:opacity-60"
        >
          {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
          Book Free AI Consultation
        </button>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full border border-hairline-strong px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue-600/40"
        >
          Schedule Discovery Call
        </button>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Something went wrong sending this — please email us directly instead.
        </p>
      )}
    </form>
  );
}

function Field({
  label, name, type = "text", required = false,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-hairline-strong bg-white px-4 py-3 text-sm text-navy outline-none focus:border-blue-600"
      />
    </div>
  );
}

function SelectField({
  label, name, options,
}: { label: string; name: string; options: readonly string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-xl border border-hairline-strong bg-white px-4 py-3 text-sm text-navy outline-none focus:border-blue-600"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
