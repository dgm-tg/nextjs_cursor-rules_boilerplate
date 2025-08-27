import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AnnouncementCard } from "@/components/dashboard/announcement-card";

export default async function DashboardPage() {
  const session = await auth();
  
  const announcements = await prisma.announcement.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
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
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening in your membership
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 grid gap-4">
          <h2 className="text-2xl font-semibold">Latest Announcements</h2>
          {announcements.length > 0 ? (
            <div className="grid gap-4">
              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No announcements yet.</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Stats</h2>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 space-y-2">
              <p className="text-sm font-medium">Member since</p>
              <p className="text-2xl font-bold">
                {new Date(session?.user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 space-y-2">
              <p className="text-sm font-medium">Membership Status</p>
              <p className="text-2xl font-bold capitalize">
                {session?.user?.role?.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}