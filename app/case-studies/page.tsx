import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Automotive AI service desk, finance invoice automation, HR onboarding and ITSM change & risk assessment case studies from Service Excellence Edge.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Case Studies
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Four programmes, four disciplines. Each engagement started with one scoped agent or
            automation, proven in production, before expanding.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <div key={c.slug} id={c.slug} className="scroll-mt-24 flex flex-col rounded-2xl border border-hairline bg-white">
                <div className="border-b border-hairline bg-blue-pale-2 p-7">
                  <span className="text-xs font-semibold text-blue-600">{c.industry}</span>
                  <h2 className="mt-1 text-lg font-semibold text-navy">{c.title}</h2>
                </div>
                <div className="flex-1 space-y-5 p-7">
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600">Challenge</h5>
                    <p className="mt-1.5 text-sm text-navy-soft">{c.challenge}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600">AI Solution</h5>
                    <p className="mt-1.5 text-sm text-navy-soft">{c.solution}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600">Technologies</h5>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.technologies.map((t) => (
                        <span key={t} className="rounded-full bg-paper px-3 py-1 text-xs text-navy-soft">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-blue-600">Business Impact</h5>
                    <p className="mt-1.5 text-sm text-navy-soft">{c.impact}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 border-t border-hairline bg-paper p-7">
                  {c.kpis.map((k) => (
                    <div key={k.label}>
                      <div className="text-xl font-semibold text-navy">{k.metric}</div>
                      <div className="text-xs text-navy-faint">{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
