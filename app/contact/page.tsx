import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free AI consultation or schedule a discovery call with Service Excellence Edge.",
};

export default function ContactPage() {
  return (
    <section className="bg-mesh-hero py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Let&apos;s Build Your Intelligent Enterprise.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-navy-soft">
            Tell us about your service operation and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <div className="rounded-2xl border border-hairline bg-white p-7 h-fit">
            <h3 className="text-sm font-semibold text-navy">Direct contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-soft">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-blue-600">{SITE.email}</a>
              </li>
              <li>{SITE.location}</li>
              <li>Response within 1 business day</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
