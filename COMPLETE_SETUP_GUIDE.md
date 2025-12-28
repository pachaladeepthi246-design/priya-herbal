# PriyaHerbal E-Commerce Platform - Complete Setup & Deployment Guide

## Table of Contents
1. [Database Setup (SQL Scripts)](#database-setup)
2. [Environment Variables Configuration](#environment-variables)
3. [Supabase Configuration](#supabase-configuration)
4. [Payment Gateway Setup (Cashfree)](#payment-gateway)
5. [Running the Application](#running-application)
6. [Complete User Flows](#user-flows)
7. [Deployment to Production](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Database Setup

### Step 1: Run SQL Migration Scripts in Order

**Your database is created automatically** when you first access the app. The `DatabaseInit` component runs all SQL scripts on page load.

**If you need to manually run scripts in Supabase SQL Editor:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → **SQL Editor** (left sidebar)
3. Create a new query and paste each SQL script in order:
   - `scripts/001_create_tables.sql` - Core tables (products, orders, cart, users, etc.)
   - `scripts/002_seed_products.sql` - 11 sample herbal products
   - `scripts/003_enhanced_affiliate_tables.sql` - Affiliate/commission system
   - `scripts/004_seed_affiliate_data.sql` - Sample affiliate data

4. Run each script individually by clicking "Execute" or Ctrl+Enter

### What Each Script Creates

| Script | Tables Created | Purpose |
|--------|---|---|
| 001_create_tables.sql | profiles, products, product_variants, cart_items, orders, order_items, reviews, blog_posts, newsletter_subscribers, contact_submissions, referrals | Core e-commerce functionality |
| 002_seed_products.sql | (Inserts into products) | 11 sample herbal products with prices ₹179-₹599 |
| 003_enhanced_affiliate_tables.sql | user_roles, affiliates, commission_transactions, affiliate_clicks, commission_levels, payment_transactions, order_tracking_events, email_logs, webhook_events | Affiliate marketing system |
| 004_seed_affiliate_data.sql | (Inserts into affiliate tables) | Sample affiliate accounts with commission structures |

**Row Level Security (RLS)** is automatically enabled on all tables to ensure users can only access their own data.

---

## Environment Variables Configuration

### Required Variables in Vercel/Local .env.local

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Cashfree Payment Gateway (Required for payments)
NEXT_PUBLIC_CASHFREE_KEY_ID=your-public-key-id
CASHFREE_SECRET_KEY=your-secret-key-here
NEXT_PUBLIC_CASHFREE_MODE=TEST  # Change to PROD for live payments

# SendGrid Email (Optional - for email notifications)
SENDGRID_API_KEY=your-sendgrid-api-key

# Domain Configuration
DOMAIN=priyaherbal.com  # Your actual domain
```

### How to Get These Keys

#### Supabase Keys:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. **Settings** → **API** (left sidebar)
4. Copy `Project URL` and `anon public key`
5. Set `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` to your local dev URL or production URL

#### Cashfree Keys:
1. Go to [Cashfree Dashboard](https://dashboard.cashfree.com)
2. **Account** → **API Keys** (left sidebar)
3. Copy `Key ID` (public) and `Secret Key` (keep secret!)
4. Use **Test** environment first, then switch to **Prod**

#### SendGrid (Optional):
1. Go to [SendGrid Dashboard](https://app.sendgrid.com)
2. **Settings** → **API Keys**
3. Create a new key with Mail Send permission

---

## Supabase Configuration

### Step 1: Enable Authentication Methods

1. Go to **Authentication** → **Providers** (left sidebar)
2. Enable these providers:
   - **Email/Password** - Already enabled by default
   - **Google OAuth** (Optional):
     - Go to [Google Cloud Console](https://console.cloud.google.com)
     - Create OAuth 2.0 credentials
     - Copy Client ID and Secret to Supabase

### Step 2: Configure Email Verification

1. Go to **Authentication** → **Email Templates**
2. Customize "Verify Email" template with your branding
3. Set sender email (e.g., noreply@priyaherbal.com)

### Step 3: Check Row Level Security (RLS)

All RLS policies are created automatically. To verify:

1. Go to **Database** → **Tables** (left sidebar)
2. Select each table and click **RLS** tab
3. Confirm policies are present for your role (auth.uid())

---

## Payment Gateway Setup (Cashfree)

### Cashfree Configuration

1. **Create Cashfree Account**: [Sign Up](https://www.cashfree.com)
2. **Go to Dashboard** → **Settings** → **API Keys**
3. **Test Mode Keys** (for development):
   - Copy `Client ID` → `NEXT_PUBLIC_CASHFREE_KEY_ID`
   - Copy `Client Secret` → `CASHFREE_SECRET_KEY`
   - Set `NEXT_PUBLIC_CASHFREE_MODE=TEST`

4. **Production Mode Keys** (when going live):
   - Switch to Production keys in Cashfree
   - Update environment variables
   - Set `NEXT_PUBLIC_CASHFREE_MODE=PROD`

### Webhook Configuration (For Order Updates)

1. In Cashfree Dashboard → **Settings** → **Webhooks**
2. Add webhook URL: `https://your-domain.com/api/payments/cashfree/webhook`
3. Subscribe to events:
   - `payment.success`
   - `payment.failed`
   - `payment.cancelled`

### Testing Payments in Test Mode

Use these test card numbers:
- **UPI**: Use any UPI ID (e.g., success@okhdfcbank)
- **Card**: `4111 1111 1111 1111` (any future date, any CVV)
- **Net Banking**: Select any bank, success will be automatic

---

## Running the Application

### Local Development

```bash
# 1. Install dependencies
npm install
# or
pnpm install

# 2. Create .env.local with your variables
cp .env.example .env.local
# Then edit .env.local with your actual keys

# 3. Run development server
npm run dev
# or
pnpm dev

# App will be at http://localhost:3000
```

### Build for Production

```bash
# 1. Build the app
npm run build

# 2. Start production server
npm run start

# 3. Or use Vercel deployment (recommended)
# See Deployment section below
```

---

## Complete User Flows

### 1. Customer Shopping Flow

**Path**: Home → Shop → Product Detail → Add to Cart → Checkout → Payment → Order Confirmation

```
Home Page (/):
  ├─ Hero banner with herbal imagery
  ├─ Featured products grid (10 items)
  ├─ Testimonials slider
  ├─ WhatsApp widget (+91 8500 647 979)
  └─ Trust badges (Free shipping, Money back guarantee)

Shop Page (/shop):
  ├─ Category filters (Hair/Skin/Immunity/Wellness)
  ├─ Product cards with images
  ├─ Price filtering & sorting
  └─ [Click] → Product Detail Page

Product Detail Page (/product/[id]):
  ├─ Image carousel (multiple product images)
  ├─ Description & long description
  ├─ Variant selector (if available)
  ├─ Reviews & ratings
  ├─ [Add to Cart] → Cart updated
  └─ Related products

Shopping Cart Page (/cart):
  ├─ Cart items with quantity controls
  ├─ Pricing breakdown:
  │  ├─ Subtotal
  │  ├─ Free shipping (if >₹499)
  │  ├─ Tax (5%)
  │  └─ Total
  ├─ [Proceed to Checkout] button
  └─ Continue Shopping link

Checkout Page (/checkout):
  ├─ Customer Info Form:
  │  ├─ Email address
  │  └─ Phone number
  ├─ Shipping Address Form:
  │  ├─ Street address
  │  ├─ City
  │  ├─ State
  │  └─ Postal code
  ├─ Payment Method Selection:
  │  ├─ UPI (recommended)
  │  ├─ Card (Visa/Mastercard)
  │  └─ Net Banking (all banks)
  ├─ Order Summary (right panel)
  └─ [Place Order & Pay] → Redirects to Cashfree Payment

Cashfree Payment Window:
  ├─ Customer completes payment
  └─ Redirects to Order Confirmation

Order Confirmation Page (/order-confirmation):
  ├─ Order number displayed
  ├─ Order items & total
  ├─ Delivery timeline
  ├─ Tracking number (when available)
  └─ Email sent to customer
```

### 2. Authentication Flow

**Path**: Sign Up → Email Verification → Account Setup → Login

```
Sign Up Page (/auth/sign-up):
  ├─ Email input
  ├─ Password input (minimum 6 chars)
  ├─ Confirm password
  ├─ [Create Account] button
  └─ Login link

Email Verification (/auth/email-verified):
  ├─ Check confirmation sent message
  ├─ Click link in email to verify
  └─ Account activated

Account Setup Page (if new user):
  ├─ First name
  ├─ Last name
  ├─ Phone number
  ├─ Address details
  └─ Role selection (Customer/Affiliate)

Login Page (/auth/login):
  ├─ Email input
  ├─ Password input
  ├─ [Sign In] button
  └─ Sign up link

Protected Account Page (/protected/account):
  ├─ Profile information
  ├─ Order history
  ├─ Saved addresses
  └─ Account settings
```

### 3. Affiliate Program Flow

**Path**: Sign Up → Become Affiliate → Get Referral Link → Track Sales → Earn Commissions → Withdraw Earnings

```
Affiliate Sign Up:
  1. User signs up with email/password
  2. Selects "Affiliate" role during registration
  3. Affiliate account automatically created with:
     ├─ Unique affiliate code (e.g., PRIYA_ABC123)
     ├─ Referral link (priyaherbal.com?ref=PRIYA_ABC123)
     ├─ Commission rate (starts at 10%, increases with tier)
     └─ Dashboard access

Affiliate Dashboard (/affiliate/dashboard):
  ├─ Performance Stats:
  │  ├─ Total clicks
  │  ├─ Conversion rate
  │  ├─ Total sales
  │  └─ Earnings (pending & paid)
  ├─ Commission Breakdown:
  │  ├─ Direct sales (10% commission)
  │  ├─ Referred affiliate sales (3-5% multilevel)
  │  └─ Tier bonuses (Bronze, Silver, Gold, Platinum)
  ├─ Referral Link Management:
  │  ├─ Copy unique link
  │  ├─ Share on social media
  │  └─ View click history
  ├─ Commission History:
  │  ├─ Pending commissions (30 days)
  │  ├─ Approved commissions
  │  └─ Paid commissions
  ├─ Payment Methods:
  │  ├─ UPI ID input
  │  ├─ Bank account details
  │  └─ Tax information (TAN/PAN)
  └─ [Request Payout] when threshold reached (₹500)

Order Tracking (for Affiliate):
  ├─ See which customers came from your link
  ├─ Track order status in real-time
  └─ Commission credited when order delivered
```

### 4. Order Tracking & Delivery Flow

**Path**: Order Placed → Payment Confirmed → Processing → Shipped → Out for Delivery → Delivered

```
Order Status Timeline:

1. PENDING (Order created):
   ├─ Awaiting payment confirmation
   └─ Email: "Order Received - Payment Pending"

2. CONFIRMED (Payment successful):
   ├─ Payment verified by Cashfree
   ├─ Inventory updated
   └─ Email: "Payment Confirmed - Order Processing"

3. PROCESSING (Packing):
   ├─ Order picked from warehouse
   ├─ Items packed in box
   └─ Email: "Your Order is Being Prepared"

4. SHIPPED (Handed to courier):
   ├─ Tracking number assigned
   ├─ Handed to courier/delivery partner
   └─ Email: "Order Shipped" + Tracking number

5. IN_TRANSIT (On the way):
   ├─ Package in transit
   └─ Status updates via tracking

6. OUT_FOR_DELIVERY (Last mile):
   ├─ Delivery today expected
   ├─ Driver contact details (if available)
   └─ Email: "Out for Delivery Today"

7. DELIVERED (Completed):
   ├─ Package delivered to address
   ├─ Signature/OTP confirmed
   ├─ Email: "Order Delivered"
   ├─ Affiliate commission credited
   └─ Request review link sent

8. CANCELLED (If needed):
   ├─ Order cancelled
   ├─ Refund initiated
   └─ Email: "Order Cancelled - Refund Initiated"

Tracking Page (/order-tracking/[id]):
  ├─ Order number & date
  ├─ Timeline of status changes:
  │  ├─ Timestamp
  │  ├─ Status
  │  ├─ Location (if available)
  │  └─ Description
  ├─ Shipping address
  ├─ Tracking number (if shipped)
  ├─ Estimated delivery date
  └─ Contact support link
```

---

## Deployment to Production

### Option 1: Deploy to Vercel (Recommended)

**Vercel is the easiest and fastest way to deploy Next.js apps.**

1. **Connect GitHub Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Select your GitHub repository (pachaladeepthi246-design/priya-herbal)
   - Click **Import**

2. **Configure Environment Variables**:
   - In Vercel project settings → **Environment Variables**
   - Add all variables from COMPLETE_SETUP_GUIDE.md:
     ```
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     CASHFREE_SECRET_KEY=...
     NEXT_PUBLIC_CASHFREE_KEY_ID=...
     NEXT_PUBLIC_CASHFREE_MODE=TEST (change to PROD later)
     ```

3. **Deploy**:
   - Click **Deploy**
   - Wait for build to complete (~5 minutes)
   - Your site is live at `https://priya-herbal.vercel.app`

4. **Set Custom Domain**:
   - **Settings** → **Domains**
   - Add custom domain (priyaherbal.com)
   - Update DNS records as shown
   - Wait for SSL certificate (5-10 minutes)

### Option 2: Deploy to Railway/Render/DigitalOcean

If you prefer self-hosting:

**Railway.app** (Easiest after Vercel):
1. Sign up at [Railway.app](https://railway.app)
2. Connect GitHub
3. Create new project from repository
4. Add environment variables
5. Deploy automatically

### Important After Deployment

1. **Update Supabase Redirect URL**:
   - Go to Supabase → Authentication → URL Configuration
   - Add production URL: `https://priyaherbal.com` (your custom domain)

2. **Enable CORS for Cashfree**:
   - Cashfree may require your domain for CORS
   - Contact support or configure in dashboard

3. **Update Cashfree Keys**:
   - After successful testing with TEST keys
   - Switch to PROD keys from Cashfree dashboard
   - Update `NEXT_PUBLIC_CASHFREE_MODE=PROD`

---

## Troubleshooting

### Common Issues & Solutions

#### 1. "Authentication Error: Invalid redirect URL"
```
Problem: After sign up, redirect fails
Solution:
  1. Go to Supabase → Authentication → URL Configuration
  2. Add your domain: https://yourdomain.com
  3. Also add localhost:3000 for development
```

#### 2. "Payment Failed: Invalid Merchant Key"
```
Problem: Cashfree payment doesn't work
Solution:
  1. Check NEXT_PUBLIC_CASHFREE_KEY_ID is set correctly
  2. Ensure CASHFREE_SECRET_KEY is not exposed (no NEXT_PUBLIC_)
  3. For TEST mode: keys must be from TEST environment
  4. For PROD mode: keys must be from PRODUCTION environment
```

#### 3. "Cart is Empty When Checking Out"
```
Problem: Cart items not loading
Solution:
  1. User not logged in → must sign up first
  2. Products not in database → run SQL scripts
  3. Check Row Level Security (RLS) on cart_items table
```

#### 4. "Email Verification Not Sending"
```
Problem: Users don't receive verification email
Solution:
  1. Check Supabase email settings (might be in non-prod mode)
  2. Provide SendGrid API key for custom email
  3. Check spam folder
  4. Manually verify user in Supabase dashboard
```

#### 5. "404 Error: Product Not Found"
```
Problem: Product pages show 404
Solution:
  1. Ensure SQL scripts have run (check Supabase tables)
  2. Check product slug matches in database
  3. Clear Next.js cache: rm -rf .next && npm run build
```

#### 6. "Affiliate Commission Not Credited"
```
Problem: Affiliate doesn't see commission
Solution:
  1. Check order status is "delivered" (not just "paid")
  2. Verify affiliate code was used in referral link
  3. Check commission_transactions table in Supabase
  4. Affiliate must have tier (bronze/silver/gold/platinum)
```

---

## Production Checklist

Before going live:

- [ ] All SQL scripts executed successfully
- [ ] Supabase RLS policies enabled
- [ ] Supabase authentication configured
- [ ] Cashfree TEST keys working for payment testing
- [ ] SendGrid configured (or use Supabase email)
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Environment variables set in production
- [ ] Backups configured
- [ ] Analytics configured (Vercel Analytics included)
- [ ] Email templates customized
- [ ] Affiliate program tested end-to-end
- [ ] Order tracking working
- [ ] Webhook receiving Cashfree events
- [ ] Admin can see orders & affiliates
- [ ] Mobile responsiveness verified

---

## Support & Documentation

- **Supabase Docs**: https://supabase.com/docs
- **Cashfree Docs**: https://docs.cashfree.com
- **Next.js Docs**: https://nextjs.org/docs
- **v0 Documentation**: https://v0.app

---

**Your PriyaHerbal platform is ready to launch! Follow this guide step-by-step and you'll be live in 30 minutes.**
