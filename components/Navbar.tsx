"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const PRIMARY_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const SOLUTIONS_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/workflow-automation", label: "Workflow Automation" },
  { href: "/it-service-management", label: "IT Service Management" },
  { href: "/ai-transformation-framework", label: "Transformation Framework" },
  { href: "/enterprise-ai-capabilities", label: "Enterprise Capabilities" },
];

const TAIL_ITEMS = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

const ALL_ITEMS = [...PRIMARY_ITEMS, ...SOLUTIONS_ITEMS, ...TAIL_ITEMS];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const solutionsActive = SOLUTIONS_ITEMS.some((i) => i.href === pathname);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/75 backdrop-blur-xl">
      <div className="container-content flex items-center justify-between py-4">
        <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <Image src="/assets/logo-mark.png" alt="Service Excellence Edge" width={104} height={32} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {PRIMARY_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href ? "text-blue-600 font-semibold" : "text-navy-soft hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative" ref={solutionsRef}>
            <button
              onClick={() => setSolutionsOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                solutionsActive ? "text-blue-600 font-semibold" : "text-navy-soft hover:text-navy"
              }`}
            >
              Solutions
              <ChevronDown size={14} className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="glass-panel absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl p-2"
                >
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSolutionsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                        pathname === item.href ? "bg-blue-pale text-blue-600 font-semibold" : "text-navy-soft hover:bg-white hover:text-navy"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {TAIL_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href ? "text-blue-600 font-semibold" : "text-navy-soft hover:text-navy"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block shrink-0">
          <Link
            href="/contact"
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glass transition-all hover:shadow-glass-lg hover:brightness-105"
          >
            Book Free AI Consultation
          </Link>
        </div>

        <button
          className="lg:hidden rounded-full p-2 text-navy"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-hairline bg-white"
          >
            <div className="container-content flex flex-col gap-1 py-4">
              {ALL_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    pathname === item.href ? "bg-blue-pale text-blue-600 font-semibold" : "text-navy-soft"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand-gradient px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Book Free AI Consultation
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
