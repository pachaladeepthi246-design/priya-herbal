# Complete PriyaHerbal Setup Checklist

Use this checklist to verify your complete setup before going live.

## Phase 1: Database Setup (10 minutes)

### 1.1 Supabase Project Created
- [ ] Project Name: PriuyaHub
- [ ] Region: US East 1 (or closest to you)
- [ ] Project ID: geisrdwsimouxlalschy
- [ ] Status: ACTIVE_HEALTHY

### 1.2 SQL Scripts Executed
- [ ] 001_create_tables.sql - COMPLETED
  - [ ] 14 tables created
  - [ ] RLS policies enabled
  - [ ] Indexes created
  
- [ ] 002_seed_products.sql - COMPLETED
  - [ ] 11 products inserted
  - [ ] All prices set in INR
  - [ ] Product images linked
  
- [ ] 003_enhanced_affiliate_tables.sql - COMPLETED
  - [ ] Affiliate tables created
  - [ ] Commission system ready
  - [ ] Referral links enabled
  
- [ ] 004_seed_affiliate_data.sql - COMPLETED
  - [ ] Sample affiliates created
  - [ ] Tier system initialized
  - [ ] Commission rates set

### 1.3 Database Verification
```bash
# Run these in Supabase SQL Editor to verify

# Check tables count (should be 14)
SELECT COUNT(*) as total_tables FROM information_schema.tables 
WHERE table_schema = 'public';

# Check products (should be 11)
SELECT COUNT(*) as total_products FROM products;

# Check RLS enabled
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('user_profiles', 'orders', 'cart_items', 'affiliates');
```

---

## Phase 2: Environment Configuration (5 minutes)

### 2.1 Get Supabase Credentials
- [ ] Go to Supabase Project Settings
- [ ] Copy Project URL: `https://geisrdwsimouxlalschy.supabase.co`
- [ ] Copy Anon Public Key (under API)
- [ ] Copy Service Role Key (keep SECRET!)
- [ ] Copy JWT Secret

### 2.2 Get Cashfree Credentials
- [ ] Signup at Cashfree.com
- [ ] Create Test App
- [ ] Copy App ID / Key ID
- [ ] Copy App Secret / Secret Key
- [ ] Enable webhooks for order updates

### 2.3 Add Environment Variables to Vercel
In Vercel Dashboard → Project Settings → Environment Variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://geisrdwsimouxlalschy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Cashfree
NEXT_PUBLIC_CASHFREE_KEY_ID=your-cashfree-key-id
CASHFREE_SECRET_KEY=your-cashfree-secret
NEXT_PUBLIC_CASHFREE_MODE=TEST

# Email (Optional - Add Later)
SENDGRID_API_KEY=your-sendgrid-key
FROM_EMAIL=noreply@priyaherbal.com

