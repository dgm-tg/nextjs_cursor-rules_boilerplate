import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/nav";
import { Toaster } from "react-hot-toast";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav user={session.user} />
      <div className="container flex-1 py-6">
        {children}
      </div>
      <Toaster />
    </div>
  );
}