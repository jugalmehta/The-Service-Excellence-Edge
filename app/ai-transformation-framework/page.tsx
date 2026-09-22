import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FrameworkRoadmap } from "@/components/FrameworkRoadmap";

export const metadata: Metadata = {
  title: "AI Transformation Framework",
  description: "The SEE AI Transformation Framework: Discover, Design, Build, Deploy, Optimize — five stages to take a service organisation from manual to AI-assisted.",
};

export default function FrameworkPage() {
  return (
    <>
      <section className="bg-mesh-hero py-20 sm:py-28">
        <Container className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            The SEE AI Transformation Framework™
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Five stages, run in fixed sprints, with a working agent or automation live by the end
            of stage three.
          </p>
        </Container>
      </section>

      <section className="border-t border-hairline py-28">
        <Container>
          <FrameworkRoadmap />
        </Container>
      </section>
    </>
  );
}
