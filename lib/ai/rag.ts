// RAG (Retrieval Augmented Generation) System
import { ollama } from "./config"
import { initializeVectorStore, textSplitter } from "./config"

export interface RAGDocument {
  content: string
  metadata: Record<string, any>
}

export async function indexDocuments(documents: RAGDocument[]) {
  try {
    const vectorStore = await initializeVectorStore()

    for (const doc of documents) {
      const chunks = await textSplitter.splitText(doc.content)

      for (const chunk of chunks) {
        await vectorStore.addDocuments(
          [
            {
              pageContent: chunk,
              metadata: doc.metadata,
            },
          ],
          { ids: [Math.random().toString(36).substr(2, 9)] },
        )
      }
    }

    return vectorStore
  } catch (error) {
    console.error("[v0] Document indexing failed:", error)
    throw error
  }
}

export async function queryDocuments(query: string, topK = 5) {
  try {
    const vectorStore = await initializeVectorStore()
    const results = await vectorStore.similaritySearch(query, topK)
    return results
  } catch (error) {
    console.error("[v0] Document query failed:", error)
    throw error
  }
}

export async function generateWithRAG(prompt: string, context: RAGDocument[], systemPrompt?: string) {
  try {
    // Index documents for context
    const vectorStore = await initializeVectorStore()

    // Get relevant documents
    const relevantDocs = await vectorStore.similaritySearch(prompt, 3)
    const contextText = relevantDocs.map((doc) => doc.pageContent).join("\n\n")

    // Generate response with context
    const fullPrompt = `
${systemPrompt || "You are a helpful AI assistant for PriyaHerbal, an e-commerce platform for herbal products."}

Context information:
${contextText}

User query: ${prompt}

Please provide a helpful response based on the context above.
`

    const response = await ollama.generate({
      model: process.env.OLLAMA_MODEL || "mistral",
      prompt: fullPrompt,
      stream: false,
    })

    return response.response
  } catch (error) {
    console.error("[v0] RAG generation failed:", error)
    throw error
  }
}
