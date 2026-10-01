/** next/og (Satori) can only decode PNG, JPEG, and GIF; WebP/AVIF fail to render. */
const SHAREABLE_IMAGE = /\.(jpe?g|png|gif)(\?.*)?$/i;

export function isShareableImageUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && SHAREABLE_IMAGE.test(parsed.pathname);
  } catch {
    return false;
  }
}

/** Joe's own hero photo wins when renderable; otherwise the first renderable feed photo. */
export function pickShareImage(bike: {
  personalHeroImageUrl: string | null;
  photos: string[];
}): string | null {
  if (isShareableImageUrl(bike.personalHeroImageUrl)) return bike.personalHeroImageUrl;
  return bike.photos.find(isShareableImageUrl) ?? null;
}
