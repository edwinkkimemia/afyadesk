import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const fallback = async () => {
    const { services } = await import("@/lib/data");
    return NextResponse.json(services.map((s) => ({ ...s, static: true })));
  };
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    // connected DB with empty tables (e.g. unseeded production) → serve bundled list
    if (!services || services.length === 0) return fallback();
    return NextResponse.json(services);
  } catch {
    return fallback();
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  try {
    const svc = await prisma.service.create({ data: body });
    return NextResponse.json(svc);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
