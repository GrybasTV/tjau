# Electronics Trading Platform - ptsltech.co.uk

Simple MVP platform for selling used electronics to UK buyers. People submit offers to sell their electronics, and the site owner reviews and contacts sellers.

## Features

### Public Side
- ✅ Simple product submission form with progress indicator
- ✅ Photo uploads (up to 5)
- ✅ Product information entry (name, description, price, condition)
- ✅ Contact information collection (including UK postcode)
- ✅ Thank you page after submission
- ✅ Conversion-optimized design with trust signals
- ✅ Social proof section with customer reviews
- ✅ Professional UI/UX with visual hierarchy

### Admin Side
- ✅ Login system (JWT authentication)
- ✅ Dashboard with all offer reviews
- ✅ Filtering by status (Pending, Contacted, Purchased)
- ✅ Status management and listing removal
- ✅ Contact information viewing

## Technologies

- **Next.js 14** (App Router) - Full-stack framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling library
- **Prisma** - ORM
- **SQLite** - Database (development)
- **Local Storage** - Image storage in public/uploads (Vercel optimal!)
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
tomj/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/          # Admin login
│   │   └── listings/           # Listing CRUD
│   ├── admin/
│   │   ├── login/              # Login page
│   │   └── dashboard/          # Dashboard page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   └── ProductForm.tsx         # Form component
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── auth.ts                 # Auth functions
│   └── middleware.ts           # Auth middleware
├── prisma/
│   └── schema.prisma           # DB schema
├── scripts/
│   └── init-admin.ts           # Admin initialisation
└── .env                        # Environment variables
```

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd tomj
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Admin user (change!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

# Session secret (generate random string)
SESSION_SECRET="generate-random-string-here"
```

### 4. Initialise Database

```bash
# Generate Prisma Client
npm run db:generate

# Create migrations and apply
npx prisma migrate dev
```

### 5. Create Admin User

```bash
# Method 1 - using API endpoint (start dev server first)
npm run dev

# In another terminal:
curl -X POST http://localhost:3000/api/admin/init

# Method 2 - using Prisma Studio
npx prisma studio
# Open http://localhost:5555 and manually add admin
```

### 6. Development Server

```bash
npm run dev
```

Application will be available at: `http://localhost:3000`

## Usage

### For Clients (Sellers)

1. Go to `http://localhost:3000`
2. Fill out the form with product information
3. Upload photos (optional)
4. Enter contact details
5. Click "Submit Offer"
6. Receive confirmation and wait for feedback

### For Admin (Site Owner)

1. Go to `http://localhost:3000/admin/login`
2. Log in with the created admin user
3. View all offers on the dashboard
4. Filter by status
5. Change statuses and manage offers

## Deployment (Vercel)

⚠️ **IMPORTANT:** This project requires PostgreSQL and cloud image storage for Vercel deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup guide.

### Quick Overview

**Before deploying:**
1. Set up PostgreSQL database (Supabase/Railway recommended - FREE tier)
2. Configure cloud image storage (Vercel Blob or Cloudinary - FREE tier)
3. Migrate from SQLite to PostgreSQL
4. Update image upload logic

**Detailed deployment guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Vercel Deployment Steps

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel Dashboard:
# - DATABASE_URL (PostgreSQL)
# - Image storage credentials
# - ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
```

### Why Not SQLite + Local Files?

Vercel uses **serverless functions** which are:
- **Read-only file system** - SQLite files cannot persist
- **Ephemeral storage** - Files in `public/uploads` disappear after deployment
- **Stateless** - Each request may use a different server instance

**Solution:** PostgreSQL + Cloud Storage (cost: $0/month for MVP)

## Future Features (Not MVP)

- ⏳ Google reCAPTCHA v3 integration
- ⏳ Email notifications
- ⏳ More images per listing
- ⏳ Search functionality
- ⏳ Categories
- ⏳ Currency conversion
- ⏳ Analytics dashboard
- ⏳ A/B testing framework

## Recent Updates

### Conversion Optimization (Latest v0.2.1)
- Enhanced form UX with step indicators instead of percentage
- Added prominent CTA above the fold
- Optimally placed trust badges right before form submission
- Added customer reviews section with verified quotes
- Improved radio button selection with clear active states
- Added "How It Works" section for better transparency
- Improved form placeholders with examples and helper text
- Clean visual hierarchy with professional UK branding

## Troubleshooting

### Database Errors

If Prisma errors occur:
```bash
# Remove node_modules and Prisma
rm -rf node_modules prisma/dev.db*

# Reinstall and generate
npm install
npm run db:generate
npx prisma migrate dev
```

### Auth Errors

If admin can't log in:
1. Check if admin exists in database
2. Check SESSION_SECRET variable
3. Clear cookies in browser

## License

Private license.

## Author

Created in 2024.
