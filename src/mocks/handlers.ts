import { http, HttpResponse } from 'msw'
import mockMindTreeResponse from './mockData.json'

export const handlers = [
  // http.post('/generate-mind-tree', async ({ request }) => {
  //   const { url } = await request.json()
  //   console.log('Captured a POST /generate-mind-tree request with URL:', url)

  //   return HttpResponse.json(
  //     mockMindTreeResponse,
  //     { status: 201 }
  //   )
  // }),
]