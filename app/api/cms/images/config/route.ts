import { getSiteImages } from '@/lib/site-images'

export async function GET() {
  const config = getSiteImages()
  return Response.json({ config })
}
