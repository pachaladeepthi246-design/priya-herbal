# PriyaHerbal Quick Start Guide

## Getting Started (5 Minutes)

### 1. Set Up Environment Variables
Create a `.env.local` file in the project root with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these values from:
- Supabase Dashboard → Your Project → Settings → API

### 2. Install Dependencies & Run Locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000 - You should see the home page!

### 3. Set Up Database (First Time Only)
This is CRITICAL - your site won't work without this:

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Paste the contents of `scripts/001_create_tables.sql`
4. Click "Run"
5. Wait for "Success" message

### 4. Add Sample Products (Optional)
1. Create another New Query in SQL Editor
2. Paste the contents of `scripts/002_seed_products.sql`
3. Click "Run"
4. Now browse to http://localhost:3000/shop and see 11 products!

## Testing Features

### Test Authentication
- Click "Sign Up" on home page
- Create an account with test email
- Check your email for confirmation link
- Click link and you're logged in!

### Test Shopping
- Browse products at /shop
- Click a product to see details
- Click "Add to Cart"
- Go to /cart to see your items
- Click "Proceed to Checkout"

### Test Admin Pages
- After logging in, click your name → Account
- You'll see your orders, wishlist, and profile

## What's Included

✅ Complete e-commerce functionality
✅ User authentication (sign up/login)
✅ Product catalog with filters
✅ Shopping cart system
✅ Order management
✅ Product reviews
✅ Blog articles
✅ Contact forms
✅ Mobile responsive design
✅ Production-ready code

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot GET /" | Run `npm install` then `npm run dev` |
| Database errors | Make sure you ran the SQL migration scripts |
| Can't sign up | Check that SUPABASE_URL is correct in .env.local |
| Products don't show | Run `002_seed_products.sql` to add sample data |
| Images look weird | This is normal - images are placeholders until you add real product photos |

## Deploying to Production

### Option 1: Deploy to Vercel (Easiest)
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Add environment variables from `.env.local`
5. Click Deploy - Done in 2 minutes!

### Option 2: Deploy to Other Platforms
The project is a standard Next.js app, so it works on:
- Netlify
- Railway
- Render
- AWS Amplify
- Any Node.js hosting

## Next Steps

1. **Add Your Products**: Go to Supabase → Table Editor → products table and add your items
2. **Add Real Images**: Replace placeholder images with actual product photos
3. **Customize Branding**: Change colors, fonts, and text in the app
4. **Set Up Payments**: Add Cashfree API keys for real transactions
5. **Custom Domain**: Go to Vercel → Settings → Domains and add your domain

## Support & Documentation

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

Enjoy your new e-commerce site! 🎉
