import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mail";
import { escapeHtml } from "@/lib/pickup";

const MIN_ELAPSED_MS = 3000;

// A single token (no spaces) is treated as gibberish if it has no vowels at
// all, or if its letter casing flips back and forth in a way real names and
// words don't (e.g. "NaVqkcpKZDpjdRKk"), or if it has a long run of
// consecutive consonants. Thresholds are named here so they're easy to tune.
function isGibberishToken(value: string, minLength: number): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes(" ")) return false;
  if (trimmed.length < minLength) return false;
  if (!/[a-zA-Z]/.test(trimmed)) return false; // no letters at all (e.g. pure digits) — not this check's concern

  const hasVowel = /[aeiouAEIOU]/.test(trimmed);
  if (!hasVowel) return true;

  let caseFlips = 0;
  let lastCase: "upper" | "lower" | null = null;
  for (const ch of trimmed) {
    if (!/[a-zA-Z]/.test(ch)) continue;
    const isUpper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
    const current = isUpper ? "upper" : "lower";
    if (lastCase && current !== lastCase) caseFlips++;
    lastCase = current;
  }
  if (caseFlips >= 3) return true;

  const longConsonantRun = /[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]{5,}/.test(trimmed);
  if (longConsonantRun) return true;

  return false;
}

function findGibberishField(name: string, message: string): { field: string; value: string } | null {
  if (isGibberishToken(name, 12)) return { field: "name", value: name };
  if (isGibberishToken(message, 6)) return { field: "message", value: message };
  return null;
}

export async function POST(request: Request) {
  try {
    const {
      name,
      lastName,
      email,
      phone,
      service,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      website,
      formRenderedAt,
    } = await request.json();

    const fullName = [name, lastName].filter(Boolean).join(" ");

    // Honeypot: real visitors never fill this in.
    if (website) {
      console.log("[contact-spam] blocked: honeypot filled", { website });
      return NextResponse.json({ success: true });
    }

    // Time gate: bots that skip rendering/JS timing submit near-instantly.
    const elapsed = Date.now() - Number(formRenderedAt);
    if (!formRenderedAt || Number.isNaN(elapsed) || elapsed < MIN_ELAPSED_MS) {
      console.log("[contact-spam] blocked: submitted too fast", { elapsedMs: elapsed });
      return NextResponse.json({ success: true });
    }

    // Gibberish check on name/message.
    const gibberish = findGibberishField(name || "", message || "");
    if (gibberish) {
      console.log(
        `[contact-spam] blocked: ${gibberish.field} looks like gibberish:`,
        JSON.stringify(gibberish.value)
      );
      return NextResponse.json({ success: true });
    }

    // Every user-supplied value is HTML-escaped before it goes into the email.
    const e = (v: unknown) => escapeHtml(String(v ?? "").slice(0, 4000));
    const source = [utm_source, utm_medium, utm_campaign].some(Boolean)
      ? `
        <p><strong>Source:</strong> ${e(utm_source) || "(none)"}</p>
        <p><strong>Medium:</strong> ${e(utm_medium) || "(none)"}</p>
        <p><strong>Campaign:</strong> ${e(utm_campaign) || "(none)"}</p>
      `
      : `<p><strong>Source:</strong> Direct / no campaign tracked</p>`;

    // sendNotification throws if the provider rejects the message, so this
    // route never reports success for an email that was not handed off.
    await sendNotification({
      replyTo: typeof email === "string" ? email : undefined,
      subject: `New Contact Form: ${service || "General Inquiry"} - ${fullName}`.replace(/[\r\n\t]+/g, " ").slice(0, 180),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${e(fullName)}</p>
        <p><strong>Email:</strong> ${e(email)}</p>
        <p><strong>Phone:</strong> ${e(phone) || "Not provided"}</p>
        <p><strong>Service:</strong> ${e(service) || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${e(message).replace(/\n/g, "<br />")}</p>
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
