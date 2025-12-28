# How to Add Missing Information & Configuration

## Table of Contents
1. [Product Images](#product-images)
2. [Environment Variables](#environment-variables)
3. [Database Configuration](#database-configuration)
4. [Payment Gateway Setup](#payment-gateway)
5. [Email Configuration](#email-configuration)
6. [Supabase Storage for Images](#image-storage)

---

## Product Images

### Option 1: Use Existing Placeholder Images (Default)
The platform comes with placeholder images from `/placeholder.svg`. These automatically generate based on query parameters.

### Option 2: Add Real Product Images

#### Step 1: Prepare Your Images
```
Create a folder: public/products/
Add your product images:
  public/products/neem-hair-oil.jpg
  public/products/turmeric-face-pack.jpg
  public/products/ashwagandha.jpg
  etc.
```

#### Step 2: Update Product Data in Database

**In Supabase Dashboard:**
1. Go to **SQL Editor**
2. Update products with real image URLs:

```sql
UPDATE public.products 
SET image_url = '/products/neem-hair-oil.jpg'
WHERE slug = 'neem-hair-oil';

UPDATE public.products 
SET image_url = '/products/turmeric-face-pack.jpg'
WHERE slug = 'turmeric-face-pack';

-- Repeat for all products
```

#### Step 3: Add Multiple Images for Carousel

Update product variants with multiple images:

```sql
UPDATE public.products 
SET images = '[
  "/products/neem-hair-oil-1.jpg",
  "/products/neem-hair-oil-2.jpg",
  "/products/neem-hair-oil-3.jpg"
]'::jsonb
WHERE slug = 'neem-hair-oil';
```

#### Step 4: Or Use Supabase Storage (Recommended for Production)

1. Go to **Storage** in Supabase dashboard
2. Create new bucket: `product-images`
3. Upload your images
4. Update database with public URLs:

```sql
UPDATE public.products 
SET image_url = 'https://[your-project].supabase.co/storage/v1/object/public/product-images/neem-hair-oil.jpg'
WHERE slug = 'neem-hair-oil';
```

---

## Environment Variables

### Required Variables - Add These to Your Project

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Environment Variables**

**Or in Local Development:**
Create file `.env.local`:

```bash
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Cashfree (REQUIRED for payments)
NEXT_PUBLIC_CASHFREE_KEY_ID=your-public-key-id
CASHFREE_SECRET_KEY=your-secret-key (KEEP SECRET!)
NEXT_PUBLIC_CASHFREE_MODE=TEST  # or PROD

# Optional - Email
SENDGRID_API_KEY=SG.your-api-key
```

### How to Get Each Key

#### Supabase Keys:
```
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click Settings (gear icon) → API
4. Copy "Project URL" → NEXT_PUBLIC_SUPABASE_URL
5. Copy "anon public" key → NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### Cashfree Keys:
```
1. Go to https://dashboard.cashfree.com
2. Login to your account
3. Go to Account → API Keys
4. Copy "Key ID" → NEXT_PUBLIC_CASHFREE_KEY_ID
5. Copy "Secret Key" → CASHFREE_SECRET_KEY
6. Use TEST keys first, then PROD
```

#### SendGrid Keys (Optional):
```
1. Go to https://app.sendgrid.com
2. Click Settings → API Keys
3. Create new API Key with "Mail Send" permission
4. Copy the key → SENDGRID_API_KEY
```

---

## Database Configuration

### Step 1: Verify Tables Exist

**In Supabase Dashboard:**
1. Go to **Database** → **Tables** (left sidebar)
2. You should see these tables:
   - ✓ products
   - ✓ product_variants
   - ✓ profiles
   - ✓ cart_items
   - ✓ orders
   - ✓ order_items
   - ✓ reviews
   - ✓ user_roles
   - ✓ affiliates
   - ✓ commission_transactions
   - ✓ payment_transactions
   - ✓ order_tracking_events

If any are missing, go to **SQL Editor** and run `scripts/001_create_tables.sql`.

### Step 2: Add Sample Data

If products table is empty:

**In Supabase SQL Editor:**
```sql
-- Run all scripts in order:
-- 1. Copy content of scripts/001_create_tables.sql and run
-- 2. Copy content of scripts/002_seed_products.sql and run
-- 3. Copy content of scripts/003_enhanced_affiliate_tables.sql and run
-- 4. Copy content of scripts/004_seed_affiliate_data.sql and run
```

### Step 3: Enable Row Level Security (RLS)

All tables should have RLS enabled automatically. To verify:

1. Go to **Database** → **Tables**
2. Click on each table → **RLS** tab
3. Confirm "Enable RLS" is checked and policies exist

---

## Payment Gateway Setup

### Cashfree Configuration

#### Step 1: Create Cashfree Account
```
1. Go to https://www.cashfree.com
2. Sign up as a Business
3. Verify your email and phone
4. Complete KYC (identity verification)
5. Wait for approval (usually 1-2 hours)
```

#### Step 2: Get API Keys
```
1. Log in to https://dashboard.cashfree.com
2. Go to Account → API Keys
3. You'll see two environments:
   - TEST: for development & testing
   - PROD: for live payments
4. Copy keys from TEST first:
   - Client ID → NEXT_PUBLIC_CASHFREE_KEY_ID
   - Client Secret → CASHFREE_SECRET_KEY
```

#### Step 3: Set Payment Mode
```
# In your .env.local or Vercel env vars:
NEXT_PUBLIC_CASHFREE_MODE=TEST    # for development
NEXT_PUBLIC_CASHFREE_MODE=PROD    # for production
```

#### Step 4: Configure Webhook (Important!)
```
1. In Cashfree Dashboard → Settings → Webhooks
2. Add Webhook URL: https://yourdomain.com/api/payments/cashfree/webhook
3. Subscribe to events:
   - payment.success
   - payment.failed
   - payment.cancelled
4. Cashfree will send payment updates to your webhook
5. Your app automatically updates order status
```

#### Step 5: Test Payment
```
Use these test credentials:
- UPI: success@okhdfcbank (any UPI ID)
- Card: 4111 1111 1111 1111
  Expiry: 12/25
  CVV: 123
- Net Banking: Select any bank, auto-success
```

---

## Email Configuration

### Option 1: Use Supabase Email (Default)
Supabase sends authentication emails automatically.

### Option 2: SendGrid for Custom Emails

#### Step 1: Create SendGrid Account
```
1. Go to https://sendgrid.com
2. Sign up (free tier available)
3. Verify your domain
4. Create API key with Mail Send permission
```

#### Step 2: Add API Key
```
In .env.local or Vercel:
SENDGRID_API_KEY=SG.your-api-key
```

#### Step 3: Update Email Route
The `/api/emails/send-order-confirmation` route will use SendGrid if key is present.

---

## Image Storage

### Option 1: Local Public Folder (Development)
Images in `public/` folder are served directly.

### Option 2: Supabase Storage (Recommended)

#### Step 1: Create Storage Bucket
```
1. In Supabase Dashboard → Storage (left sidebar)
2. Click "Create new bucket"
3. Name: "product-images"
4. Make it Public
```

#### Step 2: Upload Images
```
1. Click bucket → Upload File
2. Select your product images
3. Copy the public URL for each
```

#### Step 3: Update Database
```sql
UPDATE public.products 
SET image_url = 'https://[your-project].supabase.co/storage/v1/object/public/product-images/image-name.jpg'
WHERE slug = 'product-slug';
```

---

## Verification Checklist

After adding all missing information, verify:

- [ ] All environment variables set in Vercel
- [ ] Supabase connection working (test in browser console)
- [ ] All SQL scripts executed
- [ ] Product images displaying on `/shop` page
- [ ] Adding to cart works (user must be logged in)
- [ ] Checkout page loads with cart items
- [ ] Payment gateway test works
- [ ] Order confirmation email sends
- [ ] Order tracking page shows status
- [ ] Affiliate dashboard loads (if affiliate user)

---

## Troubleshooting

### "Products Not Showing"
```
1. Check: Are SQL scripts run? (check Supabase tables)
2. Check: Are images configured? (update image_url in database)
3. Check: Is RLS blocking? (try disabling temporarily to test)
```

### "Checkout Page Blank"
```
1. Check: Are you logged in?
2. Check: Do you have items in cart?
3. Check: Check browser console for errors
```

### "Payment Gateway Not Working"
```
1. Check: Is CASHFREE_SECRET_KEY set? (server only)
2. Check: Are you using TEST mode for dev?
3. Check: Are Supabase env vars correct?
```

### "Emails Not Sending"
```
1. Check: Is SendGrid configured?
2. Check: Check email logs in Supabase (email_logs table)
3. Check: Try Supabase auth email first
```

---

**If you're still stuck, check COMPLETE_SETUP_GUIDE.md for more detailed instructions.**
