# Membership Web Application

A modern, full-featured membership web application built with Next.js, featuring user authentication, role-based access control, and a dynamic dashboard.

## Features

### Authentication & Authorization
- User registration and login
- Forgot password functionality
- Role-based access control (Administrator, Manager, Customer)
- Secure password handling with bcrypt
- Email and password management

### User Profiles
- Customizable user profiles
- Profile picture upload via Cloudinary
- Bio management
- Account settings management

### Dashboard
- Role-specific navigation
- Announcement widgets
- Quick stats display
- Intuitive user interface

### Announcements System
- Create and manage announcements (Admin/Manager only)
- Real-time updates
- Rich text content support

## Tech Stack

- **Framework**: Next.js 15.3
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Custom components with Tailwind CSS
- **File Upload**: Cloudinary
- **Form Validation**: Zod
- **State Management**: React Hooks + Context

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (for image uploads)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```bash
DATABASE_URL="postgresql://your-username:your-password@localhost:5432/membership_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
└── types/                # TypeScript type definitions
```

## User Roles and Permissions

1. **Administrator**
   - Full system access
   - User management
   - Announcement management
   - Role management

2. **Manager**
   - Announcement management
   - Limited user management
   - Dashboard access

3. **Customer**
   - Profile management
   - View announcements
   - Basic dashboard access

## Deployment

### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com) if you haven't already
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

### Setting up Database on Vercel

1. **Create a PostgreSQL Database**:
   - Go to your Vercel project dashboard
   - Navigate to the "Storage" tab
   - Click "Create Database"
   - Select "Postgres" and follow the setup wizard
   - Vercel will provide you with a `DATABASE_URL`

2. **Configure Environment Variables**:
   - In your Vercel project dashboard, go to "Settings" > "Environment Variables"
   - Add the following variables:
     ```
     DATABASE_URL=your-vercel-postgres-url
     NEXTAUTH_URL=your-deployed-app-url
     NEXTAUTH_SECRET=your-nextauth-secret
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```

3. **Initialize Database**:
   - After deployment, run the Prisma migrations:
     ```bash
     vercel env pull .env.production.local  # Pull production env vars
     npx prisma db push --accept-data-loss  # Push schema to production DB
     ```

### Database Management

1. **Connecting to Vercel Postgres**:
   - Use the Vercel Postgres connection string from your dashboard
   - For local development, add it to your `.env` file
   - For production, Vercel automatically injects it into your environment

2. **Database Migrations**:
   ```bash
   # Create a new migration
   npx prisma migrate dev --name your_migration_name

   # Apply migrations to production
   npx prisma migrate deploy
   ```

3. **Database Backups**:
   - Vercel Postgres automatically handles backups
   - Access backup options in Vercel dashboard under Storage > Your Database > Backups

4. **Monitoring**:
   - View database metrics in Vercel dashboard
   - Monitor connection pools, query performance, and storage usage

### Production Checklist

Before deploying to production, ensure:

1. **Environment Variables**:
   - All required environment variables are set in Vercel
   - Production URLs and credentials are correctly configured

2. **Database**:
   - Migrations are up to date
   - Indexes are properly set up
   - Connection pool is configured appropriately

3. **Security**:
   - NEXTAUTH_SECRET is a strong, unique value
   - API keys have appropriate permissions
   - Rate limiting is configured

4. **Performance**:
   - Images are optimized
   - Caching is configured
   - API routes are protected

### Troubleshooting

Common deployment issues and solutions:

1. **Database Connection Issues**:
   ```bash
   # Verify connection
   npx prisma db push
   
   # Reset database if needed
   npx prisma migrate reset
   ```

2. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly listed in package.json
   - Verify Node.js version compatibility

3. **Environment Variables**:
   ```bash
   # Verify env vars locally
   vercel env pull
   
   # List production env vars
   vercel env ls
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.