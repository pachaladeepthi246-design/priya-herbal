# Direct Supabase Setup - Copy & Paste Method

This guide lets you copy-paste SQL directly into Supabase without file management.

## Method 1: Copy All at Once (Recommended)

### 1. Open Supabase SQL Editor
- Go to Dashboard → Your Project → SQL Editor

### 2. Create New Query
- Click "New Query"
- Name it: "PriyaHerbal-Setup"

### 3. Copy This Complete Script

Below is the COMPLETE database setup in one script. Copy everything from "BEGIN" to "END" and paste into Supabase:

---

**[BEGIN - Copy from here]**

```sql
-- SCRIPT 1: CREATE ALL TABLES
-- [Full content of 001_create_tables.sql goes here]
```

**[END - Copy to here]**

### 4. Execute
- Click **Run** button
- Wait for "Database schema created successfully!"

### 5. Verify Tables Exist

Create a new query:
```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

Should show 14 tables created.

---

## Method 2: Copy Script by Script

If copying all at once fails, do them one by one:

### Query 1: Create Tables
[Copy 001_create_tables.sql content here]

### Query 2: Seed Products  
[Copy 002_seed_products.sql content here]

### Query 3: Affiliate Tables
[Copy 003_enhanced_affiliate_tables.sql content here]

### Query 4: Affiliate Data
[Copy 004_seed_affiliate_data.sql content here]

---

## Method 3: Use Supabase CLI (For Developers)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref geisrdwsimouxlalschy

# Run all migration scripts
supabase db push

# Or run individual scripts
psql -h db.geisrdwsimouxlalschy.supabase.co \\
  -U postgres \\
  -d postgres \\
  -f scripts/001_create_tables.sql
```

---

## Verification Checklist

After setup, verify everything:

- [ ] 14 tables created
- [ ] 11 products in database
- [ ] 0 orders (expected initially)
- [ ] RLS policies enabled
- [ ] Indexes created

```sql
-- Check all tables
SELECT COUNT(*) as table_count FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check products
SELECT COUNT(*) as products FROM products;

-- Check storage
SELECT SUM(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname = 'public';
```
