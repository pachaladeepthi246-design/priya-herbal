# Environment Variables Security Guide

## What's Secure and What's Not

### ✅ SAFE to expose (NEXT_PUBLIC_ prefix)
These can be seen in browser console - they're meant to be public:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CASHFREE_KEY_ID=your-key-id
NEXT_PUBLIC_CASHFREE_MODE=TEST
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

### ❌ NEVER expose (NO NEXT_PUBLIC_ prefix)
These are secrets - keep them server-side ONLY:

```
CASHFREE_SECRET_KEY=your-secret-key (NO NEXT_PUBLIC_ prefix!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (NO NEXT_PUBLIC_ prefix!)
SENDGRID_API_KEY=your-sendgrid-key (NO NEXT_PUBLIC_ prefix!)
```

---

## How to Configure in Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click your "priya-herbal" project
3. Click **Settings** at the top
4. Click **Environment Variables** in the left menu

### Step 2: Add Public Variables (Safe to Expose)
Click **Add New Variable** for each:

| Key | Value | Scope |
|-----|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://geisrdwsimouxlalschy.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key-from-supabase` | Production, Preview, Development |
| `NEXT_PUBLIC_CASHFREE_KEY_ID` | `your-cashfree-key-id` | Production, Preview, Development |
| `NEXT_PUBLIC_CASHFREE_MODE` | `TEST` (change to `PROD` later) | Production, Preview, Development |
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | `http://localhost:3000` | Development only |

### Step 3: Add Secret Variables (Keep Secret!)
Click **Add New Variable** for each - these should ONLY be in Production:

| Key | Value | Scope |
|-----|-------|-------|
| `CASHFREE_SECRET_KEY` | `your-cashfree-secret-key` | **Production only** |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` | **Production only** |
| `SENDGRID_API_KEY` | `your-sendgrid-key` (optional) | **Production only** |

---

## Important Security Notes

### Why This Matters

- **NEXT_PUBLIC_** variables are embedded in your JavaScript bundle
- Anyone can view them by opening DevTools → Console
- Use them ONLY for non-sensitive data (public keys, URLs, IDs)
- Secret keys should NEVER have NEXT_PUBLIC_ prefix
- Secret keys are only available to server-side code (API routes, server components)

### How It Works in Code

**✅ Client-Safe (Can be public):**
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL  // Visible to browser
const cashfreeKeyId = process.env.NEXT_PUBLIC_CASHFREE_KEY_ID  // Visible to browser
```

**❌ Server-Only (Never exposed):**
```typescript
// This is in app/api/payments/cashfree/initiate/route.ts (server-side)
const cashfreeSecret = process.env.CASHFREE_SECRET_KEY  // Only on server
// This secret is never sent to browser - used only for API calls to Cashfree
```

---

## Verifying Your Setup

### Step 1: Check Browser Console
Open your site and press F12 to open DevTools:

```javascript
// In DevTools Console, you can see:
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)  // Shows URL (safe)
console.log(process.env.NEXT_PUBLIC_CASHFREE_KEY_ID)  // Shows ID (safe)

// But you CANNOT see:
console.log(process.env.CASHFREE_SECRET_KEY)  // undefined in browser
```

### Step 2: Check Network Requests
In DevTools → Network tab:
- Look at API requests to `/api/payments/cashfree/initiate`
- You should see headers with `x-client-id` and `x-client-secret`
- The secret should NOT be visible in the request body or URL
- It should only be in the request headers (server-side)

### Step 3: Test Payment Flow
1. Add product to cart
2. Go to checkout
3. Complete payment
4. Check DevTools → Network tab
5. Look for POST to `/api/payments/cashfree/initiate`
6. Verify secret key is NOT exposed

---

## If You See "Secret Exposed" Warning

This usually means:

1. **Code issue**: Remove any `NEXT_PUBLIC_` prefix from secret keys
2. **vercel.json issue**: Update file to not list secret keys
3. **Browser cache**: Hard refresh (Ctrl+Shift+R)
4. **Old deployment**: Redeploy after fixing variables

### Quick Fix

In your code:

```typescript
// ❌ WRONG
const secret = process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY

// ✅ CORRECT (in server-side code only)
const secret = process.env.CASHFREE_SECRET_KEY
```

In vercel.json:

```json
// ❌ WRONG
"env": {
  "NEXT_PUBLIC_CASHFREE_SECRET_KEY": "@secret"
}

// ✅ CORRECT - remove NEXT_PUBLIC_ prefix
"env": {
  "CASHFREE_SECRET_KEY": "@secret"
}
```

---

## Production Checklist

Before going live:

- [ ] All NEXT_PUBLIC_ variables are non-sensitive (IDs, URLs, mode)
- [ ] Secret variables have NO NEXT_PUBLIC_ prefix
- [ ] Secret variables set to "Production only" scope in Vercel
- [ ] Redeploy after changing any environment variables
- [ ] Test payment flow with TEST mode first
- [ ] No secrets visible in DevTools Console
- [ ] No secrets visible in Network requests

---

## Need to Change a Secret Later?

1. Go to Vercel Project Settings → Environment Variables
2. Find the secret variable
3. Click the three dots ⋯ on the right
4. Click **Edit**
5. Enter new value
6. Click **Save**
7. **Redeploy** the application
8. Test to confirm it works

---

## Support

If you see security warnings:
- WhatsApp: +91 8500 647 979
- Email: hello@priyaherbal.com
