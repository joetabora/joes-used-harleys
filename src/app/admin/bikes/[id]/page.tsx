import { notFound } from "next/navigation";
import { BikeEditorForm, BikePhotoForm } from "@/components/bike-editor-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdminOrRedirect } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Edit bike",
  description: "Edit inventory listing",
  path: "/admin/bikes",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditBikePage({ params }: Props) {
  await requireAdminOrRedirect();
  const { id } = await params;

  if (!isDatabaseConfigured() || !prisma) notFound();

  const bike = await prisma.bike.findUnique({
    where: { id },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });
  if (!bike) notFound();

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Edit bike</h1>
        <BikeEditorForm
          bike={{
            id: bike.id,
            title: bike.title,
            model: bike.model,
            year: bike.year,
            mileage: bike.mileage,
            price: bike.price,
            vin: bike.vin,
            description: bike.description,
            status: bike.status,
            slug: bike.slug,
          }}
        />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload images to Supabase Storage, then paste the public URL here. Direct multipart
              upload can be wired once Storage credentials are confirmed.
            </p>
            <BikePhotoForm bikeId={bike.id} />
            <ul className="space-y-2 text-sm">
              {bike.photos.map((photo) => (
                <li key={photo.id} className="truncate">
                  <a href={photo.url} className="underline" target="_blank" rel="noreferrer">
                    {photo.url}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
