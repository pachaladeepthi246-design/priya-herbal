# PriyaHerbal - Production Ready Checklist

## Before You Launch

Use this checklist to verify everything works before launching to customers.

---

## 1. Database Setup ✓

- [ ] **Supabase Account Created**
  - Project name: _______________
  - Project URL saved: _______________
  - Anon key saved: _______________

- [ ] **All SQL Scripts Executed**
  - [ ] `scripts/001_create_tables.sql` ✓
  - [ ] `scripts/002_seed_products.sql` ✓
  - [ ] `scripts/003_enhanced_affiliate_tables.sql` ✓
  - [ ] `scripts/004_seed_affiliate_data.sql` ✓

- [ ] **Tables Exist in Supabase**
  - [ ] products (should have 11 items)
  - [ ] orders
  - [ ] cart_items
  - [ ] profiles
  - [ ] affiliates
  - [ ] payment_transactions
  - [ ] order_tracking_events

- [ ] **Row Level Security (RLS) Enabled**
  - Go to Supabase → Database → each table → RLS tab
  - [ ] All tables have RLS enabled
  - [ ] Policies are in place

---

## 2. Authentication Setup ✓

- [ ] **Email Authentication Configured**
  - Supabase Dashboard → Authentication → Providers
  - [ ] Email/Password enabled
  - [ ] Email confirmation enabled
  - [ ] Test signup/login works

- [ ] **Test User Created**
  - [ ] Email: test@example.com
  - [ ] Password: TestPassword123!
  - [ ] Can login successfully

---

## 3. Payment Gateway Setup ✓

- [ ] **Cashfree Account Created**
  - Business name: _______________
  - Account verified: [ ]

- [ ] **API Keys Configured**
  - [ ] NEXT_PUBLIC_CASHFREE_KEY_ID set
  - [ ] CASHFREE_SECRET_KEY set (server-only)
  - [ ] NEXT_PUBLIC_CASHFREE_MODE = TEST

- [ ] **Test Payment Works**
  - [ ] Can reach checkout page
  - [ ] Cashfree payment form loads
  - [ ] Test card payment succeeds (4111 1111 1111 1111)
  - [ ] Order created after payment
  - [ ] Webhook triggers order update

- [ ] **Webhook Configured**
  - Cashfree Dashboard → Settings → Webhooks
  - [ ] URL: https://yourdomain.com/api/payments/cashfree/webhook
  - [ ] Events subscribed: payment.success, payment.failed

---

## 4. Product Catalog ✓

- [ ] **Products Seeded**
  - [ ] 11 products visible in database
  - [ ] All prices correct
  - [ ] Categories correct

- [ ] **Product Images**
  - [ ] Option A: Using placeholder images (default) ✓
  - [ ] Option B: Real images added
    - [ ] Images uploaded to `/public/products/`
    - [ ] Image URLs updated in database
    - [ ] Images display correctly on /shop

- [ ] **Product Details Page Works**
  - [ ] Click product → shows full details
  - [ ] Add to cart button works (requires login)
  - [ ] Reviews section visible
  - [ ] Related products shown

---

## 5. Shopping Cart & Checkout ✓

- [ ] **Cart Functionality**
  - [ ] Add product → appears in /cart
  - [ ] Update quantity → price updates
  - [ ] Remove item → removed from cart
  - [ ] Persist across page refreshes

- [ ] **Checkout Flow**
  - [ ] Customer form fields work
  - [ ] Shipping info captured
  - [ ] Can proceed to payment
  - [ ] Payment gateway loads

- [ ] **Order Creation**
  - [ ] Order saved to database after payment
  - [ ] Order ID assigned
  - [ ] Order items linked correctly
  - [ ] User order history updated

---

## 6. Order Management ✓

- [ ] **Order Confirmation**
  - [ ] Order success page shows
  - [ ] Order ID displayed
  - [ ] Confirmation email sent
  - [ ] Email has correct details

- [ ] **Order Tracking**
  - [ ] Go to /order-tracking/[order-id]
  - [ ] Order details show
  - [ ] Status timeline visible
  - [ ] Real-time updates work

- [ ] **Admin Dashboard**
  - [ ] /admin/dashboard loads
  - [ ] All orders visible
  - [ ] Can see order details
  - [ ] Can update order status

---

## 7. User Accounts ✓

- [ ] **Sign Up**
  - [ ] Form validation works
  - [ ] Password requirements enforced
  - [ ] Email verification required
  - [ ] Confirmation email sent

- [ ] **Login**
  - [ ] Login form works
  - [ ] Incorrect credentials rejected
  - [ ] Session persists
  - [ ] Logout works

- [ ] **Account Dashboard**
  - [ ] /protected/account loads
  - [ ] Order history visible
  - [ ] Can view past orders
  - [ ] Can manage addresses

---

## 8. Affiliate Program ✓

- [ ] **Affiliate Dashboard**
  - [ ] /affiliate/dashboard loads
  - [ ] Referral stats visible
  - [ ] Commission tracking works
  - [ ] Unique referral link generated

- [ ] **Commission Calculations**
  - [ ] Affiliates earn 10% per sale
  - [ ] Multi-level commissions work (if applicable)
  - [ ] Pending vs Paid commissions tracked
  - [ ] Payout system configured

---

## 9. Email System ✓

- [ ] **Email Sending**
  - [ ] Sign up confirmation email
  - [ ] Email verification link works
  - [ ] Order confirmation email
  - [ ] All emails contain correct info

- [ ] **Email Configuration**
  - [ ] Option A: Supabase Email (default)
  - [ ] Option B: SendGrid configured
    - [ ] SENDGRID_API_KEY set
    - [ ] Sender email configured

