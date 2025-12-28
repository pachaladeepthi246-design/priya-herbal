# PriyaHerbal E-Commerce Platform - START HERE

Welcome! This document explains everything you need to know to launch your platform.

## What You Have

A **complete, production-ready e-commerce platform** with:
- 11 herbal products with real details and pricing (₹179-₹599)
- Full user authentication (signup, email verification, login)
- Shopping cart and checkout system
- Cashfree payment integration (UPI, Cards, Net Banking)
- Real-time order tracking with status updates
- Affiliate/reseller program with commission tracking
- Admin dashboard for managing orders and affiliates
- Responsive mobile design with smooth animations
- Secure database with Row Level Security
- Email notifications for orders and confirmations

## Quick Start (5 Steps)

### Step 1: Get Your Credentials
You need 3 things to make the app work:

**A. Supabase Account:**
- Go to https://supabase.com
- Create free account
- Create a new project (Region: Asia, choose India if available)
- Copy your credentials

**B. Cashfree Account:**
- Go to https://cashfree.com
- Sign up as a Business
- Complete verification (1-2 hours)
- Get TEST API keys for development

**C. Vercel Account (for deployment):**
- Go to https://vercel.com
- Connect your GitHub repository (pachaladeepthi246-design/priya-herbal)

### Step 2: Add Environment Variables

**In Vercel Dashboard** (or `.env.local` locally):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_CASHFREE_KEY_ID=your-key-id
CASHFREE_SECRET_KEY=your-secret-key
NEXT_PUBLIC_CASHFREE_MODE=TEST
```

Get these values:
- Supabase URL/key: Supabase Dashboard → Settings → API
- Cashfree keys: Cashfree Dashboard → Account → API Keys

### Step 3: Run SQL Scripts

**In Supabase SQL Editor:**
1. Go to your Supabase project
2. Click **SQL Editor** (left sidebar)
3. Create new query
4. Copy & paste `scripts/001_create_tables.sql`
5. Click **Execute** or Ctrl+Enter
6. Repeat for scripts 002, 003, 004 in order

**Or:** Scripts run automatically on first page load!

### Step 4: Deploy to Vercel

**Already configured?**
- Go to https://vercel.com
- Connect your GitHub repo
- Environment variables already set?
- Click **Deploy**
- Wait 5-10 minutes
- Your site is live!

### Step 5: Test Everything

**Test user flow:**
1. Go to your live URL (https://priya-herbal.vercel.app or custom domain)
2. Sign up with test email
3. Verify email (check inbox/spam)
4. Browse products on /shop
5. Add item to cart
6. Go to /checkout
7. Use test card: 4111 1111 1111 1111 (any date, any CVV)
8. Complete payment
9. See order confirmation

**Done!** Your e-commerce platform is live.

---

## What Each File Does

### Documentation Files
- **COMPLETE_SETUP_GUIDE.md** - Detailed setup with screenshots
- **HOW_TO_ADD_IF_MISSING.md** - Add product images, configure payment, etc
- **FINAL_DEPLOYMENT_CHECKLIST.md** - Launch verification steps
- **START_HERE.md** - This file!

### App Structure
```
/app
  /page.tsx              - Home page with hero & featured products
  /shop                  - Product listing with filters
  /product/[id]          - Product detail page
  /cart                  - Shopping cart
  /checkout              - Payment & shipping form
  /order-confirmation    - After successful payment
  /order-tracking/[id]   - Track order status
  /auth/sign-up          - User registration
  /auth/login            - User login
  /protected/account     - User dashboard
  /affiliate/dashboard   - Affiliate program
  /admin/dashboard       - Admin management
  /api/...               - Backend APIs

/components
  /home                  - Hero, products, testimonials
  /product               - Carousel, reviews, variants
  /shop                  - Filters, product cards
  /ui                    - Reusable components

/lib
  /supabase              - Database connection
  /api                   - Data fetching functions
