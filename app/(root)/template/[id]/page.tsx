// app/page/[id]/page.tsx
"use client"; // Ensure to use "use client" if using React hooks

import React from "react";
import { useParams } from "next/navigation";
import { VercelInviteUserEmail } from "@/components/EmailTemplate/Emailtemplate1";
import { AirbnbReviewEmail } from "@/components/EmailTemplate/airbnbtemplate";
import { KoalaWelcomeEmail } from "@/components/EmailTemplate/koalatemplate";
import { StackOverflowTipsEmail } from "@/components/EmailTemplate/stackoverflowTemplate";
import { YelpRecentLoginEmail } from "@/components/EmailTemplate/yelpTemplate";

export const Page: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params.id as string | undefined; // TypeScript type for id

  let ComponentToRender: React.ElementType | null = null;

  switch (
    parseInt(id ?? "", 10) // Convert id to integer
  ) {
    case 1:
      ComponentToRender = VercelInviteUserEmail;
      break;
    case 2:
      ComponentToRender = AirbnbReviewEmail;
      break;
    case 3:
      ComponentToRender = KoalaWelcomeEmail;
      break;
    case 4:
      ComponentToRender = YelpRecentLoginEmail;
      break;
    case 5:
      ComponentToRender = StackOverflowTipsEmail;
      break;
    default:
      ComponentToRender = () => <div>Component not found</div>;
      break;
  }

  return <div>{ComponentToRender ? <ComponentToRender /> : null}</div>;
};
Page.displayName = "Template";
export default Page;
