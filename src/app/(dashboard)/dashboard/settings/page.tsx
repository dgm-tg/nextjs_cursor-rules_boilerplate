import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ChangeEmailForm } from "./change-email-form";
import { ChangePasswordForm } from "./change-password-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and security preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Email Settings</h2>
          <ChangeEmailForm />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Password Settings</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}