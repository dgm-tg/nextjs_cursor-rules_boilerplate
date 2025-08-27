'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Profile', href: '/dashboard/profile' },
    { name: 'Settings', href: '/dashboard/settings' },
    ...(user.role === 'ADMINISTRATOR' || user.role === 'MANAGER'
      ? [{ name: 'Announcements', href: '/dashboard/announcements' }]
      : []),
    ...(user.role === 'ADMINISTRATOR'
      ? [{ name: 'Users', href: '/dashboard/users' }]
      : []),
  ];

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-semibold">
            Membership App
          </Link>
          <div className="flex gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  pathname === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {user.name || user.email}
          </span>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}