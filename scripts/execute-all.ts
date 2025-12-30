import { createClient } from "@supabase/supabase-js"
import * as fs from "fs"
import * as path from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("[ERROR] Missing Supabase credentials")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function executeSQL(scriptPath: string, scriptName: string): Promise<void> {
  try {
    console.log(`\n[${scriptName}] Starting execution...`)
    const sqlContent = fs.readFileSync(scriptPath, "utf-8")

    const { error } = await supabase.rpc("execute_sql", {
      query: sqlContent,
    })

    if (error) {
      console.error(`[${scriptName}] Error:`, error.message)
      return
    }

    console.log(`[${scriptName}] ✓ Executed successfully`)
  } catch (err) {
    console.error(`[${scriptName}] Error:`, err)
  }
}

async function main() {
  console.log("=".repeat(70))
  console.log("PRIYA HERBAL - DATABASE SETUP")
  console.log("=".repeat(70))

  const scripts = [
    {
      path: path.join(process.cwd(), "scripts", "001_create_tables.sql"),
      name: "001_create_tables.sql",
    },
    {
      path: path.join(process.cwd(), "scripts", "002_seed_products.sql"),
      name: "002_seed_products.sql",
    },
    {
      path: path.join(process.cwd(), "scripts", "003_enhanced_affiliate_tables.sql"),
      name: "003_enhanced_affiliate_tables.sql",
    },
    {
      path: path.join(process.cwd(), "scripts", "004_seed_affiliate_data.sql"),
      name: "004_seed_affiliate_data.sql",
    },
  ]

  for (const script of scripts) {
    if (fs.existsSync(script.path)) {
      await executeSQL(script.path, script.name)
    } else {
      console.warn(`[${script.name}] File not found: ${script.path}`)
    }
  }

  console.log("\n" + "=".repeat(70))
  console.log("DATABASE SETUP COMPLETE")
  console.log("=".repeat(70))
}

main().catch(console.error)