# Webhook (For Order Updates)
MAKE_WEBHOOK_URL=your-make-webhook-url
```

- [ ] All variables added to Vercel
- [ ] Redeploy after adding variables

---

## Phase 3: Application Setup (10 minutes)

### 3.1 Update Contact Information
- [ ] Phone: +91 8500 647 979 (done in code)
- [ ] WhatsApp: +91 8500 647 979 (done in code)
- [ ] Email: hello@priyaherbal.com (update in environment)

### 3.2 Verify All Pages Load
- [ ] Home page loads
- [ ] Product catalog displays 11 items
- [ ] Sign up page works
- [ ] Login page works
- [ ] Product detail page shows correctly
- [ ] Cart functionality works
- [ ] Checkout displays all payment methods

### 3.3 Test User Flows
- [ ] Create new user account
- [ ] Verify email (check inbox)
- [ ] Add product to cart
- [ ] Remove item from cart
- [ ] Proceed to checkout
- [ ] Enter shipping info
- [ ] Select payment method (TEST mode)

---

## Phase 4: Payment Integration (5 minutes)

### 4.1 Cashfree Setup
- [ ] App created in Cashfree dashboard
- [ ] TEST mode enabled
- [ ] Webhook configured (Callback URL)
- [ ] UPI/Card/NetBanking payment methods active

### 4.2 Test Payment Flow
- [ ] Add product to cart
- [ ] Go to checkout
- [ ] Complete test order with test payment
- [ ] Order confirmation email received
- [ ] Order status shows "Completed" after payment
- [ ] Check order in admin dashboard

### 4.3 Webhook Verification
- [ ] Order status updates in real-time
- [ ] Payment logs recorded
- [ ] Email notifications sent

---

## Phase 5: Affiliate Program (5 minutes)

### 5.1 Affiliate Setup
- [ ] Affiliate dashboard accessible
- [ ] Referral codes generated
- [ ] Commission rates set (5%-15% by tier)
- [ ] Affiliate links trackable
- [ ] Referral tracking works

### 5.2 Test Affiliate Flow
- [ ] Create affiliate account
- [ ] Get referral link
- [ ] Share link with test user
- [ ] Test user makes purchase with affiliate link
- [ ] Commission credited to affiliate account

---

## Phase 6: Admin Dashboard (5 minutes)

### 6.1 Admin Access
- [ ] Admin account created
- [ ] Admin dashboard accessible
- [ ] Can view all orders
- [ ] Can view all users
- [ ] Can view affiliate performance
- [ ] Can update order status
- [ ] Can generate reports

### 6.2 Analytics Ready
- [ ] View total sales
- [ ] See product performance
- [ ] Track affiliate earnings
- [ ] Monitor user registrations
- [ ] Check payment success rate

---

## Phase 7: Mobile & Performance (5 minutes)

### 7.1 Mobile Responsiveness
- [ ] Home page responsive on mobile
- [ ] Products display correctly on mobile
- [ ] Checkout works on mobile
- [ ] Touch interactions smooth
- [ ] Forms easy to fill on mobile

### 7.2 Performance Check
- [ ] Page load time < 3 seconds
- [ ] Images optimized (< 100KB)
- [ ] No console errors
- [ ] Animations smooth (60 FPS)

---

## Phase 8: Security & Backup (5 minutes)

### 8.1 Security Check
- [ ] Environment variables protected
- [ ] Service role key not exposed
- [ ] RLS policies enabled on all tables
- [ ] No sensitive data in public tables
- [ ] HTTPS enabled on custom domain

### 8.2 Database Backup
- [ ] Create backup in Supabase
- [ ] Name: PriyaHerbal-PreLaunch
- [ ] Download backup locally
- [ ] Test backup restore

### 8.3 Error Handling
- [ ] No 500 errors on valid requests
- [ ] Clear error messages shown
- [ ] Failed payments handled gracefully
- [ ] Incomplete forms validated

---

## Phase 9: Marketing & SEO (Optional - Do Later)

### 9.1 SEO Setup
- [ ] Meta titles optimized
- [ ] Meta descriptions added
- [ ] Open Graph tags set
- [ ] Sitemap generated
- [ ] Robots.txt configured

### 9.2 Social Media
- [ ] Instagram embed working
- [ ] TikTok embed working
- [ ] Share buttons functional
- [ ] WhatsApp widget active

### 9.3 Analytics
- [ ] Google Analytics configured
- [ ] Vercel Analytics enabled
- [ ] Tracking works on all pages
- [ ] Conversion tracking set up

---

## Phase 10: Go Live! 

### 10.1 Final Verification
- [ ] All items above checked
- [ ] Test one complete purchase
- [ ] Verify order received
- [ ] Confirm email notifications
- [ ] Check affiliate tracking

### 10.2 Switch to Production
- [ ] Change Cashfree from TEST to PROD mode
- [ ] Update payment keys in environment
- [ ] Redeploy application
- [ ] Verify live payments work

### 10.3 Domain & Deployment
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Redirects working (www, non-www)
- [ ] Site accessible from all regions
- [ ] Mobile app bookmarks working

### 10.4 Announcement
- [ ] Send launch email to subscribers
- [ ] Post on social media
- [ ] Share affiliate links with partners
- [ ] Update website header/footer
- [ ] Monitor support messages

---

## Post-Launch Monitoring (Daily for 1 week)

### Daily Checks
- [ ] No payment failures
- [ ] All emails sending
- [ ] Orders processing normally
- [ ] Affiliates can track sales
- [ ] Admin dashboard responsive
- [ ] No database errors

### Support Queue
- [ ] Response time < 4 hours
- [ ] WhatsApp: +91 8500 647 979
- [ ] Email: hello@priyaherbal.com
- [ ] Update FAQ based on questions

### Performance Monitoring
- [ ] Check daily sales figures
- [ ] Monitor product popularity
- [ ] Track affiliate earnings
- [ ] Review user feedback

---

## Rollback Plan (If Issues)

If you encounter critical issues:

1. **Stop Accepting Orders**: Disable checkout temporarily
2. **Notify Users**: Send status update email
3. **Restore Backup**: Use Supabase backup feature
4. **Revert Code**: Roll back Vercel deployment
5. **Debug**: Check error logs
6. **Redeploy**: Once fixed, deploy again

---

## Success Criteria

You're ready to go live when:

- ✓ All SQL scripts executed successfully
- ✓ Environment variables added
- ✓ One complete test purchase verified
- ✓ Email confirmations working
- ✓ No console errors
- ✓ Mobile responsive
- ✓ Admin dashboard functional
- ✓ Affiliate program tracking
- ✓ Payment webhooks responding

---

**Congratulations! Your PriyaHerbal platform is production-ready!**

For support: +91 8500 647 979 (WhatsApp)
