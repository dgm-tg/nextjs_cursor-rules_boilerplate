import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, files, projectSettings } = await request.json();

    // Prepare the files for Vercel deployment
    const vercelFiles = Object.entries(files).map(([path, content]) => ({
      file: path,
      data: content
    }));

    // Deploy to Vercel using their API
    const deploymentResponse = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        files: vercelFiles,
        projectSettings: {
          buildCommand: projectSettings.buildCommand,
          devCommand: projectSettings.devCommand,
          installCommand: projectSettings.installCommand,
          outputDirectory: projectSettings.outputDirectory,
          framework: null
        },
        target: 'production'
      }),
    });

    if (!deploymentResponse.ok) {
      const error = await deploymentResponse.text();
      console.error('Vercel API Error:', error);
      
      // If no token is provided, return instructions for manual deployment
      if (deploymentResponse.status === 401 || deploymentResponse.status === 403) {
        return NextResponse.json({
          success: false,
          error: 'Vercel token not configured',
          instructions: {
            title: 'Manual Deployment Instructions',
            steps: [
              '1. Download the ZIP file from the Export tab',
              '2. Extract the files to a folder',
              '3. Install Vercel CLI: npm i -g vercel',
              '4. Run "vercel" in the project folder',
              '5. Follow the prompts to deploy'
            ],
            alternativeUrl: 'https://vercel.com/new'
          }
        }, { status: 200 });
      }
      
      throw new Error(`Vercel deployment failed: ${error}`);
    }

    const deployment = await deploymentResponse.json();
    
    // Return the deployment URL
    return NextResponse.json({
      success: true,
      url: `https://${deployment.url}`,
      deploymentId: deployment.id
    });

  } catch (error) {
    console.error('Deployment error:', error);
    
    // Return manual deployment instructions as fallback
    return NextResponse.json({
      success: false,
      error: 'Deployment failed',
      instructions: {
        title: 'Manual Deployment Instructions',
        steps: [
          '1. Download the ZIP file from the Export tab',
          '2. Go to https://vercel.com/new',
          '3. Drag and drop your project folder',
          '4. Click "Deploy"',
          '5. Your site will be live in seconds!'
        ],
        alternativeUrl: 'https://vercel.com/new'
      }
    }, { status: 200 });
  }
} 