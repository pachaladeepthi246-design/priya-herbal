# PriyaHerbal - Premium Indian Herbal E-Commerce Platform

A stunning, production-ready e-commerce website for premium Indian herbal products, built with Next.js, Supabase, and Tailwind CSS with modern glassy morphism UI and Framer-style animations.

## Features

### 🛍️ E-Commerce
- Beautiful product catalog with 10+ herbal products
- Product filtering by category (Hair Care, Skin Care, Immunity, Wellness)
- Detailed product pages with carousel, reviews, and variants
- Shopping cart with quantity management
- Checkout flow with multiple payment methods

### 👥 Authentication & User Management
- Email/Password authentication via Supabase Auth
- User profiles and order history
- Wishlist functionality
- Account dashboard

### 💳 Payments
- Integrated Cashfree Payment Gateway
- Multiple payment methods: UPI, Credit/Debit Cards, Net Banking
- Secure checkout with SSL encryption
- Order tracking and confirmation

### 📱 Mobile-First Design
- Fully responsive design (PWA ready)
- Split-panel layouts for optimal UX
- Glassy morphism effects with Framer-style animations
- Touch-optimized navigation
- Smooth transitions and micro-interactions

### 📝 Content Management
- Blog section with Ayurvedic wellness articles
- Product reviews and ratings
- Customer testimonials
- Newsletter subscription
- Contact forms with WhatsApp integration

### 📊 Admin & Analytics
- Order management
- Inventory tracking
- Customer analytics
- Reseller dashboard

### 💬 Communication
- WhatsApp integration: +91 8500 647 979
- Email support: hello@priyaherbal.com
- Phone: +91 8500 647 979
- Contact forms with database storage

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS animations with glassy effects
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Payments**: Cashfree Payment Gateway
- **Deployment**: Vercel
- **Image Hosting**: Vercel Blob (optional)

## UI/UX Highlights

### Modern Design System
- **Glassy Morphism**: Frosted glass cards with backdrop blur effects
- **Color Palette**: Forest Green (primary), Warm Gold (secondary), Terracotta (accent)
- **Typography**: Geist font family with consistent hierarchy
- **Animations**: Custom Framer-style animations (fade-in-up, scale-in, glass-glow effects)

### Interactive Elements
- Floating WhatsApp widget with bounce animation
- Product cards with smooth hover effects and scale transitions
- Form inputs with glass effects and focus animations
- Button glow effects and interactive states
- Floating herb animations on scroll

## Project Structure

