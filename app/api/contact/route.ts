import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { first, last, email, phone, message } = await request.json();

    if (!first || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Notification to AK Prime team
    await resend.emails.send({
      from: "AK Prime Website <noreply@akprime.co.ke>",
      to: "info@akprime.co.ke",
      reply_to: email,
      subject: `New enquiry from ${first} ${last}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#082121">
          <div style="background:#082121;padding:24px 32px;border-radius:8px 8px 0 0">
            <h2 style="color:#37B4B4;margin:0;font-size:18px">AK Prime Consulting</h2>
          </div>
          <div style="background:#f4fafa;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0eeee;border-top:none">
            <h2 style="margin:0 0 24px;font-size:20px;color:#082121">New website enquiry</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a;width:120px">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;font-weight:600">${first} ${last}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8"><a href="mailto:${email}" style="color:#37B4B4">${email}</a></td>
              </tr>
              ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a">Phone</td><td style="padding:10px 0;border-bottom:1px solid #d0e8e8">${phone}</td></tr>` : ""}
              <tr>
                <td style="padding:10px 0;color:#3a5a5a;vertical-align:top">Message</td>
                <td style="padding:10px 0;line-height:1.6">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
            <div style="margin-top:28px">
              <a href="mailto:${email}" style="display:inline-block;background:#37B4B4;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600">Reply to ${first}</a>
            </div>
          </div>
          <p style="font-size:12px;color:#3a5a5a;text-align:center;margin-top:16px">AK Prime Consulting · akprime.co.ke</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: "AK Prime Consulting <info@akprime.co.ke>",
      to: email,
      subject: "We received your message — AK Prime Consulting",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#082121">
          <div style="background:#082121;padding:24px 32px;border-radius:8px 8px 0 0">
            <h2 style="color:#37B4B4;margin:0;font-size:18px">AK Prime Consulting</h2>
          </div>
          <div style="background:#f4fafa;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0eeee;border-top:none">
            <h2 style="margin:0 0 16px;font-size:20px">Hi ${first},</h2>
            <p style="font-size:15px;line-height:1.7;margin:0 0 16px">Thank you for reaching out to AK Prime Consulting. We've received your message and will get back to you within one business day.</p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 24px">In the meantime, feel free to explore our <a href="https://akprime.co.ke/services" style="color:#37B4B4">services</a> or <a href="https://akprime.co.ke/case-studies" style="color:#37B4B4">case studies</a>.</p>
            <a href="https://akprime.co.ke/book" style="display:inline-block;background:#082121;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600">Book a consultation</a>
          </div>
          <p style="font-size:12px;color:#3a5a5a;text-align:center;margin-top:16px">AK Prime Consulting · akprime.co.ke · info@akprime.co.ke</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
