import { createClient } from "@/lib/supabase/server"

export async function getCart(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("cart_items").select("*").eq("user_id", userId)

  if (error) throw error
  return data
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const supabase = await createClient()

  // Check if item already in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .single()

  if (existingItem) {
    // Update quantity
    return supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id)
  } else {
    // Add new item
    return supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      quantity,
    })
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  const supabase = await createClient()
  return supabase.from("cart_items").update({ quantity }).eq("id", itemId)
}

export async function removeFromCart(itemId: string) {
  const supabase = await createClient()
  return supabase.from("cart_items").delete().eq("id", itemId)
}

export async function clearCart(userId: string) {
  const supabase = await createClient()
  return supabase.from("cart_items").delete().eq("user_id", userId)
}
