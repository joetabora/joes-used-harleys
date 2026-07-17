import { BikeEditorForm } from "@/components/bike-editor-form";
import { requireAdminOrRedirect } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Add bike",
  description: "Create inventory listing",
  path: "/admin/bikes/new",
  noIndex: true,
});

export default async function NewBikePage() {
  await requireAdminOrRedirect();
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Add bike</h1>
      <BikeEditorForm />
    </div>
  );
}
