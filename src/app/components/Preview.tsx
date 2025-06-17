'use client';

import { useState, useEffect } from 'react';
import { PageData, FormSection } from '../page';
import { generateHTML, generateCSS, generateJS } from '../../../utils/htmlGenerator';

interface PreviewProps {
  pageData: PageData;
}

export default function Preview({ pageData }: PreviewProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load Google Fonts dynamically when font selections change
  useEffect(() => {
    // Remove existing font links to avoid duplicates
    const existingFontLinks = document.querySelectorAll('link[data-font-preview]');
    existingFontLinks.forEach(link => link.remove());

    // Create Google Fonts URL
    const headingFont = pageData.fonts.heading.replace(' ', '+');
    const bodyFont = pageData.fonts.body.replace(' ', '+');
    
    // Only add if fonts are different to avoid duplicate requests
    const fontsToLoad = new Set([headingFont, bodyFont]);
    const fontParams = Array.from(fontsToLoad).map(font => `family=${font}:wght@400;500;600;700`).join('&');
    const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;

    // Add the font link
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = googleFontsUrl;
    fontLink.setAttribute('data-font-preview', 'true'); // Mark for easy removal
    document.head.appendChild(fontLink);

    return () => {
      // Cleanup on unmount
      const fontLinks = document.querySelectorAll('link[data-font-preview]');
      fontLinks.forEach(link => link.remove());
    };
  }, [pageData.fonts.heading, pageData.fonts.body]);

  // Load FormPersistence.js from CDN
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/FThompson/FormPersistence.js@2.0.6/form-persistence.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize autosave for all forms after script loads
      const forms = document.querySelectorAll('.preview-form');
      forms.forEach((form) => {
        // @ts-expect-error - FormPersistence is loaded from CDN
        if (window.FormPersistence && form.id) {
          // @ts-expect-error - FormPersistence is loaded from CDN
          window.FormPersistence.persist(form, {
            uuid: `preview-${form.id}`,
            saveOnSubmit: false, // Don't clear on submit since it's a preview
            useSessionStorage: true // Use session storage for preview
          });
        }
      });
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [pageData.sections]);

  const generateNavigation = () => {
    return pageData.sections.map((section) => ({
      id: section.id,
      title: section.title,
      href: `#section-${section.id}`
    }));
  };

  const renderSection = (section: { id: string; title: string; content: string; type: string }) => {
    switch (section.type) {
      case 'form':
        const formSection = section as unknown as FormSection;
        return (
          <div className="max-w-md mx-auto">
            {formSection.content && (
              <p className="mb-6 text-center" style={{ color: pageData.colors.text }}>
                {formSection.content}
              </p>
            )}
            <form 
              className="space-y-4 preview-form"
              id={`form-${section.id}`}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
                
                // Collect form data
                formSection.formFields.forEach(field => {
                  if (field.type === 'checkbox') {
                    const values = formData.getAll(field.id);
                    data[field.label] = values;
                  } else if (field.type === 'file') {
                    const file = formData.get(field.id) as File;
                    data[field.label] = file ? file.name : '';
                  } else {
                    const value = formData.get(field.id);
                    data[field.label] = value || '';
                  }
                });

                try {
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      to: formSection.recipientEmail,
                      subject: `Form submission from ${pageData.title}`,
                      formData: data,
                      pageTitle: pageData.title
                    }),
                  });

                  if (response.ok) {
                    alert(formSection.successMessage);
                    (e.target as HTMLFormElement).reset();
                  } else {
                    alert('Sorry, there was an error sending your form. Please try again.');
                  }
                } catch (error) {
                  console.error('Form submission error:', error);
                  alert('Sorry, there was an error sending your form. Please try again.');
                }
              }}
            >
              {formSection.formFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium mb-2" style={{ color: pageData.colors.text }}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {field.type === 'email' && (
                    <input
                      type="email"
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {field.type === 'tel' && (
                    <input
                      type="tel"
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  
                  {field.type === 'select' && (
                    <select
                      name={field.id}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {field.type === 'radio' && (
                    <div className="space-y-2">
                      {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name={field.id}
                            value={option}
                            required={field.required}
                            className="mr-2"
                          />
                          <span style={{ color: pageData.colors.text }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'checkbox' && (
                    <div className="space-y-2">
                      {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            name={field.id}
                            value={option}
                            className="mr-2"
                          />
                          <span style={{ color: pageData.colors.text }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'file' && (
                    <input
                      type="file"
                      name={field.id}
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
              
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: pageData.colors.primary }}
              >
                {formSection.submitButtonText}
              </button>
            </form>
          </div>
        );
      

      
      default:
        return (
          <div className="prose max-w-none">
            <p style={{ color: pageData.colors.text }}>
              {section.content}
            </p>
          </div>
        );
    }
  };

  const generateFullHTML = () => {
    // Create full HTML with inline CSS and JS for preview window
    const html = generateHTML(pageData);
    const css = generateCSS(pageData);
    const js = generateJS(pageData);
    
    // Replace external file references with inline content
    return html
      .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
      .replace('<script src="script.js"></script>', `<script>${js}</script>`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Preview Header */}
      <div className="bg-gray-100 px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-500 ml-4">Preview</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="h-96 overflow-y-auto">
        <div style={{ backgroundColor: pageData.colors.background, fontFamily: pageData.fonts.body }}>
          {/* Navigation */}
          <nav className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: pageData.colors.background }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-xl font-bold" 
                    style={{ color: pageData.colors.text, fontFamily: pageData.fonts.heading }}>
                  {pageData.title}
                </h1>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6">
                  {generateNavigation().map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="hover:opacity-70 transition-opacity"
                      style={{ color: pageData.colors.text }}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-md"
                  style={{ color: pageData.colors.text }}
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Offcanvas Menu */}
            <div
              className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              
              {/* Menu Panel */}
              <div
                className={`absolute right-0 top-0 h-full w-80 max-w-sm transform transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ backgroundColor: pageData.colors.background }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold" style={{ color: pageData.colors.text }}>
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-md"
                      style={{ color: pageData.colors.text }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 px-4 py-6">
                    <nav className="space-y-4">
                      {generateNavigation().map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 px-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
                          style={{ color: pageData.colors.text }}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section 
            className="py-20 px-4 text-center relative bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundColor: pageData.colors.background,
              ...(pageData.heroBackgroundImage && {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${pageData.heroBackgroundImage})`,
                backgroundPosition: pageData.heroBackgroundPosition || 'center',
                backgroundAttachment: pageData.heroBackgroundAttachment || 'scroll',
                backgroundSize: pageData.heroBackgroundSize || 'cover',
                color: 'white'
              })
            }}
          >
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6"
                  style={{ 
                    color: pageData.heroBackgroundImage ? 'white' : pageData.colors.text, 
                    fontFamily: pageData.fonts.heading,
                    textShadow: pageData.heroBackgroundImage ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none'
                  }}>
                {pageData.heroTitle}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto"
                 style={{ 
                   color: pageData.heroBackgroundImage ? 'white' : pageData.colors.text,
                   textShadow: pageData.heroBackgroundImage ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
                 }}>
                {pageData.heroDescription}
              </p>
              <a
                href={pageData.heroButtonUrl}
                className="inline-block py-3 px-8 rounded-lg text-white font-medium text-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: pageData.colors.primary }}
              >
                {pageData.heroButtonText}
              </a>
            </div>
          </section>

          {/* Dynamic Sections */}
          {pageData.sections.map((section) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="py-16 px-4"
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12"
                    style={{ color: pageData.colors.text, fontFamily: pageData.fonts.heading }}>
                  {section.title}
                </h2>
                {renderSection(section)}
              </div>
            </section>
          ))}

          {/* Footer */}
          <footer className="py-8 px-4 border-t border-gray-200">
            <div className="max-w-6xl mx-auto text-center">
              <p style={{ color: pageData.colors.text }}>
                © {new Date().getFullYear()} {pageData.title}. {pageData.subtitle}
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Full Screen Preview Button */}
      <div className="p-4 bg-gray-50 border-t">
        <button
          onClick={() => {
            const newWindow = window.open('', '_blank');
            if (newWindow) {
              newWindow.document.write(generateFullHTML());
              newWindow.document.close();
            }
          }}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Open Full Preview
        </button>
      </div>
    </div>
  );
} 