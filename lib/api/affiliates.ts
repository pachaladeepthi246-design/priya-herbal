import { createClient } from "@/lib/supabase/server"

export async function getAffiliateData(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("affiliates").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

export async function getAffiliateCommissions(affiliateId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("commission_transactions")
    .select("*")
    .eq("affiliate_id", affiliateId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getAffiliateClicks(affiliateId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("affiliate_clicks")
    .select("*")
    .eq("affiliate_id", affiliateId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function recordAffiliateClick(affiliateId: string, sourceUrl: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("affiliate_clicks").insert({
    affiliate_id: affiliateId,
    source_url: sourceUrl,
  })

  if (error) throw error
}

export async function updateAffiliatePayoutInfo(
  affiliateId: string,
  bankName: string,
  accountNumber: string,
  ifscCode: string,
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("affiliates")
    .update({
      bank_name: bankName,
      account_number: accountNumber,
      ifsc_code: ifscCode,
    })
    .eq("id", affiliateId)

  if (error) throw error
}
