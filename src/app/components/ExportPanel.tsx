'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { PageData } from '../page';
import { generateHTML, generateCSS, generateJS, generateReadme } from '../../../utils/htmlGenerator';

interface ExportPanelProps {
  pageData: PageData;
}

export default function ExportPanel({ pageData }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadZip = async () => {
    setIsExporting(true);
    
    try {
      const zip = new JSZip();
      
      // Add HTML file
      zip.file('index.html', generateHTML(pageData));
      
      // Add CSS file
      zip.file('styles.css', generateCSS(pageData));
      
      // Add JavaScript file
      zip.file('script.js', generateJS(pageData));
      
      // Add README file with setup instructions
      zip.file('README.md', generateReadme(pageData));
      
      // Generate and download the zip
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pageData.title.toLowerCase().replace(/\s+/g, '-')}-landing-page.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Error creating download file. Please try again.');
    }
    
    setIsExporting(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Export</h2>
        <p className="text-gray-600 mb-8">
          Download your landing page with EmailJS integration. Forms will work once you configure EmailJS credentials.
        </p>
      </div>

      <div className="max-w-2xl">
        {/* Download Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Download ZIP</h3>
          <p className="text-gray-600 mb-6">
            Download your complete landing page as a ZIP file with EmailJS integration for working contact forms.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Package Contents:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• index.html - Main landing page with EmailJS integration</li>
                <li>• styles.css - Custom styling</li>
                <li>• script.js - Interactive features & form handling</li>
                <li>• README.md - EmailJS setup & deployment instructions</li>
              </ul>
            </div>
            
            <button
              onClick={downloadZip}
              disabled={isExporting}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'Preparing Download...' : 'Download ZIP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 