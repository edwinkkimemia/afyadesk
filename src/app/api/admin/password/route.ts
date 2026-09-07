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
    // find by session id first (DB login), then by email — either may mismatch
    // when logged in via the env fallback credentials
    let user = null;
    if (sess.id && sess.id !== "env-admin") {
      try { user = await prisma.user.findUnique({ where: { id: sess.id } }); } catch {}
    }
    if (!user) {
      try { user = await prisma.user.findUnique({ where: { email: sess.email } }); } catch {}
    }

    if (!user) {
      // env-fallback session (DB was unreachable at login, or ADMIN_EMAIL differs
      // from the seeded DB account): verify against the env admin password, then
      // create the database account so future logins use the DB.
      const adminEmail = process.env.ADMIN_EMAIL || "admin@afyadesk.com";
      const adminPass = process.env.ADMIN_PASSWORD || "Admin123!";
      const isEnvSession = sess.id === "env-admin" || sess.email === adminEmail;
      if (isEnvSession && currentPassword === adminPass) {
        try {
          const hash = await hashPassword(newPassword);
          user = await prisma.user.upsert({
            where: { email: sess.email },
            update: { password: hash },
            create: { email: sess.email, name: sess.name || "Admin", password: hash, role: sess.role === "STAFF" ? "STAFF" : "ADMIN" },
          });
          try {
            await prisma.activityLog.create({
              data: { action: "PASSWORD_CHANGED", entity: "User", entityId: user.id, metadata: { email: user.email } as any },
            });
          } catch {}
          return NextResponse.json({ success: true, migrated: true });
        } catch {
          return NextResponse.json({ error: "Database unavailable — password not changed." }, { status: 503 });
        }
      }
      return NextResponse.json({ error: `No database account for "${sess.email}". Log out and log in with the database admin email, or use the env admin current password to migrate it.` }, { status: 404 });
    }

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
