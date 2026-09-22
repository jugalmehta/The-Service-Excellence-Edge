import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_SEE, FOUNDER_EXPERTISE } from "@/lib/content";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About SEE",
  description: "Service Excellence Edge's mission, vision, and founder expertise in AI transformation and IT Service Management.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            About Service Excellence Edge
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            An AI transformation and IT Service Management consultancy built for European enterprises
            that need speed and governance in equal measure.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline bg-mesh-hero py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-navy">Mission</h3>
              <p className="mt-4 text-navy-soft">
                Empowering organizations to achieve operational excellence through artificial
                intelligence, intelligent automation, and modern IT Service Management.
              </p>
            </GlassCard>
            <GlassCard className="p-8" dark>
              <h3 className="text-xl font-semibold text-white">Vision</h3>
              <p className="mt-4 text-white/80">
                To become Europe&apos;s trusted AI &amp; Service Excellence transformation partner.
              </p>
            </GlassCard>
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-paper py-24">
        <Container>
          <SectionHeading title="Why SEE?" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_SEE.map((w) => {
              const Icon = getIcon(w.icon);
              return (
                <div key={w.title} className="rounded-2xl border border-hairline bg-white p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-pale">
                    <Icon size={20} className="text-blue-600" />
                  </span>
                  <h4 className="mt-5 text-sm font-semibold text-navy">{w.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-navy-soft">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline py-24">
        <Container>
          <SectionHeading
            title="Founder expertise"
            subtitle="Fifteen-plus years running IT Service Management and major incident response at enterprise scale — most recently in the automotive sector."
          />
          <div className="flex flex-wrap gap-3">
            {FOUNDER_EXPERTISE.map((f) => (
              <span
                key={f}
                className="rounded-full border border-hairline-strong bg-white px-4 py-2 text-sm font-medium text-navy"
              >
                {f}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
