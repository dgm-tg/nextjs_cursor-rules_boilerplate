'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export function ChangeEmailForm() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/settings/email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change email');
      }

      // Update the session with the new email
      await update();
      
      toast.success('Email updated successfully');
      setCurrentPassword('');
      setNewEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to change email');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="current-email" className="text-sm font-medium leading-none">
          Current Email
        </label>
        <input
          id="current-email"
          type="email"
          value={session?.user?.email || ''}
          disabled
          className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="new-email" className="text-sm font-medium leading-none">
          New Email
        </label>
        <input
          id="new-email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="current-password" className="text-sm font-medium leading-none">
          Current Password
        </label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Email'}
      </Button>
    </form>
  );
}