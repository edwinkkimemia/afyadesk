import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { industries } from "@/lib/data";
import { Building2, Stethoscope, FlaskConical, Pill, Video, Rocket, Heart, Shield, ArrowRight } from "lucide-react";

const icons: any = [Building2, Stethoscope, FlaskConical, Pill, Video, Rocket, Heart, Shield];

export const metadata = { title: "Industries — Healthcare Organizations We Serve" };

export default function IndustriesPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Industries"
        title="Industries we serve"
        description="From private hospitals to health startups — AfyaDesk provides flexible, healthcare-aware virtual support tailored to your organization."
        breadcrumb={[{ label: "Industries", href: "/industries" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {industries.map((ind, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={ind.slug} className="group rounded-[20px] bg-white border border-[#E6EEF6] overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="relative h-40 overflow-hidden">
                <Image src={ind.coverImage} alt={ind.name} fill className="object-cover group-hover:scale-[1.03] transition duration-500" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 h-9 w-9 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-[#0B1F33] shadow">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-semibold text-[#0B1F33] text-lg">{ind.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#5B6B80]">{ind.tagline || ind.desc}</p>
                <Link href={`/industries/${ind.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F8B8D]">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[24px] bg-[#0B1F33] text-white p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">We adapt to your workflow</h3>
            <p className="text-sm text-white/70">EMR, phone, calendar, messaging — your tools, your policies.</p>
          </div>
          <Link href="/hire">
            <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
              Hire Talent
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
