'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner, LoadingOverlay } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/contexts/ToastContext';
import { useState } from 'react';

export default function FeedbackExamplesPage() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const simulateError = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Feedback Components</h1>
      <p className="text-muted-foreground">
        Examples of various feedback components available in the application.
      </p>

      {/* Toast Examples */}
      <Card>
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Toast Notifications</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() =>
                showToast({
                  title: 'Success',
                  description: 'Operation completed successfully',
                  variant: 'success',
                })
              }
            >
              Show Success Toast
            </Button>
            <Button
              onClick={() =>
                showToast({
                  title: 'Error',
                  description: 'Something went wrong',
                  variant: 'error',
                })
              }
              variant="destructive"
            >
              Show Error Toast
            </Button>
            <Button
              onClick={() =>
                showToast({
                  title: 'Warning',
                  description: 'Please review your input',
                  variant: 'warning',
                })
              }
              variant="outline"
            >
              Show Warning Toast
            </Button>
            <Button
              onClick={() =>
                showToast({
                  title: 'Info',
                  description: 'New features are available',
                  variant: 'info',
                })
              }
              variant="secondary"
            >
              Show Info Toast
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal Example */}
      <Card>
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Modal Dialog</h2>
          <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            description="This is an example modal dialog with a title and description."
          >
            <div className="mt-6 space-y-4">
              <p>
                Modal content goes here. The modal supports different sizes, animations, and
                accessibility features.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
              </div>
            </div>
          </Modal>
        </div>
      </Card>

      {/* Loading States */}
      <Card>
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Loading States</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-4">
                <LoadingSpinner size="sm" />
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              <div className="flex items-center gap-4">
                <LoadingSpinner size="md" variant="primary" />
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-4">
                <LoadingSpinner size="lg" variant="secondary" />
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
            </div>

            <div className="relative min-h-[200px] rounded-lg border">
              <LoadingOverlay show={isLoading} message="Loading content..." />
              <div className="flex items-center justify-center p-8">
                <Button onClick={simulateLoading}>Simulate Loading Overlay</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Error States */}
      <Card>
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Error States</h2>
          <div className="space-y-6">
            <div className="relative min-h-[200px] rounded-lg border">
              {showError ? (
                <ErrorState
                  title="Example Error"
                  description="This is an example error state with retry functionality."
                  error={new Error('Something went wrong')}
                  onRetry={() => setShowError(false)}
                  showError
                />
              ) : (
                <div className="flex items-center justify-center p-8">
                  <Button onClick={simulateError}>Simulate Error State</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