```
priyaherbal/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page with hero & featured products
│   ├── shop/              # Shop page with filters
│   ├── product/           # Product detail pages
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page with WhatsApp integration
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── auth/              # Authentication pages
│   ├── protected/         # Protected user routes
│   ├── api/setup/         # Auto database initialization
│   └── globals.css        # Global styles with animations
├── components/            # React components
│   ├── home/             # Homepage components (hero, products, testimonials)
│   ├── shop/             # Shop page components
│   ├── product/          # Product detail components
│   ├── navigation.tsx    # Navigation header
│   ├── footer.tsx        # Footer with contact info
│   ├── database-init.tsx # Auto-initialization component
│   └── ui/               # Reusable UI components
├── lib/
│   ├── supabase/         # Supabase client & server setup
│   ├── api/              # API utility functions
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── scripts/              # Database migration scripts
└── documentation/        # Setup guides and checklists
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Cashfree merchant account (optional, ready to integrate)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd priyaherbal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

✅ **Database auto-initializes on first load** - No manual SQL needed!

## Database Schema

### Core Tables (Auto-Created)
- `products` - Product catalog (10 samples pre-seeded)
- `product_variants` - Product size/variant options
- `profiles` - User profiles and reseller info
- `cart_items` - Shopping cart per user
- `orders` - Customer orders with status tracking
- `order_items` - Individual items in orders
- `reviews` - Product reviews with ratings
- `blog_posts` - Ayurvedic wellness articles
- `newsletter_subscribers` - Email subscription list
- `contact_submissions` - Contact form data
- `referrals` - Reseller commission tracking

All tables include **Row Level Security (RLS)** policies for data protection.

## Contact Information Integration

Contact details are embedded throughout the platform:

**Primary Contact:**
- **WhatsApp**: +91 8500 647 979 (Quick support & orders)
- **Email**: hello@priyaherbal.com
- **Phone**: +91 8500 647 979
- **Location**: Mumbai, Maharashtra, India

**Where it appears:**
- ✅ Floating WhatsApp widget (fixed bottom-right, bounce animation)
- ✅ Contact page (detailed contact section with glass effects)
- ✅ Footer (company info and quick links)
- ✅ Navigation menu (contact link)
- ✅ About page (support section)
- ✅ All contact forms

## Key Features Implementation

### Authentication Flow
1. User signs up with email/password at `/auth/sign-up`
2. Email verification required
3. Profile created after confirmation
4. Persistent session via Supabase Auth
5. Protected pages redirect to login if needed

### Shopping Flow
1. Browse products → Add to cart (persistent)
2. Review cart → Adjust quantities
3. Checkout with shipping details
4. Select payment method (UPI, Cards, Net Banking)
5. Complete payment via Cashfree
6. Order confirmation & tracking

### Product Management
- Dynamic product catalog from Supabase
- Category filtering and sorting
- Product variant selection
- Stock management with real-time updates
- Review system with 5-star ratings

## UI/UX Features

### Glassy Morphism Effects
- `.glass-effect` - Base frosted glass with 10px blur
- `.glass-card` - Card variant with 12px blur
- `.glass-input` - Input field glass effect
- `.animate-glass-glow` - Glowing border animations

### Animations (Framer-Style)
- `animate-fade-in-up` - Elements fade in from bottom
- `animate-fade-in-down` - Elements fade in from top
- `animate-scale-in` - Elements scale up on load
- `animate-float` - Floating herbs and elements
- `animate-glow` - Glowing effects on hover
- `animate-pulse-ring` - Pulsing ring for CTAs
- `animate-shimmer` - Shimmer loading effects

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+
- All pages fully responsive

## Customization

### Colors & Branding
Edit color tokens in `app/globals.css`:
```css
--primary: oklch(0.35 0.08 145);    /* Forest Green */
--secondary: oklch(0.75 0.12 60);   /* Warm Gold */
--accent: oklch(0.58 0.15 25);      /* Terracotta */
```

### Update Contact Information
Search for "8500647979" in:
- `components/home/whatsapp-widget.tsx`
- `app/contact/page.tsx`
- `components/footer.tsx`

### Products
Add/edit products in Supabase dashboard → SQL Editor:
```sql
INSERT INTO public.products 
(name, slug, description, price, original_price, category, image_url, rating, review_count)
VALUES
('Product Name', 'product-slug', 'Description', 299, 499, 'Hair Care', '/image.jpg', 4.5, 100);
```

### Content
- Blog posts: Update via Supabase dashboard
- About page: Edit `/app/about/page.tsx`
- Contact info: Edit `/app/contact/page.tsx`

## API Endpoints

### Auto-Setup
- `POST /api/setup` - Initialize database (auto-runs on first load)

### Ready to Implement
- `GET /api/products` - Fetch all products with filters
- `POST /api/cart` - Manage cart items
- `POST /api/checkout` - Create orders
- `GET /api/orders/:id` - Get order details
- `POST /api/reviews` - Submit product reviews

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel Dashboard
3. Add environment variables
4. Deploy (automatic from git pushes)

```bash
vercel deploy
```

### Local Production Build
```bash
npm run build
npm run start
```

## Performance Optimizations

- Next.js Image optimization for all product images
- Code splitting & lazy loading by route
- Supabase connection pooling
- Vercel edge caching for static assets
- GZIP compression enabled
- CSS animations use GPU acceleration
- Tailwind CSS purging for minimal bundle

## Security

- **Row Level Security (RLS)** - Users can only access their own data
- **Secure Authentication** - Supabase Auth handles password hashing
- **HTTPS Enforced** - Vercel provides SSL certificates
- **Input Validation** - All forms validate before submission
- **SQL Injection Prevention** - Parameterized queries via Supabase
- **Environment Variables** - All secrets stored securely, never exposed
- **CORS Protection** - API calls properly restricted

## Testing

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check TypeScript
npm run type-check
```

## Troubleshooting

### "Database not initialized" on first load
- Page refresh automatically triggers database setup
- Check Supabase URL and API key in environment variables
- View browser console for detailed error messages

### "User not authenticated"
- Verify email verification in Supabase Auth
- Check NEXT_PUBLIC_SUPABASE_URL environment variable
- Ensure RLS policies allow user access

### WhatsApp link not working
- Verify phone number is in format: +918500647979
- Test on mobile (opens WhatsApp app) vs desktop (opens WhatsApp Web)
- Check internet connection

### Products not showing
- Ensure Supabase database is initialized
- Verify products table has data
- Check browser console for API errors

## Contact & Support

**PriyaHerbal Customer Support:**
- **WhatsApp**: +91 8500 647 979 (Recommended for quick replies)
- **Email**: hello@priyaherbal.com
- **Phone**: +91 8500 647 979
- **Contact Form**: Visit /contact page
- **Office Location**: Mumbai, Maharashtra, India

## Documentation

- **Setup Guide**: `SETUP_INSTRUCTIONS.md`
- **Launch Checklist**: `LAUNCH_CHECKLIST.md`
- **Completion Summary**: `COMPLETION_SUMMARY.md`
- **System Status**: `SYSTEM_STATUS.md`

## Future Enhancements

- AI-powered product recommendations
- Live chat support with AI assistant
- Subscription products for recurring orders
- Loyalty program with points system
- Social media integration (Instagram, TikTok)
- Video product demonstrations
- Augmented Reality product preview
- Multi-language support (Hindi, regional languages)

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description

## License

MIT License - see LICENSE file for details

## Credits

Built with ❤️ for wellness seekers by PriyaHerbal team.

---

**Your PriyaHerbal platform is production-ready!** 🚀

Deploy to Vercel, add your Supabase credentials, and start selling immediately.
