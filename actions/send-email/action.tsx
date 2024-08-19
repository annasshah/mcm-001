"use server";
import { render } from "@react-email/components";
import { VercelInviteUserEmail } from "@/components/EmailTemplate/Emailtemplate1";
import { AirbnbReviewEmail } from "@/components/EmailTemplate/airbnbtemplate";
import { KoalaWelcomeEmail } from "@/components/EmailTemplate/koalatemplate";
import { StackOverflowTipsEmail } from "@/components/EmailTemplate/stackoverflowTemplate";
import { YelpRecentLoginEmail } from "@/components/EmailTemplate/yelpTemplate";
import { supabase } from "@/services/supabase";
import { useSelectedEmails } from "@/utils/email";
const nodemailer = require("nodemailer");
const emailList = [
  "raheelhussainco@gmail.com",
  "raheelofficialco@gmail.com",
  "raheelandcompany@gmail.com",
  "raheelconnect@gmail.com",
];
// lib/getUserEmail.ts

interface User {
  email: string;
}

export async function getUserEmail(): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("allpatients") // Replace 'user' with the actual name of your table
      .select("email,treatmenttype,firstname");

    console.log(data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}

export async function getUserLocations(): Promise<any> {
  try {
    const { data, error } = await supabase.from("allpatients").select(`
        locationid,
        Locations (title)  // Assuming 'location_name' is a column in the 'locations' table
      `);

    if (error) {
      throw error;
    }

    // console.log(data);

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}

export async function sendEmail(formData: FormData) {
  console.log("Submitted");
  let subject = formData.get("subject") as string;
  // let template = formData.get("template") as string;
  // let buttonLink = formData.get("buttonLink") as string;
  // let buttonText = formData.get("buttonText") as string;
  // let name = formData.get("name") as string;
  // let clinicName = formData.get("clinicName") as string;
  // let reason = formData.get("Reason") as string;
  let startDate = formData.get("startDate");
  let endDate = formData.get("endDate");
  const useremail = await getUserEmail();
  // const selectedEmails = useSelectedEmails();
  // console.tables(selectedEmails);
  console.log(startDate, endDate);

  try {
    // Choose the email HTML based on the emailOption
    let emailHtml;
    // emailHtml = render(
    //   <KoalaWelcomeEmail
    //     reason={reason}
    //     clinicName={clinicName}
    //     name={name}
    //     buttonText={buttonText}
    //     buttonLink={buttonLink}
    //     endDate={endDate}
    //     startDate={startDate}
    //   />
    // );
    // switch (template) {
    //   case "1":
    //     emailHtml = render(<VercelInviteUserEmail />);
    //     break;
    //   case "2":
    //     emailHtml = render(<AirbnbReviewEmail />);
    //     break;
    //   case "3":
    //     emailHtml = render(<KoalaWelcomeEmail />);
    //     break;
    //   case "4":
    //     emailHtml = render(<StackOverflowTipsEmail />);
    //     break;
    //   case "5":
    //     emailHtml = render(<YelpRecentLoginEmail />);
    //     break;
    //   default:
    //     emailHtml = render(<YelpRecentLoginEmail />);
    // }
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
    // {
    //   useremail.map(async (email: any, index: any) => {
    //     await transporter.sendMail({
    //       from: process.env.EMAIL, // sender address
    //       to: email.email, // list of receivers
    //       subject: subject, // Subject line
    //       text: "", // plain text body
    //       html: emailHtml, // html body
    //     });
    //     console.log(`Email sent successfully ${email.email}`);
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
}