```

### Database Tables
- **products** - 11 herbal products with prices
- **orders** - Customer orders
- **cart_items** - Shopping cart items
- **affiliates** - Reseller accounts
- **payment_transactions** - Payment records
- **order_tracking_events** - Delivery status

All tables have Row Level Security for data protection.

---

## Key Features Explained

### 1. Shopping Experience
- Browse 11 herbal products
- Filter by category (Hair/Skin/Immunity/Wellness)
- View details, reviews, ratings
- Add to cart
- Checkout with shipping info
- Pay via UPI, Card, or Net Banking
- Track order in real-time

### 2. User Accounts
- Create account with email/password
- Verify email (automatic)
- View order history
- Manage addresses
- Become an affiliate reseller

### 3. Affiliate Program
- Earn 10% commission on referrals
- Share unique referral link
- Track clicks and conversions
- View pending & paid commissions
- Withdraw earnings

### 4. Payment Gateway
- Powered by Cashfree
- Accept UPI, cards, net banking
- Automatic order confirmation
- Webhook for real-time updates
- Secure & PCI compliant

### 5. Order Management
- Automatic status updates (pending → shipped → delivered)
- Real-time tracking timeline
- Email notifications
- Admin dashboard to manage all orders

---

## Contact Information

All contact details are updated throughout the platform:
- **Phone:** +91 8500 647 979
- **WhatsApp:** +91 8500 647 979
- **Available in:**
  - Footer on all pages
  - WhatsApp widget (floating button)
  - Contact page form
  - About page

---

## Testing Payments (Development)

Use these test credentials with Cashfree TEST mode:

**UPI:**
```
success@okhdfcbank
(any UPI ID works in test mode)
```

**Card:**
```
Number: 4111 1111 1111 1111
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
```

**Net Banking:**
- Select any bank
- Auto-successful in test mode

---

## Common Issues & Solutions

### Problem: Can't sign up
**Solution:** Check Supabase authentication settings (Auth → Email)

### Problem: Cart empty at checkout
**Solution:** Must be logged in to use cart

### Problem: Payment fails
**Solution:** 
- Check TEST mode keys are correct
- Verify CASHFREE_SECRET_KEY is in server-only env vars
- Check webhook URL is configured

### Problem: Products not showing
**Solution:**
- Run SQL scripts (scripts/001_create_tables.sql, 002, 003, 004)
- Check Supabase tables exist
- Clear browser cache

### Problem: Images not displaying
**Solution:**
- Add product images to `/public/products/` folder
- Update database with image URLs
- Or use Supabase Storage

### Problem: Slow performance
**Solution:**
- Check Vercel Analytics for errors
- Optimize images (use Next.js Image)
- Check database queries

For more help, see **COMPLETE_SETUP_GUIDE.md** → Troubleshooting section.

---

## Next Steps After Launch

### Week 1: Monitor & Test
- [ ] Test full checkout flow
- [ ] Check order confirmation emails
- [ ] Monitor Vercel analytics
- [ ] Test affiliate program
- [ ] Mobile testing

### Week 2: Switch to Production
- [ ] Get PROD Cashfree keys
- [ ] Update environment variables
- [ ] Test with real payment
- [ ] Verify webhook updates

### Week 3: Marketing
- [ ] Add more products
- [ ] Start affiliate program
- [ ] Social media presence
- [ ] Customer testimonials

### Ongoing
- [ ] Monitor order updates
- [ ] Respond to customer inquiries
- [ ] Track sales metrics
- [ ] Optimize based on user feedback

---

## Files You'll Use Most

### As a Developer
- `app/page.tsx` - Edit home page
- `scripts/002_seed_products.sql` - Add more products
- `.env.local` - Local development variables
- `package.json` - Install dependencies

### As an Admin
- Supabase Dashboard - Manage orders, users, data
- Vercel Dashboard - Monitor traffic, errors, deploy
- Cashfree Dashboard - View payments, payouts
- Email logs (in database) - Check email delivery

### As a Reseller
- `/affiliate/dashboard` - View referral stats
- Unique affiliate link - Share with customers
- Commission dashboard - Track earnings

---

## Support

If stuck at any step:

1. **Check Documentation:**
   - COMPLETE_SETUP_GUIDE.md (detailed instructions)
   - HOW_TO_ADD_IF_MISSING.md (missing configurations)
   - FINAL_DEPLOYMENT_CHECKLIST.md (launch verification)

2. **Contact Support:**
   - Supabase: supabase.com/support
   - Cashfree: support@cashfree.com
   - Vercel: vercel.com/help

3. **WhatsApp Support:**
   - +91 8500 647 979

---

## You're All Set!

Your PriyaHerbal e-commerce platform is ready to launch. Follow the "Quick Start (5 Steps)" above and you'll be live in 30 minutes.

**Questions?** Check the documentation files or reach out via WhatsApp.

**Ready to launch?** Follow COMPLETE_SETUP_GUIDE.md step by step.

Good luck with your e-commerce journey!
