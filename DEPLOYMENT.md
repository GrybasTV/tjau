# Vercel Deployment Plan - ptsltech.co.uk

**Status:** ⚠️ Requires PostgreSQL & Image Storage Migration

## ⚠️ Critical Issues for Production

### 1. Database: SQLite → PostgreSQL Required
**Current:** SQLite (`file:./prisma/dev.db`)  
**Production Required:** PostgreSQL  
**Why:** Vercel serverless functions are read-only. SQLite files cannot persist.

### 2. Image Storage: Local Files → Cloud Storage Required
**Current:** `public/uploads/` (local file system)  
**Production Required:** Cloud storage (Vercel Blob / Cloudinary / S3)  
**Why:** Vercel deployment is read-only. Files in `public/` are ephemeral.

---

## Pre-Deployment Checklist

### ✅ Completed
- [x] Next.js 14 setup with App Router
- [x] Prisma ORM configured
- [x] Admin authentication (JWT + bcrypt)
- [x] Form with conversion optimization
- [x] UK localization complete
- [x] Error handling improved
- [x] Auto Prisma generate in build script

### ⏳ Required Before Vercel Deployment
- [ ] Set up PostgreSQL database (Supabase/Railway/Neon)
- [ ] Migrate from SQLite to PostgreSQL
- [ ] Set up cloud image storage (Vercel Blob/Cloudinary)
- [ ] Update image upload logic
- [ ] Configure environment variables
- [ ] Create admin user in production DB
- [ ] Test production build locally

---

## Step-by-Step Deployment Guide

### Phase 1: Database Setup (PostgreSQL)

#### Option A: Supabase (Recommended - Free tier)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database
4. Format: `postgresql://user:password@host:5432/database`

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy connection string

#### Option C: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create project
3. Copy connection string

### Phase 2: Database Migration

```bash
# 1. Update schema.prisma
# Change datasource provider to "postgresql"
# Update DATABASE_URL in .env

# 2. Generate new client
npm run db:generate

# 3. Push schema to PostgreSQL
npm run db:push

# 4. Or create migration
npx prisma migrate dev --name production_init
```

### Phase 3: Image Storage Setup

#### Option A: Vercel Blob (Easiest)
1. Install: `npm install @vercel/blob`
2. Get storage token from Vercel dashboard
3. Update `app/api/listings/route.ts` to use Vercel Blob

#### Option B: Cloudinary (Already in dependencies)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get API credentials
3. Update image upload code

#### Option C: AWS S3 + CloudFront
1. Create S3 bucket
2. Configure CloudFront
3. Add AWS credentials

### Phase 4: Vercel Deployment

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel Dashboard
```

### Phase 5: Environment Variables (Vercel Dashboard)

Required variables:
```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Image Storage (if using Vercel Blob)
BLOB_READ_WRITE_TOKEN="vercel_blob_token_here"

# Or Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Admin (for initial setup)
ADMIN_USERNAME="your_secure_username"
ADMIN_PASSWORD="your_secure_password_hash"

# Session
SESSION_SECRET="generate-random-string-here-min-32-chars"
```

### Phase 6: Create Admin User

```bash
# After deployment, call init endpoint
curl -X POST https://your-app.vercel.app/api/admin/init
```

---

## Quick Start (After Setup)

### Build Commands (Auto-configured)
```json
{
  "build": "prisma generate && next build",
  "dev": "prisma generate && next dev"
}
```

### Post-deployment Steps
1. Initialize database: `npx prisma db push` or migrations
2. Create admin via `/api/admin/init` endpoint
3. Verify image uploads work
4. Test form submission
5. Monitor logs in Vercel dashboard

---

## Troubleshooting

### Build Fails on Vercel
- Check Prisma client generation
- Ensure DATABASE_URL is set correctly
- Verify build command includes `prisma generate`

### Images Not Uploading
- Check blob/storage credentials
- Verify file size limits
- Check API route logs in Vercel

### Database Connection Issues
- Verify DATABASE_URL format
- Check if PostgreSQL allows connections from Vercel IPs
- Ensure SSL is configured if required

### Admin Login Not Working
- Verify admin user exists in production DB
- Check SESSION_SECRET is set
- Clear cookies and retry

---

## Current Production Blockers

| Issue | Impact | Solution |
|-------|--------|----------|
| SQLite in production | **CRITICAL** | Migrate to PostgreSQL |
| Local file storage | **CRITICAL** | Use Vercel Blob/Cloudinary |
| No `.env` in repo | ✅ Good | Configure in Vercel |
| Admin initialization | ⚠️ Medium | Use init endpoint |
| reCAPTCHA missing | ⚠️ Low | Add after MVP |

---

## Recommended Timeline

**Week 1:**
- Set up PostgreSQL database
- Configure image storage
- Test migrations locally

**Week 2:**
- Deploy to Vercel staging
- Test all functionality
- Create production admin

**Week 3:**
- Go live on production domain
- Monitor and optimize

---

## Cost Estimates

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel | Hobby | $0 (up to 100GB bandwidth) |
| Supabase | Free | $0 (500MB DB, 1GB storage) |
| Cloudinary | Free | $0 (25GB storage, 25GB bandwidth) |
| Total | | **$0/month** (MVP) |

Scale pricing:
- Vercel Pro: $20/month (for domains)
- Database: $9-25/month (as needed)
- Storage: Free tier should suffice for MVP

---

## Security Checklist

- [x] Admin passwords hashed (bcrypt)
- [x] JWT tokens for auth
- [x] Environment variables secured
- [x] SQL injection protection (Prisma)
- [ ] reCAPTCHA v3 (TODO)
- [ ] Rate limiting (TODO)
- [ ] HTTPS enforced (Vercel default)
- [ ] CORS configured

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Prisma + Vercel: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- Supabase: https://supabase.com/docs
- Cloudinary: https://cloudinary.com/documentation

---

**Last Updated:** 2024-12-20  
**Project Version:** 0.2.2  
**Status:** Ready for PostgreSQL migration

