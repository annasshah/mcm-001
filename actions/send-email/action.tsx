"use server";
import { render } from "@react-email/components";
import { VercelInviteUserEmail } from "@/components/EmailTemplate/Emailtemplate1";
const nodemailer = require("nodemailer");

export async function sendEmail(formData: FormData) {
  try {
    const emailHtml = render(<VercelInviteUserEmail />);
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
      to: "ssameershah1200@gmail.com", // list of receivers
      subject: "subject", // Subject line
      text: "", // plain text body
      html: emailHtml, // html body
    });
    console.log("sent");
  } catch (error) {
    console.log(error);
  }
}
