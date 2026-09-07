import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

// Public endpoint for job application resume uploads (no auth)
// Restricted to PDF/DOC/DOCX/images, max 10MB
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file selected" }, { status: 400 });

    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large — max 10MB" }, { status: 400 });

    const allowedMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    const extAllowed = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "webp"];

    if (!allowedMime.includes(file.type) && !extAllowed.includes(ext)) {
      return NextResponse.json({ error: "Only PDF, DOC, DOCX, JPG, PNG, WEBP allowed" }, { status: 400 });
    }
    const safeExt = extAllowed.includes(ext) ? ext : file.type === "application/pdf" ? "pdf" : "pdf";
    const name = `resume-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${safeExt}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`uploads/${name}`, file, { access: "public" });
        return NextResponse.json({ url: blob.url });
      } catch (blobErr: any) {
        console.error("Blob resume upload failed, falling back to filesystem:", blobErr.message);
      }
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let uploadDir = path.join(process.cwd(), "public", "uploads");
    let filePath = path.join(uploadDir, name);
    try {
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filePath, buffer);
    } catch (err: any) {
      if (err?.code === "EROFS" || process.env.VERCEL) {
        const tmpDir = path.join("/tmp", "uploads");
        await mkdir(tmpDir, { recursive: true });
        filePath = path.join(tmpDir, name);
        await writeFile(filePath, buffer);
        console.warn("Resume upload saved to /tmp (ephemeral on Vercel) — configure BLOB_READ_WRITE_TOKEN:", filePath);
      } else {
        throw err;
      }
    }

    const url = `/uploads/${name}`;
    return NextResponse.json({ url });
  } catch (e: any) {
    const msg = e.message?.includes("EROFS") ? "Upload failed: read-only filesystem on Vercel. Configure Vercel Blob Storage (BLOB_READ_WRITE_TOKEN)." : e.message || "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
