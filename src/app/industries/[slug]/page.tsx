import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { industries, services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { Check, ArrowRight, Shield, Building2 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return {};
  return { title: `${ind.name} | AfyaDesk Industries`, description: ind.description };
}

export default async function IndustryDetail({ params }: Props) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();

  const related = industries.filter((i) => i.slug !== slug).slice(0, 3);
  const matchedServices = services.filter((s) =>
    ind.services?.some((name) => s.title.toLowerCase().includes(name.split(" ")[0].toLowerCase()))
  );

  return (
    <div>
      <BreadcrumbHero
        eyebrow={`Industry • ${ind.name}`}
        title={`${ind.name} — ${ind.tagline}`}
        description={ind.description}
        featuredImage={ind.coverImage}
        breadcrumb={[
          { label: "Industries", href: "/industries" },
          { label: ind.name, href: `/industries/${ind.slug}` },
        ]}
      >
        <Link href="/hire">
          <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
            Hire Talent <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link
          href="/services"
          className="hidden sm:inline-flex h-12 px-6 items-center rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-[#0B1F33]"
        >
          Explore Services
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-72 rounded-[20px] overflow-hidden border border-[#E6EEF6] mb-6">
            <Image src={ind.coverImage} alt={ind.name} fill className="object-cover" sizes="800px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/40 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-[#0B1F33] border border-white/20">
              {ind.name} • Non-clinical support • Global coverage
            </div>
          </div>

          <h2 className="font-bold text-[#0B1F33] text-xl">Common challenges we solve</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {ind.challenges?.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-4 text-sm text-[#172033]">
                <span className="h-6 w-6 rounded-full bg-[#0B1F33] text-white flex items-center justify-center shrink-0 text-xs">!</span>
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-bold text-[#0B1F33] text-xl">What AfyaDesk handles for {ind.name.toLowerCase()}</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {ind.solutions?.map((s) => (
              <li key={s} className="flex gap-3 rounded-2xl bg-white border border-[#E6EEF6] p-4 text-sm text-[#172033]">
                <span className="h-6 w-6 rounded-full bg-[#0F8B8D] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">How hiring works</h3>
            <ol className="mt-3 space-y-3 text-sm text-[#5B6B80] list-decimal list-inside">
              <li>Tell us your volume, tools (EMR, phone, calendar) and coverage hours.</li>
              <li>We match trained talent in 5–7 business days and onboard securely.</li>
              <li>Your team integrates under your policies and supervision.</li>
              <li>Scale up or down with 14 days&apos; notice — QA included.</li>
            </ol>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
            <Shield className="h-5 w-5 shrink-0" />
            <p>
              <span className="font-semibold">Non-clinical scope:</span> AfyaDesk provides admin support only — no diagnosis,
              prescribing or clinical decisions. All clinical responsibility remains with your licensed professionals.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-teal-300" /> Hire for {ind.name}
            </h3>
            <p className="mt-2 text-sm text-white/70">Tell us your workload — we&apos;ll recommend part-time, full-time or a custom team.</p>
            <Link href="/hire" className="mt-4 block">
              <Button size="lg" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
                Hire Talent <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-3 text-xs text-white/50">Avg match in 5–7 business days • No long-term lock-in</p>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Recommended services</h4>
            <ul className="mt-3 space-y-2">
              {(matchedServices.length > 0 ? matchedServices : services.slice(0, 4)).slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex justify-between items-center p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] hover:bg-white"
                  >
                    <span className="text-sm font-medium text-[#0B1F33]">{s.title}</span>
                    <span className="text-xs font-bold text-[#0F8B8D]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Other industries</h4>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/industries/${r.slug}`}
                    className="flex justify-between items-center p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] hover:bg-white"
                  >
                    <span className="text-sm font-medium text-[#0B1F33]">{r.name}</span>
                    <span className="text-xs text-[#5B6B80] truncate max-w-[140px]">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/industries" className="mt-3 inline-flex text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">
              View all industries →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
