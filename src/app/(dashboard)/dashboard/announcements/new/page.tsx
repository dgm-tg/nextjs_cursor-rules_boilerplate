import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AnnouncementForm } from "./announcement-form";

export default async function NewAnnouncementPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMINISTRATOR" && session.user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Announcement</h1>
        <p className="text-muted-foreground">
          Create a new announcement for members
        </p>
      </div>

      <AnnouncementForm />
    </div>
  );
}