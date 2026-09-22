import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AI_SERVICES, ITSM_SERVICES } from "@/lib/content";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI Agents Development, Workflow Automation, Voice AI, Chatbots, Document AI, Email Automation, ITIL Transformation, Incident Management, Problem Management, Change Enablement, Request Management, SLA & KPI Optimization.",
};

function ServiceBlock({
  slug, icon, name, desc, tag,
}: { slug: string; icon: string; name: string; desc: string; tag: string }) {
  const Icon = getIcon(icon);
  return (
    <div id={slug} className="scroll-mt-24 rounded-2xl border border-hairline bg-white p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-pale">
        <Icon size={22} className="text-blue-600" />
      </span>
      <span className="mt-5 block text-xs font-semibold text-blue-600">{tag}</span>
      <h3 className="mt-1 text-lg font-semibold text-navy">{name}</h3>
      <p className="mt-2 text-sm text-navy-soft">{desc}</p>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Sixteen services, one capability matrix
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Every service sits on one side of the matrix — AI Automation, which adds capacity, or
            ITSM Service Excellence, which governs it.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="AI Transformation" subtitle="New capacity for the service organisation." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AI_SERVICES.map((s) => (
              <ServiceBlock key={s.slug} {...s} tag="AI Transformation" />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading title="IT Service Excellence" subtitle="The governance that makes it safe to scale." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ITSM_SERVICES.map((s) => (
              <ServiceBlock key={s.slug} {...s} tag="IT Service Excellence" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
