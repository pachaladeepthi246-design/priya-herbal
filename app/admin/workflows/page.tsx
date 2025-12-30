"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function WorkflowsPage() {
  const [workflows] = useState([
    {
      id: "1",
      name: "Welcome Email",
      trigger: "New User Signup",
      actions: ["Send Email"],
      enabled: true,
    },
    {
      id: "2",
      name: "Order Confirmation",
      trigger: "Order Created",
      actions: ["Send Email", "Send WhatsApp"],
      enabled: true,
    },
    {
      id: "3",
      name: "Abandoned Cart Recovery",
      trigger: "Cart Abandoned (24h)",
      actions: ["Send Email", "Send WhatsApp Reminder"],
      enabled: true,
    },
  ])

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Workflow Automation</h1>
          <p className="text-muted-foreground">Create and manage automated workflows</p>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Workflows</TabsTrigger>
            <TabsTrigger value="create">Create Workflow</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{workflow.name}</CardTitle>
                      <div className="flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${workflow.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {workflow.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Trigger:</strong> {workflow.trigger}
                      </p>
                      <p>
                        <strong>Actions:</strong> {workflow.actions.join(", ")}
                      </p>
                      <Button variant="outline" size="sm">
                        Edit Workflow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Visual workflow builder coming soon. Contact support to create custom workflows.
                </p>
                <Button>Contact Support</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
