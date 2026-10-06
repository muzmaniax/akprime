import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.akprime.co.ke",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { first, last, email, company, industry, challenge } = await request.json();

    if (!first || !email || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"AK Prime Website" <${process.env.SMTP_USER}>`,
      to: "info@akprime.co.ke",
      replyTo: email,
      subject: `Discovery call request — ${first} ${last}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#082121">
          <div style="background:#082121;padding:24px 32px;border-radius:8px 8px 0 0">
            <h2 style="color:#37B4B4;margin:0;font-size:18px">AK Prime Consulting</h2>
          </div>
          <div style="background:#f4fafa;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e0eeee;border-top:none">
            <h2 style="margin:0 0 8px;font-size:20px;color:#082121">New discovery call booking</h2>
            <p style="margin:0 0 24px;font-size:13px;color:#3a5a5a">The prospect filled out the pre-call form before booking. Review below before the call.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a;width:130px">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;font-weight:600">${first} ${last}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #d0e8e8"><a href="mailto:${email}" style="color:#37B4B4">${email}</a></td>
              </tr>
              ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a">Company</td><td style="padding:10px 0;border-bottom:1px solid #d0e8e8">${company}</td></tr>` : ""}
              ${industry ? `<tr><td style="padding:10px 0;border-bottom:1px solid #d0e8e8;color:#3a5a5a">Industry</td><td style="padding:10px 0;border-bottom:1px solid #d0e8e8">${industry}</td></tr>` : ""}
              <tr>
                <td style="padding:10px 0;color:#3a5a5a;vertical-align:top">Challenge</td>
                <td style="padding:10px 0;line-height:1.6">${challenge.replace(/\n/g, "<br>")}</td>
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Book form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
