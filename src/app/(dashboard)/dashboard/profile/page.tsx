import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./profile-form";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and settings
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}