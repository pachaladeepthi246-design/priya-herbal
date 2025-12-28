# PriyaHerbal - Quick Reference Guide

## For Complete Beginners

### What You Have
- A fully built e-commerce store
- Shopping cart, checkout, payments
- Order tracking and affiliates
- All the code is ready to use

### To Launch (30 minutes):
1. **Get Credentials** (5 min)
   - Create Supabase account → copy URL + key
   - Create Cashfree account → copy Key + Secret
   
2. **Add to Vercel** (5 min)
   - Add credentials to environment variables
   
3. **Run SQL Scripts** (10 min)
   - Copy scripts from /scripts/ folder
   - Paste in Supabase SQL Editor
   - Run each one
   
4. **Deploy** (5 min)
   - Click Deploy button in Vercel
   - Wait for green checkmark
   - You're live!

### Key Folders
```
/app          - All pages (home, shop, checkout, etc.)
/components   - Reusable pieces (header, product card, etc.)
/lib          - Database code (don't touch!)
/public       - Images folder
/scripts      - SQL files to run
```

### Key Files
- `START_HERE.md` - Read this first!
- `SETUP_FOR_NON_TECHNICAL.md` - Step by step guide
- `HOW_TO_ADD_IF_MISSING.md` - Add products, images, etc.
- `PRODUCTION_READY_CHECKLIST.md` - Before launching

### Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=[supabase URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[supabase key]
NEXT_PUBLIC_CASHFREE_KEY_ID=[cashfree key]
CASHFREE_SECRET_KEY=[cashfree secret]
NEXT_PUBLIC_CASHFREE_MODE=TEST (then PROD)
```

### Where to Make Changes
- **Edit Products:** Supabase Dashboard → products table
- **Edit Home Page:** `app/page.tsx`
- **Edit Contact Info:** Any page → find phone number
- **Edit Colors:** `app/globals.css`
- **Edit Text:** Open any page file (look for "lorem ipsum" or text you see)

### Testing Payment
- Card: 4111 1111 1111 1111
- Any date + CVV works in TEST mode

### Go Live
- Switch CASHFREE_MODE to PROD
- Get PROD keys from Cashfree
- Update environment variables
- Test with real payment

### Support
- WhatsApp: +91 8500 647 979
- Email: hello@priyaherbal.com
- Read the detailed guides above

---

## For Developers

### Setup
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Database
- Supabase PostgreSQL
- Row Level Security enabled
- Migrations in /scripts/ folder

### Authentication
- Email/password via Supabase Auth
- JWT tokens in cookies
- Protected routes with middleware

### Payments
- Cashfree integration
- Webhooks for order updates
- Server-side secret key handling

### Deployment
```bash
# Push to GitHub
git push origin main

# Auto-deploys to Vercel
# Set environment variables in Vercel dashboard
```

### Key APIs
- `/api/payments/cashfree/*` - Payment endpoints
- `/api/setup/*` - Database initialization
- `/api/emails/*` - Email sending
- `/api/webhooks/*` - Webhook handlers

### Database Tables
- products, product_variants
- orders, order_items, order_tracking_events
- profiles, user_roles
- cart_items
- affiliates, commission_transactions
- payment_transactions

---

## Performance Tips

- Images cached by Next.js
- Database indexed on frequently queried fields
- Vercel CDN for fast global delivery
- Compression enabled
- CSS minified

---

## Security

- Passwords hashed with bcrypt
- Sensitive keys server-only
- RLS policies on all tables
- HTTPS enforced
- CSRF protection
- SQL injection prevention

---

## Next Steps

1. ✓ Get it live
2. Add real product images
3. Switch to PROD payment keys
4. Add customer testimonials
5. Start affiliate program
6. Social media marketing
7. Email marketing
8. Analytics & optimization

---

**Need help? Use the detailed guides above or WhatsApp +91 8500 647 979**
