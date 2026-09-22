import { NextResponse } from "next/server";

// This route accepts the contact form submission and validates it.
// It does NOT send an email yet — there is no email provider configured.
// To make this live, wire in a transactional email provider such as
// Resend (https://resend.com) or SendGrid:
//
//   1. npm install resend
//   2. Add RESEND_API_KEY to your Vercel project's environment variables
//   3. Replace the TODO below with an actual send call
//
// Until then, submissions are validated and acknowledged, but not delivered.

export async function POST(request: Request) {
  const body = await request.json();

  const { name, company, email } = body ?? {};
  if (!name || !company || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: send the submission via your email provider, e.g.:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "website@serviceexcellenceedge.com",
  //   to: "hello@serviceexcellenceedge.com",
  //   subject: `New enquiry from ${company}`,
  //   text: JSON.stringify(body, null, 2),
  // });

  console.log("Contact form submission:", body);

  return NextResponse.json({ ok: true });
}
