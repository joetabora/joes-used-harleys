import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function ogFonts() {
  const oswaldBold = await readFile(join(process.cwd(), "assets/fonts/Oswald-Bold.ttf"));
  return [{ name: "Oswald", data: oswaldBold, style: "normal" as const, weight: 700 as const }];
}

export async function publicAssetDataUrl(file: string, mime: string): Promise<string> {
  const data = await readFile(join(process.cwd(), "public", file), "base64");
  return `data:${mime};base64,${data}`;
}

/** Fetches a remote image as a data URL so a slow or broken CDN can't fail the whole render. */
export async function remoteImageDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const mime = res.headers.get("content-type")?.split(";")[0] ?? "image/jpeg";
    if (!/^image\/(jpeg|png|gif)$/.test(mime)) return null;
    const data = Buffer.from(await res.arrayBuffer()).toString("base64");
    return `data:${mime};base64,${data}`;
  } catch {
    return null;
  }
}
