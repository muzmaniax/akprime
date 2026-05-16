import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { first, last, email, phone, message } = await request.json();

    if (!first || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      console.error("WEB3FORMS_KEY not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `New enquiry from ${first} ${last} — AK Prime`,
        from_name: `${first} ${last}`,
        replyto: email,
        name: `${first} ${last}`,
        email,
        phone: phone || "Not provided",
        message,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
