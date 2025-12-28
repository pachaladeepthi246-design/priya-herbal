# PriyaHerbal Enterprise E-Commerce Platform - Complete Setup Guide

## Overview
Production-ready full-stack e-commerce platform with affiliate marketing, payment integration, order tracking, and admin management.

## System Architecture

### Database (Supabase PostgreSQL)
- Products, Orders, Customers, Affiliates, Payments, Tracking
- Row Level Security (RLS) policies for data protection
- Automated indexes for optimal performance

### Payment Gateway (Cashfree)
- UPI, Credit/Debit Cards, Net Banking, GPay
- Instant QR code generation for UPI
- Webhook integration for real-time updates
- Automatic commission calculation

### User Roles
1. **Admin**: Full platform access, order management, affiliate oversight
2. **Agent/Affiliate**: Commission tracking, referral management, performance analytics
3. **Customer**: Shop, track orders, manage account

### Affiliate Program
- Multi-level commissions (up to 3 levels deep)
- Tier-based benefits (Bronze 5%, Silver 10%, Gold 12%, Platinum 15%)
- Real-time click & conversion tracking
- Automated payout system

## Deployment Steps

### 1. Supabase Setup
```bash
# Create Supabase project at https://supabase.com
# Enable following auth methods:
- Email/Password
- Google OAuth
- Magic Links (optional)

# Enable extensions:
- uuid-ossp
- http (for webhooks)

# Run migrations in order:
1. scripts/001_create_tables.sql
2. scripts/002_seed_products.sql
3. scripts/003_enhanced_affiliate_tables.sql
4. scripts/004_seed_affiliate_data.sql
```

### 2. Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-pub-key

# Cashfree Payment Gateway
NEXT_PUBLIC_CASHFREE_KEY_ID=your-cashfree-key-id
CASHFREE_SECRET_KEY=your-cashfree-secret
NEXT_PUBLIC_CASHFREE_MODE=PROD

# Optional: Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@priyaherbal.com

# Domain
NEXT_PUBLIC_DOMAIN=https://priyaherbal.com
```

### 3. Google OAuth Setup
```
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - https://your-domain.com/auth/callback
   - https://your-domain.com/auth/confirm
4. Add credentials to Supabase Auth settings
```

### 4. Cashfree Payment Setup
```
1. Create Cashfree account: https://cashfree.com
2. Get API keys from dashboard
3. Configure webhook URL:
   https://priyaherbal.com/api/payments/cashfree/webhook
4. Enable UPI, Cards, Net Banking in settings
```

### 5. Email Service (SendGrid)
```
1. Create SendGrid account
2. Verify sender email domain
3. Generate API key
4. Use in email templates
```

### 6. Make.com Webhook Integration (Optional)
```
1. Create Make account: https://make.com
2. Set up workflows for:
   - Order status updates
   - Commission payouts
   - Inventory sync
3. Configure webhook URL:
   https://priyaherbal.com/api/webhooks/make
```

### 7. Deploy to Vercel
```bash
# Install CLI
npm install -g vercel

# Deploy
vercel deploy

# Set environment variables in Vercel dashboard
# Enable Analytics & Monitoring
```

## Features Implemented

### Customer Features
✓ User authentication (Email/Password + Google OAuth)
✓ Email verification
✓ Product catalog with filters
✓ Shopping cart management
✓ Checkout with multiple payment methods
✓ Order tracking with real-time updates
✓ Order history
✓ Profile management
✓ Wishlist (structure ready)

### Affiliate Features
✓ Unique referral links
✓ Commission tracking
✓ Multi-level commission structure
✓ Performance analytics
✓ Payout management
✓ Tier-based benefits
✓ Real-time click tracking

### Admin Features
✓ Dashboard with key metrics
✓ Order management
✓ Affiliate management
✓ Commission oversight
✓ Email logs
✓ Webhook event logs
✓ User role management

### Payment Features
✓ Cashfree integration
✓ Multiple payment methods (UPI, Card, Net Banking)
✓ QR code generation
✓ Webhook verification
✓ Transaction logging
✓ Refund handling

### Order Management
✓ Real-time order tracking
✓ Status updates with timestamps
✓ Location tracking
✓ Automated email notifications
✓ SMS integration ready (via Make.com)

## Testing Paymnts

### Cashfree Test Cards
```
Visa: 4111111111111111 | 12/25 | 123
Mastercard: 5555555555554444 | 12/25 | 123
UPI: @paytestapp
```

### Test Order Flow
1. Sign up as customer
2. Add products to cart
3. Proceed to checkout
4. Select payment method
5. Use test credentials
6. Verify order creation
7. Check order tracking

## Performance Optimization

### Database
- Indexes on frequently queried columns
- Pagination for large datasets
- Caching strategies with Supabase

### Frontend
- Image optimization with Next.js
- Code splitting & lazy loading
- Minification & compression
- CDN delivery via Vercel

### API
- Rate limiting on payment endpoints
- Efficient query optimization
- Connection pooling

## Security Considerations

### Authentication
- JWT tokens with short expiry
- Refresh token rotation
- Secure session management

### Data Protection
- Row Level Security (RLS) policies
- Encryption at rest (Supabase)
- HTTPS/TLS for all communications

### Payment Security
- PCI DSS compliance via Cashfree
- Webhook signature verification
- No sensitive data in logs

### CSRF & XSS Protection
- CSRF tokens
- CSP headers
- Input sanitization

## Monitoring & Analytics

### Key Metrics to Track
- Order conversion rate
- Average order value
- Affiliate performance
- Payment success rate
- Customer retention

### Tools
- Supabase Analytics
- Vercel Analytics
- Custom dashboards in admin panel

## Troubleshooting

### Payment Issues
- Verify Cashfree credentials
- Check webhook logs
- Review transaction status
- Test with sandbox credentials

### Order Tracking
- Ensure order_tracking_events table has records
- Check Make.com webhook delivery
- Verify email notifications sent

### Affiliate Issues
- Confirm affiliate_code uniqueness
- Check commission_transactions status
- Verify referral link format

## Scaling Considerations

### Database
- Use Supabase connection pooling
- Enable read replicas for reporting
- Archive old data periodically

### Storage
- Use Vercel Blob or similar for images
- Optimize image sizes
- Implement CDN caching

### API
- Implement rate limiting
- Use caching headers
- Queue async jobs via Make.com

## Support & Maintenance

### Regular Tasks
- Update product inventory
- Process affiliate payouts
- Review payment reconciliation
- Monitor system health

### Backup Strategy
- Daily Supabase backups
- Archive transaction logs
- Document all configurations

## Next Steps

1. Complete Supabase and Cashfree setup
2. Deploy to Vercel
3. Configure custom domain
4. Set up email service
5. Create initial admin user
6. Load real product data with images
7. Test complete payment flow
8. Launch publicly

---

For support, contact: hello@priyaherbal.com +91 8500 647 979
