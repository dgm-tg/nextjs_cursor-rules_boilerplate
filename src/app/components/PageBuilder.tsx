'use client';

import { useState, useEffect, useRef } from 'react';
import { PageData, FormField, FormSection, RegularSection } from '../page';

interface PageBuilderProps {
  pageData: PageData;
  setPageData: (data: PageData) => void;
}

export default function PageBuilder({ pageData, setPageData }: PageBuilderProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const hasMountedRef = useRef(false);

  // Save pageData to localStorage whenever it changes
  useEffect(() => {
    setSaveStatus('saving');
    const saveTimer = setTimeout(() => {
      try {
        localStorage.setItem('pageBuilder-autosave', JSON.stringify(pageData));
        setSaveStatus('saved');
      } catch (error) {
        console.error('Failed to save:', error);
        setSaveStatus('error');
      }
    }, 1000); // Debounce saves by 1 second

    return () => clearTimeout(saveTimer);
  }, [pageData]);

  // Load saved pageData on component mount
  useEffect(() => {
    if (hasMountedRef.current) return; // Only run once
    hasMountedRef.current = true;
    
    const savedData = localStorage.getItem('pageBuilder-autosave');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setPageData(parsedData);
      } catch (error) {
        console.warn('Failed to load autosaved data:', error);
      }
    }
  }, [setPageData]);

  const updatePageData = (field: keyof PageData, value: string) => {
    setPageData({ ...pageData, [field]: value });
  };

  const updateColors = (color: string, value: string) => {
    setPageData({
      ...pageData,
      colors: { ...pageData.colors, [color]: value }
    });
  };

  const updateSection = (sectionId: string, field: string, value: string | FormField[]) => {
    const updatedSections = pageData.sections.map(section =>
      section.id === sectionId ? { ...section, [field]: value } : section
    );
    setPageData({ ...pageData, sections: updatedSections });
  };

  const updateFormField = (sectionId: string, fieldId: string, field: keyof FormField, value: string | boolean | string[]) => {
    const updatedSections = pageData.sections.map(section => {
      if (section.id === sectionId && section.type === 'form') {
        const updatedFields = section.formFields.map(formField =>
          formField.id === fieldId ? { ...formField, [field]: value } : formField
        );
        return { ...section, formFields: updatedFields };
      }
      return section;
    });
    setPageData({ ...pageData, sections: updatedSections });
  };

  const addFormField = (sectionId: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false,
      options: []
    };
    
    const updatedSections = pageData.sections.map(section => {
      if (section.id === sectionId && section.type === 'form') {
        return { ...section, formFields: [...section.formFields, newField] };
      }
      return section;
    });
    setPageData({ ...pageData, sections: updatedSections });
  };

  const removeFormField = (sectionId: string, fieldId: string) => {
    const updatedSections = pageData.sections.map(section => {
      if (section.id === sectionId && section.type === 'form') {
        return { ...section, formFields: section.formFields.filter(field => field.id !== fieldId) };
      }
      return section;
    });
    setPageData({ ...pageData, sections: updatedSections });
  };

  const addSection = () => {
    // Generate a more user-friendly default ID
    const sectionNumber = pageData.sections.length + 1;
    const baseId = `section-${sectionNumber}`;
    
    // Ensure the ID is unique
    let uniqueId = baseId;
    let counter = 1;
    while (pageData.sections.some(s => s.id === uniqueId)) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }
    
    const newSection: RegularSection = {
      id: uniqueId,
      title: 'New Section',
      content: 'Add your content here...',
      type: 'text'
    };
    setPageData({
      ...pageData,
      sections: [...pageData.sections, newSection]
    });
  };

  const removeSection = (sectionId: string) => {
    const updatedSections = pageData.sections.filter(section => section.id !== sectionId);
    setPageData({ ...pageData, sections: updatedSections });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6 sticky top-8">
          <h2 className="text-lg font-semibold mb-4">Customize</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('hero')}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'hero'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Hero Section
            </button>
            <button
              onClick={() => setActiveSection('sections')}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'sections'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveSection('colors')}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'colors'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Colors & Fonts
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeSection === 'settings'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow p-6">
          
          {/* Autosave Status */}
          <div className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div className="text-sm flex items-center gap-2">
              {saveStatus === 'saved' && <span className="text-green-600">✅ Your work is automatically saved</span>}
              {saveStatus === 'saving' && <span className="text-blue-600">💾 Saving...</span>}
              {saveStatus === 'error' && <span className="text-red-600">❌ Save failed</span>}
            </div>
            <button
              onClick={() => {
                if (confirm('This will clear your current work and restart. Are you sure?')) {
                  localStorage.removeItem('pageBuilder-autosave');
                  window.location.reload();
                }
              }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Clear autosave & restart
            </button>
          </div>

          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Hero Section</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={pageData.heroTitle}
                  onChange={(e) => updatePageData('heroTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Description
                </label>
                <textarea
                  value={pageData.heroDescription}
                  onChange={(e) => updatePageData('heroDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={pageData.heroButtonText}
                    onChange={(e) => updatePageData('heroButtonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={pageData.heroButtonUrl}
                    onChange={(e) => updatePageData('heroButtonUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          updatePageData('heroBackgroundImage', result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  
                  {pageData.heroBackgroundImage && (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pageData.heroBackgroundImage}
                        alt="Hero background preview"
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <button
                        onClick={() => updatePageData('heroBackgroundImage', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        title="Remove background image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <input
                    type="url"
                    placeholder="Or enter image URL..."
                    value={pageData.heroBackgroundImage && !pageData.heroBackgroundImage.startsWith('data:') ? pageData.heroBackgroundImage : ''}
                    onChange={(e) => updatePageData('heroBackgroundImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <p className="text-xs text-gray-500">
                    Upload an image file or enter an image URL. Recommended size: 1920x1080px or larger.
                  </p>
                </div>

                {/* Background Image Settings */}
                {pageData.heroBackgroundImage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
                      Background Settings
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Position
                        </label>
                        <select
                          value={pageData.heroBackgroundPosition || 'center'}
                          onChange={(e) => updatePageData('heroBackgroundPosition', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="top left">Top Left</option>
                          <option value="top right">Top Right</option>
                          <option value="bottom left">Bottom Left</option>
                          <option value="bottom right">Bottom Right</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Size
                        </label>
                        <select
                          value={pageData.heroBackgroundSize || 'cover'}
                          onChange={(e) => updatePageData('heroBackgroundSize', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="auto">Auto</option>
                          <option value="100% 100%">Stretch</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Attachment
                        </label>
                        <select
                          value={pageData.heroBackgroundAttachment || 'scroll'}
                          onChange={(e) => updatePageData('heroBackgroundAttachment', e.target.value)}
                          className="w-full px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="scroll">Scroll</option>
                          <option value="fixed">Fixed</option>
                          <option value="local">Local</option>
                        </select>
                      </div>
                    </div>
                                                              <p className="text-xs text-gray-500 mt-2">
                       Adjust how your background image is positioned, sized, and behaves when scrolling.
                     </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sections */}
          {activeSection === 'sections' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Page Sections</h3>
                <button
                  onClick={addSection}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Section
                </button>
              </div>

              {pageData.sections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Section {index + 1}</h4>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section ID
                        <span className="text-xs text-gray-500 ml-2">(used for anchor links and navigation)</span>
                      </label>
                      <input
                        type="text"
                        value={section.id}
                        onChange={(e) => {
                          const newId = e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''); // Only allow alphanumeric, hyphens, and underscores
                          if (newId && !pageData.sections.some(s => s.id === newId && s.id !== section.id)) {
                            // Update the section ID if it's unique
                            const updatedSections = pageData.sections.map(s =>
                              s.id === section.id ? { ...s, id: newId } : s
                            );
                            setPageData({ ...pageData, sections: updatedSections });
                          } else if (newId === '') {
                            // Allow clearing the field but don't update until a valid ID is entered
                            const updatedSections = pageData.sections.map(s =>
                              s.id === section.id ? { ...s, id: newId } : s
                            );
                            setPageData({ ...pageData, sections: updatedSections });
                          }
                        }}
                        onBlur={(e) => {
                          // If the field is empty on blur, generate a new default ID
                          if (!e.target.value.trim()) {
                            const newId = `section-${Date.now()}`;
                            const updatedSections = pageData.sections.map(s =>
                              s.id === section.id ? { ...s, id: newId } : s
                            );
                            setPageData({ ...pageData, sections: updatedSections });
                          }
                        }}
                        placeholder="section-id"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !section.id || pageData.sections.filter(s => s.id === section.id).length > 1
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {!section.id && (
                        <p className="text-xs text-red-500 mt-1">Section ID is required</p>
                      )}
                      {section.id && pageData.sections.filter(s => s.id === section.id).length > 1 && (
                        <p className="text-xs text-red-500 mt-1">Section ID must be unique</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Only letters, numbers, hyphens, and underscores allowed. Used for #section-{section.id} links.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Type
                      </label>
                      <select
                        value={section.type}
                        onChange={(e) => {
                          const newType = e.target.value as 'text' | 'form';
                          if (newType === 'form') {
                            // Convert to form section
                            const formSection: FormSection = {
                              id: section.id,
                              title: section.title,
                              content: section.content,
                              type: 'form',
                              formFields: [],
                              recipientEmail: '',
                              submitButtonText: 'Submit',
                              successMessage: 'Thank you! Your form has been submitted successfully.'
                            };
                            const updatedSections = pageData.sections.map(s =>
                              s.id === section.id ? formSection : s
                            );
                            setPageData({ ...pageData, sections: updatedSections });
                          } else {
                            updateSection(section.id, 'type', newType);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="text">Text</option>
                        <option value="form">Form</option>
                      </select>
                    </div>

                    {section.type !== 'form' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content
                        </label>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {/* Form Builder UI */}
                    {section.type === 'form' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Form Description
                          </label>
                          <textarea
                            value={section.content}
                            onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                            rows={3}
                            placeholder="Describe your form purpose..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Recipient Email
                            </label>
                            <input
                              type="email"
                              value={(section as FormSection).recipientEmail}
                              onChange={(e) => updateSection(section.id, 'recipientEmail', e.target.value)}
                              placeholder="admin@example.com"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Submit Button Text
                            </label>
                            <input
                              type="text"
                              value={(section as FormSection).submitButtonText}
                              onChange={(e) => updateSection(section.id, 'submitButtonText', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Success Message
                          </label>
                          <input
                            type="text"
                            value={(section as FormSection).successMessage}
                            onChange={(e) => updateSection(section.id, 'successMessage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Form Fields Builder */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Form Fields
                            </label>
                            <button
                              onClick={() => addFormField(section.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                            >
                              Add Field
                            </button>
                          </div>
                          
                          <div className="space-y-4">
                            {(section as FormSection).formFields.map((field, fieldIndex) => (
                              <div key={field.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                  <h5 className="font-medium text-sm">Field {fieldIndex + 1}</h5>
                                  <button
                                    onClick={() => removeFormField(section.id, field.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Field Type
                                    </label>
                                    <select
                                      value={field.type}
                                      onChange={(e) => updateFormField(section.id, field.id, 'type', e.target.value as FormField['type'])}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                      <option value="text">Text Input</option>
                                      <option value="email">Email</option>
                                      <option value="tel">Phone</option>
                                      <option value="textarea">Textarea</option>
                                      <option value="select">Select Dropdown</option>
                                      <option value="radio">Radio Buttons</option>
                                      <option value="checkbox">Checkboxes</option>
                                      <option value="file">File Upload</option>
                                    </select>
                                  </div>
                                  
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Field Label
                                    </label>
                                    <input
                                      type="text"
                                      value={field.label}
                                      onChange={(e) => updateFormField(section.id, field.id, 'label', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Placeholder
                                    </label>
                                    <input
                                      type="text"
                                      value={field.placeholder || ''}
                                      onChange={(e) => updateFormField(section.id, field.id, 'placeholder', e.target.value)}
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <label className="flex items-center text-sm">
                                      <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => updateFormField(section.id, field.id, 'required', e.target.checked)}
                                        className="mr-2"
                                      />
                                      Required field
                                    </label>
                                  </div>
                                </div>
                                
                                {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                                  <div className="mt-3">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Options (one per line)
                                    </label>
                                    <textarea
                                      value={(field.options || []).join('\n')}
                                      onChange={(e) => updateFormField(section.id, field.id, 'options', e.target.value.split('\n').filter(opt => opt.trim()))}
                                      rows={3}
                                      placeholder="Enter each option on a new line"
                                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                            
                            {(section as FormSection).formFields.length === 0 && (
                              <div className="text-center py-8 text-gray-500">
                                No form fields yet. Click &quot;Add Field&quot; to get started.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Colors & Fonts */}
          {activeSection === 'colors' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Colors & Fonts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Colors</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={pageData.colors.primary}
                          onChange={(e) => updateColors('primary', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={pageData.colors.primary}
                          onChange={(e) => updateColors('primary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={pageData.colors.secondary}
                          onChange={(e) => updateColors('secondary', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={pageData.colors.secondary}
                          onChange={(e) => updateColors('secondary', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={pageData.colors.background}
                          onChange={(e) => updateColors('background', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={pageData.colors.background}
                          onChange={(e) => updateColors('background', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={pageData.colors.text}
                          onChange={(e) => updateColors('text', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          value={pageData.colors.text}
                          onChange={(e) => updateColors('text', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Fonts</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heading Font
                      </label>
                      <select
                        value={pageData.fonts.heading}
                        onChange={(e) => setPageData({
                          ...pageData,
                          fonts: { ...pageData.fonts, heading: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Poppins">Poppins</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body Font
                      </label>
                      <select
                        value={pageData.fonts.body}
                        onChange={(e) => setPageData({
                          ...pageData,
                          fonts: { ...pageData.fonts, body: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Poppins">Poppins</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Page Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => updatePageData('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Subtitle
                </label>
                <input
                  type="text"
                  value={pageData.subtitle}
                  onChange={(e) => updatePageData('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
} 