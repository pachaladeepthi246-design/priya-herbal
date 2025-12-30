// AI Configuration - Local LLM Integration via Ollama/LM Studio
import { Ollama } from "ollama"
import { HuggingFaceEmbeddings } from "@langchain/community/embeddings/hf"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

// Initialize Ollama with local models (self-hosted)
const ollama = new Ollama({
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  model: process.env.OLLAMA_MODEL || "mistral",
})

// Initialize Embeddings for RAG
const embeddings = new HuggingFaceEmbeddings({
  model: "sentence-transformers/all-minilm-l6-v2", // Free, lightweight model
})

// Vector Store for semantic search
export async function initializeVectorStore() {
  try {
    const vectorStore = new MemoryVectorStore(embeddings)
    return vectorStore
  } catch (error) {
    console.error("[v0] Vector store initialization failed:", error)
    throw error
  }
}

// Text splitter for RAG
export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
})

export { ollama, embeddings }
