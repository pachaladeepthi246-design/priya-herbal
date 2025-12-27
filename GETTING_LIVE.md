# How to Get PriyaHerbal Live on priyaherbal.com

## Step 1: Verify Your Setup Works Locally (5 min)

```bash
# Terminal
npm install
npm run dev
```

Visit http://localhost:3000 - Should see home page ✓

## Step 2: Set Up Your Supabase Project (5 min)

1. Go to https://supabase.com → Create account
2. Click "New Project"
3. Project name: "priyaherbal"
4. Region: "Asia-Singapore" (closest to India)
5. Password: Generate strong one
6. Click "Create New Project" and wait...

## Step 3: Get Your Keys & Add to .env.local (2 min)

In Supabase Dashboard:
- Go to **Settings** → **API**
- Copy:
  - Project URL → Add to `NEXT_PUBLIC_SUPABASE_URL`
  - Anon public key → Add to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Service role secret → Add to `SUPABASE_SERVICE_ROLE_KEY`
  - JWT secret → Add to `SUPABASE_JWT_SECRET`

Create `.env.local` in project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SUPABASE_JWT_SECRET=...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## Step 4: Set Up Database (3 min) ⚠️ CRITICAL

In Supabase Dashboard → **SQL Editor** → **New Query**:

1. Copy entire SQL from `scripts/001_create_tables.sql`
2. Paste into SQL Editor
3. Click **"Run"** and wait for "Success"
4. Repeat for `scripts/002_seed_products.sql`

Your database is now ready! ✓

## Step 5: Test Everything Locally (5 min)

```bash
npm run dev
```

Then test:
- [ ] Home page loads
- [ ] Can sign up: /auth/sign-up
- [ ] Can see products: /shop
- [ ] Can view product details: /shop → click any product
- [ ] Can add to cart
- [ ] Mobile looks good (resize browser)

## Step 6: Deploy to Vercel (2 min)

1. Push your code to GitHub:
```bash
git add .
git commit -m "First commit"
git push origin main
```

2. Go to https://vercel.com → Click "Add New..." → "Project"
3. Import your GitHub repository
4. Set environment variables:
   - Click "Environment Variables"
   - Add ALL variables from your `.env.local` file
5. Click **"Deploy"**
6. Wait 1-2 minutes for deployment
7. You'll get a URL like: `https://priyaherbal-xxx.vercel.app`

✓ Your site is now live on Vercel!

## Step 7: Connect Your Custom Domain (5 min)

### If You Already Own priyaherbal.com:

In Vercel Dashboard:
1. Go to your project
2. Click **Settings** → **Domains**
3. Enter: `priyaherbal.com`
4. Select: "Redirect www to non-www"
5. Add both `priyaherbal.com` and `www.priyaherbal.com`

You'll get DNS records to add. Go to your domain registrar (GoDaddy, Namecheap, etc.):
1. Find DNS settings
2. Add the records Vercel shows
3. Wait 10-30 minutes for DNS to update
4. Visit priyaherbal.com - It should load your site!

### If You Don't Have a Domain Yet:

1. Go to Namecheap.com or GoDaddy.com
2. Search for `priyaherbal.com` or similar
3. Buy the domain
4. Once purchased, follow the DNS steps above

## Step 8: Your Site is Live! 🎉

You can now:
- Visit `priyaherbal.com`
- Share with customers
- Add more products to Supabase
- Process real orders
- Track analytics on Vercel

## After Launch - What to Do Next

### Immediate (Day 1):
- [ ] Test login/signup on production
- [ ] Test adding products to cart
- [ ] Mobile test on real phone
- [ ] Test WhatsApp widget

### This Week:
- [ ] Add your real product photos to Supabase
- [ ] Update product descriptions
- [ ] Add your contact information
- [ ] Test payment with Cashfree (if using)

### Before Taking Orders:
- [ ] Set up email notifications (SendGrid)
- [ ] Configure Cashfree payments for LIVE (not TEST mode)
- [ ] Test complete checkout flow
- [ ] Get SSL certificate (automatic on Vercel)

## Troubleshooting Deploy Issues

**"Cannot find module" error**
- Solution: Run `npm install` before committing to GitHub

**Database doesn't work after deploy**
- Solution: Make sure ALL environment variables are in Vercel Settings

**White page after deploying**
- Solution: Check Vercel Deployments tab for error logs

**Domain not working**
- Solution: DNS takes time. Wait 30 minutes and try again

## Final Checklist Before Sharing

- [ ] Home page works and looks good
- [ ] Products show on /shop
- [ ] Can sign up and login
- [ ] Cart system works
- [ ] About page shows correct info
- [ ] Contact form works
- [ ] Blog loads
- [ ] Mobile responsive
- [ ] No console errors (F12)
- [ ] All images load

## Production URLs

- **Live Site**: https://priyaherbal.com
- **Admin Panel**: https://priyaherbal.com/protected/account (after login)
- **API**: https://priyaherbal.com/api/*
- **Database**: Supabase dashboard (keep private!)

## Keep It Running

Every month:
- [ ] Check Vercel Analytics
- [ ] Review Supabase usage
- [ ] Update products if needed
- [ ] Backup database manually (Supabase does this auto)
- [ ] Monitor error logs

That's it! Your professional e-commerce site is live! 🚀
