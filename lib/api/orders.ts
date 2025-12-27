import { createClient } from "@/lib/supabase/server"
import { generateOrderNumber } from "@/lib/utils"

export async function createOrder(userId: string, shippingAddress: string, totalAmount: number, paymentMethod: string) {
  const supabase = await createClient()

  const orderNumber = generateOrderNumber()

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      order_number: orderNumber,
      total_amount: totalAmount,
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
      status: "pending",
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createOrderItems(
  orderId: string,
  items: Array<{ productId: string; quantity: number; price: number }>,
) {
  const supabase = await createClient()

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }))

  const { error } = await supabase.from("order_items").insert(orderItems)

  if (error) throw error
}

export async function updateOrderStatus(orderId: string, status: string, paymentId?: string) {
  const supabase = await createClient()

  const updateData: any = { status }
  if (paymentId) updateData.payment_id = paymentId

  const { error } = await supabase.from("orders").update(updateData).eq("id", orderId)

  if (error) throw error
}

export async function getUserOrders(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
