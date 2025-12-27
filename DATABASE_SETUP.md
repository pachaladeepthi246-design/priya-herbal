# PriyaHerbal Database Setup Guide

## Quick Start (3 Steps)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Name it "priyaherbal"
4. Create a strong password
5. Wait for project to initialize

### Step 2: Run Database Migrations
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `scripts/001_create_tables.sql` from this project
4. Copy all the SQL
5. Paste into Supabase SQL Editor
6. Click **Run**
7. Wait for success message

### Step 3: Seed Sample Data (Optional)
1. Create another **New Query** in SQL Editor
2. Open `scripts/002_seed_products.sql`
3. Copy all SQL and paste
4. Click **Run**
5. Done! You now have 11 sample products

## Database Schema

### Tables Created:

- **users** - User profiles and preferences
- **products** - Product catalog with prices, images, descriptions
- **categories** - Product categories (Hair Care, Skin Care, etc.)
- **cart** - Shopping cart items per user
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **reviews** - Product reviews and ratings
- **blog_posts** - Blog articles
- **blog_categories** - Blog categories
- **wishlist** - User favorites
- **referrals** - Affiliate/referral tracking

## Environment Variables

After creating your project, copy these from Supabase Dashboard → Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL = (Copy the URL field)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (Copy the "anon" key under Project API Keys)
SUPABASE_SERVICE_ROLE_KEY = (Copy the "service_role" key)
```

Add these to your `.env.local` file in the project root.

## Row Level Security (RLS)

RLS is configured in the SQL migration scripts automatically. Key policies:

- Users can only access their own orders, cart, and wishlist
- All users can read products and reviews
- Products/reviews can only be created/edited by authenticated users
- Admin features require elevated permissions

## Testing the Setup

1. Run `npm run dev`
2. Go to http://localhost:3000
3. Click "Sign Up" and create an account
4. You should receive a confirmation email (check spam folder)
5. After confirming email, you can browse and purchase products

## Troubleshooting

**Issue: Database errors on signup**
- Solution: Make sure all SQL migrations were executed successfully

**Issue: Cannot sign in**
- Solution: Check email confirmation link, or manually verify in Supabase Auth section

**Issue: Missing environment variables**
- Solution: Copy ALL keys from Supabase to `.env.local` file

**Issue: Products not showing**
- Solution: Run the seed script (002_seed_products.sql) to add sample products
