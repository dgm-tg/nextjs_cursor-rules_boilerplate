interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: {
      name: string | null;
      email: string | null;
    };
  };
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{announcement.title}</h3>
          <p className="text-sm text-muted-foreground">
            By {announcement.author.name || announcement.author.email} on{' '}
            {new Date(announcement.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-muted-foreground">{announcement.content}</p>
      </div>
    </div>
  );
}