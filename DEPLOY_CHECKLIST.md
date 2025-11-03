# Deployment Checklist - ptsltech.co.uk

**Status:** Ready for deployment  
**Version:** 1.0.0  
**Estimated Time:** 15-20 minutes  
**Cost:** $0/month (MVP)

---

## ✅ Completed (Automated)

- [x] Code optimization complete
- [x] Error handling improved
- [x] Cloudinary integration ready
- [x] PostgreSQL schema ready
- [x] Auto Prisma generate in build
- [x] Documentation complete

---

## 📋 Your Action Items

### Step 1: GitHub Repository (2 min)

1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Repository name: `ptsltech` or `electronics-trading`
4. Description: "Electronics trading platform for UK market"
5. **Set to PRIVATE** (important for business)
6. Click "Create repository"

**Then push your code:**
```bash
git init
git add .
git commit -m "Initial commit - v1.0.0 production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ptsltech.git
git push -u origin main
```

---

### Step 2: PostgreSQL (Supabase) (3 min)

1. Go to [supabase.com](https://supabase.com)
2. Sign up (use GitHub login)
3. "New Project" → "Create a new project"
4. Fill in:
   - Name: `ptsltech-db`
   - Database Password: **Generate strong password!** (save it!)
   - Region: Choose closest to UK (e.g., London)
5. Click "Create new project"
6. Wait ~2 minutes for provisioning
7. Go to **Settings** → **Database**
8. Find **"Connection String"** section
9. Copy **"URI"** connection string
   - Format: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
10. Save this string securely!

---

### Step 3: Cloudinary (2 min)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (use email or Google)
3. Fill in basic info
4. Click "Go to Console"
5. On Dashboard, copy:
   - **Cloud name** (e.g., "dxy1234abc")
   - **API Key** 
   - **API Secret**
6. Save these 3 values securely!

---

### Step 4: Vercel Deployment (5 min)

#### 4a. Create Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up (use GitHub - recommended)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Import"

#### 4b. Configure Project
1. Project name: `ptsltech` (auto-filled)
2. Framework preset: Next.js (auto-detected)
3. Root directory: `./` (default)
4. Build command: `npm run build` (auto-filled)
5. Output directory: `.next` (auto-filled)
6. Click "Deploy" (wait for first deploy)

#### 4c. Add Environment Variables ⚠️ CRITICAL
1. Go to **Settings** → **Environment Variables**
2. Add these variables one by one:

**Database:**
```
Variable: DATABASE_URL
Value: [Paste your Supabase connection string from Step 2]
Environments: Production, Preview, Development
```

**Cloudinary:**
```
Variable: CLOUDINARY_CLOUD_NAME
Value: [Your cloud name from Step 3]
Environments: Production, Preview, Development

Variable: CLOUDINARY_API_KEY
Value: [Your API key from Step 3]
Environments: Production, Preview, Development

Variable: CLOUDINARY_API_SECRET
Value: [Your API secret from Step 3]
Environments: Production, Preview, Development
```

**Admin & Security:**
```
Variable: ADMIN_USERNAME
Value: admin
Environments: Production, Preview, Development

Variable: ADMIN_PASSWORD
Value: [Choose strong password and hash it via /api/admin/init]
Environments: Production, Preview, Development

Variable: SESSION_SECRET
Value: [Generate: openssl rand -base64 32]
Environments: Production, Preview, Development
```

3. For each variable, check all three environments
4. Click "Save"
5. After adding all, go to **Settings** → **Deployments**
6. Click "..." on latest deployment → "Redeploy"

---

### Step 5: Initialize Database (1 min)

After redeploy completes:

1. Go to your Vercel URL: `https://your-app.vercel.app`
2. Call the init endpoint:
   - Open browser console (F12)
   - Or use PowerShell:
   ```powershell
   curl -X POST https://your-app.vercel.app/api/admin/init
   ```
3. Should return: `{"message": "Admin user created"}`
4. If error, copy it and continue below

---

### Step 6: Test Everything (2 min)

**Test Form Submission:**
1. Go to your Vercel URL
2. Fill out the form
3. Upload a test image
4. Submit
5. Check: Should show success message

**Test Admin Login:**
1. Go to `https://your-app.vercel.app/admin/login`
2. Login with admin credentials
3. Check: Should see dashboard with your test listing

**Verify Image Upload:**
1. Check Cloudinary dashboard
2. Should see uploaded image in "ptsltech" folder
3. Image should be accessible from anywhere

**Verify Database:**
1. Go to Supabase dashboard
2. Click "Table Editor"
3. Should see `Listing` and `Admin` tables with data

---

## ⚠️ Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure DATABASE_URL is correct format
- Verify all env variables are added

### Images Not Uploading
- Check Cloudinary credentials
- Verify API secret is correct
- Check Vercel function logs

### Database Connection Fails
- Verify connection string format
- Check password is encoded in URL
- Ensure SSL is allowed

### Admin Login Fails
- Call `/api/admin/init` again
- Check SESSION_SECRET is set
- Clear cookies and retry

### Need Help?
- Check Vercel logs: Deployment → Functions → View Function Logs
- Check Supabase logs: Logs → Postgres Logs
- Check Cloudinary: Media Library → Events

---

## ✅ Success Criteria

After deployment, you should have:

- ✅ Website live on Vercel
- ✅ Form accepts submissions
- ✅ Images upload to Cloudinary
- ✅ Data saves to PostgreSQL
- ✅ Admin login works
- ✅ Dashboard shows listings
- ✅ All working 24/7

---

## 🔒 Security Checklist

Before going public:

- [ ] Admin password is strong and hashed
- [ ] SESSION_SECRET is random (32+ chars)
- [ ] Database password is unique
- [ ] Environment variables are set (not in code)
- [ ] Repository is private
- [ ] .env files are in .gitignore

---

## 📊 Monitoring

Set up after launch:

- [ ] Vercel Analytics (optional)
- [ ] Form submission monitoring
- [ ] Database backup schedule
- [ ] Cloudinary storage usage
- [ ] Uptime monitoring

---

## 🎉 Done!

**Your website is now:**
- Live on internet
- Handling submissions
- Storing data securely
- Ready for customers

**Next steps:**
1. Share your Vercel URL
2. Start accepting offers
3. Monitor performance
4. Iterate based on feedback

---

**Total Setup Time:** ~15-20 minutes  
**Monthly Cost:** $0  
**Your URL:** `https://ptsltech.vercel.app` (or custom domain)

