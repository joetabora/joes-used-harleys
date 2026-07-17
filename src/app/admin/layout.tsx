import Link from "next/link";
import { adminLogout } from "@/actions/admin";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-b bg-muted/20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/admin" className="font-semibold">
            Admin
          </Link>
          <Link href="/admin/bikes" className="text-muted-foreground hover:text-foreground">
            Bikes
          </Link>
          <Link href="/admin/leads" className="text-muted-foreground hover:text-foreground">
            Leads
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            View site
          </Link>
        </div>
        <AdminSessionControls />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}

async function AdminSessionControls() {
  const session = await getAdminSession();
  if (!session) {
    return (
      <Link href="/admin/login" className={cn(buttonVariants({ size: "sm", variant: "outline" }))}>
        Sign in
      </Link>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await adminLogout();
      }}
    >
      <Button type="submit" size="sm" variant="outline">
        Sign out ({session.email})
      </Button>
    </form>
  );
}
