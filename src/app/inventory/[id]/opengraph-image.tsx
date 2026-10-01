import SiteOpenGraphImage from "@/app/opengraph-image";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";
import { publicAssetDataUrl, remoteImageDataUrl } from "@/lib/og-assets";
import { renderBikeShareImage } from "@/lib/og-bike";
import { pickShareImage } from "@/lib/og-image";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const alt = "Used Harley-Davidson for sale — Joe's Used Harleys";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 300;

export default async function BikeOpenGraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isDatabaseConfigured() || !prisma) return SiteOpenGraphImage();

  const bike = await prisma.bike.findUnique({
    where: { id },
    select: {
      year: true,
      make: true,
      model: true,
      price: true,
      mileage: true,
      status: true,
      hidden: true,
      photos: true,
      personalHeroImageUrl: true,
    },
  });
  if (!bike || bike.hidden || !["AVAILABLE", "PENDING"].includes(bike.status)) {
    return SiteOpenGraphImage();
  }

  const photoUrl = pickShareImage(bike);
  const [photo, logo] = await Promise.all([
    photoUrl ? remoteImageDataUrl(photoUrl) : Promise.resolve(null),
    publicAssetDataUrl("logo.png", "image/png"),
  ]);

  return renderBikeShareImage({
    label: bikeLabel(bike).toUpperCase(),
    price: formatPrice(bike.price),
    miles: formatMiles(bike.mileage),
    pending: bike.status === "PENDING",
    photo,
    logo,
  });
}
