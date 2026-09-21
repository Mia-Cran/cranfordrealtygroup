import { NextResponse } from "next/server";
import { passwordMatches, setAdminCookie } from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not set." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { password?: string };
  if (!body.password || !passwordMatches(body.password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
