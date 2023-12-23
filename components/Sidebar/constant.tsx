import {
  home,
  appointment,
  inbox,
  inventory,
  patients,
  phone_leads,
  pos,
  reputation,
  tools,
} from "@/assets/SVGs";

interface Route {
  id: number;
  name: string;
  icon?: {
    src: string;
    height: number;
    width: number;
  };
  route?: string;
  children?: Route[];
}

export const routeList: Route[] = [
  {
    id: 1,
    name: "Home",
    icon: home,
    children: [
      { id: 1, name: "Dashboard", route: "/dashboard" },
      { id: 2, name: "Profiles", route: "profiles" },
      { id: 3, name: "Paid Ads", route: "/paidads" },
      { id: 4, name: "SEO", route: "/seo" },
    ],
  },
  {
    id: 2,
    name: "Patients",
    icon: patients,
    children: [
      { id: 1, name: "All Patients", route: "/patients/all" },
      { id: 2, name: "On-site", route: "/patients/onsite" },
      { id: 3, name: "Off-site", route: "/patients/offsite" },
    ],
  },
  {
    id: 3,
    name: "Inbox",
    icon: inbox,
    children: [
      { id: 1, name: "Text", route: "/inbox/text" },
      { id: 2, name: "Whatsapp", route: "/inbox/whatsapp" },
      { id: 3, name: "Messenger", route: "/inbox/messenger" },
    ],
  },
  {
    id: 4,
    name: "Appointments",
    icon: appointment,
    // children: [],
    route: "/appoinments",
  },
  {
    id: 5,
    name: "Phone leads",
    icon: phone_leads,
    // children: [],
    route: "/phoneleads",
  },
  {
    id: 6,
    name: "Reputation",
    icon: reputation,
    children: [
      { id: 1, name: "Public Reviews", route: "/reputation/publicreviews" },
      { id: 2, name: "Private Feedback", route: "/reputation/privatefeedback" },
      { id: 3, name: "Patient Surveys", route: "/reputation/patientsurveys" },
      { id: 4, name: "Google Q/A", route: "/reputation/googleqa" },
    ],
  },
  {
    id: 7,
    name: "POS",
    icon: pos,
    children: [
      { id: 1, name: "Sales", route: "/pos/sales" },
      { id: 2, name: "Return", route: "/pos/return" },
      { id: 3, name: "History", route: "/pos/history" },
    ],
  },
  {
    id: 8,
    name: "Inventory",
    icon: inventory,
    children: [
      { id: 1, name: "Stock panel", route: "/inventory/stockpanel" },
      { id: 2, name: "Manage", route: "/inventory/manage" },
    ],
  },
  {
    id: 9,
    name: "Tools",
    icon: tools,
    children: [
      { id: 1, name: "Email Broadcast", route: "/tools/emailbroadcast" },
      { id: 2, name: "Website Content", route: "/tools/websitecontent" },
      { id: 3, name: "Text Broadcast", route: "/tools/textbroadcast" },
    ],
  },
];
