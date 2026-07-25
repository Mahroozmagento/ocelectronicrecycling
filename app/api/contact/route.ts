import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message, utm_source, utm_medium, utm_campaign } = await request.json();

    const source = [utm_source, utm_medium, utm_campaign].some(Boolean)
      ? `
        <p><strong>Source:</strong> ${utm_source || "(none)"}</p>
        <p><strong>Medium:</strong> ${utm_medium || "(none)"}</p>
        <p><strong>Campaign:</strong> ${utm_campaign || "(none)"}</p>
      `
      : `<p><strong>Source:</strong> Direct / no campaign tracked</p>`;

    await resend.emails.send({
      from: "OC Electronic Recycling <noreply@nextechoc.com>",
      to: "nirowebix@gmail.com",
      replyTo: email,
      subject: `New Contact Form: ${service || "General Inquiry"} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <h3>Lead Source</h3>
        ${source}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
