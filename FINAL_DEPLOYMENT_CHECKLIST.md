# Final Deployment Checklist - Before Going Live

## Pre-Launch Verification (30 Minutes)

### 1. Database & SQL Scripts ✓
- [ ] All 4 SQL scripts executed in Supabase SQL Editor
- [ ] `products` table has 11+ items with prices in INR
- [ ] `user_roles`, `affiliates` tables exist with sample data
- [ ] Row Level Security (RLS) policies enabled on all tables
- [ ] Verify by: Go to https://app.supabase.com → Dashboard → See tables

### 2. Environment Variables ✓
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] `CASHFREE_SECRET_KEY` added to Vercel (server-only, no NEXT_PUBLIC_)
- [ ] `NEXT_PUBLIC_CASHFREE_KEY_ID` added to Vercel
- [ ] `NEXT_PUBLIC_CASHFREE_MODE=TEST` for development (change to PROD later)
- [ ] Verify by: Vercel Project → Settings → Environment Variables

### 3. Supabase Configuration ✓
- [ ] Email authentication configured
- [ ] Redirect URLs updated: http://localhost:3000 and https://yourdomain.com
- [ ] (Optional) Google OAuth keys added
- [ ] Verify by: Supabase → Authentication → Email & URL Configuration

### 4. Cashfree Configuration ✓
- [ ] Cashfree account created and verified
- [ ] API keys obtained (TEST environment first)
- [ ] Webhook URL configured: https://yourdomain.com/api/payments/cashfree/webhook
- [ ] Test payment successful with Cashfree test card
- [ ] Verify by: Test 4111 1111 1111 1111 payment completes

### 5. Product Images ✓
- [ ] Product images added to `/public/products/` OR Supabase Storage
- [ ] Database updated with correct image URLs
- [ ] Images display on `/shop` page
- [ ] Verify by: Go to /shop in local dev, see product images

### 6. Core User Flows Tested ✓
- [ ] Sign up → Email verification → Login works
- [ ] Browse products on /shop page
- [ ] Click product → View details on /product/[id]
- [ ] Add to cart → Items appear in /cart
- [ ] Update quantity in cart
- [ ] Proceed to checkout
- [ ] Fill customer info (email, phone, address)
- [ ] Select payment method (UPI/Card/NetBanking)
- [ ] Complete test payment
- [ ] Order confirmation page appears
- [ ] Order appears in /protected/account order history

### 7. Order Tracking ✓
- [ ] Order created successfully in database
- [ ] Order can be tracked at /order-tracking/[orderId]
- [ ] Status timeline displays
- [ ] Email confirmation sent (check spam folder)

### 8. Affiliate System (if enabled) ✓
- [ ] Can sign up as affiliate during registration
- [ ] Affiliate dashboard loads at /affiliate/dashboard
- [ ] Affiliate code & referral link displayed
- [ ] Commission structure visible

### 9. Admin/Management ✓
- [ ] Admin dashboard loads at /admin/dashboard
- [ ] Can view all orders
- [ ] Can view affiliate statistics
- [ ] Can manage user roles (if admin interface complete)

### 10. Mobile Responsiveness ✓
- [ ] Test on phone-sized screen (375px width)
- [ ] All pages responsive
- [ ] Checkout works on mobile
- [ ] Payment redirect works on mobile
- [ ] Navigation menu works on mobile

### 11. Performance ✓
- [ ] Page loads in < 3 seconds
- [ ] No console errors on any page
- [ ] Images optimized with Next.js Image component
- [ ] Database queries are fast

---

## Deployment Steps

### Step 1: Deploy to Vercel
```bash
# Ensure code is committed to GitHub
git add .
git commit -m "Production ready - all workflows complete"
git push origin main

# In Vercel Dashboard:
# 1. Already connected? Auto-deploys on push
# 2. Not connected? Go to vercel.com → Import Project → Select repo
# 3. Wait for build to complete (5-10 minutes)
# 4. Get live URL: https://priya-herbal.vercel.app
```

### Step 2: Connect Custom Domain
```
In Vercel Dashboard:
1. Go to Project → Settings → Domains
2. Add Domain: priyaherbal.com
3. Update DNS records (Vercel shows exact values)
4. Wait for SSL certificate (5-30 minutes)
5. Domain live: https://priyaherbal.com
```

### Step 3: Update Supabase URLs
```
In Supabase Dashboard:
1. Authentication → URL Configuration
2. Remove: http://localhost:3000
3. Add: https://priyaherbal.com
4. Save changes
```

### Step 4: Switch Cashfree to Production (When Ready)
```
Not yet! Keep TEST mode for first 7 days.

After first week of testing:
1. Cashfree Dashboard → Get PROD keys
2. Update in Vercel: NEXT_PUBLIC_CASHFREE_KEY_ID (PROD version)
3. Update in Vercel: CASHFREE_SECRET_KEY (PROD version)
4. Update in Vercel: NEXT_PUBLIC_CASHFREE_MODE=PROD
5. Redeploy and test with real payment
```

---

## Post-Launch (First Week)

### Daily Monitoring
- [ ] Check Vercel Analytics for errors
- [ ] Monitor Supabase database for issues
- [ ] Review Cashfree payment dashboard for successful/failed transactions
- [ ] Check email logs for any delivery issues
- [ ] Monitor user signups and orders

### Fix Any Issues
- [ ] If payment fails: Check Cashfree webhook logs
- [ ] If emails not sending: Check SendGrid status
- [ ] If slow performance: Check Vercel analytics
- [ ] If users can't login: Check Supabase auth logs

### Communication
- [ ] Update WhatsApp number on all pages (+91 8500 647 979) ✓
- [ ] Add email contact on website
- [ ] Set up support response process
- [ ] Monitor customer inquiries

---

## Post-Launch (After 1 Week)

### Switch to Production Payment
Once confident everything is working:
1. Get PROD keys from Cashfree
2. Update environment variables in Vercel
3. Test with real payment (₹1 or small amount)
4. Monitor first real transaction

### Add Analytics
1. Install Google Analytics (Vercel includes it)
2. Monitor user behavior
3. Track conversion rates
4. Optimize based on data

### Marketing
1. Set up email newsletter signup
2. Create social media pages
3. Start affiliate program recruitment
4. Implement affiliate tracking

---

## Success Indicators

You'll know the launch was successful when:

✓ Website is live on custom domain (priyaherbal.com)
✓ Users can signup and verify email
✓ Users can browse and purchase products
✓ Orders automatically tracked
✓ Payments process via Cashfree
✓ Affiliate program works for resellers
✓ Admin can view all orders/stats
✓ Emails send automatically
✓ Mobile experience is smooth
✓ No console errors on any page
✓ Performance metrics look good
✓ First real payment successful

---

## Support Contacts

If anything goes wrong:
- Supabase: https://supabase.com/support
- Cashfree: support@cashfree.com
- Vercel: vercel.com/help
- Your team: +91 8500 647 979 (WhatsApp)

---

## Congratulations! 🎉

Your PriyaHerbal e-commerce platform is live and production-ready!

**Next Steps:**
1. Monitor for issues first week
2. Collect customer feedback
3. Add more products to catalog
4. Recruit affiliate partners
5. Run marketing campaigns
6. Grow revenue and scale

**Contact for Updates:** +91 8500 647 979

---
