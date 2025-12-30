// Visual Workflow Automation Engine
import { createClient } from "@supabase/supabase-js"

export interface WorkflowNode {
  id: string
  type: "trigger" | "action" | "condition" | "delay"
  data: Record<string, any>
  nextNodeId?: string
}

export interface WorkflowTrigger {
  type: "form_submit" | "order_created" | "contact_message" | "scheduled"
  data: Record<string, any>
}

export interface WorkflowAction {
  type: "send_email" | "send_whatsapp" | "create_task" | "update_database"
  data: Record<string, any>
}

export class WorkflowEngine {
  private supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  async executeWorkflow(workflowId: string, triggerData: any) {
    try {
      const { data: workflow } = await this.supabase.from("workflows").select("*").eq("id", workflowId).single()

      if (!workflow) return false

      const nodes: WorkflowNode[] = workflow.nodes || []
      const startNode = nodes.find((n) => n.type === "trigger")

      if (startNode) {
        await this.executeNode(startNode, triggerData, nodes)
      }

      return true
    } catch (error) {
      console.error("[v0] Workflow execution failed:", error)
      return false
    }
  }

  private async executeNode(node: WorkflowNode, data: any, allNodes: WorkflowNode[]) {
    switch (node.type) {
      case "action":
        await this.executeAction(node.data)
        break
      case "condition":
        const result = this.evaluateCondition(node.data, data)
        const nextId = result ? node.data.trueBranch : node.data.falseBranch
        const nextNode = allNodes.find((n) => n.id === nextId)
        if (nextNode) await this.executeNode(nextNode, data, allNodes)
        return
      case "delay":
        await new Promise((resolve) => setTimeout(resolve, node.data.milliseconds))
        break
    }

    if (node.nextNodeId) {
      const nextNode = allNodes.find((n) => n.id === node.nextNodeId)
      if (nextNode) await this.executeNode(nextNode, data, allNodes)
    }
  }

  private async executeAction(actionData: any) {
    const { type, ...params } = actionData

    switch (type) {
      case "send_email":
        // Email implementation
        break
      case "send_whatsapp":
        // WhatsApp implementation
        break
      case "create_task":
        // Task creation in database
        break
    }
  }

  private evaluateCondition(condition: any, data: any): boolean {
    const { field, operator, value } = condition
    const fieldValue = data[field]

    switch (operator) {
      case "equals":
        return fieldValue === value
      case "contains":
        return String(fieldValue).includes(String(value))
      case "greater_than":
        return fieldValue > value
      case "less_than":
        return fieldValue < value
      default:
        return false
    }
  }
}

export const workflowEngine = new WorkflowEngine()
