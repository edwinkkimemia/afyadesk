import Link from "next/link";
import { HireForm } from "@/components/forms/hire-form";
import { Mail, Phone, MapPin, Clock, ShieldCheck, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";

export const metadata = { title: "Hire Talent — Build Your Healthcare Support Team | AfyaDesk" };

export default function HirePage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Hire Talent"
        title="Hire trained healthcare talent"
        description="Tell us your workload — we’ll match vetted remote professionals in 5–7 business days. Serving healthcare organizations globally."
        breadcrumb={[{ label: "Hire", href: "/hire" }]}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0B1F33] text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-[#0F8B8D]" /> No long-term lock-in
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
          <Users className="h-3.5 w-3.5" /> Matched in 5–7 days
        </span>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 rounded-[24px] bg-white border border-[#E6EEF6] p-6 md:p-7 shadow-sm">
          <h2 className="font-bold text-[#0B1F33] text-lg">Request talent</h2>
          <p className="text-sm text-[#5B6B80]">Avg response within 1 business day. Free workflow mapping included.</p>
          <div className="mt-6">
            <HireForm />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-teal-300" /> What happens next?
            </h3>
            <ol className="mt-3 space-y-2 text-sm text-white/70 list-decimal list-inside">
              <li>We review your hiring needs within 1 business day.</li>
              <li>Free 30-min call to map workflow, tools & coverage.</li>
              <li>We match vetted talent in 5–7 business days.</li>
              <li>Secure onboarding — scale up or down anytime.</li>
            </ol>
            <p className="mt-4 text-xs text-white/50">
              Prefer general inquiries? <Link href="/contact" className="underline font-semibold text-white/70 hover:text-white">Contact us →</Link>
            </p>
          </div>

          <div className="rounded-[20px] bg-[#F8FAFC] border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">Talk to us directly</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Email</div>
                  <div className="text-[#5B6B80]">hello@afyadesk.com</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Phone / WhatsApp</div>
                  <div className="text-[#5B6B80]">+254 753 728 292</div>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Location</div>
                  <div className="text-[#5B6B80]">Nairobi, Kenya • Remote-first, serving globally</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-[#0F8B8D] shrink-0" />
                <div>
                  <div className="font-medium text-[#0B1F33]">Hours</div>
                  <div className="text-[#5B6B80]">Mon–Fri 08:00–18:00 EAT • Flexible coverage by arrangement</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <span className="font-semibold">Scope:</span> Administrative & support services only. No diagnosis, prescribing or emergency care.
          </div>

          <Link href="/services" className="block">
            <Button variant="secondary" size="lg" className="w-full">Explore Services First</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
