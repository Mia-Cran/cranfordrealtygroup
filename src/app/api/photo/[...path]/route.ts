import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

// Serves listing photos stored in the private Vercel Blob store, e.g. /api/photo/listings/123-front.jpg
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const pathname = (await params).path.join("/");
  if (!pathname.startsWith("listings/") || pathname.includes("..")) {
    return new Response("Not found", { status: 404 });
  }
  const result = await get(pathname, { access: "private" }).catch(() => null);
  if (!result || result.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
