'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ProfileFormProps {
  profile: {
    id: string;
    bio: string | null;
    imageUrl: string | null;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.imageUrl);
  const [bio, setBio] = useState(profile.bio || '');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setImageUrl(data.url);
      toast.success('Profile picture updated');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none">
            Profile Picture
          </label>
          <div className="mt-2 flex items-center gap-4">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-muted" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none"
          >
            Name
          </label>
          <input
            id="name"
            value={profile.user.name || ''}
            disabled
            className="mt-2 flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none"
          >
            Email
          </label>
          <input
            id="email"
            value={profile.user.email || ''}
            disabled
            className="mt-2 flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="text-sm font-medium leading-none"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-2 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save changes'}
      </Button>
    </form>
  );
}