import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AI_AGENTS } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { AgentDemo } from "@/components/AgentDemo";

export const metadata: Metadata = {
  title: "AI Agents",
  description: "Enterprise AI agent portfolio: IT Support, Executive Assistant, HR, Knowledge, Voice Reception, Finance, Customer Service, Compliance and more.",
};

export default function AiAgentsPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Enterprise AI Agent Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Twelve agents, each scoped to one job, with its own guardrails, escalation path and
            success metric.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AI_AGENTS.map((a) => {
              const Icon = getIcon(a.icon);
              return (
                <div key={a.slug} id={a.slug} className="scroll-mt-24 rounded-2xl border border-hairline bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-pale">
                    <Icon size={20} className="text-blue-600" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-navy">{a.name}</h3>
                  <p className="mt-1 text-xs font-medium text-blue-600">{a.outcome}</p>
                  <p className="mt-3 text-sm text-navy-soft">{a.detail}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading title="See an agent in action" subtitle="A simplified simulation of how the IT Support Agent triages an incoming ticket." />
          <div className="mx-auto max-w-xl">
            <AgentDemo />
          </div>
        </Container>
      </section>
    </>
  );
}
