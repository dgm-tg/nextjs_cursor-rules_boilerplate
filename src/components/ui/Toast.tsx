'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
  className?: string;
}

const variants = {
  default: 'bg-background text-foreground',
  success: 'bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50',
  error: 'bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50',
  warning: 'bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50',
  info: 'bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50',
};

const icons = {
  success: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  default: null,
};

export function Toast({
  id,
  title,
  description,
  variant = 'default',
  duration = 5000,
  onClose,
  className,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  if (!isVisible) return null;

  const toast = (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        'animate-in slide-in-from-right duration-300',
        variants[variant],
        !isVisible && 'animate-out fade-out slide-out-to-right duration-300',
        className
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {icons[variant] && <div className="flex-shrink-0">{icons[variant]}</div>}
        <div className="flex-1">
          {title && <div className="font-medium leading-none tracking-tight">{title}</div>}
          {description && <div className="mt-1 text-sm opacity-90">{description}</div>}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="flex-shrink-0 rounded-md p-1.5 opacity-70 hover:opacity-100"
          aria-label="Close toast"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return createPortal(toast, document.body);
}

interface ToastContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ToastContainer({ children, className }: ToastContainerProps) {
  return (
    <div className={cn('fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-2', className)}>
      {children}
    </div>
  );
}
