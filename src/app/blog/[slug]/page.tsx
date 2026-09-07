import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { careers } from "@/lib/careers";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { ArrowRight, Briefcase, DollarSign, MapPin } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const contentMap: Record<string, string> = {
  "what-is-medical-virtual-assistant": `
A Medical Virtual Assistant (MVA) is a trained administrative professional who supports healthcare providers remotely.

**What they do**
- Appointment scheduling & calendar management
- Patient communication, reminders & follow-ups
- Referral coordination & inbox handling
- Documentation support & EMR admin
- Billing documentation & claims follow-up

**What they don't do**
MVAs are non-clinical. They don't diagnose, prescribe or make clinical decisions.

**ROI for Kenyan clinics**
Clinics using MVAs report 30-40% less admin time, fewer missed calls and faster documentation turnaround — allowing doctors to see more patients.

**Getting started with AfyaDesk**
1. Free consultation to map your workflow
2. Matched Kenyan talent in 5-7 days
3. Secure onboarding into your tools
4. Ongoing QA and scaling as needed.
  `,
  default: `
This article covers practical strategies for healthcare teams to reduce administrative overload using virtual support.

Key takeaways:
- Audit your top 5 time-consuming admin tasks
- Delegate non-clinical work first (scheduling, reception, data entry)
- Standardize workflows before scaling
- Measure no-shows, response times and documentation turnaround

AfyaDesk helps you implement these changes with trained Kenyan professionals who embed in your tools and operate under your policies.
  `,
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | AfyaDesk Blog`,
    description: post.excerpt,
    openGraph: { images: [post.coverImage || post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const body = contentMap[post.slug] || contentMap.default;
  const isHtml = /<\s*(p|h2|h3|ul|ol|li|strong|em|blockquote|a)\b/i.test(body);
  const openRoles = careers.slice(0, 4);
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div>
      <BreadcrumbHero
        eyebrow="Blog"
        title={post.title}
        description={post.excerpt}
        featuredImage={post.coverImage || post.image}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: post.title.slice(0, 30) + "…", href: `/blog/${post.slug}` },
        ]}
      >
        <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
          {post.date} • {post.author} • 5 min read
        </span>
        <span className="flex gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-xs bg-white text-[#0B1F33] px-2.5 py-1 rounded-full font-semibold">
              {t}
            </span>
          ))}
        </span>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 min-w-0">
          {/* featured image - large, stack style */}
          <div className="relative h-64 md:h-[360px] rounded-[20px] overflow-hidden border border-[#E6EEF6] bg-[#F8FAFC]">
            <Image
              src={post.coverImage || post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="800px"
            />
          </div>

          {/* stacked secondary images row - decorative */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&q=80",
              post.coverImage,
            ].map((src, i) => (
              <div key={i} className="relative h-28 rounded-2xl overflow-hidden border border-[#E6EEF6]">
                <Image src={src || post.image} alt="" fill className="object-cover" sizes="200px" />
              </div>
            ))}
          </div>

          {isHtml ? (
            <article
              className="prose prose-sm max-w-none mt-6 text-[#172033] leading-7 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B1F33] [&_h2]:mt-6 [&_h3]:font-semibold [&_h3]:text-[#0B1F33] [&_h3]:mt-4 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mt-2 [&_li]:mt-1 [&_a]:text-[#0F8B8D] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#0F8B8D]/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#5B6B80]"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            <article className="prose prose-sm max-w-none mt-6 text-[#172033] whitespace-pre-line leading-7">{body}</article>
          )}

          <div className="mt-8 rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-bold text-[#0B1F33]">Want help implementing this?</h3>
              <p className="text-sm text-[#5B6B80]">Talk to AfyaDesk — we&apos;ll map your workflow and help you hire the right support.</p>
            </div>
            <Link href="/hire">
              <Button>Hire Talent</Button>
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
            Disclaimer: Administrative guidance only. Not medical advice. Clinical decisions remain with licensed professionals.
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-teal-300" /> Open roles — {careers.length}
            </h3>
            <p className="mt-2 text-sm text-white/70 leading-6">Build a remote healthcare career with global exposure. Course graduates prioritised.</p>
            <div className="mt-4 space-y-2">
              {openRoles.map((r) => (
                <Link
                  key={r.slug}
                  href={`/careers/${r.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{r.title}</div>
                    <div className="text-xs text-white/60 flex items-center gap-1.5 mt-0.5">
                      <span className="inline-flex items-center gap-1"><DollarSign className="h-3 w-3" />{r.rate}</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-teal-300" />
                </Link>
              ))}
            </div>
            <Link href="/careers" className="mt-4 block">
              <Button size="lg" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
                View all {careers.length} roles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/course" className="mt-3 flex items-center justify-center text-xs font-semibold text-white/70 hover:text-white">
              or take the Readiness Course →
            </Link>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Hire talent for your practice</h4>
            <p className="mt-1 text-sm text-[#5B6B80]">Matched in 5–7 days • No long-term lock-in</p>
            <Link href="/hire" className="mt-4 block">
              <Button size="lg" className="w-full">Hire Talent</Button>
            </Link>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Keep reading</h4>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="flex gap-3 items-center p-2 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#E6EEF6]">
                    <span className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-[#E6EEF6]">
                      <Image src={r.coverImage || r.image} alt={r.title} fill className="object-cover" sizes="48px" />
                    </span>
                    <span className="text-sm font-medium text-[#0B1F33] leading-tight line-clamp-2">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-3 inline-flex text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">
              View all articles →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
