-- Insert sample user roles (after users are created via auth)
-- This will be populated when users sign up

-- Insert commission tier definitions
INSERT INTO public.affiliates (user_id, affiliate_code, affiliate_url, commission_rate, tier, active) VALUES
-- These will be populated when affiliates sign up. Example structure below:
-- ('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'PRIYA001', 'https://priyaherbal.com/ref/PRIYA001', 10.0, 'silver', true),
-- ('yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy', 'PRIYA002', 'https://priyaherbal.com/ref/PRIYA002', 12.0, 'gold', true);
NULL;

-- Commission tier structure (benefits by tier)
-- Bronze: 5% commission, Silver: 10%, Gold: 12%, Platinum: 15%
-- Gold tier: 2 levels of commissions (10% direct, 5% second level)
-- Platinum: 3 levels (10% direct, 8% second, 3% third level)
