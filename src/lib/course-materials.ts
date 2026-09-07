import { course } from "./course";

export type BundledMaterial = {
  id: string;
  moduleNumber: string;
  title: string;
  url: string;
  type: "PDF";
};

// Course PDFs bundled in public/modules (module1.pdf … module20.pdf).
// These are the canonical per-module materials — no admin upload needed.
export const bundledModuleMaterials: BundledMaterial[] = course.modules.map((m) => ({
  id: `bundled-${m.n}`,
  moduleNumber: m.n,
  title: `Module ${m.n} — ${m.title}`,
  url: `/modules/module${parseInt(m.n, 10)}.pdf`,
  type: "PDF",
}));

// Merge DB-uploaded extras (if any) with bundled PDFs.
// DB materials take precedence per module; bundled PDFs fill the gaps.
export function withBundledMaterials(dbMaterials: any[]): any[] {
  const db = Array.isArray(dbMaterials) ? dbMaterials : [];
  const covered = new Set(db.map((m: any) => m.moduleNumber));
  return [...db, ...bundledModuleMaterials.filter((b) => !covered.has(b.moduleNumber))];
}
