import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AnnouncementList } from "./announcement-list";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function AnnouncementsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMINISTRATOR" && session.user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">
            Manage and create announcements for members
          </p>
        </div>
        <Link href="/dashboard/announcements/new">
          <Button>Create Announcement</Button>
        </Link>
      </div>

      <AnnouncementList announcements={announcements} />
    </div>
  );
}