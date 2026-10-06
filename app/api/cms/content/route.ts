import { getContentCMS, saveContentCMS, ContentCMSData } from '@/lib/content-cms'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const data = getContentCMS()
  return Response.json(data)
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json() as { type: keyof ContentCMSData; id: string; data: Record<string, unknown> }
    const { type, id, data: fields } = body

    if (!type || !id || !fields) {
      return Response.json({ error: 'type, id, and data are required' }, { status: 400 })
    }

    const cms = getContentCMS()
    if (!cms[type]) cms[type] = {} as never
    cms[type][id] = { ...(cms[type][id] ?? {}), ...fields } as never
    saveContentCMS(cms)

    revalidatePath('/', 'layout')

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Content CMS PATCH error:', err)
    return Response.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as keyof ContentCMSData
    const id = searchParams.get('id')

    if (!type || !id) {
      return Response.json({ error: 'type and id are required' }, { status: 400 })
    }

    const cms = getContentCMS()
    if (cms[type] && cms[type][id]) {
      delete cms[type][id]
      saveContentCMS(cms)
      revalidatePath('/', 'layout')
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Content CMS DELETE error:', err)
    return Response.json({ error: 'Failed to delete content' }, { status: 500 })
  }
}
