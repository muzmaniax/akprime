import { NextResponse } from 'next/server'

const PASSWORD = process.env.CMS_PASSWORD ?? 'akprime-cms'

// POST /api/cms/auth  — log in
export async function POST(req: Request) {
  const { password } = await req.json()

  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('cms_auth', PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  return res
}

// DELETE /api/cms/auth  — log out
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('cms_auth')
  return res
}
