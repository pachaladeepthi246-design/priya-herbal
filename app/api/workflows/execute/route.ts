import { workflowEngine } from "@/lib/workflows/engine"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { workflowId, triggerData } = await request.json()

    const result = await workflowEngine.executeWorkflow(workflowId, triggerData)

    return NextResponse.json({ success: result })
  } catch (error) {
    console.error("[v0] Workflow execution error:", error)
    return NextResponse.json({ error: "Failed to execute workflow" }, { status: 500 })
  }
}
