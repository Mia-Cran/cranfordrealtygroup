import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose a photo." }, { status: 400 });
  }
  if (!allowed.has(file.type)) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, or WebP photo." },
      { status: 400 },
    );
  }
  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Keep photos under 6 MB." },
      { status: 400 },
    );
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const safe = `${Date.now()}-${file.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`listings/${safe}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  }

  const folder = path.join(process.cwd(), "public/listings");
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, safe), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/listings/${safe}` });
}
