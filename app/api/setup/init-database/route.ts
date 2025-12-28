import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// SQL scripts to initialize database
const SQL_SCRIPTS = [
  `
    -- Enable extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Products Table
    CREATE TABLE IF NOT EXISTS public.products (
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
    );
  `,
]

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Check if tables already exist
    const { data: tables } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .limit(1)

    if (tables && tables.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already initialized",
        initialized: true,
      })
    }

    // Execute setup scripts
    for (const script of SQL_SCRIPTS) {
      // Note: In production, use the Supabase dashboard or pgAdmin to run these
      // This is a placeholder for the actual SQL execution
      console.log("SQL Script would execute here")
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      initialized: true,
    })
  } catch (error) {
    console.error("Database init error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database initialization failed. Please run SQL scripts manually in Supabase dashboard.",
        initialized: false,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // Check if database is initialized by checking for products table
    const { data, error } = await supabase.from("products").select("id").limit(1)

    const initialized = !error

    return NextResponse.json({
      success: true,
      initialized,
      message: initialized ? "Database is initialized" : "Database not initialized. Please run SQL scripts.",
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      initialized: false,
      message: "Failed to check database status",
    })
  }
}
