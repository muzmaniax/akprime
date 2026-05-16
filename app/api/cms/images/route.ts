import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { getSiteImages } from '@/lib/site-images'

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-images.json')

const SLOT_META: Record<string, { label: string; page: string; section: string }> = {
  'hero.background':              { label: 'Hero Background',            page: 'Home',       section: 'Hero' },
  'home.about_photo':             { label: 'About Block Photo',          page: 'Home',       section: 'About Block' },
  'about.hero_bg':                { label: 'Hero Background',            page: 'About',      section: 'Hero' },
  'about.panel_1':                { label: 'Stats Panel (Left)',         page: 'About',      section: 'Stats' },
  'about.panel_2':                { label: 'Stats Panel (Right)',        page: 'About',      section: 'Stats' },
  'insights.cta_bg':              { label: 'CTA Background',            page: 'Shared',     section: 'Insights CTA' },
  'insights.card_1':              { label: 'CTA Card 1',                page: 'Shared',     section: 'Insights CTA' },
  'insights.card_2':              { label: 'CTA Card 2',                page: 'Shared',     section: 'Insights CTA' },
  'insights.card_3':              { label: 'CTA Card 3',                page: 'Shared',     section: 'Insights CTA' },
  'abouthero.col_1':              { label: 'Parallax Col 1',            page: 'About',      section: 'Parallax' },
  'abouthero.col_2':              { label: 'Parallax Col 2',            page: 'About',      section: 'Parallax' },
  'abouthero.col_3':              { label: 'Parallax Col 3',            page: 'About',      section: 'Parallax' },
  'abouthero.col_4':              { label: 'Parallax Col 4',            page: 'About',      section: 'Parallax' },
  'booking.bg':                   { label: 'Booking Modal BG',          page: 'Shared',     section: 'Booking Modal' },
  'industry.manufacturing':       { label: 'Manufacturing',             page: 'Industries', section: 'Manufacturing' },
  'industry.financial-services':  { label: 'Financial Services',        page: 'Industries', section: 'Financial Services' },
  'industry.logistics':           { label: 'Logistics',                 page: 'Industries', section: 'Logistics' },
  'industry.healthcare':          { label: 'Healthcare',                page: 'Industries', section: 'Healthcare' },
  'industry.ngos':                { label: 'NGOs & Donors',             page: 'Industries', section: 'NGOs & Donors' },
  'industry.government':          { label: 'Government',                page: 'Industries', section: 'Government' },
  'industry.education':           { label: 'Education',                 page: 'Industries', section: 'Education' },
  'industry.retail':              { label: 'Retail & FMCG',             page: 'Industries', section: 'Retail & FMCG' },
  'partner.1':                    { label: 'Partner Logo 1',            page: 'Shared',     section: 'Partners' },
  'partner.2':                    { label: 'Partner Logo 2',            page: 'Shared',     section: 'Partners' },
  'partner.3':                    { label: 'Partner Logo 3',            page: 'Shared',     section: 'Partners' },
  'partner.4':                    { label: 'Partner Logo 4',            page: 'Shared',     section: 'Partners' },
  'partner.5':                    { label: 'Partner Logo 5',            page: 'Shared',     section: 'Partners' },
  'partner.6':                    { label: 'Partner Logo 6',            page: 'Shared',     section: 'Partners' },
  'insight.why-most-business-problems-are-misdiagnosed.image': { label: 'Article Image',  page: 'Insights', section: 'Why Most Business Problems Are Misdiagnosed' },
  'insight.the-real-cost-of-poor-decision-making.image':       { label: 'Article Image',  page: 'Insights', section: 'The Real Cost of Poor Decision-Making' },
  'insight.when-founders-should-seek-external-perspective.image': { label: 'Article Image', page: 'Insights', section: 'When Founders Should Seek External Perspective' },
  'casestudy.mo-radio-tax-compliance.image':           { label: 'MO Radio — Card Image',              page: 'Case Studies', section: 'MO Radio' },
  'casestudy.mo-radio-tax-compliance.testimonial':     { label: 'MO Radio — Testimonial Portrait',    page: 'Case Studies', section: 'MO Radio' },
  'casestudy.mo-radio-tax-compliance.logo':            { label: 'MO Radio — Client Logo',             page: 'Case Studies', section: 'MO Radio' },
  'casestudy.coastal-image-technologies.image':        { label: 'Coastal Image — Card Image',         page: 'Case Studies', section: 'Coastal Image Technologies' },
  'casestudy.coastal-image-technologies.testimonial':  { label: 'Coastal Image — Testimonial Portrait', page: 'Case Studies', section: 'Coastal Image Technologies' },
  'casestudy.coastal-image-technologies.logo':         { label: 'Coastal Image — Client Logo',        page: 'Case Studies', section: 'Coastal Image Technologies' },
  'service.erp':          { label: 'ERP Implementation',              page: 'Services', section: 'Systems & Technology' },
  'service.ai':           { label: 'AI Integration & Automation',     page: 'Services', section: 'Systems & Technology' },
  'service.training':     { label: 'Training Services',               page: 'Services', section: 'Systems & Technology' },
  'service.pm':           { label: 'Project Management',              page: 'Services', section: 'Strategy & Transformation' },
  'service.ba':           { label: 'Business Analysis',               page: 'Services', section: 'Strategy & Transformation' },
  'service.restructuring':{ label: 'Company Restructuring',           page: 'Services', section: 'Strategy & Transformation' },
  'service.vc':           { label: 'VC & Fundraising Advisory',       page: 'Services', section: 'Strategy & Transformation' },
  'service.finance':      { label: 'Financial Management (FP&A)',     page: 'Services', section: 'Finance & Compliance' },
  'service.cashflow':     { label: 'Cashflow Optimisation',           page: 'Services', section: 'Finance & Compliance' },
  'service.audit':        { label: 'Audit Services',                  page: 'Services', section: 'Finance & Compliance' },
  'service.it-audit':     { label: 'System & IT Audits',              page: 'Services', section: 'Finance & Compliance' },
  'service.bookkeeping':  { label: 'Bookkeeping & Cloud Accounting',  page: 'Services', section: 'Finance & Compliance' },
  'service.risk':         { label: 'Risk & Compliance Advisory',      page: 'Services', section: 'Finance & Compliance' },
  'service.secretarial':  { label: 'Company Secretarial',             page: 'Services', section: 'Finance & Compliance' },
  'service.marketing':    { label: 'Digital Marketing',               page: 'Services', section: 'Growth & Impact' },
  'service.me':           { label: 'M&E / Impact Assessment',         page: 'Services', section: 'Growth & Impact' },
  'service.hr-advisory':  { label: 'HR Advisory & Org Design',        page: 'Services', section: 'HR & People Services' },
  'service.hr-policy':    { label: 'HR Policy & Compliance',          page: 'Services', section: 'HR & People Services' },
  'service.payroll':      { label: 'Payroll Management',              page: 'Services', section: 'HR & People Services' },
  'service.recruitment':  { label: 'Recruitment & Talent Acquisition',page: 'Services', section: 'HR & People Services' },
  'service.performance':  { label: 'Performance Management Systems',  page: 'Services', section: 'HR & People Services' },
  'service.hrms':         { label: 'HR Technology / HRMS',            page: 'Services', section: 'HR & People Services' },
  'service.learning':     { label: 'Learning & Development',          page: 'Services', section: 'HR & People Services' },
}

export async function GET() {
  const config = getSiteImages()
  const slots = Object.keys(SLOT_META).map((key) => ({
    key,
    path: config[key] ?? '',
    ...SLOT_META[key],
  }))
  return Response.json({ slots })
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as { key: string; path: string }
    const { key, path: imgPath } = body

    if (!key || !imgPath) {
      return Response.json({ error: 'key and path are required' }, { status: 400 })
    }

    const config = getSiteImages()
    config[key] = imgPath
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')

    revalidatePath('/', 'layout')

    return Response.json({ ok: true, key, path: imgPath })
  } catch (err) {
    console.error('CMS PATCH error:', err)
    return Response.json({ error: 'Failed to update image' }, { status: 500 })
  }
}
