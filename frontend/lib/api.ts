import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface ChatResponse {
  answer: string
  sources: Array<{
    title: string
    url: string
    relevance: number
  }>
  success: boolean
}

export interface SearchResponse {
  results: Array<{
    content: string
    title: string
    url: string
    relevance: number
  }>
  total: number
}

export async function sendMessage(
  question: string,
  language: string = 'en'
): Promise<ChatResponse> {
  const response = await axios.post(`${API_URL}/ask`, {
    question,
    language,
    n_context: 5,
  })

  return response.data
}

export async function searchDocs(
  query: string,
  nResults: number = 5
): Promise<SearchResponse> {
  const response = await axios.post(`${API_URL}/search`, {
    query,
    n_results: nResults,
  })

  return response.data
}

export async function getStats() {
  const response = await axios.get(`${API_URL}/stats`)
  return response.data
}

export async function healthCheck() {
  const response = await axios.get(`${API_URL}/health`)
  return response.data
}
