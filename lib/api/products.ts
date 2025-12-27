import { createClient } from "@/lib/supabase/server"

export async function getProducts(category?: string) {
  const supabase = await createClient()

  let query = supabase.from("products").select("*")

  if (category && category !== "All") {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error) throw error
  return data
}

export async function getProductReviews(productId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
