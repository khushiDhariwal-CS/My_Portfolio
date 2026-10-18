import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  email: z.string().trim().email("Please provide a valid email address").max(100),
  subject: z.string().trim().max(120, "Subject is too long").optional().default("Portfolio Inquiry"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message is too long"),
  hp_field: z.string().max(0, "Bot detected").optional().default(""),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, subject, message, hp_field } = result.data;

    // Silent honeypot drop for bot prevention
    if (hp_field && hp_field.length > 0) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    let targetToEmail = process.env.CONTACT_TO_EMAIL || "kdhariwal44@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Khushi Dhariwal <onboarding@resend.dev>";

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not defined. Simulating message delivery.");
      return NextResponse.json({
        success: true,
        message: "Message received in simulated mode (RESEND_API_KEY pending).",
      });
    }

    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || "Portfolio Inquiry");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    // 1. Email HTML template
    const createOwnerHtml = (deliveredNote?: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #2B2823; margin: 0; padding: 32px 16px; }
            .container { max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E7DFD2; padding: 36px 32px; box-shadow: 0 4px 16px rgba(43,40,35,0.04); }
            .tag { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #B89B7A; margin-bottom: 16px; }
            h1 { font-size: 22px; font-weight: 600; color: #2B2823; margin: 0 0 20px 0; letter-spacing: -0.02em; }
            .field { margin-bottom: 18px; }
            .label { font-size: 12px; color: #6E675D; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #2B2823; font-weight: 500; }
            .message-box { background-color: #FAF7F2; border: 1px solid #E7DFD2; border-radius: 12px; padding: 18px; font-size: 15px; line-height: 1.6; color: #2B2823; margin-top: 16px; }
            .footer { font-size: 12px; color: #6E675D; margin-top: 28px; border-top: 1px solid #F1EBE1; padding-top: 16px; }
            .notice { background: #F1EBE1; border-radius: 8px; padding: 10px 14px; font-size: 12px; color: #6E675D; margin-bottom: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            ${deliveredNote ? `<div class="notice">${deliveredNote}</div>` : ""}
            <span class="tag">New Portfolio Contact</span>
            <h1>Message from ${safeName}</h1>
            <div class="field">
              <div class="label">Sender</div>
              <div class="value">${safeName} &lt;<a href="mailto:${safeEmail}" style="color: #2B2823;">${safeEmail}</a>&gt;</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${safeSubject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${safeMessage}</div>
            </div>
            <div class="footer">
              This message was sent from your portfolio website at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST.
            </div>
          </div>
        </body>
      </html>
    `;

    // 2. Professional Auto-reply to the visitor
    const visitorAutoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #2B2823; margin: 0; padding: 32px 16px; }
            .container { max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #E7DFD2; padding: 36px 32px; box-shadow: 0 4px 16px rgba(43,40,35,0.04); }
            .tag { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #B89B7A; margin-bottom: 14px; }
            h1 { font-size: 22px; font-weight: 500; color: #2B2823; margin: 0 0 16px 0; letter-spacing: -0.02em; }
            p { font-size: 15px; line-height: 1.7; color: #2B2823; margin: 0 0 16px 0; }
            .highlight { background-color: #FAF7F2; border-left: 3px solid #B89B7A; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .highlight p { font-size: 14px; color: #6E675D; margin: 0; }
            .links { margin-top: 24px; padding-top: 20px; border-top: 1px solid #F1EBE1; }
            .links a { color: #2B2823; font-weight: 500; text-decoration: none; margin-right: 18px; font-size: 13px; }
            .signature { margin-top: 24px; font-size: 14px; color: #6E675D; line-height: 1.6; }
            .name { font-weight: 600; color: #2B2823; }
          </style>
        </head>
        <body>
          <div class="container">
            <span class="tag">Confirmation</span>
            <h1>Thank you for getting in touch</h1>
            <p>Hello ${safeName},</p>
            <p>Thank you for reaching out. I have received your message regarding <strong>${safeSubject}</strong>.</p>
            <p>I review every inquiry personally and will get back to you shortly, typically within 24 to 48 hours.</p>
            <div class="highlight">
              <p><strong>Your message summary:</strong><br/>${safeMessage}</p>
            </div>
            <div class="signature">
              Warm regards,<br/>
              <span class="name">Khushi Dhariwal</span><br/>
              Full Stack Developer (MERN, Next.js)<br/>
              Ghaziabad, Uttar Pradesh, India
            </div>
            <div class="links">
              <a href="https://github.com/khushiDhariwal-CS" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/khushi-dhariwal-13b75a27b/?isSelfProfile=false" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/khushi_dhariwal" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
          </div>
        </body>
      </html>
    `;

    // Attempt delivery to primary recipient
    let ownerEmailResult = await resend.emails.send({
      from: fromEmail,
      to: targetToEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject || "New Message"} — from ${name}`,
      html: createOwnerHtml(),
    });

    // If Resend test mode restricts recipient to account owner, fallback gracefully
    if (ownerEmailResult.error) {
      const errMsg = ownerEmailResult.error.message || "";
      const match = errMsg.match(/\(([^)]+@resend\.dev|[^)]+@gmail\.com|[^)]+@[^)]+)\)/);
      if (match && match[1]) {
        const sandboxOwnerEmail = match[1];
        console.warn(`Resend in sandbox test mode: routing delivery to account owner ${sandboxOwnerEmail}`);
        ownerEmailResult = await resend.emails.send({
          from: fromEmail,
          to: sandboxOwnerEmail,
          replyTo: email,
          subject: `[Portfolio Inquiry - Test Mode] ${subject || "New Message"} — from ${name}`,
          html: createOwnerHtml(
            `Delivered to verified Resend account (${sandboxOwnerEmail}) because custom domain is not yet verified. Intended destination: ${targetToEmail}`
          ),
        });
      }
    }

    if (ownerEmailResult.error) {
      console.error("Resend owner email delivery error:", ownerEmailResult.error);
      return NextResponse.json(
        { error: `Unable to send message: ${ownerEmailResult.error.message}` },
        { status: 500 }
      );
    }

    // Attempt visitor auto-reply (gracefully handles unverified domain sandbox limitations)
    try {
      await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: targetToEmail,
        subject: `Thank you for reaching out — Khushi Dhariwal`,
        html: visitorAutoReplyHtml,
      });
    } catch (visitorErr) {
      console.warn("Visitor auto-reply skipped due to domain verification status:", visitorErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Khushi will reply within 24 to 48 hours.",
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Contact API unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again or reach out directly at kdhariwal44@gmail.com." },
      { status: 500 }
    );
  }
}