---

## 10. Environment Variables ✓

**In Vercel Dashboard → Settings → Environment Variables:**

- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] NEXT_PUBLIC_CASHFREE_KEY_ID
- [ ] CASHFREE_SECRET_KEY
- [ ] NEXT_PUBLIC_CASHFREE_MODE = TEST
- [ ] (Optional) SENDGRID_API_KEY

**Verify:** None should be missing or undefined

---

## 11. Performance & Security ✓

- [ ] **SSL/HTTPS Enabled**
  - [ ] URL shows 🔒 lock icon
  - [ ] No mixed content warnings

- [ ] **Performance**
  - [ ] Page load time < 3 seconds
  - [ ] Images optimized
  - [ ] No console errors

- [ ] **Security**
  - [ ] No sensitive keys exposed
  - [ ] Passwords hashed in database
  - [ ] RLS policies protecting data
  - [ ] CSRF protection enabled

---

## 12. Mobile Responsiveness ✓

- [ ] **Mobile Testing**
  - [ ] Open site on mobile phone
  - [ ] All pages responsive
  - [ ] Touch buttons work
  - [ ] Forms usable on mobile

- [ ] **Device Testing**
  - [ ] iPhone (test in Chrome DevTools)
  - [ ] Android (test in Chrome DevTools)
  - [ ] Tablet (landscape & portrait)

---

## 13. Contact Information ✓

- [ ] **All Contact Info Updated**
  - [ ] Phone: +91 8500 647 979
  - [ ] WhatsApp: +91 8500 647 979
  - [ ] Email: hello@priyaherbal.com
  - [ ] Updated in:
    - [ ] Footer
    - [ ] WhatsApp widget
    - [ ] Contact page
    - [ ] About page
    - [ ] Help section

---

## 14. Final Tests ✓

### Complete User Flow Test
- [ ] **New Customer Journey:**
  1. Visit home page
  2. Browse products
  3. Click product
  4. Add to cart
  5. View cart
  6. Proceed to checkout
  7. Fill shipping info
  8. Make test payment
  9. See order confirmation
  10. Receive confirmation email
  11. Track order

- [ ] **Affiliate Journey:**
  1. Sign up as affiliate
  2. Get referral link
  3. Share with friend
  4. Friend purchases via link
  5. Commission calculated
  6. Dashboard shows stats

- [ ] **Admin Journey:**
  1. Login as admin
  2. View all orders
  3. Update order status
  4. View affiliate stats
  5. Manage products

---

## 15. Deployment ✓

- [ ] **Vercel Deployment**
  - [ ] GitHub repo connected
  - [ ] Environment variables set
  - [ ] Build succeeds (no errors)
  - [ ] Deploy succeeds
  - [ ] Site loads at custom domain

- [ ] **Custom Domain (If Using)**
  - [ ] Domain DNS configured
  - [ ] Certificate valid
  - [ ] URL works with HTTPS

---

## 16. Analytics & Monitoring ✓

- [ ] **Vercel Analytics**
  - [ ] Enabled in Vercel Dashboard
  - [ ] Can see page views
  - [ ] Can see errors

- [ ] **Email Logs**
  - [ ] Check Supabase → Database → email_logs
  - [ ] Emails being logged
  - [ ] Delivery status tracked

---

## Go Live Checklist

### Before Switching to Production Mode:

- [ ] All tests above passed ✓
- [ ] No console errors
- [ ] Mobile fully tested
- [ ] Payment working perfectly
- [ ] Emails sending correctly
- [ ] Customer support ready
- [ ] Backup plan in place

### Switch to Production:

1. **Get PROD Keys from Cashfree**
   - Cashfree Dashboard → Account → API Keys → PROD tab
   - Copy PROD Key ID and Secret

2. **Update Environment Variables**
   - Vercel Settings → Environment Variables
   - Update: NEXT_PUBLIC_CASHFREE_KEY_ID (PROD)
   - Update: CASHFREE_SECRET_KEY (PROD)
   - Change: NEXT_PUBLIC_CASHFREE_MODE = PROD

3. **Verify Webhook**
   - Cashfree Settings → Webhooks
   - URL: https://yourdomain.com/api/payments/cashfree/webhook
   - Test webhook

4. **Final Verification**
   - [ ] Make test purchase with real payment
   - [ ] Confirm order in database
   - [ ] Confirm email delivery
   - [ ] Confirm order tracking works

5. **Announce Launch!**
   - Social media
   - Email list
   - WhatsApp status

---

## Daily Monitoring (After Launch)

- [ ] Check Vercel dashboard for errors
- [ ] Check Cashfree for failed payments
- [ ] Check email delivery
- [ ] Monitor order processing
- [ ] Respond to customer inquiries
- [ ] Check analytics

---

## Troubleshooting

### If Something Breaks:

1. **Check Vercel Logs**
   - Vercel Dashboard → Deployments → Logs

2. **Check Supabase Logs**
   - Supabase Dashboard → Logs

3. **Check Console Errors**
   - Chrome DevTools → Console tab

4. **Check Database**
   - Verify tables exist
   - Verify data is correct

5. **Contact Support**
   - Cashfree: support@cashfree.com
   - Supabase: supabase.com/support
   - Vercel: vercel.com/help

---

## Sign Off

- [ ] All checks completed
- [ ] Site is production-ready
- [ ] Team reviewed and approved
- [ ] Date launched: _______________

**Congratulations! Your e-commerce platform is live!** 🎉

For ongoing support: +91 8500 647 979 (WhatsApp)
