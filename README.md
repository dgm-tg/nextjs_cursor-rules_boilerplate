# Single Page Generator

A powerful web application that allows you to create beautiful, responsive landing pages in minutes. Built with Next.js and Tailwind CSS.

## Features

- **Visual Page Builder**: Drag-and-drop interface to customize your landing page
- **Live Preview**: See changes in real-time as you build
- **Mobile Offcanvas Menu**: Responsive navigation with sliding mobile menu
- **Export Options**: Download as ZIP file with HTML, CSS, JS, and documentation
- **Vercel Integration**: One-click deployment to Vercel (with proper setup)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Vercel Deployment Setup (Optional)

To enable one-click deployment to Vercel from within the app, you need to set up a Vercel API token:

### 1. Get Your Vercel API Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name (e.g., "Single Page Generator")
4. Copy the generated token

### 2. Set Up Environment Variable

1. Create a `.env.local` file in your project root
2. Add your token:
   ```
   VERCEL_TOKEN=your_actual_token_here
   ```
3. Keep this file secure and never commit it to version control

### 3. Deploy Your App

1. Deploy this Single Page Generator app to Vercel first
2. Now users can create landing pages and deploy them instantly!

**Note**: If you don't set up the token, the app will still work perfectly - it will just show manual deployment instructions instead of automatic deployment.

## How to Use

1. **Builder Tab**: Customize your landing page content, colors, and fonts
2. **Preview Tab**: See how your page looks with the mobile offcanvas menu
3. **Export Tab**: Download as ZIP or deploy to Vercel

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Workflow: From Idea to Implemented Feature 💡➡️💻

Here's the step-by-step process using the `.mdc` files in this repository:

### 1️⃣ Create a Product Requirement Document (PRD)

First, lay out the blueprint for your feature. A PRD clarifies what you're building, for whom, and why.

You can create a lightweight PRD directly within Cursor:

1.  Ensure you have the `create-prd.mdc` file from this repository accessible.
2.  In Cursor's Agent chat, initiate PRD creation:

    ```
    Use @create-prd.mdc
    Here's the feature I want to build: [Describe your feature in detail]
    Reference these files to help you: [Optional: @file1.py @file2.ts]
    ```

    _(Pro Tip: For complex PRDs, using MAX mode in Cursor is highly recommended if your budget allows for more comprehensive generation.)_

    ![Example of initiating PRD creation](https://pbs.twimg.com/media/Go6DDlyX0AAS7JE?format=jpg&name=large)

### 2️⃣ Generate Your Task List from the PRD

With your PRD drafted (e.g., `MyFeature-PRD.md`), the next step is to generate a detailed, step-by-step implementation plan for your AI Developer.

1.  Ensure you have `generate-tasks-from-prd.mdc` accessible.
2.  In Cursor's Agent chat, use the PRD to create tasks:

    ```
    Now take @MyFeature-PRD.md and create tasks using @generate-tasks-from-prd.mdc
    ```

    _(Note: Replace `@MyFeature-PRD.md` with the actual filename of the PRD you generated in step 1.)_

    ![Example of generating tasks from PRD](https://pbs.twimg.com/media/Go6FITbWkAA-RCT?format=jpg&name=medium)

### 3️⃣ Examine Your Task List

You'll now have a well-structured task list, often with tasks and sub-tasks, ready for the AI to start working on. This provides a clear roadmap for implementation.

![Example of a generated task list](https://pbs.twimg.com/media/Go6GNuOWsAEcSDm?format=jpg&name=medium)

### 4️⃣ Instruct the AI to Work Through Tasks (and Mark Completion)

To ensure methodical progress and allow for verification, we'll use `process-task-list.mdc`. This command instructs the AI to focus on one task at a time and wait for your go-ahead before moving to the next.

1.  Create or ensure you have the `process-task-list.mdc` file accessible.
2.  In Cursor's Agent chat, tell the AI to start with the first task (e.g., `1.1`):

    ```
    Please start on task 1.1 and use @process-task-list.mdc
    ```

    *(Important: You only need to reference `@process-task-list.mdc` for the *first* task. The instructions within it guide the AI for subsequent tasks.)*

    The AI will attempt the task and then prompt you to review.

    ![Example of starting on a task with process-task-list.mdc](https://pbs.twimg.com/media/Go6I41KWcAAAlHc?format=jpg&name=medium)

### 5️⃣ Review, Approve, and Progress ✅

As the AI completes each task, you review the changes.

- If the changes are good, simply reply with "yes" (or a similar affirmative) to instruct the AI to mark the task complete and move to the next one.
- If changes are needed, provide feedback to the AI to correct the current task before moving on.

You'll see a satisfying list of completed items grow, providing a clear visual of your feature coming to life!

![Example of a progressing task list with completed items](https://pbs.twimg.com/media/Go6KrXZWkAA_UuX?format=jpg&name=medium)

While it's not always perfect, this method has proven to be a very reliable way to build out larger features with AI assistance.
