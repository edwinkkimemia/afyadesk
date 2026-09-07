import { NextRequest, NextResponse } from "next/server";
import { getPortalSession } from "@/lib/portal";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { readDemoEnrollments, writeDemoEnrollments, isDbAuthError } from "@/lib/demo";
import { course as staticCourse } from "@/lib/course";

const MODULE_ORDER = staticCourse.modules.map((m) => m.n);
const previousOf = (n: string) => {
  const i = MODULE_ORDER.indexOf(n);
  return i > 0 ? MODULE_ORDER.slice(0, i) : [];
};
const laterOf = (n: string) => {
  const i = MODULE_ORDER.indexOf(n);
  return i >= 0 ? MODULE_ORDER.slice(i + 1) : [];
};

const schema = z.object({
  moduleNumber: z.string(),
  completed: z.boolean(),
});

// GET progress for current user
export async function GET() {
  const sess = await getPortalSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const progress = await prisma.enrollmentProgress.findMany({ where: { enrollmentId: sess.enrollmentId }, orderBy: { moduleNumber: "asc" } });
    return NextResponse.json(progress);
  } catch (e: any) {
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      const en = arr.find((x: any) => x.id === sess.enrollmentId);
      return NextResponse.json(Array.isArray(en?.progress) ? en.progress : []);
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sess = await getPortalSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { moduleNumber, completed } = parsed.data;
  try {
    // sequential guard: complete in order, unmark in reverse order
    const existing = await prisma.enrollmentProgress.findMany({ where: { enrollmentId: sess.enrollmentId } });
    const doneSet = new Set(existing.filter((p) => p.completed).map((p) => p.moduleNumber));
    if (completed) {
      const missing = previousOf(moduleNumber).find((n) => !doneSet.has(n) && n !== moduleNumber);
      if (missing) return NextResponse.json({ error: `Complete Module ${missing} first before Module ${moduleNumber}.` }, { status: 403 });
    } else if (doneSet.has(moduleNumber)) {
      const blocker = laterOf(moduleNumber).find((n) => doneSet.has(n));
      if (blocker) return NextResponse.json({ error: `Unmark Module ${blocker} first before reopening Module ${moduleNumber}.` }, { status: 403 });
    }
    const upsert = await prisma.enrollmentProgress.upsert({
      where: { enrollmentId_moduleNumber: { enrollmentId: sess.enrollmentId, moduleNumber } },
      update: { completed, completedAt: completed ? new Date() : null },
      create: { enrollmentId: sess.enrollmentId, moduleNumber, completed, completedAt: completed ? new Date() : null },
    });
    return NextResponse.json(upsert);
  } catch (e: any) {
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      const idx = arr.findIndex((x: any) => x.id === sess.enrollmentId);
      if (idx === -1) return NextResponse.json({ error: "Enrollment not found (demo)" }, { status: 404 });
      const enrollment = arr[idx];
      if (!Array.isArray(enrollment.progress)) enrollment.progress = [];
      const doneSet = new Set(enrollment.progress.filter((p: any) => p.completed).map((p: any) => p.moduleNumber));
      if (completed) {
        const missing = previousOf(moduleNumber).find((n) => !doneSet.has(n) && n !== moduleNumber);
        if (missing) return NextResponse.json({ error: `Complete Module ${missing} first before Module ${moduleNumber}.` }, { status: 403 });
      } else if (doneSet.has(moduleNumber)) {
        const blocker = laterOf(moduleNumber).find((n) => doneSet.has(n));
        if (blocker) return NextResponse.json({ error: `Unmark Module ${blocker} first before reopening Module ${moduleNumber}.` }, { status: 403 });
      }
      const pIdx = enrollment.progress.findIndex((p: any) => p.moduleNumber === moduleNumber);
      const now = new Date().toISOString();
      if (pIdx !== -1) {
        enrollment.progress[pIdx].completed = completed;
        enrollment.progress[pIdx].completedAt = completed ? now : null;
        enrollment.progress[pIdx].updatedAt = now;
      } else {
        enrollment.progress.push({ id: `prog-${Date.now()}`, enrollmentId: sess.enrollmentId, moduleNumber, completed, completedAt: completed ? now : null, createdAt: now, updatedAt: now });
      }
      enrollment.progress.sort((a: any, b: any) => a.moduleNumber.localeCompare(b.moduleNumber));
      await writeDemoEnrollments(arr);
      const updated = enrollment.progress.find((p: any) => p.moduleNumber === moduleNumber);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
