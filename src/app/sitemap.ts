import { services, blogPosts, industries } from "@/lib/data";
import { careers } from "@/lib/careers";
import { getAllPublicSlugs } from "@/lib/blog";

export default async function sitemap() {
  const base = "https://afyadesk.com";
  const staticPages = ["", "/services", "/industries", "/about", "/careers", "/careers/apply", "/course", "/course/enroll", "/portal", "/portal/login", "/course/portal", "/hire", "/contact", "/blog", "/privacy", "/terms", "/data-protection", "/cookies"];
  let postSlugs = blogPosts.map((b) => b.slug);
  try {
    postSlugs = await getAllPublicSlugs();
  } catch {}
  return [
    ...staticPages.map((p) => ({ url: `${base}${p}`, lastModified: new Date() })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}`, lastModified: new Date() })),
    ...postSlugs.map((slug) => ({ url: `${base}/blog/${slug}`, lastModified: new Date() })),
    ...careers.map((c) => ({ url: `${base}/careers/${c.slug}`, lastModified: new Date() })),
  ];
}
