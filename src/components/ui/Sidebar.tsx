'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/utils/cn';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Reports', href: '/reports' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', href: '/profile' },
      { label: 'Billing', href: '/billing' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'API Reference', href: '/api' },
    ],
  },
];

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sidebarSections.map(section => section.title)
  );

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <Logo showText={!isCollapsed} />
        {onToggle && (
          <button
            onClick={onToggle}
            className="ml-auto rounded-lg p-2 hover:bg-accent"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={cn(
                'h-4 w-4 transform transition-transform',
                isCollapsed ? 'rotate-180' : 'rotate-0'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {sidebarSections.map(section => (
          <div key={section.title} className="py-2">
            {!isCollapsed && (
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {section.title}
                <svg
                  className={cn(
                    'h-4 w-4 transform transition-transform',
                    expandedSections.includes(section.title) ? 'rotate-0' : '-rotate-90'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
            <div
              className={cn(
                'space-y-1',
                isCollapsed
                  ? 'block'
                  : expandedSections.includes(section.title)
                    ? 'block'
                    : 'hidden'
              )}
            >
              {section.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                    isCollapsed && 'justify-center'
                  )}
                >
                  {item.icon && (
                    <span className={cn('mr-3', isCollapsed && 'mr-0')}>{item.icon}</span>
                  )}
                  {!isCollapsed && item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-accent" />
            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
