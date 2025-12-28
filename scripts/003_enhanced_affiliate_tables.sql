-- User Roles Table (Admin, Agent/Affiliate, Customer)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'customer', -- admin, agent, affiliate, customer
  is_verified BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate Program Table
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  affiliate_code TEXT NOT NULL UNIQUE,
  affiliate_url TEXT NOT NULL UNIQUE,
  commission_rate DECIMAL(5, 2) DEFAULT 10.0, -- percentage
  tier TEXT DEFAULT 'silver', -- bronze, silver, gold, platinum
  total_referrals INTEGER DEFAULT 0,
  total_commissions DECIMAL(10, 2) DEFAULT 0,
  active BOOLEAN DEFAULT true,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  upi_id TEXT,
  tax_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Commission Transactions
CREATE TABLE IF NOT EXISTS public.commission_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id),
  commission_amount DECIMAL(10, 2) NOT NULL,
  order_amount DECIMAL(10, 2),
  commission_rate DECIMAL(5, 2),
  status TEXT DEFAULT 'pending', -- pending, approved, paid, cancelled
  payment_method TEXT, -- upi, bank_transfer, wallet
  transaction_id TEXT UNIQUE,
  payout_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate Clicks/Tracking
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  source_url TEXT,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  converted_to_order BOOLEAN DEFAULT false,
  order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Multi-Level Commission Structure
CREATE TABLE IF NOT EXISTS public.commission_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  level INTEGER, -- 1 (direct referrals), 2 (referred by my referral), etc
  referred_affiliate_id UUID REFERENCES public.affiliates(id),
  commission_percentage DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payment Gateway Integration
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  gateway TEXT NOT NULL, -- cashfree, razorpay, gpay, upi
  transaction_id TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'initiated', -- initiated, processing, success, failed, refunded
  qr_code TEXT, -- QR code data URL for UPI
  qr_code_url TEXT,
  payment_method TEXT, -- upi, card, netbanking, wallet
  customer_phone TEXT,
  customer_email TEXT,
  response_data JSONB,
  webhook_received BOOLEAN DEFAULT false,
  webhook_data JSONB,
  refund_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Tracking Events
CREATE TABLE IF NOT EXISTS public.order_tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- pending, confirmed, processing, shipped, in_transit, out_for_delivery, delivered, cancelled
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  tracking_number TEXT,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email & Notification Log
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  email_type TEXT NOT NULL, -- order_confirmation, order_shipped, commission_payout, verification, newsletter
  subject TEXT,
  template_data JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  delivery_status TEXT DEFAULT 'pending', -- pending, sent, failed, bounced
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Webhook Events Log
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- payment.success, payment.failed, order.updated
  source TEXT NOT NULL, -- cashfree, razorpay, make_webhook
  data JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for new tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_tracking_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for User Roles
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all roles"
  ON public.user_roles FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- RLS Policies for Affiliates
CREATE POLICY "Affiliates can view own data"
  ON public.affiliates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Affiliates can update own data"
  ON public.affiliates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all affiliates"
  ON public.affiliates FOR ALL
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- RLS Policies for Commission Transactions
CREATE POLICY "Affiliates can view own commissions"
  ON public.commission_transactions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.affiliates WHERE id = commission_transactions.affiliate_id AND user_id = auth.uid()));

CREATE POLICY "Admins can view all commissions"
  ON public.commission_transactions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- RLS Policies for Payment Transactions
CREATE POLICY "Users can view own payment transactions"
  ON public.payment_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payment transactions"
  ON public.payment_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_affiliates_user_id ON public.affiliates(user_id);
CREATE INDEX idx_affiliates_code ON public.affiliates(affiliate_code);
CREATE INDEX idx_commission_affiliate_id ON public.commission_transactions(affiliate_id);
CREATE INDEX idx_commission_status ON public.commission_transactions(status);
CREATE INDEX idx_affiliate_clicks_affiliate_id ON public.affiliate_clicks(affiliate_id);
CREATE INDEX idx_payment_order_id ON public.payment_transactions(order_id);
CREATE INDEX idx_payment_status ON public.payment_transactions(status);
CREATE INDEX idx_tracking_order_id ON public.order_tracking_events(order_id);
CREATE INDEX idx_email_logs_user_id ON public.email_logs(user_id);
CREATE INDEX idx_webhook_events_event_type ON public.webhook_events(event_type);
