import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { VercelInviteUserEmail } from "@/components/EmailTemplate/Emailtemplate1";
var nodemailer = require("nodemailer");
const emailHtml = render(VercelInviteUserEmail({}));
export async function POST(req: any) {
  try {
    const { subject, email } = await req.json();
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: emailHtml, // html body
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while sending email to the the user." },
      { status: 500 }
    );
  }
}
