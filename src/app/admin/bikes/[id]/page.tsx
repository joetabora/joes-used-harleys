import { notFound } from "next/navigation";
import { BikeEditorForm } from "@/components/bike-editor-form";
import { requireAdminOrRedirect } from "@/lib/auth";
import { bikeLabel } from "@/lib/format";
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

  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Edit {bikeLabel(bike)}</h1>
      <BikeEditorForm
        bike={{
          id: bike.id,
          year: bike.year,
          make: bike.make,
          model: bike.model,
          mileage: bike.mileage,
          price: bike.price,
          description: bike.description,
          status: bike.status,
          photos: bike.photos,
        }}
      />
    </div>
  );
}
