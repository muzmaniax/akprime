import fs from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-images.json')

export function getSiteImages(): Record<string, string> {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
}

export function getSiteImage(key: string): string {
  return getSiteImages()[key] ?? ''
}
