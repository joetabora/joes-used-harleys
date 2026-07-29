import { CommandShell } from "@/components/joeos/command-shell";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return <CommandShell email={session?.email}>{children}</CommandShell>;
}
