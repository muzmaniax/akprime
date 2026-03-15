import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  firstName:   z.string(),
  lastName:    z.string(),
  company:     z.string(),
  email:       z.string().email(),
  phone:       z.string().optional(),
  service:     z.string(),
  budget:      z.string().optional(),
  message:     z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    // In a real application, you would initialize Resend here:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'AK Prime <noreply@akprimeconsulting.com>',
    //   to: result.data.email,
    //   subject: 'Thank you for contacting AK Prime Consulting',
    //   html: '...',
    // });
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
