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
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [deploymentInstructions, setDeploymentInstructions] = useState<{
    title: string;
    steps: string[];
    alternativeUrl: string;
  } | null>(null);

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

  const deployToVercel = async () => {
    setIsDeploying(true);
    try {
      // Generate the project files
      const projectName = pageData.title.toLowerCase().replace(/\s+/g, '-');
      const files = {
        'index.html': generateHTML(pageData),
        'package.json': JSON.stringify({
          name: projectName,
          version: '1.0.0',
          scripts: {
            build: 'echo "Static site - no build needed"',
            start: 'echo "Static site - no start needed"'
          }
        }, null, 2),
        'vercel.json': JSON.stringify({
          version: 2,
          builds: [
            {
              src: 'index.html',
              use: '@vercel/static'
            }
          ],
          routes: [
            {
              src: '/(.*)',
              dest: '/index.html'
            }
          ]
        }, null, 2)
      };

      // Create deployment using Vercel's deployment API
      const deploymentResponse = await fetch('/api/deploy-to-vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          files: files,
          projectSettings: {
            buildCommand: null,
            devCommand: null,
            installCommand: null,
            outputDirectory: null
          }
        }),
      });

      if (!deploymentResponse.ok) {
        throw new Error('Deployment failed');
      }

      const deploymentResult = await deploymentResponse.json();
      
      if (deploymentResult.success) {
        setDeploymentUrl(deploymentResult.url);
        setDeploymentInstructions(null);
      } else {
        // Show manual deployment instructions
        setDeploymentInstructions(deploymentResult.instructions);
        setDeploymentUrl('');
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      // Fallback to manual deployment instructions
      setDeploymentInstructions({
        title: 'Manual Deployment Instructions',
        steps: [
          '1. Download the ZIP file from the Export tab',
          '2. Go to https://vercel.com/new',
          '3. Drag and drop your project folder',
          '4. Click "Deploy"',
          '5. Your site will be live in seconds!'
        ],
        alternativeUrl: 'https://vercel.com/new'
      });
      setDeploymentUrl('');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Export & Deploy</h2>
        <p className="text-gray-600 mb-8">
          Download your landing page with EmailJS integration or deploy it directly to Vercel. Forms will work once you configure EmailJS credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* Vercel Deploy Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Deploy to Vercel</h3>
          <p className="text-gray-600 mb-6">
            Deploy your landing page directly to Vercel for instant hosting.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Deployment Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instant global CDN</li>
                <li>• Automatic HTTPS</li>
                <li>• Custom domain support</li>
                <li>• Analytics included</li>
              </ul>
            </div>
            
            {deploymentUrl ? (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Deployment Successful!</h4>
                <a
                  href={deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 break-all"
                >
                  {deploymentUrl}
                </a>
              </div>
            ) : deploymentInstructions ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">{deploymentInstructions.title}</h4>
                <ul className="text-sm text-blue-700 space-y-2 mb-4">
                  {deploymentInstructions.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
                <div className="flex space-x-2">
                  <a
                    href={deploymentInstructions.alternativeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Deploy Manually
                  </a>
                  <button
                    onClick={() => {
                      setDeploymentInstructions(null);
                      downloadZip();
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
                  >
                    Download ZIP
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={deployToVercel}
                disabled={isDeploying}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeploying ? 'Deploying...' : 'Deploy to Vercel'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Code Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Generated Code Preview</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{generateHTML(pageData).substring(0, 500)}...</code>
          </pre>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This is a preview of your generated HTML. The complete file will be included in your download.
        </p>
      </div>
    </div>
  );
} 