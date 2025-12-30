"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type CMSPage = {
  id: string
  title: string
  slug: string
  content: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function CMSDashboard() {
  const [pages, setPages] = useState<CMSPage[]>([])
  const [editing, setEditing] = useState<CMSPage | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("pages")

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    setLoading(true)
    try {
      const { data } = await supabase.from("cms_pages").select("*")
      setPages(data || [])
    } catch (error) {
      console.error("[v0] Failed to load pages:", error)
    } finally {
      setLoading(false)
    }
  }

  async function savePage() {
    if (!editing) return

    setLoading(true)
    try {
      if (editing.id) {
        await supabase.from("cms_pages").update(editing).eq("id", editing.id)
      } else {
        await supabase.from("cms_pages").insert([editing])
      }

      await loadPages()
      setEditing(null)
    } catch (error) {
      console.error("[v0] Failed to save page:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deletePage(id: string) {
    setLoading(true)
    try {
      await supabase.from("cms_pages").delete().eq("id", id)
      await loadPages()
    } catch (error) {
      console.error("[v0] Failed to delete page:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">CMS Dashboard</h1>
          <p className="text-muted-foreground">Manage website content, pages, and SEO</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <CardTitle>Manage Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{page.title}</h3>
                        <p className="text-sm text-muted-foreground">{page.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setEditing(page)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => deletePage(page.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>{editing?.id ? "Edit Page" : "Create New Page"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Page Title</label>
                    <Input
                      value={editing?.title || ""}
                      onChange={(e) => setEditing({ ...(editing || {}), title: e.target.value } as CMSPage)}
                      placeholder="e.g., About Us"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">URL Slug</label>
                    <Input
                      value={editing?.slug || ""}
                      onChange={(e) => setEditing({ ...(editing || {}), slug: e.target.value } as CMSPage)}
                      placeholder="e.g., about-us"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={editing?.content || ""}
                      onChange={(e) => setEditing({ ...(editing || {}), content: e.target.value } as CMSPage)}
                      placeholder="Page content..."
                      rows={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Title</label>
                    <Input
                      value={editing?.seoTitle || ""}
                      onChange={(e) => setEditing({ ...(editing || {}), seoTitle: e.target.value } as CMSPage)}
                      placeholder="Meta title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Description</label>
                    <Textarea
                      value={editing?.seoDescription || ""}
                      onChange={(e) => setEditing({ ...(editing || {}), seoDescription: e.target.value } as CMSPage)}
                      placeholder="Meta description..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={savePage} disabled={loading}>
                      Save Page
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Management</CardTitle>
                <CardDescription>Manage SEO settings for all pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    All pages are automatically optimized for search engines. Customize SEO settings per page.
                  </p>
                  {pages.map((page) => (
                    <div key={page.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">Keywords: {page.seoKeywords || "Not set"}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
