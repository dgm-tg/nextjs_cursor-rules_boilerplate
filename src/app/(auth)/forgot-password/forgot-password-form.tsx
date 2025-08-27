'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <p className="text-sm text-green-600">
          If an account exists with that email, we&apos;ve sent password reset instructions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="name@example.com"
          required
        />
      </div>
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send reset instructions'}
      </Button>
    </form>
  );
}