# Security Audit Checklist

Use this to verify all sensitive data is properly protected before launch.

## Environment Variables

### ✅ Public Variables (Safe - NEXT_PUBLIC_ prefix)
- [ ] NEXT_PUBLIC_SUPABASE_URL - Project URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY - Anon public key
- [ ] NEXT_PUBLIC_CASHFREE_KEY_ID - Cashfree public key ID
- [ ] NEXT_PUBLIC_CASHFREE_MODE - Test/Prod mode
- [ ] NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL - Dev redirect

### ❌ Secret Variables (Hidden - NO NEXT_PUBLIC_)
- [ ] CASHFREE_SECRET_KEY - Cashfree secret (Production only)
- [ ] SUPABASE_SERVICE_ROLE_KEY - Service key (Production only)
- [ ] SENDGRID_API_KEY - Email service (Production only)

## Code Review

### API Routes (Server-Side)
- [ ] app/api/payments/cashfree/initiate/route.ts
  - Uses CASHFREE_SECRET_KEY ✓ (no NEXT_PUBLIC_ prefix)
  - Secret only used on server ✓
  - Never exposed in response ✓

- [ ] app/api/setup/status/route.ts
  - Checks CASHFREE_SECRET_KEY ✓
  - Returns only status, not secret ✓

- [ ] app/api/payments/cashfree/webhook/route.ts
  - Uses secret to verify webhook signature ✓
  - Never exposed to client ✓

### Page Components (Client-Side)
- [ ] app/page.tsx - No secrets exposed ✓
- [ ] app/checkout/page.tsx - Only uses public key ID ✓
- [ ] app/cart/page.tsx - No payment keys used ✓

## Configuration Files

### vercel.json
- [ ] NEXT_PUBLIC_ prefix only on non-sensitive vars
- [ ] CASHFREE_SECRET_KEY without NEXT_PUBLIC_ prefix
- [ ] Secret vars set to Production scope only

### .env.example
- [ ] Shows structure only
- [ ] No actual values
- [ ] Clear comments on what each var does

### .env.local (Local Development)
- [ ] File is in .gitignore ✓
- [ ] Never committed to Git ✓
- [ ] Only contains TEST keys for local testing

## Browser Security

### DevTools Console Test
1. Open site in browser
2. Press F12 (DevTools)
3. Go to Console tab
4. Run: `Object.keys(process.env).filter(k => k.includes('CASHFREE'))`
5. Expected result: Should show NEXT_PUBLIC_CASHFREE_KEY_ID and NEXT_PUBLIC_CASHFREE_MODE only
6. Should NOT show CASHFREE_SECRET_KEY

### Network Tab Test
1. Open DevTools → Network tab
2. Add item to cart
3. Go to checkout
4. Complete payment
5. Look for POST to `/api/payments/cashfree/initiate`
6. Click on it → Headers tab
7. Verify no secret key visible in request/response body
8. Secret should only be in request headers (x-client-secret)

## Database Security

### Supabase RLS Policies
- [ ] Row Level Security enabled on all tables
- [ ] user_profiles: Users can only view own profile
- [ ] cart_items: Users can only manage own cart
- [ ] orders: Users can only view own orders
- [ ] payment_transactions: Users can only view own payments
- [ ] affiliates: Affiliates can only view own data

### Data Access
- [ ] Service role key protected (server-only)
- [ ] Anon key has limited permissions
- [ ] No direct database access from frontend
- [ ] All queries use authenticated user context

## API Security

### Authentication
- [ ] API routes verify user authentication
- [ ] Payment webhooks verify signature
- [ ] Admin endpoints check user role
- [ ] Protected routes redirect to login

### Rate Limiting
- [ ] Payment endpoint has rate limiting
- [ ] Form submissions have CSRF protection
- [ ] Webhook endpoint validates signature

## Deployment Security

### Vercel Settings
- [ ] Environment variables scope set correctly
- [ ] Production secrets only in Production scope
- [ ] No secrets in Preview/Development environment
- [ ] Auto-deploy enabled (uses latest secrets)

### Domain Security
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Redirect www to non-www (or vice versa)
- [ ] Custom domain configured
- [ ] SSL certificate valid

### Access Control
- [ ] GitHub repo is private
- [ ] Only authorized users can deploy
- [ ] Vercel team member access restricted
- [ ] No public access to production database

## Third-Party Services

### Cashfree
- [ ] API keys created in TEST app (for testing)
- [ ] API keys created in PROD app (for production)
- [ ] Webhook URL registered
- [ ] Webhook secret stored securely
- [ ] IP whitelist configured (if available)

### Supabase
- [ ] Service role key backed up safely
- [ ] JWT secret never shared
- [ ] Database backups configured
- [ ] Access logs monitored

### SendGrid (Email)
- [ ] API key has limited permissions
- [ ] Only sender address authenticated
- [ ] Not stored in version control

## Backup & Disaster Recovery

### Database Backups
- [ ] Automated backups enabled
- [ ] Backup schedule: Daily
- [ ] Backups encrypted
- [ ] Backup stored separately from code

### Environment Variable Backup
- [ ] List of all env vars documented
- [ ] Stored in secure password manager
- [ ] Never in public repositories
- [ ] Access limited to admin only

## Monitoring & Logs

### Error Tracking
- [ ] No sensitive data in error messages
- [ ] Error logs don't expose secrets
- [ ] Logs stored securely
- [ ] Errors alerted to admin

### Access Logs
- [ ] Database access logged
- [ ] API requests logged
- [ ] User actions logged
- [ ] Suspicious activity monitored

## Compliance Checklist

### Data Protection
- [ ] Customer data encrypted in transit (HTTPS)
- [ ] Passwords hashed (Supabase Auth handles this)
- [ ] PII not logged in plain text
- [ ] Compliance with GDPR/local laws

### Privacy
- [ ] Privacy policy updated
- [ ] Cookie consent (if needed)
- [ ] No third-party tracking without consent
- [ ] Email unsubscribe working

## Final Security Sign-Off

- [ ] All environment variables configured correctly
- [ ] Code review complete - no secrets in client code
- [ ] API endpoints secured
- [ ] Database access controlled
- [ ] Deployment verified
- [ ] Monitoring enabled
- [ ] Backups working
- [ ] Team trained on security

---

## Security Incident Response

If you suspect a security breach:

1. **Immediate Actions**
   - Regenerate all API keys in Cashfree
   - Regenerate all keys in Supabase
   - Check audit logs for suspicious activity
   - Update all environment variables

2. **Communication**
   - Notify affected customers (if personal data exposed)
   - Update status page
   - Document incident details

3. **Investigation**
   - Review error logs
   - Check database for unauthorized access
   - Verify no data exfiltration
   - Check payment logs

4. **Prevention**
   - Update code if vulnerability found
   - Deploy patch immediately
   - Monitor for similar issues
   - Update documentation

---

## Regular Security Maintenance

### Weekly
- [ ] Check error logs for suspicious activity
- [ ] Review payment transactions for anomalies
- [ ] Monitor disk usage and performance

### Monthly
- [ ] Review user access logs
- [ ] Update dependencies for security patches
- [ ] Test disaster recovery procedure
- [ ] Rotate any temporary credentials

### Quarterly
- [ ] Full security audit
- [ ] Penetration testing (optional)
- [ ] Review and update security policies
- [ ] Team security training

---

**Your system is production-ready for launch when all checkboxes are marked.**

Contact: +91 8500 647 979 (WhatsApp)
