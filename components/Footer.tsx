import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image src="/assets/logo.png" alt={SITE.name} width={140} height={56} />
            <p className="mt-4 max-w-sm text-sm text-navy-soft">
              {SITE.positioning}. Helping enterprise service organisations run on AI agents and
              disciplined process design across Germany and Europe.
            </p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-navy">Explore</h5>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.slice(1, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-navy-soft hover:text-blue-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-navy">Contact</h5>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-sm text-navy-soft hover:text-blue-600">
                  {SITE.email}
                </a>
              </li>
              <li className="text-sm text-navy-soft">{SITE.location}</li>
              <li>
                <Link href="/contact" className="text-sm text-navy-soft hover:text-blue-600">
                  Book a consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-navy-faint sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {SITE.name} GmbH. All rights reserved.</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
