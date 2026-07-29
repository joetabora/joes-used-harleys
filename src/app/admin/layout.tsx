import Link from "next/link";
import { JoeOsNav } from "@/components/joeos/joe-os-nav";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="joeos">
      <div className="joeos-shell">
        <JoeOsNav variant="sidebar" email={session?.email} />
        <div className="joeos-main">
          <div className="joeos-main-inner">{children}</div>
        </div>
        <JoeOsNav variant="mobile" email={session?.email} />
      </div>
      {session ? (
        <div className="fixed bottom-[4.1rem] right-3 z-40 md:hidden">
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="joeos-btn joeos-btn-ghost text-[0.6rem]">
              Out
            </button>
          </form>
        </div>
      ) : (
        <div className="fixed bottom-[4.1rem] right-3 z-40 md:hidden">
          <Link href="/admin/login" className="joeos-btn joeos-btn-ghost text-[0.6rem]">
            In
          </Link>
        </div>
      )}
    </div>
  );
}
