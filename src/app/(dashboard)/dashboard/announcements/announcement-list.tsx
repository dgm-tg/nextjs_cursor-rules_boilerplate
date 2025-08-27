'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string | null;
    email: string | null;
  };
}

interface AnnouncementListProps {
  announcements: Announcement[];
}

export function AnnouncementList({ announcements: initialAnnouncements }: AnnouncementListProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete announcement');
      }

      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      toast.success('Announcement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete announcement');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  By {announcement.author.name || announcement.author.email} on{' '}
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleDelete(announcement.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">{announcement.content}</p>
          </div>
        </div>
      ))}
      {announcements.length === 0 && (
        <p className="text-center text-muted-foreground">
          No announcements found.
        </p>
      )}
    </div>
  );
}