#!/bin/bash

# PriyaHerbal Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 PriyaHerbal Deployment Script"
echo "=================================="
echo ""

# Check if environment variables are set
echo "✓ Checking environment variables..."

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_URL not set"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not set"
  exit 1
fi

if [ -z "$NEXT_PUBLIC_CASHFREE_KEY_ID" ]; then
  echo "❌ NEXT_PUBLIC_CASHFREE_KEY_ID not set"
  exit 1
fi

if [ -z "$CASHFREE_SECRET_KEY" ]; then
  echo "❌ CASHFREE_SECRET_KEY not set"
  exit 1
fi

echo "✓ All required environment variables are set"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "✓ Build successful!"
else
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "=================================="
echo "✓ Deployment ready!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Deploy to production'"
echo "3. git push origin main"
echo ""
echo "Vercel will automatically deploy your changes."
echo "Monitor at: https://vercel.com/dashboard"
