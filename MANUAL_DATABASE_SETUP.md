# Manual Database Setup for PriyaHerbal

Follow these steps to set up your database manually if the automatic script doesn't work.

## Prerequisites
- Supabase account with project created
- Access to Supabase SQL Editor
- All 4 SQL script files ready

## Step-by-Step Manual Setup

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project: **PriuyaHub**
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Execute Script 001 - Create Tables
1. Copy all content from `/scripts/001_create_tables.sql`
2. Paste into the SQL Editor
3. Click **Run** button (or press Ctrl+Enter)
4. Wait for "Database schema created successfully!" message
5. Expected time: 10-15 seconds

### Step 3: Execute Script 002 - Seed Products
1. Copy all content from `/scripts/002_seed_products.sql`
2. Create a **new query** in SQL Editor
3. Paste the content
4. Click **Run**
5. Wait for completion message showing "11 products inserted"
6. Expected time: 5 seconds

### Step 4: Execute Script 003 - Affiliate Tables
1. Copy all content from `/scripts/003_enhanced_affiliate_tables.sql`
2. Create a **new query**
3. Paste and **Run**
4. Wait for "Affiliate tables created successfully"
5. Expected time: 5 seconds

### Step 5: Execute Script 004 - Affiliate Seed Data
1. Copy all content from `/scripts/004_seed_affiliate_data.sql`
2. Create a **new query**
3. Paste and **Run**
4. Wait for "Affiliate data seeded successfully"
5. Expected time: 5 seconds

## Verification

After running all scripts, verify your setup:

### Check Tables Created
```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Expected tables:
- user_profiles
- products
- product_variants
- cart_items
- orders
- order_items
- reviews
- affiliates
- affiliate_commissions
- affiliate_referrals
- payment_transactions
- order_tracking_events
- email_logs
- coupons

### Check Products Inserted
```sql
SELECT COUNT(*) as product_count FROM products;
```
Expected: **11 products**

### Check Sample Product
```sql
SELECT id, name, price, category FROM products LIMIT 1;
```

## Troubleshooting

### Error: "Extension not found"
- This is normal - Supabase has these extensions pre-installed
- Continue with the next step

### Error: "Table already exists"
- Means the table was created in a previous run
- This is safe - you can run scripts multiple times

### Error: "Permission denied"
- You need owner/admin access to the Supabase project
- Ask the project owner to grant permissions

### No error but nothing happened
- Check the "Execution Details" tab
- Look for warning messages
- Scroll down to see execution results

## Next Steps After Setup

1. **Add Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials
   - Add Cashfree payment keys

2. **Run Application**
   ```bash
   npm run dev
   ```

3. **Test the Setup**
   - Visit http://localhost:3000
   - Sign up as a new user
   - Add products to cart
   - Complete a test order (use Cashfree TEST mode)

## Database Backup

After successful setup, backup your database:

1. Go to Supabase Dashboard
2. Click **Project Settings** → **Backups**
3. Click **Create backup**
4. Name it: "PriyaHerbal-Initial-Setup"
5. Save in a safe location

## Need Help?

If you encounter issues:
1. Check the error message in the SQL Editor
2. Verify you're using the correct Supabase project
3. Ensure all SQL files are unmodified
4. Contact: +91 8500 647 979 on WhatsApp
