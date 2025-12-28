# PriyaHerbal Setup Guide - Step by Step (Non-Technical)

## What You Need (Before Starting)
- Gmail or any email address
- 15 minutes of time
- No technical knowledge required!

---

## STEP 1: Create Supabase Account (5 minutes)

1. **Go to:** https://supabase.com
2. **Click:** "Start your project" or "Sign up"
3. **Enter:** Your email and create password
4. **Verify:** Email confirmation (check inbox/spam)
5. **Create Project:**
   - Click "New Project"
   - Name: `priya-herbal` (any name is fine)
   - Password: Create strong password (save it!)
   - Region: Choose Asia (India if available)
   - Click "Create New Project"
6. **Wait:** 2-3 minutes for project to initialize
7. **Your Dashboard Opens:** Save this URL - you'll use it often!

**Next:** Copy your credentials
- Click ⚙️ **Settings** (gear icon in left sidebar)
- Click **API**
- Copy these two and save in a notepad:
  - `Project URL` (looks like: https://xyzabc.supabase.co)
  - `anon public` key (long text starting with `eyJ...`)

---

## STEP 2: Create Cashfree Account (5 minutes)

1. **Go to:** https://cashfree.com
2. **Click:** "Get Started" or "Sign Up"
3. **Choose:** "Business Account"
4. **Enter Your Details:**
   - Business Name: Your shop name
   - Email: Your email
   - Phone: Your phone number
   - City: Your city
   - Accept terms and click "Continue"
5. **Verify:** Check email for confirmation
6. **Your Account Ready:** Login with your email/password

**Next:** Get API Keys (for testing payments)
- Login to: https://dashboard.cashfree.com
- Go to **Account** (left menu)
- Click **API Keys**
- You see two sections: TEST and PROD
- Under **TEST**, copy and save:
  - `Key ID` (short code)
  - `Secret Key` (long text)

*Important: Keep these SECRET keys safe! Don't share them.*

---

## STEP 3: Deploy on Vercel (5 minutes)

1. **Go to:** https://vercel.com
2. **Sign Up:** Use GitHub account (or create account)
3. **Connect GitHub:**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub
4. **Import Project:**
   - Click "Import Project"
   - Enter URL: `https://github.com/pachaladeepthi246-design/priya-herbal`
   - Click "Import"
5. **Add Environment Variables:**
   - You'll see "Environment Variables" section
   - Click each field and add your saved credentials:

```
NEXT_PUBLIC_SUPABASE_URL = [your Supabase URL from Step 1]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [your Supabase anon key from Step 1]
NEXT_PUBLIC_CASHFREE_KEY_ID = [your Cashfree Key ID from Step 2]
CASHFREE_SECRET_KEY = [your Cashfree Secret Key from Step 2]
NEXT_PUBLIC_CASHFREE_MODE = TEST
```

6. **Deploy:**
   - Click **Deploy**
   - Wait 5-10 minutes
   - You see a green "Congratulations!" message
   - Your site is LIVE! 🎉

**Copy your URL** (looks like: `https://priya-herbal.vercel.app`)

---

## STEP 4: Run Database Setup (3 minutes)

1. **Go back to:** Supabase Dashboard (save it bookmarked!)
2. **Click:** **SQL Editor** (left sidebar)
3. **Create New Query:**
   - Click "New Query" button
   - Copy ALL text from this file: `scripts/001_create_tables.sql`
   - Paste into Supabase SQL Editor
   - Click **Execute** (or Ctrl+Enter)
   - Wait for success message ✓

4. **Repeat for 3 More Scripts:**
   - `scripts/002_seed_products.sql` (add products)
   - `scripts/003_enhanced_affiliate_tables.sql` (add affiliate features)
   - `scripts/004_seed_affiliate_data.sql` (add affiliate data)

Each script takes 10-30 seconds. Done! ✓

---

## STEP 5: Test Everything Works (2 minutes)

1. **Go to your live URL:** https://priya-herbal.vercel.app (or your custom domain)
2. **Test Signup:**
   - Click "Sign Up"
   - Enter test email: `test@example.com`
   - Enter password: `TestPassword123!`
   - Click "Sign Up"
   - Check email (might be in spam)
   - Click verification link
3. **Test Shopping:**
   - Go to /shop page
   - Click on any product
   - Click "Add to Cart"
   - Go to /cart
   - Click "Checkout"
4. **Test Payment (TEST MODE):**
   - Fill form with:
     - Name: Test Name
     - Phone: 9876543210
     - Address: Test Address
     - City: Mumbai
   - Click "Pay with Cashfree"
   - Use test card: `4111 1111 1111 1111`
   - Expiry: `12/25` (any future)
   - CVV: `123`
   - Click "Pay"
   - Success! ✓

---

## You're Done! 🎉

Your e-commerce store is now **LIVE** and **WORKING**.

### What's Next?

**Add Real Products:**
1. Supabase Dashboard
2. Click **Database** → **products** table
3. Click ➕ **Insert row**
4. Fill in product details
5. Done!

**Add Product Images:**
1. Supabase Dashboard
2. Click **Storage**
3. Click **Create New Bucket** → Name it `product-images`
4. Upload your images
5. Update product image_url in database

**Go Live with Real Payments:**
1. Get PROD keys from Cashfree
2. Update `NEXT_PUBLIC_CASHFREE_MODE` to `PROD`
3. Update Cashfree keys in Vercel
4. Done!

---

## Need Help?

**WhatsApp:** +91 8500 647 979
**Email:** hello@priyaherbal.com

Check these files for more help:
- `START_HERE.md` - Quick overview
- `COMPLETE_SETUP_GUIDE.md` - Detailed technical guide
- `HOW_TO_ADD_IF_MISSING.md` - Add products, images, etc

**Congratulations! You have a professional e-commerce platform!** 🚀
