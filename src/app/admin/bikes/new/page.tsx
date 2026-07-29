import { redirect } from "next/navigation";
import { requireAdminOrRedirect } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Add bike",
  description: "Inventory is synced — invent path disabled",
  path: "/admin/bikes/new",
  noIndex: true,
});

/** Manual invent path disabled — inventory comes from JoeOS sync. */
export default async function NewBikePage() {
  await requireAdminOrRedirect();
  redirect("/admin/sync");
}
