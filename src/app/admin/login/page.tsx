import { AdminLoginForm } from "@/components/admin-login-form";
import { getAdminEnvStatus, getAdminSession } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
  title: "JoeOS Vault",
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
    <div className="jos-vault">
      <div className="jos-vault-panel jos-fade space-y-5">
        <div>
          <p className="jos-brand text-sm">Joe OS</p>
          <h1 className="jos-title mt-2 text-3xl">Vault lock</h1>
          <p className="jos-body mt-2 text-sm">Authorized access only.</p>
        </div>

        {!env.configured ? (
          <div className="space-y-2">
            <p className="jos-label text-[var(--jos-warn)]">Env incomplete</p>
            <ul className="jos-body list-disc space-y-1 pl-4 text-sm">
              {env.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="jos-data">Credentials configured on this deployment.</p>
        )}

        <AdminLoginForm />
      </div>
    </div>
  );
}
