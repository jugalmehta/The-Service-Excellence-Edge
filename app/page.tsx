import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedWorkflow } from "@/components/AnimatedWorkflow";
import {
  AI_SERVICES, ITSM_SERVICES, AI_AGENTS, FRAMEWORK_STAGES, CAPABILITIES, CASE_STUDIES,
} from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { HeroReveal } from "@/components/HeroReveal";

export const metadata: Metadata = {
  title: "AI Transformation & IT Service Management for Enterprise Operations",
  description:
    "Service Excellence Edge helps CIOs and IT leaders transform enterprise operations with AI agents, workflow automation and ITSM consulting across Germany and Europe.",
};

const SUBHEAD_PILLS = [
  "AI Agents", "Workflow Automation", "IT Service Management", "Process Intelligence", "Enterprise Transformation",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh-hero pb-20 pt-20 sm:pt-28">
        <Container className="relative">
          <HeroReveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Transform Enterprise Operations with AI-Powered Service Excellence.
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {SUBHEAD_PILLS.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-hairline-strong bg-white/70 px-3.5 py-1.5 text-xs font-medium text-navy-soft backdrop-blur"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact" variant="primary">
                  Book Free AI Consultation <ArrowRight size={16} />
                </Button>
                <Button href="/enterprise-ai-capabilities" variant="secondary">
                  Explore AI Solutions
                </Button>
                <Button href="/case-studies" variant="secondary">
                  View Case Studies
                </Button>
              </div>
            </div>
          </HeroReveal>

          <div className="mx-auto mt-20 max-w-5xl">
            <GlassCard className="px-6 py-10 sm:px-10">
              <AnimatedWorkflow />
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* Capability matrix */}
      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading
            title="The AI Automation × Service Excellence Matrix"
            subtitle="Every engagement draws from the same matrix: AI Automation gives your organisation new capacity, ITSM Service Excellence gives that capacity the governance to scale safely."
            center
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-pale">
                  <Bot size={22} className="text-blue-600" />
                </span>
                <h3 className="text-xl font-semibold text-navy">AI Automation</h3>
              </div>
              <ul className="mt-6 divide-y divide-hairline">
                {AI_SERVICES.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <li key={s.slug} className="flex items-center gap-3 py-3 text-sm text-navy">
                      <Icon size={16} className="text-blue-600 shrink-0" />
                      {s.name}
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
            <GlassCard className="p-8" dark>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Layers size={22} className="text-blue-400" />
                </span>
                <h3 className="text-xl font-semibold text-white">ITSM Service Excellence</h3>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {ITSM_SERVICES.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <li key={s.slug} className="flex items-center gap-3 py-3 text-sm text-white/90">
                      <Icon size={16} className="text-blue-400 shrink-0" />
                      {s.name}
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* Services preview */}
      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading
            title="Eight AI capabilities. Eight service-excellence disciplines."
            subtitle="One programme, scoped to your operation."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...AI_SERVICES.slice(0, 4), ...ITSM_SERVICES.slice(0, 4)].map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  className="group rounded-2xl border border-hairline bg-white p-6 transition-all hover:border-blue-600/30 hover:shadow-glass"
                >
                  <Icon size={22} className="text-blue-600" strokeWidth={1.75} />
                  <h4 className="mt-4 text-sm font-semibold text-navy">{s.name}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-navy-soft">{s.desc}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button href="/services" variant="secondary">
              View all 16 services <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>

      {/* AI Agents preview */}
      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="Twelve AI agents, each built for one job" subtitle="Not a general chatbot — a portfolio of scoped agents with clear business outcomes." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AI_AGENTS.slice(0, 6).map((a) => {
              const Icon = getIcon(a.icon);
              return (
                <div key={a.slug} className="rounded-2xl border border-hairline p-6">
                  <Icon size={20} className="text-blue-600" strokeWidth={1.75} />
                  <h4 className="mt-3 text-sm font-semibold text-navy">{a.name}</h4>
                  <p className="mt-1.5 text-xs text-navy-soft">{a.outcome}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button href="/ai-agents" variant="secondary">
              Meet all 12 agents <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Framework preview */}
      <section className="border-t border-hairline bg-navy py-24">
        <Container>
          <SectionHeading title="The SEE AI Transformation Framework™" subtitle="Five stages, run in fixed sprints." center />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
            {FRAMEWORK_STAGES.map((s, i) => (
              <div key={s.stage} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h4 className="mt-4 text-sm font-semibold text-white">{s.stage}</h4>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/ai-transformation-framework" variant="ghost">
              See the full framework <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Enterprise capabilities preview */}
      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading title="Enterprise AI capabilities" subtitle="Built for regulated, multi-market organisations." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => {
              const Icon = getIcon(c.icon);
              return (
                <div key={c.capability} className="rounded-2xl border border-hairline p-6">
                  <Icon size={20} className="text-blue-600" strokeWidth={1.75} />
                  <h4 className="mt-3 text-sm font-semibold text-navy">{c.capability}</h4>
                  <p className="mt-1.5 text-xs text-navy-soft">{c.value}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Case studies preview */}
      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading title="Results from recent engagements" subtitle="Four programmes, four disciplines." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies#${c.slug}`}
                className="rounded-2xl border border-hairline bg-white p-7 transition-all hover:border-blue-600/30 hover:shadow-glass"
              >
                <span className="text-xs font-semibold text-blue-600">{c.industry}</span>
                <h4 className="mt-2 text-base font-semibold text-navy">{c.title}</h4>
                <div className="mt-5 flex flex-wrap gap-6 border-t border-hairline pt-5">
                  {c.kpis.map((k) => (
                    <div key={k.label}>
                      <div className="text-xl font-semibold text-navy">{k.metric}</div>
                      <div className="text-xs text-navy-faint">{k.label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-hairline bg-navy py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Let&apos;s Build Your Intelligent Enterprise.</h2>
          <p className="max-w-xl text-navy-faint">
            A 30-minute discovery call is enough to tell you whether this is the right fit for your service organisation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="primary">Book Free AI Consultation</Button>
            <Button href="/contact" variant="ghost">Schedule Discovery Call</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
