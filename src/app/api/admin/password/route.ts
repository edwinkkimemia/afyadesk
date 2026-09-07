import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, hashPassword, verifyPassword } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

// PUT /api/admin/password — change own admin/staff password (requires session)
export async function PUT(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const { currentPassword, newPassword } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email: sess.email } });
    if (!user) return NextResponse.json({ error: "Admin account not found in database. Log in with the database account to change its password." }, { status: 404 });

    const ok = await verifyPassword(currentPassword, user.password);
    if (!ok) return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });

    if (await verifyPassword(newPassword, user.password)) {
      return NextResponse.json({ error: "New password must be different from the current one." }, { status: 400 });
    }

    const hash = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: user.id }, data: { password: hash } });
    try {
      await prisma.activityLog.create({
        data: { action: "PASSWORD_CHANGED", entity: "User", entityId: user.id, metadata: { email: user.email } as any },
      });
    } catch {}
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Database unavailable — password not changed." }, { status: 503 });
  }
}
