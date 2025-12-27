# Complete Setup Guide for PriyaHerbal

## Step 1: Environment Setup

### Create Supabase Project
1. Go to supabase.com
2. Create new project
3. Copy URL and anon key
4. Save to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

### Get Cashfree API Keys
1. Sign up at cashfree.com
2. Go to merchant dashboard
3. Get API Key ID and Secret
4. Add to environment variables

## Step 2: Database Setup

### Run Migration Scripts
```bash
# Connect to Supabase SQL Editor
# Execute scripts in order:
# 1. scripts/001_create_tables.sql
# 2. scripts/002_seed_products.sql
```

### Verify Tables Created
In Supabase dashboard, check:
- products (11 sample items)
- cart_items
- orders
- reviews
- blog_posts
- profiles
- etc.

## Step 3: Authentication Setup

### Enable Email Auth in Supabase
1. Project Settings → Authentication
2. Enable "Email" provider
3. Set email templates (optional)
4. Configure redirect URLs:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`

## Step 4: Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Server runs at http://localhost:3000
```

### Test Authentication
1. Go to http://localhost:3000/auth/sign-up
2. Create test account
3. Check email for verification link
4. Click link to verify
5. Login with account

## Step 5: Test Products & Shopping

1. Go to http://localhost:3000/shop
2. Filter by category
3. Click product to view details
4. Add to cart
5. Go to cart page (/cart)
6. Proceed to checkout (/checkout)

### Test Payment Integration
- Use Cashfree test mode
- Test UPI, card, net banking flows
- Verify order creation in database

## Step 6: Deploy to Vercel

### Connect GitHub
```bash
# Push to GitHub
git push origin main
```

### Deploy on Vercel
1. vercel.com → New Project
2. Import GitHub repo
3. Add environment variables
4. Deploy

## Step 7: Post-Deployment

### Verify Production
- Test sign up → Login flow
- Browse products
- Complete test order
- Check Supabase for data

### Set Up Domain
1. Add custom domain in Vercel
2. Update Supabase redirect URLs
3. Configure email with your domain

### Monitor
- Check Vercel analytics
- Monitor Supabase usage
- Track Cashfree transactions

## Customization Checklist

- [ ] Update company info in footer
- [ ] Add your WhatsApp number
- [ ] Update email/phone contacts
- [ ] Customize product images
- [ ] Update blog content
- [ ] Set up newsletter service
- [ ] Configure analytics
- [ ] Enable SEO meta tags

## Common Issues & Solutions

### Email not received
- Check spam folder
- Verify sender email in Supabase
- Test with test@example.com

### Cart not saving
- Check browser localStorage
- Verify user is authenticated
- Check RLS policies on cart_items table

### Payment failing
- Verify Cashfree API keys
- Check Cashfree merchant account status
- Use Cashfree test keys first

### Images not loading
- Check image URLs
- Verify CORS settings
- Use proper image formats (jpg, png, webp)

## Next Steps

1. Add more products to database
2. Create email templates
3. Set up analytics (Google Analytics)
4. Configure SMS alerts (optional)
5. Add customer support chat
6. Set up admin dashboard
7. Monitor and optimize performance

## Support

Need help? Check:
- README.md for overview
- Database schema documentation
- Supabase docs: supabase.com/docs
- Next.js docs: nextjs.org/docs
