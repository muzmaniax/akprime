import fs from 'fs'
import path from 'path'

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content-cms.json')

export type CaseStudyCMSFields = {
  title: string
  tagline: string
  summary: string
  duration: string
  metrics: { value: string; label: string }[]
  narrative_problem: string
  narrative_outcome: string
  testimonial_quote: string
  testimonial_name: string
  testimonial_role: string
  approach: { title: string; description: string; points: string[] }[]
}

export type InsightCMSFields = {
  title: string
  category: string
  author: string
  authorRole: string
  date: string
  excerpt: string
  content: string
}

export type ContentCMSData = {
  'case-studies': Record<string, Partial<CaseStudyCMSFields>>
  insights: Record<string, Partial<InsightCMSFields>>
}

export function getContentCMS(): ContentCMSData {
  try {
    const raw = fs.readFileSync(CONTENT_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { 'case-studies': {}, insights: {} }
  }
}

export function saveContentCMS(data: ContentCMSData): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), 'utf-8')
}
