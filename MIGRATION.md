# Database & Image Storage Migration Guide

Complete guide for migrating from SQLite + local files to PostgreSQL + Cloudinary.

## Overview

**Current Setup:** SQLite + local file storage  
**Target Setup:** PostgreSQL + Cloudinary (for Vercel deployment)

---

## Migration Steps

### Step 1: Set Up PostgreSQL Database

Choose one provider (all offer free tiers):

#### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create account → New Project
3. Wait for database to provision
4. Go to Settings → Database
5. Copy "Connection String" under "Connection parameters"

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create account → New Project
3. Add PostgreSQL service
4. Copy connection string from Variables tab

#### Option C: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create account → New Project
3. Copy connection string

**Save your connection string!** Format: `postgresql://user:password@host:5432/database`

---

### Step 2: Set Up Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com)
2. Create free account
3. Copy credentials from Dashboard:
   - Cloud name
   - API Key
   - API Secret

---

### Step 3: Configure Environment Variables

Create `.env.local` with your PostgreSQL and Cloudinary credentials:

```env
# Production PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

# Session
SESSION_SECRET="your-random-secret-min-32-chars"
```

---

### Step 4: Update Prisma Schema

Copy `prisma/schema.postgres.prisma` to `prisma/schema.prisma`:

```bash
# Backup current schema
cp prisma/schema.prisma prisma/schema.sqlite.backup

# Use PostgreSQL schema
cp prisma/schema.postgres.prisma prisma/schema.prisma
```

Or manually change in `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

---

### Step 5: Generate Prisma Client & Migrate

```bash
# Generate Prisma Client for PostgreSQL
npm run db:generate

# Push schema to PostgreSQL
npm run db:push

# Or create migration
npx prisma migrate dev --name production_init
```

---

### Step 6: Verify Setup

```bash
# Start dev server
npm run dev

# Test form submission with image
# Check Cloudinary dashboard for uploaded images
# Check PostgreSQL database for listing records
```

---

### Step 7: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables in Vercel Dashboard:
# Settings → Environment Variables
# Add all variables from .env.local
```

---

## Rollback Plan

If you need to go back to SQLite:

```bash
# Restore SQLite schema
cp prisma/schema.sqlite.backup prisma/schema.prisma

# Regenerate client
npm run db:generate

# Update DATABASE_URL in .env.local
DATABASE_URL="file:./prisma/dev.db"
```

---

## Troubleshooting

### Prisma Client Issues
```bash
# Clear cache and regenerate
rm -rf .next node_modules/.prisma
npm run db:generate
```

### Cloudinary Upload Fails
- Check API credentials in `.env.local`
- Verify CLOUDINARY_CLOUD_NAME is set
- Check Cloudinary dashboard for upload logs

### PostgreSQL Connection Issues
- Verify connection string format
- Check if database allows external connections
- Ensure SSL is configured if required
- Test connection with `psql` or admin panel

### Image Storage Falls Back to Local
- If Cloudinary is not configured, system automatically uses local storage
- Check console logs: `getStorageType()` returns current storage type
- In development, this is normal behavior

---

## Testing Checklist

Before deploying to production:

- [ ] Form submission works
- [ ] Images upload to Cloudinary
- [ ] Data saves to PostgreSQL
- [ ] Admin login works
- [ ] Dashboard loads listings
- [ ] Images display correctly
- [ ] No console errors

---

## Environment-Specific Behavior

**Development (no Cloudinary credentials):**
- Uses SQLite database
- Saves images to `public/uploads/`
- Works offline

**Production (with Cloudinary + PostgreSQL):**
- Uses PostgreSQL database
- Uploads images to Cloudinary CDN
- Global access, optimized delivery

The system automatically detects which environment based on available credentials!

---

**Last Updated:** 2024-12-20  
**Schema Version:** Both SQLite and PostgreSQL supported

