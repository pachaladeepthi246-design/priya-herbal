import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// Database schema and seed SQL
const SQL_COMMANDS = [
  // Enable extensions
  'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',

  // Products Table
  `CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    long_description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    images JSONB DEFAULT '[]',
    rating DECIMAL(3, 2) DEFAULT 4.5,
    review_count INTEGER DEFAULT 0,
    in_stock BOOLEAN DEFAULT true,
    quantity_available INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Product Variants Table
  `CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price DECIMAL(10, 2),
    quantity_available INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Profiles Table
  `CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'India',
    is_reseller BOOLEAN DEFAULT false,
    reseller_code TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Cart Items Table
  `CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Orders Table
  `CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    payment_id TEXT UNIQUE,
    shipping_address TEXT NOT NULL,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Order Items Table
  `CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Reviews Table
  `CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    title TEXT,
    comment TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Blog Posts Table
  `CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author TEXT,
    category TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Newsletter Subscribers Table
  `CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Contact Submissions Table
  `CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    contact_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Referrals Table
  `CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reseller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    referred_email TEXT,
    order_id UUID REFERENCES public.orders(id),
    commission_amount DECIMAL(10, 2),
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`,

  // Enable RLS
  "ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;",
  "ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;",
  "ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;",
  "ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;",
  "ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;",

  // RLS Policies - Profiles
  `CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);`,
  `CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);`,
  `CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);`,

  // RLS Policies - Cart
  `CREATE POLICY IF NOT EXISTS "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);`,
  `CREATE POLICY IF NOT EXISTS "Users can manage own cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);`,
  `CREATE POLICY IF NOT EXISTS "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);`,
  `CREATE POLICY IF NOT EXISTS "Users can delete own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);`,

  // RLS Policies - Orders
  `CREATE POLICY IF NOT EXISTS "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);`,
  `CREATE POLICY IF NOT EXISTS "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);`,

  // RLS Policies - Order Items
  `CREATE POLICY IF NOT EXISTS "Users can view own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));`,

  // RLS Policies - Reviews
  `CREATE POLICY IF NOT EXISTS "Users can view all reviews" ON public.reviews FOR SELECT USING (true);`,
  `CREATE POLICY IF NOT EXISTS "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);`,
  `CREATE POLICY IF NOT EXISTS "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);`,

  // Create Indexes
  "CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);",
  "CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);",
  "CREATE INDEX IF NOT EXISTS idx_cart_user_id ON public.cart_items(user_id);",
  "CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);",
  "CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);",
  "CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);",

  // Seed Products
  `INSERT INTO public.products (name, slug, description, long_description, price, original_price, category, image_url, images, rating, review_count, in_stock, quantity_available) VALUES
  ('Premium Neem Hair Oil', 'neem-hair-oil', 'Pure neem oil for healthy hair growth', 'Enriched with pure neem extract and coconut oil to prevent hair fall and promote growth. Perfect for all hair types.', 249, 399, 'Hair Care', '/placeholder.svg?height=400&width=400', '[]', 4.7, 234, true, 150),
  ('Turmeric Face Pack', 'turmeric-face-pack', 'Natural turmeric and gram flour face pack', 'Brighten your complexion naturally with our turmeric and gram flour blend. Reduces acne and improves skin radiance.', 199, 299, 'Skin Care', '/placeholder.svg?height=400&width=400', '[]', 4.6, 189, true, 200),
  ('Ashwagandha Powder', 'ashwagandha-powder', 'Pure organic ashwagandha powder', 'Boost immunity and reduce stress with our premium ashwagandha powder. Perfect for daily wellness routine.', 399, 599, 'Immunity', '/placeholder.svg?height=400&width=400', '[]', 4.8, 312, true, 100),
  ('Tulsi Green Tea', 'tulsi-green-tea', 'Organic tulsi and green tea blend', 'Antioxidant-rich tulsi green tea for daily wellness and immune support. 25 tea bags per pack.', 179, 259, 'Immunity', '/placeholder.svg?height=400&width=400', '[]', 4.5, 156, true, 250),
  ('Brahmi Hair Oil', 'brahmi-hair-oil', 'Brahmi infused cooling hair oil', 'Cool and nourish your scalp with brahmi oil. Reduces hair fall and promotes natural growth.', 229, 349, 'Hair Care', '/placeholder.svg?height=400&width=400', '[]', 4.7, 198, true, 120),
  ('Hibiscus Face Mask', 'hibiscus-face-mask', 'Hibiscus and rose clay mask', 'Deep cleansing mask with hibiscus and natural clay. Removes impurities and tightens pores.', 249, 399, 'Skin Care', '/placeholder.svg?height=400&width=400', '[]', 4.4, 142, true, 180),
  ('Triphala Powder', 'triphala-powder', 'Three-fruit Ayurvedic blend', 'Traditional triphala formula for digestive health and detoxification. Pure organic ingredients.', 349, 499, 'Wellness', '/placeholder.svg?height=400&width=400', '[]', 4.9, 276, true, 90),
  ('Aloe Vera Gel', 'aloe-vera-gel', '100% pure aloe vera gel', 'Soothing and hydrating aloe vera gel for skin and hair care. Organic and preservative-free.', 199, 299, 'Skin Care', '/placeholder.svg?height=400&width=400', '[]', 4.6, 201, true, 220),
  ('Bhringraj Oil', 'bhringraj-oil', 'Bhringraj herbal hair oil', 'The king of herbs for hair. Prevents premature graying and strengthens hair roots.', 269, 429, 'Hair Care', '/placeholder.svg?height=400&width=400', '[]', 4.8, 267, true, 110),
  ('Sandalwood Face Cream', 'sandalwood-face-cream', 'Premium sandalwood moisturizing cream', 'Luxurious sandalwood cream for soft, glowing skin. Perfect for all seasons and skin types.', 499, 799, 'Skin Care', '/placeholder.svg?height=400&width=400', '[]', 4.7, 189, true, 80)
  ON CONFLICT (slug) DO NOTHING;`,
]

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    })

    console.log("[v0] Starting database initialization...")

    let successCount = 0
    let errorCount = 0

    for (const sql of SQL_COMMANDS) {
      try {
        const { error } = await supabase.rpc("execute_sql", {
          sql: sql,
        } as any)

        if (error && !error.message.includes("already exists")) {
          console.warn(`[v0] Warning executing SQL: ${error.message}`)
          errorCount++
        } else {
          successCount++
        }
      } catch (err) {
        console.error(`[v0] Error: ${err}`)
        errorCount++
      }
    }

    console.log(`[v0] Database setup complete: ${successCount} successful, ${errorCount} warnings`)

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      stats: { successCount, errorCount },
    })
  } catch (error) {
    console.error("[v0] Database setup failed:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database initialization failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
