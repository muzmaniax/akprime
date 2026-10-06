import fs from 'fs'
import path from 'path'

const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])

function listImages(dir: string, prefix: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => ALLOWED_EXTS.has(path.extname(f).toLowerCase()))
    .map((f) => `${prefix}/${f}`)
}

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public')
  const images = [
    ...listImages(path.join(publicDir, 'images'), '/images'),
    ...listImages(path.join(publicDir, 'partners'), '/partners'),
  ]
  return Response.json({ images })
}
