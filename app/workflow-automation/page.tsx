import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WORKFLOW_EXAMPLES, WORKFLOW_PLATFORMS } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Workflow Automation",
  description: "Before vs after automation examples across IT, HR, Finance, Operations and Customer Support, integrated with Jira, ServiceNow, SAP, Microsoft Teams and more.",
};

export default function WorkflowAutomationPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Workflow Automation
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Representative flows we build and hand over — each one replacing a manual handoff with
            a governed automation.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="Before vs. after automation" />
          <div className="space-y-5">
            {WORKFLOW_EXAMPLES.map((w) => (
              <div key={w.department} className="rounded-2xl border border-hairline bg-white p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-pale px-3 py-1 text-xs font-semibold text-blue-600">
                    {w.department}
                  </span>
                  <span className="text-sm font-medium text-navy">{w.workflow}</span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-hairline bg-paper p-4">
                    <span className="text-xs font-semibold text-navy-faint">Before</span>
                    <p className="mt-1.5 text-sm text-navy-soft">{w.before}</p>
                  </div>
                  <div className="rounded-xl border border-blue-600/20 bg-blue-pale p-4">
                    <span className="text-xs font-semibold text-blue-600">After</span>
                    <p className="mt-1.5 text-sm text-navy">{w.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-navy py-20">
        <Container className="text-center">
          <h2 className="text-2xl font-semibold text-white">Integrates with the platforms you already run</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {WORKFLOW_PLATFORMS.map((p) => (
              <span key={p} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur">
                {p}
              </span>
            ))}
          </div>
          <a href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glass">
            Book Free AI Consultation <ArrowRight size={16} />
          </a>
        </Container>
      </section>
    </>
  );
}
