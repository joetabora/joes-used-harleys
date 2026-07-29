import { AdminLoginForm } from "@/components/admin-login-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminEnvStatus, getAdminSession } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
  title: "Admin login",
  description: "Admin sign-in",
  path: "/admin/login",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  const env = getAdminEnvStatus();

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Admin sign in</h1>

      {!env.configured ? (
        <PlaceholderNotice title="Admin env incomplete on this deployment">
          <ul className="mt-2 list-disc space-y-1 pl-4">
            {env.issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
          <p className="mt-3">
            In Vercel → Settings → Environment Variables, set these for{" "}
            <strong>Production</strong>, then <strong>Redeploy</strong> (env changes do not
            apply to an already-running deployment).
          </p>
        </PlaceholderNotice>
      ) : (
        <p className="text-sm text-muted-foreground">
          Admin env looks configured on this deployment (email / password / session secret
          present).
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
