import { NextResponse } from "next/server";
var nodemailer = require("nodemailer");

export async function POST(req: any) {
  try {
    const { link, email } = await req.json();
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
      subject: "Email Verficiation", // Subject line
      text: "", // plain text body
      html: `<b>Your verfication email link is ${link}</b>`, // html body
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
