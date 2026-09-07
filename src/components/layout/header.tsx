"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, industries } from "@/lib/data";
import { careers } from "@/lib/careers";

type DropItem = { label: string; href: string; desc?: string };
type NavEntry = { label: string; href: string; dropdown?: DropItem[] };

const nav: NavEntry[] = [
  {
    label: "Services",
    href: "/services",
    dropdown: [
      ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` as string, desc: s.description.slice(0, 60) + "…" })),
      { label: "View all services", href: "/services" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: [
      ...industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` as string, desc: i.desc })),
      { label: "View all industries", href: "/industries" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    dropdown: [
      { label: `Browse all ${careers.length} roles`, href: "/careers", desc: "Remote healthcare jobs with global exposure" },
      { label: "Apply now", href: "/careers/apply", desc: "One form for all roles" },
    ],
  },
  {
    label: "Course",
    href: "/course",
    dropdown: [
      { label: "Course overview", href: "/course", desc: "20 modules + certificate" },
      { label: "Enroll now", href: "/course/enroll", desc: "Start your readiness journey" },
      { label: "Student portal", href: "/course/portal", desc: "Continue learning" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E6EEF6]">
      {/* top bar */}
      <div className="hidden md:flex bg-[#0B1F33] text-white text-xs">
        <div className="mx-auto max-w-7xl w-full px-6 flex items-center justify-between h-8">
          <span className="opacity-90">🇰🇪 Built for Healthcare in Kenya • Serving Organizations Globally</span>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@afyadesk.com" className="flex items-center gap-1.5 hover:text-white/80">
              <Mail className="h-3 w-3" /> hello@afyadesk.com
            </a>
            <a href="tel:+254753728292" className="flex items-center gap-1.5 hover:text-white/80">
              <Phone className="h-3 w-3" /> +254 753 728 292
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-[88px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 py-2">
          <Image
            src="/logo.png"
            alt="AfyaDesk — Your Healthcare Team, Virtually."
            width={340}
            height={93}
            priority
            className="h-[46px] md:h-[60px] w-auto object-contain"
          />
        </Link>

        {/* desktop nav — ordered main → less, with dropdowns */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) =>
            n.dropdown ? (
              <div key={n.href} className="relative group">
                <Link
                  href={n.href}
                  className="px-3.5 py-2 rounded-full text-sm font-medium text-[#172033] hover:bg-[#F1F5F9] transition flex items-center gap-1"
                >
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5 text-[#5B6B80] group-hover:rotate-180 transition-transform" />
                </Link>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150">
                  <div className="w-[320px] rounded-2xl bg-white border border-[#E6EEF6] shadow-xl p-2 max-h-[70vh] overflow-y-auto">
                    {n.dropdown.map((d) => (
                      <Link
                        key={d.href + d.label}
                        href={d.href}
                        className="block px-3.5 py-2.5 rounded-xl hover:bg-[#F8FAFC] transition"
                      >
                        <div className="text-sm font-semibold text-[#0B1F33] leading-tight">{d.label}</div>
                        {d.desc && <div className="text-xs text-[#5B6B80] leading-5 mt-0.5 line-clamp-1">{d.desc}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-[#172033] hover:bg-[#F1F5F9] transition"
              >
                {n.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/hire">
            <Button size="lg" className="rounded-full">
              Hire Talent <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/careers" className="hidden xl:inline-flex">
            <Button size="lg" variant="secondary" className="rounded-full">
              Find Jobs
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl border border-[#E6EEF6] bg-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#E6EEF6] bg-white max-h-[75vh] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {nav.map((n) =>
              n.dropdown ? (
                <div key={n.href} className="rounded-xl overflow-hidden">
                  <div className="flex items-center">
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl text-[15px] font-medium text-[#172033] hover:bg-[#F8FAFC]"
                    >
                      {n.label}
                    </Link>
                    <button
                      onClick={() => setMobileExpanded((cur) => (cur === n.label ? null : n.label))}
                      className="p-3 rounded-xl hover:bg-[#F8FAFC]"
                      aria-label={`Expand ${n.label}`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-[#5B6B80] transition-transform ${mobileExpanded === n.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {mobileExpanded === n.label && (
                    <div className="pb-2 pl-4 pr-2 flex flex-col gap-0.5">
                      {n.dropdown.map((d) => (
                        <Link
                          key={d.href + d.label}
                          href={d.href}
                          onClick={() => setOpen(false)}
                          className="px-4 py-2.5 rounded-xl text-sm text-[#172033] bg-[#F8FAFC] border border-[#E6EEF6]"
                        >
                          <span className="font-medium">{d.label}</span>
                          {d.desc && <span className="block text-xs text-[#5B6B80] mt-0.5">{d.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#172033] hover:bg-[#F8FAFC]"
                >
                  {n.label}
                </Link>
              )
            )}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/hire" onClick={() => setOpen(false)}>
                <Button size="lg" className="w-full">
                  Hire Talent <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/careers" onClick={() => setOpen(false)}>
                <Button size="lg" variant="secondary" className="w-full">
                  Find Jobs
                </Button>
              </Link>
              <Link href="/course" onClick={() => setOpen(false)}>
                <Button size="lg" variant="secondary" className="w-full">
                  View Course
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
