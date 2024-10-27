"use server";
import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { KoalaWelcomeEmail } from "@/components/EmailTemplate/koalatemplate";
import emailtemplate1 from "@/components/EmailTemplate/template1";
import emailtemplate2 from "@/components/EmailTemplate/template2";
import emailtemplate3 from "@/components/EmailTemplate/template3";
import emailtemplate4 from "@/components/EmailTemplate/template4";
import emailtemplate5 from "@/components/EmailTemplate/template5";
import emailtemplate6 from "@/components/EmailTemplate/template6";
import emailtemplate7 from "@/components/EmailTemplate/template7";
import emailtemplate8 from "@/components/EmailTemplate/template8";
import emailtemplate9 from "@/components/EmailTemplate/template9";
import emailtemplate10 from "@/components/EmailTemplate/template10";

const templates = [
  { label: "Template 1", value: "template1", component: emailtemplate1 },
  { label: "Template 2", value: "template2", component: emailtemplate2 },
  { label: "Template 3", value: "template3", component: emailtemplate3 },
  { label: "Template 4", value: "template4", component: emailtemplate4 },
  { label: "Template 5", value: "template5", component: emailtemplate5 },
  { label: "Template 6", value: "template6", component: emailtemplate6 },
  { label: "Template 7", value: "template7", component: emailtemplate7 },
  { label: "Template 8", value: "template8", component: emailtemplate8 },
  { label: "Template 9", value: "template9", component: emailtemplate9 },
  { label: "Template 10", value: "template10", component: emailtemplate10 },
];

const nodemailer = require("nodemailer");

export async function POST(req: any) {
  try {
    const {
      subject,
      template,
      buttonLink,
      buttonText,
      name,
      clinicName,
      reason,
      startDate,
      endDate,
      email,
      price
    } = await req.json();

    // Find the matching template component
    const selectedTemplate = templates.find((t) => t.value === template);
    if (!selectedTemplate) {
      return NextResponse.json(
        { message: "Invalid template name provided." },
        { status: 400 }
      );
    }

    // Send emails to each address in the list
    await Promise.all(
      email.map(async (recipient: any) => {
        const emailHtml = await render(
          selectedTemplate.component({
            reason,
            clinicName,
            userFirstname: recipient.firstname,
            name,
            buttonText,
            buttonLink,
            endDate,
            startDate,
            price
          })
        );

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

        await transporter.sendMail({
          from: process.env.EMAIL,
          to: recipient.email,
          subject,
          html: emailHtml,
        });
      })
    );

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while sending emails." },
      { status: 500 }
    );
  }
}
