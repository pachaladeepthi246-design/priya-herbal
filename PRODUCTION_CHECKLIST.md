# PriyaHerbal Production Deployment Checklist

## Pre-Deployment Setup

### 1. Supabase Configuration
- [ ] Create Supabase project at https://supabase.com
- [ ] Copy all API keys from Project Settings → API
- [ ] Update `.env.local` with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_JWT_SECRET`

### 2. Database Setup
- [ ] Run migration scripts:
  1. Copy SQL from `scripts/001_create_tables.sql`
  2. Go to Supabase Dashboard → SQL Editor
  3. Create new query and paste the SQL
  4. Execute the query
  5. Repeat for `scripts/002_seed_products.sql` (optional - adds sample data)

### 3. Row Level Security (RLS)
- [ ] Enable RLS on all tables in Supabase
- [ ] Create RLS policies for:
  - `users` table: Users can only read/update their own data
  - `products` table: Anyone can read, only admins can write
  - `orders` table: Users can only read/write their own orders
  - `reviews` table: Users can only read all, write their own

### 4. Email Configuration (Optional but Recommended)
- [ ] Set up SendGrid account
- [ ] Get API key from SendGrid
- [ ] Add `SENDGRID_API_KEY` to environment variables

### 5. Payment Integration (Cashfree)
- [ ] Create Cashfree account
- [ ] Get API credentials
- [ ] Switch from TEST to LIVE mode for production
- [ ] Add to environment: `NEXT_PUBLIC_CASHFREE_KEY_ID`, `CASHFREE_SECRET_KEY`

### 6. Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Add `NEXT_PUBLIC_GA_ID` to environment

## Deployment to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project" and import your GitHub repository
4. In Environment Variables, add all variables from `.env.example`
5. Click Deploy
6. Custom domain setup:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records at your domain provider

## Post-Deployment

- [ ] Test authentication (sign up, login, logout)
- [ ] Test product browsing and filtering
- [ ] Test add to cart functionality
- [ ] Test checkout process
- [ ] Verify WhatsApp widget works
- [ ] Check blog pages load correctly
- [ ] Monitor Vercel Analytics dashboard
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure automated backups for Supabase

## Security Best Practices

- [ ] Never commit `.env.local` to git
- [ ] Use strong JWT secrets
- [ ] Enable RLS on all database tables
- [ ] Regularly rotate API keys
- [ ] Use HTTPS only (automatic on Vercel)
- [ ] Keep dependencies updated
- [ ] Monitor for security vulnerabilities

## Performance Optimization

- [ ] Enable image optimization in next.config.js
- [ ] Configure CDN caching headers
- [ ] Set up database query caching
- [ ] Monitor Core Web Vitals in Vercel Analytics
- [ ] Optimize bundle size with `next/dynamic` code splitting

## Monitoring & Support

- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor database performance
- [ ] Keep logs for debugging
- [ ] Set up customer support system (email or chat)
