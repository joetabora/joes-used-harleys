import { AdminLoginForm } from "@/components/admin-login-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSession, isAdminEnvConfigured } from "@/lib/auth";
import { createMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
  title: "Admin login",
  description: "Admin sign-in",
  path: "/admin/login",
  noIndex: true,
});

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Admin sign in</h1>
      {!isAdminEnvConfigured() ? (
        <PlaceholderNotice title="Configure admin env first">
          Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET (16+ chars) in .env.local.
        </PlaceholderNotice>
      ) : null}
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
