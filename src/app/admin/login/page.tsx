import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminEnvStatus, getAdminSession } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
  title: "JoeOS Login",
  description: "JoeOS sign-in",
  path: "/admin/login",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  const env = getAdminEnvStatus();

  return (
    <div className="mx-auto max-w-md space-y-6 joeos-fade-in">
      <div>
        <p className="joeos-label text-[var(--joeos-orange)]">Joe OS</p>
        <h1 className="joeos-heading mt-2 text-3xl">Sign in</h1>
        <p className="joeos-body mt-2">Sales command center — authorized access only.</p>
      </div>

      {!env.configured ? (
        <div className="joeos-panel p-4 space-y-2">
          <p className="joeos-label text-[var(--joeos-warn)]">Env incomplete</p>
          <ul className="joeos-body list-disc space-y-1 pl-4 text-sm">
            {env.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
          <p className="joeos-body text-sm">
            Set Production env vars on Vercel, then redeploy.
          </p>
        </div>
      ) : (
        <p className="joeos-data">Credentials configured on this deployment.</p>
      )}

      <div className="joeos-panel p-5">
        <p className="joeos-label mb-4">Credentials</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
