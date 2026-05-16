import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const ext = path.extname(file.name).toLowerCase()
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
    if (!allowed.includes(ext)) {
      return Response.json({ error: 'File type not allowed' }, { status: 400 })
    }

    // Sanitize filename: lowercase, replace non-alphanumeric with hyphens, keep extension
    const baseName = path.basename(file.name, ext)
    const sanitized = baseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const filename = `${Date.now()}-${sanitized}${ext}`

    const imagesDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }

    const filePath = path.join(imagesDir, filename)
    const arrayBuffer = await file.arrayBuffer()
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer))

    return Response.json({ path: `/images/${filename}` })
  } catch (err) {
    console.error('CMS upload error:', err)
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
