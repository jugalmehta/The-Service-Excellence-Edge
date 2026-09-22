import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CAPABILITIES, WORKFLOW_PLATFORMS } from "@/lib/content";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Enterprise AI Capabilities",
  description: "Generative AI, Voice AI, Document AI, Predictive AI, Process Mining and Enterprise Search — the capability grid behind every SEE engagement.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Enterprise AI Capabilities
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            The underlying capability grid every agent and workflow is built from.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="Capability grid" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => {
              const Icon = getIcon(c.icon);
              return (
                <div key={c.capability} className="rounded-2xl border border-hairline bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-pale">
                    <Icon size={20} className="text-blue-600" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-navy">{c.capability}</h3>
                  <p className="mt-2 text-sm text-navy-soft">{c.value}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-navy py-20">
        <Container className="text-center">
          <h2 className="text-2xl font-semibold text-white">Integrations</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {WORKFLOW_PLATFORMS.map((p) => (
              <span key={p} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur">
                {p}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
