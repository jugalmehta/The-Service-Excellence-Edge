import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ITIL_MODULES } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { MaturityAssessment } from "@/components/MaturityAssessment";

export const metadata: Metadata = {
  title: "IT Service Management",
  description: "Complete ITSM lifecycle: Incident, Problem, Change Enablement, Request, Knowledge, SLA Management and CMDB integration, modernized with AI.",
};

export default function ItsmPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Complete ITSM Lifecycle
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Every ITIL 4 practice, redesigned around AI-assisted resolution instead of manual
            triage.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="ITIL modules" />
          <div className="overflow-hidden rounded-2xl border border-hairline">
            {ITIL_MODULES.map((m, i) => {
              const Icon = getIcon(m.icon);
              return (
                <div
                  key={m.practice}
                  className={`flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8 ${
                    i !== 0 ? "border-t border-hairline" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 sm:w-72 shrink-0">
                    <Icon size={18} className="text-blue-600 shrink-0" />
                    <span className="font-semibold text-navy">{m.practice}</span>
                  </div>
                  <p className="text-sm text-navy-soft">{m.solution}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading title="ITSM maturity assessment" subtitle="A five-level model we use to scope every engagement." />
          <div className="mx-auto max-w-xl">
            <MaturityAssessment />
          </div>
        </Container>
      </section>
    </>
  );
}
