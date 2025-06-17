'use client';

import { useState, useEffect, useCallback } from 'react';
import PageBuilder from './components/PageBuilder';
import Preview from './components/Preview';
import ExportPanel from './components/ExportPanel';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select, radio, checkbox
}

export interface FormSection {
  id: string;
  title: string;
  content: string;
  type: 'form';
  formFields: FormField[];
  recipientEmail: string;
  submitButtonText: string;
  successMessage: string;
}

export interface RegularSection {
  id: string;
  title: string;
  content: string;
  type: 'text';
}

export interface PageData {
  title: string;
  subtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroButtonUrl: string;
  heroBackgroundImage?: string;
  heroBackgroundPosition?: string;
  heroBackgroundAttachment?: string;
  heroBackgroundSize?: string;
  sections: (RegularSection | FormSection)[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export default function Home() {
  const [pageData, setPageData] = useState<PageData>({
    title: 'My Landing Page',
    subtitle: 'Generated with Single Page Generator',
    heroTitle: 'Welcome to Your Landing Page',
    heroDescription: 'Create beautiful, responsive landing pages in minutes',
    heroButtonText: 'Get Started',
    heroButtonUrl: '#contact',
    heroBackgroundPosition: 'center',
    heroBackgroundAttachment: 'scroll',
    heroBackgroundSize: 'cover',
    sections: [
      {
        id: 'about',
        title: 'About',
        content: 'Tell your story here. Describe what makes your product or service unique.',
        type: 'text'
      }
    ],
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    }
  });

  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'export'>('builder');
  const [showRestoreNotification, setShowRestoreNotification] = useState(false);

  // Wrap setPageData in useCallback to prevent unnecessary re-renders
  const stableSetPageData = useCallback((data: PageData) => {
    setPageData(data);
  }, []);

  // Check for autosaved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('pageBuilder-autosave');
    if (savedData && savedData !== 'null') {
      try {
        const parsedData = JSON.parse(savedData);
        // Check if there's meaningful saved data (not just the default structure)
        if (parsedData.title && (parsedData.title !== 'My Landing Page' || parsedData.sections.length > 3)) {
          setShowRestoreNotification(true);
        }
      } catch (error) {
        console.warn('Failed to parse autosaved data:', error);
        localStorage.removeItem('pageBuilder-autosave');
      }
    }
  }, []); // Only run once on mount

  const restoreAutosavedData = () => {
    const savedData = localStorage.getItem('pageBuilder-autosave');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        stableSetPageData(parsedData);
        setShowRestoreNotification(false);
      } catch (error) {
        console.error('Failed to restore data:', error);
        alert('Failed to restore autosaved data. Starting fresh.');
        localStorage.removeItem('pageBuilder-autosave');
        setShowRestoreNotification(false);
      }
    }
  };

  const dismissRestoreNotification = () => {
    setShowRestoreNotification(false);
    localStorage.removeItem('pageBuilder-autosave');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Restore Notification */}
      {showRestoreNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-md">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                💾
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                Autosaved work found
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                We found some unsaved work from your previous session. Would you like to restore it?
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={restoreAutosavedData}
                  className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                >
                  Restore
                </button>
                <button
                  onClick={dismissRestoreNotification}
                  className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-400"
                >
                  Start Fresh
                </button>
              </div>
            </div>
            <button
              onClick={dismissRestoreNotification}
              className="flex-shrink-0 text-blue-400 hover:text-blue-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Single Page Generator</h1>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'builder'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Builder
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'preview'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'export'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Export
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'builder' && (
          <PageBuilder pageData={pageData} setPageData={stableSetPageData} />
        )}
        {activeTab === 'preview' && (
          <Preview pageData={pageData} />
        )}
        {activeTab === 'export' && (
          <ExportPanel pageData={pageData} />
        )}
      </main>
    </div>
  );
}
