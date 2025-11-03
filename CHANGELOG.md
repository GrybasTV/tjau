# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-12-20

### Production-Ready Deployment
- ✅ Added Cloudinary integration for cloud image storage
- ✅ Created dual storage system (local dev, cloud production)
- ✅ PostgreSQL schema created (prisma/schema.postgres.prisma)
- ✅ Auto-detecting storage based on environment variables
- ✅ Comprehensive deployment documentation (DEPLOYMENT.md, MIGRATION.md)
- ✅ Environment variable templates (env.example)
- ✅ Improved error handling in form submissions
- ✅ Vercel-ready with proper build scripts

## [0.2.2] - 2024-12-20

### Advanced UX Optimization
- ✅ Changed Condition field from grid to single-row horizontal layout
- ✅ Improved radio button readability with better colors (gray-700 text, white bg)
- ✅ Cleaner visual design - all condition options visible at once
- ✅ Reduced psychological friction with simplified layout

## [0.2.1] - 2024-12-20

### Final UX Polish
- ✅ Added permanent "Continue to Contact Info" button after Photos section
- ✅ Enhanced form navigation flow
- ✅ All form fields have proper labels above placeholders
- ✅ Radio buttons already have clear text labels and active states
- ✅ Moved trust badges from header to before form (optimal conversion placement)

## [0.2.0] - 2024-12-20

### Conversion Optimization Updates
- ✅ Enhanced form UX with "Step 1 of 2" indicator instead of percentage
- ✅ Added prominent CTA above the fold with trust badges
- ✅ Integrated recognizable trust signals (PayPal, Visa, Mastercard, Secure)
- ✅ Added customer reviews section with verified quotes and UK locations
- ✅ Improved radio button selection with clear active states (blue bg, shadow, scale)
- ✅ Added "How It Works" section for better process transparency
- ✅ Enhanced form placeholders with examples and helper text
- ✅ Changed language to British English for UK market
- ✅ Added UK postcode field to contact form
- ✅ Updated currency to GBP and date formats to en-GB

### Localization
- ✅ Full translation to British English
- ✅ UK-specific currency (£) and date formats
- ✅ Updated all user-facing and admin text

### Branding
- ✅ Updated site name to "ptsltech.co.uk"
- ✅ Professional UK-focused branding

## [0.1.0] - 2024-11-03

### Added
- ✅ Next.js 14 project with TypeScript and Tailwind CSS
- ✅ Prisma + SQLite database integration
- ✅ Main page with product submission form
- ✅ Local file storage for image uploads (Vercel optimal!)
- ✅ Admin login system (JWT + bcrypt)
- ✅ Admin dashboard with offer management
- ✅ Status system (pending, contacted, purchased, rejected)
- ✅ Responsive design with modern UI
- ✅ README with instructions
- ✅ Automated admin initialization script

### Technologies
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite (development)
- Local file storage (public/uploads) - Vercel optimal!
- JWT (authentication)
- bcryptjs (password hashing)

### Known Limitations
- ⏳ reCAPTCHA v3 integration (TODO)
- ⏳ Email notifications
- ⏳ More image management

### Important Changes
- ✅ Switched from Cloudinary to local file storage (Vercel friendly)
- ✅ Added `/api/admin/init` endpoint for admin initialization
- ✅ Created SETUP.md with quick instructions

